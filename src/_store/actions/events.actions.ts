import { createTypedAction } from 'redux-actions-ts';
import { IEvent } from '../types/events.types';

export const GetEventsPending = createTypedAction<void>('[Pending] Get Events');
export const GetEventsSuccess = createTypedAction<IEvent[]>('[Success] Get Events');
