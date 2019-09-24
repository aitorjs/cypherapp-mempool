import {Entity, model, property} from '@loopback/repository';

@model({settings: {strict: false}})
export class Todo extends Entity {
  @property({
    type: 'number',
    id: true,
    required: true,
    generated: false,
  })
  id: number;

  @property({
    type: 'number',
    required: true,
  })
  size: number;

  @property({
    type: 'number',
    required: true,
  })
  bytes: number;

  @property({
    type: 'number',
    required: true,
  })
  usage: number;

  @property({
    type: 'number',
    required: true,
  })
  maxmempool: number;

  @property({
    type: 'number',
    required: true,
  })
  mempoolminfee: number;

  @property({
    type: 'number',
    required: true,
  })
  minrelaytxfee: number;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Todo>) {
    super(data);
  }
}

export interface TodoRelations {
  // describe navigational properties here
}

export type TodoWithRelations = Todo & TodoRelations;
