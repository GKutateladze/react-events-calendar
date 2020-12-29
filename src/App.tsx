import React from 'react';
import './App.css';
import { useDispatch } from 'react-redux';
import { GetEventsPending } from './_store/actions/events.actions';

function App() {

  const dispatch = useDispatch();
  const getEvents = () => {
    dispatch(GetEventsPending());
  };

  return (
    <div>
      <h1>Event Calendar</h1>
      <button onClick={getEvents}>Fetch</button>
    </div>
  );
}

export default App;
