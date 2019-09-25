import {Entity, model, property} from '@loopback/repository';

@model({settings: {strict: false}})
export class Mempool extends Entity {
  @property({
    type: 'number',
    id: true,
    required: true,
    generated: true,
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
  mempoolminfree: number;

  @property({
    type: 'number',
    required: true,
  })
  minrelaytxfree: number;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Mempool>) {
    super(data);
  }
}

export interface MempoolRelations {
  // describe navigational properties here
}

export type MempoolWithRelations = Mempool & MempoolRelations;
