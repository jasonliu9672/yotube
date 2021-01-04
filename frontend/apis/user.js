import request from '@/utils/request'
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

export function userLogout() {
    return request({
      url: '/user/logout',
      method: 'post',
    })
}