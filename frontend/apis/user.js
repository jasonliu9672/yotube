import request from '@/utils/authRequest'
export function userLogin(username,password) {
    return request({
      url: '/user/login',
      method: 'post',
      data: {
          username: username,
          password: password
      },
    })
}

export function userRegister(newUser) {
    return request({
      url: `/user/register`,
      method: 'post',
      data: newUser
    });
}

export function getAllUsers() {
    return request({
      url: '/user/list',
      method: 'get',
    })
}

export function getUser(username) {
  return request({
    url: `/user/${username}`,
    method: 'get'
  })
}

export function userLogout() {
    return request({
      url: '/user/logout',
      method: 'post',
    })
}

export function getStreamId(id) {
  return request({
    url: `/user/getStreamId/${id}`,
    method: 'get',
  })
}

export function streamIdToUser(streamIds) {
  return request({
    url: '/user/streamIdToUser',
    method: 'post',
    data: streamIds
  })
}