import React from 'react';
import './App.css';
import { useDispatch, useSelector } from 'react-redux';
import { GetEventsPending } from './_store/actions/events.actions';
import { IStore } from './_store';
import EventCard from './components/atoms/EventCard';
import { IEvent } from './_store/types/events.types';

function App() {

  const events = useSelector((store: IStore) => store.events.collection);

  const dispatch = useDispatch();
  const getEvents = () => {
    dispatch(GetEventsPending());
  };

  const eventsJSX = events.length > 0 && events.map((event: IEvent) => (
    <EventCard key={event._id} event={event}/>
  ));

  return (
    <div>
      <h1>Event Calendar</h1>
      <button onClick={getEvents}>Fetch</button>
      {eventsJSX}
    </div>
  );
}

export default App;
