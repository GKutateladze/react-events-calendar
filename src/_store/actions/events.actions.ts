import { createTypedAction } from 'redux-actions-ts';
import { IEvent, IEventBase } from '../types/events.types';

export const getEventsPending = createTypedAction<void>('[Pending] Get Events');
export const getEventsSuccess = createTypedAction<IEvent[]>('[Success] Get Events');


export const postEventsPending = createTypedAction<IEventBase>('[Pending] Post Events');
export const postEventsSuccess = createTypedAction<IEvent>('[Success] Post Events');


export const deleteEventsPending = createTypedAction<string>('[Pending] Delete Events');
export const deleteEventsSuccess = createTypedAction<string>('[Success] Delete Events');


export const setCounter = createTypedAction<number>('Set Counter');