import { get, getModelSchemaRef } from '@loopback/rest'
import { repository } from '@loopback/repository'

import { CyphernodeRepository } from '../repositories'
import { Mempool } from '../models'
export class MempoolController {
  constructor(@repository(CyphernodeRepository) public repository: CyphernodeRepository) { }

  @get('/getMempoolinfo', {
    responses: {
      '200': {
        description: 'Get mempool data',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(Mempool)
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
    const mempoolinfo = await this.repository.getMempoolinfo()
    console.log('mempoolinfo', mempoolinfo)
    return mempoolinfo
  }
}
