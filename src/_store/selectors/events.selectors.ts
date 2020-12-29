import { createSelector } from 'reselect';
import { IStore } from '../index';
import { IEvent } from '../types/events.types';
import moment, { Moment } from 'moment';

export const eventsSelector = createSelector(
  (store: IStore) => store.events.collection,
  (events: IEvent[]) =>
    events.filter((e: IEvent) => {
      const counter = 0;
      const eventStart: Moment = moment(e.from);
      const eventEnd: Moment = moment(e.to);
      const dayStart: Moment = moment().add(counter, 'days').startOf('day');
      const dayEnd: Moment = moment().add(counter, 'days').endOf('day');
      const startedAfter = eventStart > dayEnd;
      const finishedBefore = eventEnd < dayStart;
      return !finishedBefore && !startedAfter
    }).map((e: IEvent) => {
      const counter = 0;
      const eventStart: Moment = moment(e.from);
      const eventEnd: Moment = moment(e.to);
      const dayStart: Moment = moment().add(counter, 'days').startOf('day');
      const dayEnd: Moment = moment().add(counter, 'days').endOf('day');
      return {
        ...e,
        startPoint: eventStart < dayStart ? dayStart.format() : eventStart.format(),
        endPoint: eventEnd > dayEnd ? dayEnd.format() : eventEnd.format()
      }
    })
)
