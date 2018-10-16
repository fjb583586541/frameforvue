<template>
  <div class="coupon-v v-wrap">
    <FHeader></FHeader>
    <div class="v-body" ref="vBody" v-show="!initAjax">
      <div :class="['FScrollMore', { 'app-client': $.isAppClient() }]" ref="scrollWrap">
        <ul class="lists" ref="lists">
          <li v-for="(item, index) in lists" v-bind:key="item.id">
            <dl>
              <dd>
                <div class="money">
                  <span class="price"><var>&yen;</var>{{ item.amount }}</span>
                  <span class="condition">{{ item.limit }}</span>
                </div>
                <div class="term-validity">有效期：{{ item.templateStartTime }}-{{ item.templateEndTime }}</div>
                <div class="rule" @click="showRule(index)">规则说明<em class="icon"></em></div>
              </dd>
              <dt :class="{ 'disabled': item.isReceive }" @click="readyGetTickt(index)">{{ !item.isReceive ? '领取' : '已领取' }}</dt>
            </dl>
          </li>
        </ul>
        <div class="loading" v-show="requesting && page > 1">
          <em class="icon"></em>正在加载
        </div>
        <div class="no-more" v-show="finish">没有更多了~</div>
      </div>

      <ul class="navs" v-if="$.isAppClient()" v-show="!initAjax">
        <li @click="toMyTickets">我的优惠券</li>
        <li @click="moreTickets">更多优惠券</li>
      </ul>

    </div>
    <FReturnTop :config="FReturnTopCfg"></FReturnTop>
    <div v-transfer-dom>
      <x-dialog v-model="ruleDialog" hide-on-blur>
        <div class="rule-wrap">
          <div class="tit vux-1px-b">规则说明</div>
          <p>{{ ruleText }}</p>
          <div class="close vux-1px-t" @click="ruleDialog = false">我知道了</div>
        </div>
      </x-dialog>
    </div>
    <FFastLogin v-on:res="loginSuc" ref="FFastLogin"></FFastLogin>
  </div>
</template>

<script>
  import {
    XDialog,
    TransferDomDirective as TransferDom
  } from 'vux'
  import FHeader from '../components/FHeader/FHeader'
  import FReturnTop from '../components/FReturnTop/FReturnTop'
  import FFastLogin from '../components/FFastLogin/FFastLogin'
  export default {
    name: 'coupon',
    directives: {
      TransferDom
    },
    data() {
      return {
        initAjax: true,

        FReturnTopCfg: {},

        scrollWrapHeight: 0,
        listsHeight: 0,

        lists: [],
        requesting: false,
        page: 1,
        finish: false,
        distance: 50,
        limit: 20,


        ruleDialog: false,
        ruleText: ''
      }
    },
    created() {
      let _this = this
      
      _this.getProductDiscount()
    },
    mounted() {
      let _this = this

      _this.FReturnTopCfg = _this.$refs.scrollWrap
      _this.scrollWrapHeight = _this.$refs.scrollWrap.clientHeight

      // _this.bindScroll()
    },
    methods: {
      // 获取活动数据
      async getProductDiscount() {
        let _this = this,
          $ = _this.$

        let param = {
          productCode: _this.$.stGet('productCode')
        }

        let loginSession = _this.$.stGet('loginSession')
        Object.assign(param, {
          'isLogin': loginSession && loginSession.token ? 1 : 0
        })
        if (loginSession && loginSession.token) {
          Object.assign(param, {
            'loginName': loginSession.loginName
          })
        }

        let res = await $.axiosPost({
          'url': _this.api.getProductDiscount,
          'param': param,
          'showLoad': true,
          'hideLoad': true
        })
        if (!res) {
          return
        }
        _this.lists = []

        res.data.coupon.forEach(function (item) {
          item.amount = item.amount / 100
          if (item.limitType == 1) {
            item.limitAmount = item.limitAmount / 100
            item.limit = '满' + item.limitAmount + '元立减' + item.amount + '元'
          } else {
            item.limit = '无限制'
          }
          _this.lists.push(item)
        })

        _this.initAjax = false
      },
      // 展示规则
      showRule(index) {
        let _this = this
        _this.ruleText = _this.lists[index].couponReceiveRemark
        _this.ruleDialog = true
      },
      // 准备获取优惠券
      readyGetTickt(index) {
        let _this = this
        
        // 判断登录状态
        let loginSession = _this.$.stGet('loginSession')
        
        if (!loginSession || !loginSession.token) {
          _this.$refs.FFastLogin.showMod()
          return
        }

        // 已领取的话back
        if (_this.lists[index].isReceive) {
          return
        }

        _this.receiveCoupon(index)
      },
      // 发请求领取优惠券
      async receiveCoupon(index) {
        let _this = this,
          $ = _this.$

        let param = {
          discountId: _this.lists[index].id
        }

        let loginSession = _this.$.stGet('loginSession')
        Object.assign(param, {
          'token': loginSession.token
        })

        let res = await $.axiosPost({
          'url': _this.api.receiveCoupon,
          'param': param,
          'showLoad': true,
          'hideLoad': true
        })
        if (!res) {
          return
        }
        _this.lists[index].isReceive = 1 // 更改成已领取的标识
      },
      // 登录成功
      loginSuc(res) {
        this.getProductDiscount()
      },
      // 我的优惠券
      toMyTickets() {
        this.$.mutualToApp({ project: 'nb', password: 'myTickets', param: {}})
      },
      // 更多优惠券
      moreTickets() {
        this.$.mutualToApp({ project: 'nb', password: 'moreTickets', param: {}})
      }
      // 无线加载更多（暂不开发）
      // async test() {
      //   let _this = this,
      //     load = _this.page == 1 ? true : false

      //   _this.requesting = true

      //   let res = await _this.$.axiosPost({
      //     url: _this.api.test,
      //     param: {
      //       token: _this.page,
      //       discountId: 'cp94417232'
      //     },
      //     load: load
      //   })
      //   if (!res) {
      //     _this.requesting = false
      //     return
      //   }

      //   // !!!测试数据
      //   let limit = _this.page < 5 ? _this.limit : 3
      //   let data = []
      //   for (let i = 0; i < limit; i++) {
      //     data.push(1)
      //   }

      //   // 更新数据
      //   ++_this.page
      //   _this.finish = data.length < _this.limit

      //   _this.lists = _this.lists.concat(data)


      //   setTimeout(function () {
      //     _this.$nextTick(function () {
      //       _this.listsHeight = _this.$refs.lists.clientHeight
      //     })
      //     _this.requesting = false
      //   }, 0)
      // },
      // bindScroll() {
      //   let _this = this,
      //     scrollWrap = _this.$refs.scrollWrap

      //   scrollWrap.addEventListener('scroll', function () {
      //     if (_this.listsHeight - _this.scrollWrapHeight - scrollWrap.scrollTop <= _this.distance && !_this.requesting &&
      //       !_this.finish) {
      //       _this.test()
      //     }
      //   })
      // },
      
    },
    components: {
      FHeader,
      FReturnTop,
      XDialog,
      FFastLogin
    }
  }
</script>

<style scoped lang="less">
  .rule-wrap {

    // width: 6rem;
    .tit {
      font-size: .36rem;
      color: #03b68f;
      line-height: 1rem;
      text-align: center;

      &:after {
        border-color: #03b68f;
      }
    }

    p {
      padding: .3rem .24rem;
      line-height: .46rem;
      font-size: .3rem;
      color: #202020;
      text-align: left;
    }

    .close {
      color: #202020;
      font-size: .32rem;
      line-height: 1rem;
      text-align: center;
    }
  }
</style>