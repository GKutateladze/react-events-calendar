import React from 'react';
import './EventForm.css';
import { useDispatch, useSelector } from 'react-redux';
import { setCounter } from '../../../_store/actions/events.actions';
import { Button } from 'root-front';
import { IStore } from '../../../_store';
import moment from 'moment';

interface IProps {
}

const EventForm: React.FC<IProps> = () => {

  const dispatch = useDispatch();

  const counter: number = useSelector((store: IStore) => store.events.counter);
  const date = moment().add(counter, 'day').format('DD.MM.YYYY')

  // -------------------------------------------------------------------------------------------------------------------

  const handleCounter = (n: number) => {
    dispatch(setCounter(n));
  };

  // -------------------------------------------------------------------------------------------------------------------

  return (
    <div className='event-form'>
        <p className='event-form__date'>{date}</p>
        <Button className='event-form__button' size='small' onClick={ () => handleCounter(-1) }>Previous</Button>
        <Button className='event-form__button' size='small' onClick={ () => handleCounter(1) }>Next</Button>
        <Button className='event-form__button' size='small' onClick={ () => handleCounter(0) } disabled={counter === 0}>Today</Button>
    </div>
  );
};

export default EventForm;
