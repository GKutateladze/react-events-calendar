import React from 'react';
import './EventForm.css';
import { IEventBase } from '../../../_store/types/events.types';
import { useDispatch, useSelector } from 'react-redux';
import { postEventsPending, setCounter } from '../../../_store/actions/events.actions';
import moment from 'moment';
import { IStore } from '../../../_store';

const EventForm = () => {

  const dispatch = useDispatch();

  const counter: number = useSelector((store: IStore) => store.events.counter);

  const appendZero = (n: number | string): string => {
    return +n < 10 ? `0${n}` : `${n}`;
  }

  const postEvent = () => {
    const from = Math.floor(Math.random() * 24) + 1;
    const to = Math.floor(Math.random() * (24 - from)) + from;

    const today = moment().format('YYYY-MM-DD')

    const randomEvent: IEventBase = {
      title: `Event ${Math.floor(Math.random() * 100)}`,
      description: 'Reel reel good event',
      from: `${today}T${appendZero(from)}:00:00+03:00`,
      to: `${today}T${appendZero(to)}:00:00+03:00`
    }
    dispatch(postEventsPending(randomEvent));
  }

  // -------------------------------------------------------------------------------------------------------------------

  const handleCounter = (n: number) => {
    dispatch(setCounter(n))
  }

  // -------------------------------------------------------------------------------------------------------------------

  return (
    <div className='event-form'>
      <ul className="icon-list">
        <li className="icon-item">
          <div className="icon-link" onClick={postEvent}><p>POST</p></div>
        </li>
        <li className="icon-item">
          <div className="icon-link" onClick={() => handleCounter(-1)}><p>PREV</p></div>
        </li>
        <li className="icon-item">
          <div className="icon-link" onClick={() => handleCounter(1)}><p>NEXT</p></div>
        </li>
        { counter !== 0 && <li className="icon-item">
          <div className="icon-link" onClick={ () => handleCounter(0) }><p>TODAY</p></div>
        </li> }
      </ul>
    </div>
  );
};

export default EventForm;
