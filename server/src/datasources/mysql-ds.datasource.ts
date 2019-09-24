import {inject} from '@loopback/core';
import {juggler} from '@loopback/repository';
import * as config from './mysql-ds.datasource.json';

export class MysqlDsDataSource extends juggler.DataSource {
  static dataSourceName = 'mysqlDs';

  constructor(
    @inject('datasources.config.mysqlDs', {optional: true})
    dsConfig: object = config,
  ) {
    super(dsConfig);
  }
}
