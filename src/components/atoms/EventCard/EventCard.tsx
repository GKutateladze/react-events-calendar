import React from 'react';
import './EventCard.css';
import { IEvent } from '../../../_store/types/events.types';
import moment from 'moment';
import { useDispatch } from 'react-redux';
import { deleteEventsPending } from '../../../_store/actions/events.actions';


interface IProps {
    event: IEvent
}

const EventCard: React.FC<IProps> = ({event}: IProps) => {

  const dispatch = useDispatch();

  const from = moment(event.from).format('HH:mm');
  const to = moment(event.to).format('HH:mm');

  const deleteEvent = () => {
    dispatch(deleteEventsPending(event._id))
  }

  // -------------------------------------------------------------------------------------------------------------------

  return (
    <div className='event-card'>
      <div className="event-card__info">
        <p className="event-card__title">{event.title}</p>
        <p className="event-card__time">{from}</p>-
        <p className="event-card__time">{to}</p>
      </div>
      <button className="event-card__delete-button" onClick={deleteEvent}>Delete</button>
    </div>
  );
};

export default EventCard;
