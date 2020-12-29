import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import Axios from 'axios-observable';
import { AxiosResponse } from 'axios';
import { IEvent, IEventBase } from '../types/events.types';

/** Get Events */
export const getEvents = (): Observable<IEvent[]> => {
  return Axios.get(`http://localhost:4000/events`).pipe(map(({ data }: AxiosResponse<IEvent[]>) => data));
};


/** Post Events */
export const postEvents = (payload: IEventBase): Observable<IEvent> => {
  return Axios.post(`http://localhost:4000/events`, payload).pipe(map(({ data }: AxiosResponse<IEvent>) => data));
};


/** Delete Events */
export const deleteEvents = (payload: string): Observable<string> => {
  return Axios.delete(`http://localhost:4000/events`, { data: { id: payload } }).pipe(map(({ data }: AxiosResponse<string>) => data));
};
