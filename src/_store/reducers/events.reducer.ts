import { Action } from 'redux-actions';
import { createTypedHandler, handleTypedActions } from 'redux-actions-ts';
import { IEvent } from '../types/events.types';
import { getEventsSuccess, postEventsSuccess } from '../actions/events.actions';

export interface IEventBasesState {
  collection: IEvent[];
}

const initialState: IEventBasesState = {
  collection: []
};

const eventsReducer = handleTypedActions(
  [
    /** Get Events */
    createTypedHandler(getEventsSuccess, (state: IEventBasesState, action: Action<IEvent[]>): IEventBasesState => {
      return {
      ...state,
        collection: action.payload
      };
    }),
    /** Post Events */
    createTypedHandler(postEventsSuccess, (state: IEventBasesState, action: Action<IEvent>): IEventBasesState => {

      return {
      ...state,
        collection: [...state.collection, action.payload]
      };
    }),
  ],
  initialState
);

export default eventsReducer;
