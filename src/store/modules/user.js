import { login, logout, getInfo } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import router, { resetRouter } from '@/router'
import axios from 'axios'
const state = {
  token: getToken(),
  name: '',
  avatar: '',
  introduction: '',
  roles: []
}

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_INTRODUCTION: (state, introduction) => {
    state.introduction = introduction
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  SET_ROLES: (state, roles) => {
    state.roles = roles
  }
}

const actions = {
  // user login
 
  login({ commit }, data) {
  	 	var that = this;	
    const { username, password } = data
//  console.log(data)
    var params = new URLSearchParams()
    params.append('username', data.username)
    params.append('password', data.password)
   	return axios.post('http://yaqin.ckun.vip:3002/user/login', params)
	  .then(function(response) {
	  	console.log(response)
	    if (response.data.code == 20000) {
	    		console.log(response)
	    		commit('SET_TOKEN', response.data.data)
        setToken( response.data.data)
//      that.$router.push({ path: '/' })
	    }
	  }).catch(function(error) {
	    console.log(error)
	  })
  },

  // get user info
  getInfo({ commit, state }) {
//  return new Promise((resolve, reject) => {
//    getInfo(state.token).then(response => {
//      const { data } = response
//
//      if (!data) {
//        reject('Verification failed, please Login again.')
//      }
//
//      const { roles, name, avatar, introduction } = data
//
//      // roles must be a non-empty array
//      if (!roles || roles.length <= 0) {
//        reject('getInfo: roles must be a non-null array!')
//      }
//				console.log(data)
        commit('SET_ROLES', ["admin"])
        commit('SET_NAME', "Super Admin")
        commit('SET_AVATAR', 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif')
        commit('SET_INTRODUCTION', "I am a super administrator")
        return {roles:["damin"]}
//      resolve(data)
//    }).catch(error => {
//      reject(error)
//    })
//  })
  },

  // user logout
  logout({ commit, state }) {
//  return new Promise((resolve, reject) => {
//    logout(state.token).then(() => {
        commit('SET_TOKEN', '')
        commit('SET_ROLES', [])
        removeToken()
        resetRouter()
//      resolve()
//    }).catch(error => {
//      reject(error)
//    })
//  })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      commit('SET_TOKEN', '')
      commit('SET_ROLES', [])
      removeToken()
      resolve()
    })
  },

  // Dynamically modify permissions
  changeRoles({ commit, dispatch }, role) {
    return new Promise(async resolve => {
      const token = role + '-token'

      commit('SET_TOKEN', token)
      setToken(token)

      const { roles } = await dispatch('getInfo')

      resetRouter()

      // generate accessible routes map based on roles
      const accessRoutes = await dispatch('permission/generateRoutes', roles, { root: true })

      // dynamically add accessible routes
      router.addRoutes(accessRoutes)

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
