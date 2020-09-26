import Vue from 'vue'
import Vuex from 'vuex'
import {signIn} from '@/utils/network/user'
import {setToken} from '@/utils/cookie'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token:undefined,
    userInfo:{
      userName:"",
      userNickName:"sign in",
      userPhoneNumber: '',
    }
  },
  mutations: {
    SET_USERINFO(state, payload){
      Vue.set(state.userInfo, "userName", payload.userName);
      Vue.set(state.userInfo, "userNickName", payload.userNickName);
    },
    SET_NICK_NAME(state, newNickName){
      // 注意这样不是响应式的
      // state.userInfo.userNickName = newNickName;
      Vue.set(state.userInfo, "userNickName", newNickName)
      console.log("store里面放置新的nickName完成",state.userInfo.userNickName);
    },
    SET_USERNAME(state, userName){
      Vue.set(state.userInfo, "userName", userName)
    },
    SET_USERPHONENUMBER(state, phoneNumber){
      Vue.set(state, "userPhoneNumber", phoneNumber)
    },
    SIGN_OUT(){
      this.commit("SET_NICK_NAME", "sign in")
    },
    SET_TOKEN(state, token){
      Vue.set(state, 'token', token)
    }
  },
  getters:{
    getTokenFromVuex:(state)=>{
      return state.token;
    },
    getUserInfo(state){
      return state.userInfo;
    },
  },
  actions: {
    signIn(context, payload){
      let userName = payload.userName.trim()
      let password = payload.password
      let captcha = payload.captcha
      let captchaId = payload.captchaId
      return new Promise((resolve, reject) => {
        signIn(userName, password, captcha, captchaId).then(res=>{
          console.log("vuex里面收到的响应",res)
          /*
          这里需要做三个事：
            1.向cookie里面设置token
            2.向vuex里面设置token
            3.向vuex里面设置userinfo字段
           */
          let token = res.token
          setToken(token)
          this.commit("SET_TOKEN", token)

          this.commit("SET_NICK_NAME",res.user.userNickName)
          this.commit("SET_USERNAME", res.user.userName)
          this.commit("SET_USERPHONENUMBER", res.user.PhoneNumber)

          resolve(res)
        }).catch(error=>{
          reject(error)
        })
      })
    }
  },
  modules: {
  }
})
