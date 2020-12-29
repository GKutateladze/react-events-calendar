import React from 'react';
import './EventForm.css';
import { IEventBase } from '../../../_store/types/events.types';
import { useDispatch } from 'react-redux';
import { postEventsPending } from '../../../_store/actions/events.actions';

const EventForm = () => {

  const dispatch = useDispatch();

  const appendZero = (n: number | string): string => {
    return +n < 10 ? `0${n}` : `${n}`;
  }

  const postEvent = () => {
    const from = Math.floor(Math.random() * 24) + 1;
    const to = Math.floor(Math.random() * (24 - from)) + from;

    const randomEvent: IEventBase = {
      title: `Event ${Math.floor(Math.random() * 100)}`,
      description: 'Reel reel good event',
      from: `2020-12-01T${appendZero(from)}:00:00+03:00`,
      to: `2020-12-01T${appendZero(to)}:00:00+03:00`
    }
    dispatch(postEventsPending(randomEvent));
  }

  // -------------------------------------------------------------------------------------------------------------------

  return (
    <div className='event-form'>
      <button onClick={postEvent}>POST</button>
    </div>
  );
};

export default EventForm;
