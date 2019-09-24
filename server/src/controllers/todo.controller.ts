import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getFilterSchemaFor,
  getModelSchemaRef,
  getWhereSchemaFor,
  patch,
  put,
  del,
  requestBody,
} from '@loopback/rest';
import {Todo} from '../models';
import {TodoRepository} from '../repositories';
import { CyphernodeClient } from '../client'

export class TodoController {
  client: any;

  constructor(
    @repository(TodoRepository)
    public todoRepository : TodoRepository,
  ) {
    this.client = new CyphernodeClient()
  }

  @get('/getMempoolinfo', {
    responses: {
      '200': {
        description: 'Get mempool data',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(Todo)
              // $ref: '#/components/schemas/MempoolInfo'
            }
          },
        },
      },
      '403': {
        description: '403!!!!',
        content: {
          'application/json': {
            schema: {
              /* type: 'array',
              items: getModelSchemaRef(Todo), */
              // $ref: '#/components/schemas/ApiResponseNotAllowed'
            }
          },
        },
      },
      '404': {
        // $ref: '#/components/schemas/ApiResponseNotFound'
      },
      '503': {
          description: 'Resource temporarily unavailable',
          content: {
            'application/json': {
              // schema: { $ref: '#/components/schemas/ApiResponseTemporarilyUnavailable' }
            }
          }
      }
    },
  })
  async getMempoolinfo(): Promise<any> {
    const mempoolinfo = await this.client.getMempoolinfo()
    console.log('mempoolinfo', mempoolinfo)
    return mempoolinfo
  }
}
