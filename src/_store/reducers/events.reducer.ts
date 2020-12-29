import { Action } from 'redux-actions';
import { createTypedHandler, handleTypedActions } from 'redux-actions-ts';
import { IEvent } from '../types/events.types';
import { getEventsSuccess, postEventsSuccess, deleteEventsSuccess } from '../actions/events.actions';

export interface IEventState {
  collection: IEvent[];
}

const initialState: IEventState = {
  collection: []
};

const eventsReducer = handleTypedActions(
  [
    /** Get Events */
    createTypedHandler(getEventsSuccess, (state: IEventState, action: Action<IEvent[]>): IEventState => {
      return {
      ...state,
        collection: action.payload
      };
    }),
    /** Post Events */
    createTypedHandler(postEventsSuccess, (state: IEventState, action: Action<IEvent>): IEventState => {

      return {
      ...state,
        collection: [...state.collection, action.payload]
      };
    }),
    /** Delete Events */
    createTypedHandler(deleteEventsSuccess, (state: IEventState, action: Action<string>): IEventState => {

      return {
      ...state,
        collection: state.collection.filter(({ _id }: IEvent) => _id !== action.payload)
      };
    }),
  ],
  initialState
);

export default eventsReducer;
