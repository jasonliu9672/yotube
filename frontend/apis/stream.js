import request from '@/utils/request'
export function getStreams() {
    return request({
      url: '/api/streams',
      method: 'get',
    })
}

export function getM3U8(streamId) {
  return request({
    url: `/live/${streamId}/index.m3u8`
  })
}