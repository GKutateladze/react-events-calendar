import { Action } from 'redux-actions';
import { createTypedHandler, handleTypedActions } from 'redux-actions-ts';
import { IEvent } from '../types/events.types';
import { getEventsSuccess, postEventsSuccess, deleteEventsSuccess, setCounter } from '../actions/events.actions';

export interface IEventState {
  collection: IEvent[];
  counter: number;
}

const initialState: IEventState = {
  collection: [],
  counter: 0
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
    /** Set Counter */
    createTypedHandler(setCounter, (state: IEventState, action: Action<any>): IEventState => {
      if (action.payload === 0) {
        state.counter = 0;
      } else {
        state.counter += action.payload;
      }

      return {
      ...state
      };
    }),
  ],
  initialState
);

export default eventsReducer;
