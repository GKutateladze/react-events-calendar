import { ActionsObservable, ofType } from 'redux-observable';
import { catchError, map, switchMap } from 'rxjs/operators';
import { Action } from 'redux-actions';
import { showErrorMessage } from '../_commonActions/error.actions';
import { IEvent, IEventBase } from '../types/events.types';
import { getEvents, postEvents, deleteEvents } from '../services/events.services';
import { getEventsPending, getEventsSuccess, postEventsPending, postEventsSuccess, deleteEventsPending, deleteEventsSuccess } from '../actions/events.actions';
import { sendNotification } from 'root-front';

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
        map((result: IEvent) => {
          sendNotification({
            message: 'Event has been added',
            variant: 'success'
          })
          return postEventsSuccess(result)
        }),
        catchError(showErrorMessage)
      )
    )
  );


/** Delete Events */
export const deleteEventsEffect$ = (actions$: ActionsObservable<Action<string>>) =>
  actions$.pipe(
    ofType(deleteEventsPending.toString()),
    switchMap(({ payload }) =>
      deleteEvents(payload).pipe(
        map(() => deleteEventsSuccess(payload)),
        catchError(showErrorMessage)
      )
    )
  );
