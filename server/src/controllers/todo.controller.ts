import {
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import { Todo } from '../models';
import { CyphernodeClient } from '../client'

export class TodoController {
  client: any;

  constructor() {
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
