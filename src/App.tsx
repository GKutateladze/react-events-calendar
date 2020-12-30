import React, { useEffect } from 'react';
import './App.css';
import { useDispatch, useSelector } from 'react-redux';
import { getEventsPending } from './_store/actions/events.actions';
import EventForm from './components/atoms/EventForm';
import EventsCalendar from './components/organisms/EventsCalendar';
import { eventsSelector } from './_store/selectors/events.selectors';

function App() {
  const dispatch = useDispatch();
  const events = useSelector(eventsSelector);

  useEffect(() => {
    dispatch(getEventsPending())
  }, [dispatch])

  // -------------------------------------------------------------------------------------------------------------------

  return (
    <div className='App'>
      <EventForm/>
      <EventsCalendar events={events}/>
    </div>
  );
}

export default App;
