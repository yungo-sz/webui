import request from '@/utils/request'

// export function getList(params) {
//   return request({
//     url: '/vue-admin-template/table/list',
//     method: 'get',
//     params
//   })
// }

export function getList(params) {
  return request({
    url: '/yungo/list/imports',
    method: 'get',
    params
  })
}
