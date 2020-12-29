import { Action } from 'redux-actions';
import { createTypedHandler, handleTypedActions } from 'redux-actions-ts';
import { IEvent } from '../types/events.types';
import { GetEventsSuccess } from '../actions/events.actions';

export interface IEventsState {
  collection: IEvent[];
}

const initialState: IEventsState = {
  collection: []
};

const eventsReducer = handleTypedActions(
  [
    /** Get Events */
    createTypedHandler(GetEventsSuccess, (state: IEventsState, action: Action<IEvent[]>): IEventsState => {
      return {
      ...state,
        collection: action.payload
      };
    }),
  ],
  initialState
);

export default eventsReducer;
