import { combineEpics, createEpicMiddleware } from 'redux-observable';
import { applyMiddleware, combineReducers, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { getEventsEffect$, postEventsEffect$, deleteEventsEffect$ } from './effects/events.effects';
import eventsReducer, { IEventState } from './reducers/events.reducer';

/*[imports:end] */

export interface IStore {
  events: IEventState;

  /*[types:end] */
}

const observableMiddleware = createEpicMiddleware();

/** Register reducers */
const reducers = combineReducers({
  events: eventsReducer,

  /*[reducers:end] */
})

/** Create store */
export const store = createStore(reducers, composeWithDevTools(applyMiddleware(observableMiddleware)));

/** Register effects */
// @ts-ignore
observableMiddleware.run(combineEpics(
  getEventsEffect$,
  postEventsEffect$,
  deleteEventsEffect$,

  /*[effects:end] */
  )
);
