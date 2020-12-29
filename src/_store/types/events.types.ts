export interface IEventBase {
  title: string;
  description: string;
  from: string;
  to: string;
}

export interface IEvent extends IEventBase {
  _id: string;
  row?: number;
  startPoint?: string;
  endPoint?: string;
}

