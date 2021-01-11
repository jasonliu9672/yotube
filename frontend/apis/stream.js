import request from '@/utils/request'
export function getStreams() {
    return request({
      url: '/api/streams',
      method: 'get',
    })
}