import { ActionsObservable, ofType } from 'redux-observable';
import { catchError, map, switchMap } from 'rxjs/operators';
import { Action } from 'redux-actions';
import { showErrorMessage } from '../_commonActions/error.actions';
import { IEvent } from '../types/events.types';
import { GetEvents } from '../services/events.services';
import { GetEventsPending, GetEventsSuccess } from '../actions/events.actions';

/** Get Events */
export const GetEventsEffect$ = (actions$: ActionsObservable<Action<void>>) =>
  actions$.pipe(
    ofType(GetEventsPending.toString()),
    switchMap(() =>
      GetEvents().pipe(
        map((result: IEvent[]) => GetEventsSuccess(result)),
        catchError(showErrorMessage)
      )
    )
  );
