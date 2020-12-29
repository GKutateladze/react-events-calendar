import React, { useEffect } from 'react';
import './App.css';
import { useDispatch, useSelector } from 'react-redux';
import { getEventsPending } from './_store/actions/events.actions';
import { IStore } from './_store';
import EventCard from './components/atoms/EventCard';
import { IEvent } from './_store/types/events.types';
import EventForm from './components/atoms/EventForm';

function App() {
  const dispatch = useDispatch();
  const events = useSelector((store: IStore) => store.events.collection);

  useEffect(() => {
    dispatch(getEventsPending())
  }, [dispatch])

  const eventsJSX = events.length > 0 && events.map((event: IEvent) => (
    <EventCard key={event._id} event={event}/>
  ));

  return (
    <div>
      <h1>Event Calendar</h1>
      <EventForm/>
      {eventsJSX}
    </div>
  );
}

export default App;
