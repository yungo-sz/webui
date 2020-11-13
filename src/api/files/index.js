import request from '@/utils/request'

export function queryAsk(params) {
  return request({
    url: '/yungo/queryask',
    method: 'get',
    params
  })
}
