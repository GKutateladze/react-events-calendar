import React, { useEffect } from 'react';
import './App.css';
import { useDispatch, useSelector } from 'react-redux';
import { getEventsPending } from './_store/actions/events.actions';
import EventCard from './components/atoms/EventCard';
import { IEvent } from './_store/types/events.types';
import EventForm from './components/atoms/EventForm';
import EventsCalendar from './components/organisms/EventsCalendar';
import { eventsSelector } from './_store/selectors/events.selectors';

function App() {
  const dispatch = useDispatch();
  const events = useSelector(eventsSelector);

  useEffect(() => {
    dispatch(getEventsPending())
  }, [dispatch])

  const eventsJSX = events.length > 0 && events.map((event: IEvent) => (
    <EventCard key={event._id} event={event}/>
  ));

  return (
    <div className='App'>
      <div className="align-container">
        <EventForm/>
        <div className="event-container">
          {eventsJSX}
        </div>
      </div>
      <EventsCalendar events={events}/>
    </div>
  );
}

export default App;
