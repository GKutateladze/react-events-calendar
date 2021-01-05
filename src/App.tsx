import React, { useEffect, useState } from 'react';
import './App.css';
import { useDispatch, useSelector } from 'react-redux';
import { getEventsPending } from './_store/actions/events.actions';
import EventForm from './components/atoms/EventForm';
import EventsCalendar from './components/organisms/EventsCalendar';
import { eventsSelector } from './_store/selectors/events.selectors';
import AsideForm from './components/organisms/AsideForm';
import { Notifications } from 'root-front';

function App() {
  const dispatch = useDispatch();
  const events = useSelector(eventsSelector);

  useEffect(() => {
    dispatch(getEventsPending())
  }, [dispatch])

  const [showForm, toggleForm] = useState<boolean>(false);

  // -------------------------------------------------------------------------------------------------------------------

  return (
    <div className='App'>
      <div className={`calendar ${!showForm ? 'calendar--width' : ''}`}>
        <EventForm/>
        <EventsCalendar events={events}/>
      </div>
      <div className={`custom-form ${showForm ? 'custom-form--appear' : ''}`}>
        <AsideForm showForm={showForm} toggleForm={toggleForm}/>
      </div>
      <Notifications/>
    </div>
  );
}

export default App;
