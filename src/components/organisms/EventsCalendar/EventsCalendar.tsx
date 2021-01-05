import React, { useCallback, useEffect, useRef, useState } from 'react';
import './EventsCalendar.css';
import { IEvent } from '../../../_store/types/events.types';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import { deleteEventsPending } from '../../../_store/actions/events.actions';
import { IStore } from '../../../_store';
import { ReactComponent as Trash } from '../../../assets/icons/trash.svg';

interface IProps {
    events: IEvent[]
}

const EventsCalendar: React.FC<IProps> = ({events}: IProps) => {

  const dispatch = useDispatch();
  const counter: number = useSelector((store: IStore) => store.events.counter);

  // -------------------------------------------------------------------------------------------------------------------

  const tenMinuteWidth = 40;
  const oneMinuteWidth = tenMinuteWidth / 10;
  const hoursColumnWidth = tenMinuteWidth * 6;

  const hoursArray: number[] = [];
  for (let i = 0; i < 24; i++) {
    hoursArray.push(i)
  }
  const hoursColumnsJSX = hoursArray.map((item: number) => {

    const date = moment().add(counter, 'days').startOf('day').add(item, 'hour');

    const minutesArray = [0, 1, 2, 3, 4, 5];
    const minutesColumnsJSX = minutesArray.map((m: number) => {
      return (
        <div key={m} className="minute-column" style={{ minWidth: `${tenMinuteWidth}px` }}>
          {m === 0 && <span className="minute-column__label-time">{date.startOf('hour').format('HH:mm')}</span>}
        </div>
      )
    })

    return (
      <div key={item} className="hour-column" style={{ minWidth: `${hoursColumnWidth}px` }}>
        {minutesColumnsJSX}
      </div>
    )
  })

  // -------------------------------------------------------------------------------------------------------------------
  const rowHeight = 23;

  const getColumns = (events: IEvent[]) => {
    const result = [[]];
    let rows = 0;

    events.sort((a: IEvent, b: IEvent) => {
      return moment(a.startPoint).diff(moment().add(counter, 'days')) - moment(b.startPoint).diff(moment().add(counter, 'days'))
    });

    for (let i = 0; i < events.length; i++) {

      const start = moment(events[i].startPoint).diff(moment().add(counter, 'days'));

      for (let j = 0; j < result.length; j++) {

        const lastInRow: IEvent = result[j][result[j].length - 1];
        const end = lastInRow ? moment(lastInRow.endPoint).diff(moment().add(counter, 'days')) : 0;

        if (result[j].length === 0 || start >= end) {
          // @ts-ignore
          result[j].push(events[i]);
          events[i].row = j;
          rows = Math.max(rows, j)
          break;
        } else {
          result.push([]);
        }
      }
    }

    return {
      event: result,
      rows: rows
    }
  };

  const countHeight = (row: number, rowHeight: number): number => {
    return rowHeight + row * rowHeight * 2.5;
  }

  const { rows } = getColumns(events);

// —-----------------------------------------------------------------------------------------------------------------

  const timeToCoordinate = useCallback((time: string | undefined) => {
    return moment(time).diff(moment().add(counter, 'days').startOf('day')) / 1000 / 60;
  }, [counter])

// —-----------------------------------------------------------------------------------------------------------------

  const unavailableTimeJSX = events.map((event: IEvent, i: number) => {

    const eventStartPoint = timeToCoordinate(event.startPoint)
    const eventWidth = oneMinuteWidth && oneMinuteWidth * moment(event.endPoint).diff(moment(event.startPoint)) / 1000 / 60;

    return (
      <div key={i} className="event-calendar__unavailable-time" style={{
        transform: `translateX(${eventStartPoint * oneMinuteWidth}px)`,
        width: `${eventWidth - 1}px`,
      }}/>
    )
  });

// —-----------------------------------------------------------------------------------------------------------------

  const [timeLineX, setTimeLineX] = useState<number>(timeToCoordinate(moment().format()) * oneMinuteWidth);
  const timeLine = useRef<HTMLDivElement>(null);

  const [startInterval, setStartInterval] = useState<boolean>(false);

  useEffect(() => {
    const interval = setInterval(() => {
      if (+moment().format('s') === 0) {
        setStartInterval(true);
        clearInterval(interval);
      }
    }, 1000)
    return () => {
      // dispatch(resetDayCounter());
      clearInterval(interval)
    }
  }, [dispatch])

  useEffect(() => {
    if (startInterval) {
      const interval = setInterval(() => {
        setTimeLineX(timeToCoordinate(moment().add(counter, 'days').format()) * oneMinuteWidth);
      }, 60000)
      return () => {
        // dispatch(resetDayCounter());
        clearInterval(interval)
      }
    }
  }, [startInterval, counter, dispatch, oneMinuteWidth, timeToCoordinate])

// —-----------------------------------------------------------------------------------------------------------------

  const scrollContainer = useRef<HTMLDivElement>(null);
  const [timelineTextPosition, setTimelineTextPosition] = useState<number>(0);
  const timelineText = useRef<HTMLDivElement>(null);

  const controlTime = useCallback(() => {
    if (timeLine.current && scrollContainer.current && timelineText.current) {

      const timeLineOffSet = timeLine.current.getBoundingClientRect().left;
      const screenWidth = scrollContainer.current.getBoundingClientRect().width;
      const screenPadding = scrollContainer.current.getBoundingClientRect().left;
      const timelineTextWidth = timelineText.current.getBoundingClientRect().width

      if (timeLineOffSet - screenPadding >= screenWidth - timelineTextWidth) {
        setTimelineTextPosition(screenWidth + scrollContainer.current.scrollLeft - timelineTextWidth - 2);
      } else if (timeLineOffSet < screenPadding) {
        setTimelineTextPosition(scrollContainer.current.scrollLeft - 2);
      } else {
        setTimelineTextPosition(timeLineX)
      }
    }
  }, [timeLineX])

  const scrollIntoView = useCallback((behavior: 'smooth' | 'auto' = 'smooth') => {

    scrollContainer.current && scrollContainer.current.scrollTo({
      left: timeLineX - window.innerWidth / 2,
      top: 0,
      behavior
    })
  }, [timeLineX])

  useEffect(() => {
    scrollIntoView('auto');
    // eslint-disable-next-line
  }, [])

  useEffect(() => {
    controlTime()
  }, [timeLineX, counter, controlTime])

// —-----------------------------------------------------------------------------------------------------------------

  const eventsJSX = events.map((event: IEvent, i: number) => {

    const eventStartPoint = timeToCoordinate(event.startPoint)
    const eventWidth = oneMinuteWidth && oneMinuteWidth * moment(event.endPoint).diff(moment(event.startPoint)) / 1000 / 60;
    const row = event.row !== undefined ? event.row : 1;
    const verticalShift = countHeight(row, rowHeight);

    const startPointText = eventStartPoint === 0 ? moment(event.from).format('DD.MM H:mm') : moment(event.from).format('H:mm')
    const startPointClass = moment(event.startPoint).format() > moment(event.from).format();
    const endPointClass = moment(event.endPoint).format() < moment(event.to).format();

    const deleteEvent = () => {
      dispatch(deleteEventsPending(event._id))
    }

    return (
      <div key={i} className="event-item__wrapper" style={{
        transform: `translateX(${eventStartPoint * oneMinuteWidth}px)`,
        width: `${eventWidth}px`,
        top: `${verticalShift}px`,
      }}>
        <div>
          <div className={`event-item ${startPointClass ? 'event-item--start-threshold' : ''} ${endPointClass ? 'event-item--end-threshold' : ''}`}>
            <div className="event-item__header">
              <span className="event-item__description"><Trash className="event-item__delete" onClick={deleteEvent}/><span className="event-item__title">{event.title}</span>{event.description}</span>
            </div>
            <span className="event-item__start-date">{startPointText}</span>
          </div>
        </div>
      </div>
    )
  })

// —-----------------------------------------------------------------------------------------------------------------

  const stageHeight = countHeight(rows, rowHeight) + 2.5 * (rowHeight);

  return (
    <div className='events-calendar__scroll-container'
         style={{ height: `${stageHeight}px` }}
         onScroll={controlTime}
         ref={scrollContainer}>
      {unavailableTimeJSX}
      {counter === 0 &&
      <>
          <div className="event-calendar__current-time-text"
               style={{ transform: `translateX(${timelineTextPosition}px)` }}
               ref={timelineText}
               onClick={() => scrollIntoView()}
          >{moment().format('HH:mm')}</div>
          <div className="event-calendar__current-time-line" style={{ transform: `translateX(${timeLineX}px)` }}
               ref={timeLine}/>
      </>
      }
      {hoursColumnsJSX}
      {eventsJSX}
    </div>
  );
};

export default EventsCalendar;
