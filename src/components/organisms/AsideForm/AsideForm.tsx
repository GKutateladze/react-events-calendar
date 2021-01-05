import React from 'react';
import './AsideForm.css';
import { useReactiveForm } from 'use-reactive-form';
import { Button, Datepicker, FormGroup, Input, Textarea } from 'root-front';
import { useDispatch } from 'react-redux';
import moment from 'moment';
import { IEventBase } from '../../../_store/types/events.types';
import { postEventsPending } from '../../../_store/actions/events.actions';

interface IProps {
  showForm: boolean;
  toggleForm: any;
}

const AsideForm: React.FC<IProps> = ({showForm, toggleForm}: IProps) => {

  const dispatch = useDispatch();

  const appendZero = (n: number | string): string => {
    return +n < 10 ? `0${ n }` : `${ n }`;
  };

  const postEvent = () => {
    const from = Math.floor(Math.random() * 24) + 1;
    const to = Math.floor(Math.random() * (24 - from)) + from;

    const today = moment().format('YYYY-MM-DD');

    const randomEvent: IEventBase = {
      title: `Event ${ Math.floor(Math.random() * 100) }`,
      description: 'Reel reel good event',
      from: `${ today }T${ appendZero(from) }:00:00+03:00`,
      to: `${ today }T${ appendZero(to) }:00:00+03:00`
    };
    dispatch(postEventsPending(randomEvent));
  };

  // -------------------------------------------------------------------------------------------------------------------

  const config = {
    fields: {
      title: '',
      description: '',
      fromDate: new Date(),
      fromTime: '00:00',
      toDate: null,
      toTime: '00:00'
    },
  }

  const { ref, values, errors, validate, update } = useReactiveForm(config);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      const fromDate = moment(values.fromDate).format('YYYY-MM-DD');
      const toDate = moment(values.toDate).format('YYYY-MM-DD');
      const result: IEventBase = {
        title: values.title,
        description: values.description,
        from: `${fromDate}T${values.fromTime}:00+03:00`,
        to: `${toDate}T${values.toTime}:00+03:00`,
      }
      dispatch(postEventsPending(result));
      console.log(result)
    } else {
      console.log(errors);
    }
  };

  // -------------------------------------------------------------------------------------------------------------------

  const onDateChange = (date: Date | null, name?: string) => {
    if (date && name) {
      update({
        ...values,
        [name]: date
      })
    }
  }

  return (
    <div className='aside-form'>
      <Button className={`aside__button ${showForm ? 'aside__button--rotate' : ''}`}
              onClick={() => toggleForm(!showForm)}
              size='small'
              buttonType='round'>+</Button>

      <form className='' ref={ref} onSubmit={onSubmit}>
        <FormGroup className='form-group' label='Title'>
          <Input name='title' inputType='outline' placeholder='Add title' />
        </FormGroup>
        <FormGroup className='form-group' label='Description'>
          <Textarea name='description' placeholder='Describe an event'/>
        </FormGroup>
        <div>
          <FormGroup className='form-group' label='Date from'>
            <Datepicker inputType='outline' locale='en' name='fromDate' onChange={onDateChange} />
          </FormGroup>
          <FormGroup className='form-group' label='Time from'>
            <Input inputType='outline' type='time' name='fromTime' defaultValue={values.fromTime}/>
          </FormGroup>
        </div>
        <div>
          <FormGroup className='form-group' label='Date to'>
            <Datepicker inputType='outline' locale='en' name='toDate' onChange={onDateChange}/>
          </FormGroup>
          <FormGroup className='form-group' label='Time to'>
            <Input inputType='outline' type='time' name='toTime' defaultValue={values.toTime}/>
          </FormGroup>
        </div>
        <div className='form-footer'>
          <Button className='form-button' type='submit'>Submit</Button>
          <Button className='form-button' buttonType='outlineSecondary' onClick={ postEvent }>Random</Button>
        </div>
      </form>
    </div>
  );
};

export default AsideForm;
