import {DefaultCrudRepository} from '@loopback/repository';
import {Mempool, MempoolRelations} from '../models';
import {MemoryDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class MempoolRepository extends DefaultCrudRepository<
  Mempool,
  typeof Mempool.prototype.id,
  MempoolRelations
> {
  constructor(
    @inject('datasources.memory') dataSource: MemoryDataSource,
  ) {
    super(Mempool, dataSource);
  }

  hola() {
    console.log('hola')
    return true
  }
}
