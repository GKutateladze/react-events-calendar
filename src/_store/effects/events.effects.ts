import { ActionsObservable, ofType } from 'redux-observable';
import { catchError, map, switchMap } from 'rxjs/operators';
import { Action } from 'redux-actions';
import { showErrorMessage } from '../_commonActions/error.actions';
import { IEvent, IEventBase } from '../types/events.types';
import { getEvents, postEvents } from '../services/events.services';
import { getEventsPending, getEventsSuccess, postEventsPending, postEventsSuccess } from '../actions/events.actions';

/** Get Events */
export const getEventsEffect$ = (actions$: ActionsObservable<Action<void>>) =>
  actions$.pipe(
    ofType(getEventsPending.toString()),
    switchMap(() =>
      getEvents().pipe(
        map((result: IEvent[]) => getEventsSuccess(result)),
        catchError(showErrorMessage)
      )
    )
  );


/** Post Events */
export const postEventsEffect$ = (actions$: ActionsObservable<Action<IEventBase>>) =>
  actions$.pipe(
    ofType(postEventsPending.toString()),
    switchMap(({ payload }) =>
      postEvents(payload).pipe(
        map((result: IEvent) => postEventsSuccess(result)),
        catchError(showErrorMessage)
      )
    )
  );
