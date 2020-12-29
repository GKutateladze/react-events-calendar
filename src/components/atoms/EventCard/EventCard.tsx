import React from 'react';
import './EventCard.css';
import { IEventBase } from '../../../_store/types/events.types';
import moment from 'moment';


interface IProps {
    event: IEventBase
}

const EventCard: React.FC<IProps> = ({event}: IProps) => {

  const from = moment(event.from).format('DD.MM.YYYY HH:mm');
  const to = moment(event.to).format('DD.MM.YYYY HH:mm');

  // -------------------------------------------------------------------------------------------------------------------

  return (
    <div className='event-card'>
      <h2 className="event-title">{event.title}</h2>
      <p className="event-description">{event.description}</p>
      <p className="event-time">{from}</p>
      <p className="event-time">{to}</p>
    </div>
  );
};

export default EventCard;
