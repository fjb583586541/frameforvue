<!-- http://192.168.1.82:8888/#/register?recommendId=19959522028 -->
<template>
  <div class="register-v v-wrap">
    <FHeader></FHeader>
    <div class="v-body" ref="vBody">
      <form>
        <div class="FCell">
          <div class="key iphone"></div>
          <div class="val">
            <input class="input" type="tel" maxlength="11" placeholder="请输入手机号码" v-model.trim="iphone">
            <span class="icon empty" v-show="iphone" @click="iphone = ''"></span>
          </div>
        </div>
        <div class="FCell Msg-code">
          <div class="key msg-code"></div>
          <div class="val">
            <input class="input" type="tel" maxlength="6" placeholder="请输入短信验证码" v-model.trim="msgCode">
            <FMsgCode v-on:FClick="getRegisterCode" ref="FMsgCode"></FMsgCode>
          </div>
        </div>
        <div class="FCell Password">
          <div class="key password"></div>
          <div class="val">
            <input class="input" :type="visualization ? 'text' : 'password'" maxlength="16" placeholder="6-16位字符的密码（数字和字母组成）"
              v-model.trim="password">
            <span :class="['icon', visualization ? 'EO' : 'EC']" @click="visualization = !visualization"></span>
          </div>
        </div>
        <div class="FCell">
          <div class="key referral-code"></div>
          <div class="val">
            <input class="input" type="tel" maxlength="11" placeholder="注册推荐码" v-model.trim="recommendId">
            <span class="icon empty" v-show="recommendId" @click="recommendId = ''"></span>
          </div>
        </div>
        <div class="GVRP">注册即表示同意
          <router-link to="/GVRP">《牛掰旅游服务协议》</router-link>
        </div>
        <div class="do-register">
          <input type="button" value="注册" @click="register">
        </div>
      </form>
    </div>
  </div>
</template>

<script>
  import {
    md5
  } from 'vux'
  import FHeader from '../components/FHeader/FHeader'
  import FMsgCode from '../components/FMsgCode/FMsgCode'
  import weixinShare from '../assets/js/weixinShare'
  export default {
    name: 'register',
    data() {
      return {
        iphone: '',
        msgCode: '',
        password: '',
        visualization: false,
        recommendId: ''
      }
    },
    created() {
      let _this = this

      let recommendId = _this.$route.query.recommendId
        _this.recommendId = recommendId ? recommendId : ''

      if (_this.api.ROOT) {
        _this.iphone = '19959522028'
        _this.password = 'a123123'
      }

      weixinShare.weixinSign({
        url: this.api.wechatSign, // 验签接口
        param: { // 参数
          url: document.location.href
        },
        showLoad: false,
        hideLoad: false,
        custom: { // 自定义分享内容
          title: '牛掰旅游',
          desc: '品质旅游，就上牛掰',
          link: document.location.href,
          imgUrl: 'https://niub-dev.oss-cn-shanghai.aliyuncs.com/logo.png'
        }
      })
    },
    methods: {
      async getRegisterCode() {
        let _this = this,
          $ = _this.$

        if (!$.regTest(_this.iphone, 'iphone')) {
          return
        }
        let res = await $.axiosPost({
          url: _this.api.getRegisterCode,
          param: {
            phone: _this.iphone,
            sign: md5(_this.iphone + 'nb').toUpperCase()
          },
          showLoad: true,
          hideLoad: true
        })
        if (!res) {
          return
        }
        _this.$refs.FMsgCode.secondReduce()
      },
      async register() {
        let _this = this,
          $ = _this.$

        if (!$.regTest(_this.iphone, 'iphone')) {
          return
        }
        if (!$.regTest(_this.msgCode, 'msgCode')) {
          return
        }
        if (!$.regTest(_this.password, 'password')) {
          return
        }

        let res = await $.axiosPost({
          url: _this.api.register,
          param: {
            phone: _this.iphone,
            smsCode: _this.msgCode,
            password: md5(_this.password).toUpperCase(),
            recomCode: _this.recommendId ? _this.recommendId : '18720262936'
          },
          showLoad: true,
          hideLoad: true
        })
        if (!res) {
          return
        }
        _this.$router.push({
          'path': '/downApp'
        })
      }
    },
    components: {
      FHeader,
      FMsgCode
    }
  }
</script>
