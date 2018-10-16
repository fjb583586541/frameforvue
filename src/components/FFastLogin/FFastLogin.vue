<template>
  <div v-transfer-dom>
    <x-dialog v-model="state" hide-on-blur>
      <div class="login-wrap FFastLogin">
        <div class="login-form">
          <div class="FCell">
            <div class="key login-iphone"></div>
            <div class="val">
              <input class="input" type="tel" maxlength="11" placeholder="请输入手机号码" v-model.trim="loginIphone">
              <span class="icon empty" v-show="loginIphone" @click="loginIphone = ''"></span>
            </div>
          </div>
          <div class="FCell Msg-code">
            <div class="key msg-code"></div>
            <div class="val">
              <input class="input code" type="tel" maxlength="6" placeholder="请输入短信验证码" v-model.trim="loginMsgCode">
              <FMsgCode v-on:FClick="fastInCode" ref="FMsgCode"></FMsgCode>
            </div>
          </div>
          
        </div>
        <div class="login" @click="fastIn">登录·尊享服务</div>
        <p class="des">提示：登录即表示同意<span @click="seeGVRP">《牛掰旅游服务协议》</span></p>
      </div>
    </x-dialog>
  </div>
</template>

<script>
  import {
    XDialog,
    md5,
    TransferDomDirective as TransferDom
  } from 'vux'
  import FMsgCode from '../FMsgCode/FMsgCode'
  export default {
    directives: {
      TransferDom
    },
    data() {
      return {
        state: false,
        loginIphone: '',
        loginMsgCode: ''
      }
    },
    methods: {
      // 发送验证码
      async fastInCode() {
        let _this = this,
          $ = _this.$

        if (!$.regTest(_this.loginIphone, 'iphone')) {
          return
        }
        let res = await $.axiosPost({
          url: _this.api.fastInCode,
          param: {
            phone: _this.loginIphone,
            sign: md5(_this.loginIphone + 'nb').toUpperCase()
          },
          showLoad: true,
          hideLoad: true
        })
        if (!res) {
          return
        }
        _this.$refs.FMsgCode.secondReduce()
      },
      // 快速登录
      async fastIn() {
        let _this = this,
          $ = _this.$

        if (!$.regTest(_this.loginIphone, 'iphone')) {
          return
        }
        if (!$.regTest(_this.loginMsgCode, 'msgCode')) {
          return
        }

        let res = await $.axiosPost({
          url: _this.api.fastIn,
          param: {
            phone: _this.loginIphone,
            messageCode: _this.loginMsgCode,
            recommendId: _this.$.stGet('recommendId')
          },
          showLoad: true,
          hideLoad: true
        })
        if (!res) {
          return
        }

        _this.$.stSet({
          'loginSession': {
            token: res.token,
            loginName: res.loginName
          }
        })

        // 发送登录Session信息给app
        if (_this.$.isAppClient()) {
          _this.$.mutualToApp({
            'project': 'nb',
            'password': 'loginSession',
            'param': res
          })
        }

        _this.$.sToast('登录成功', 'success')
        _this.hideMod()
        _this.$emit('res', res)
      },
      // 查看注册协议
      seeGVRP() {
        let _this = this

        _this.hideMod()
        _this.$router.push('/GVRP')
      },
      // 展示模块
      showMod() {
        this.state = true
      },
      // 隐藏模块
      hideMod() {
        this.state = false
      }
    },
    components: {
      XDialog,
      FMsgCode
    }
  }
</script>
