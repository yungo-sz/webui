import { login, logout, getInfo } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { resetRouter } from '@/router'

const getDefaultState = () => {
  return {
    token: getToken(),
    name: '',
    avatar: ''
  }
}

const state = getDefaultState()

const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
  },
  SET_TOKEN: (state, token) => {
    console.log('-----设置token')
    console.log(token)
    state.token = token
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  }
}

const actions = {
  // user login
  login({ commit }, userInfo) {
    const { username, password } = userInfo
    return new Promise((resolve, reject) => {
      login({ username: username.trim(), password: password }).then(async response => {
        // const { data } = response
        // console.log("data:",data)
        commit('SET_TOKEN', response.data)
        //
        setToken(response.data)
        console.log('-----cookies 中 token')
        console.log(getToken())
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },
  register({ commit }, userInfo) {
     alert("注册！")
  },

  // get user info  就这里调用了
  getInfo({ commit, state }) {//这个命名 有点奇怪 第一次见  这是刚刚那边调用的方法名称 
    return new Promise((resolve, reject) => {
      getInfo(state.token).then(response => {//这里调用的是  getInfo } from '@/api/user' 这个方法
        const { data } = response

        if (!data) {
          return reject('Verification failed, please Login again.')
        }

        const { name, avatar } = data

        commit('SET_NAME', name)
        commit('SET_AVATAR', avatar)
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // user logout
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      //logout(state.token).then(() => {
        removeToken() // must remove  token  fierst
        resetRouter()
        commit('RESET_STATE')
        resolve()
      //}).catch(error => {
       // reject(error)
      //})
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      removeToken() // must remove  token  first
      commit('RESET_STATE')
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

