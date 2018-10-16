<!-- http://192.168.1.82:8888/#/lineDetails?productCode=cp94417232 -->
<template>
  <div class="lineDetails-v v-wrap">
    <FHeader></FHeader>
    <div class="v-body" ref="vBody" v-show="!initAjax">
      <!-- 轮播 -->
      <div class="banner">
        <swiper class="FSwiper" :options="swiperOption" ref="swiper">
          <swiper-slide v-for="slide in swiperSlides" v-bind:key="slide.id">
            <img :src="api.OSSPATH + slide.imgUrl" :alt="slide.imgName">
          </swiper-slide>
        </swiper>
        <div class="des-wrap">
          <div class="des">
            <div class="left-side">
              <span class="departure">{{ startCity }}</span>
              <span class="supplier">{{ supplierName }}</span>
            </div>
            <div class="right-side">
              <div class="swiper-index" @click="slideClicked">{{ swiperIndex + 1 }} / {{ swiperSlides.length }}
                <em class="icon"></em>
              </div>
              <div class="number">编号：{{ productCode }}</div>
            </div>
          </div>
        </div>
      </div>
      <!-- 简介 -->
      <div class="synopsis">
        <h2>{{ sellerProductName }}</h2>
        <div class="price">
          <em>&yen;</em>{{ sellPrice / 100 }}<strong>起/人</strong>
        </div>
        <ul class="tips clearfix" v-if="!$.isEmptyArr(productLable)">
          <li class="vux-1px" v-for="item in productLable" v-bind:key="item.id">{{ item }}</li>
        </ul>
      </div>
      <!-- 折扣 -->
      <div class="discount">
        <div class="activity cell" v-if="!$.isEmptyArr(activityLists)">
          <div class="key">优惠活动</div>
          <ul class="val clearfix" @click="getActivity">
            <li v-for="item in activityLists.slice(0, 2)" v-bind:key="item.id">{{ item.label }}</li>
          </ul>
          <div class="more" @click="getActivity">{{ activityLists.length }}个
            <em class="icon"></em>
          </div>
        </div>

        <div class="ticket cell" v-if="!$.isEmptyArr(couponLists)">
          <div class="key">领券活动</div>
          <ul class="val clearfix" @click="getCoupon">
            <li v-for="item in couponLists.slice(0, 3)" v-bind:key="item.id">{{ item.amount }}元</li>
          </ul>
          <div class="more" @click="getCoupon">{{ couponLists.length }}个
            <em class="icon"></em>
          </div>
        </div>

      </div>
      <!-- 点评 -->
      <div class="evaluate" v-if="false">
        <div class="fraction">
          <div class="score">4.9
            <strong>/5</strong>
          </div>
          <ul class="clearfix">
            <li>
              <div class="key">导游讲解</div>
              <div class="val">
                <FProportion :config=".8"></FProportion>
                <span>4</span>
              </div>
            </li>
            <li>
              <div class="key">行程安排</div>
              <div class="val">
                <FProportion :config="0.8"></FProportion>
                <span>4</span>
              </div>
            </li>
            <li>
              <div class="key">描述相符</div>
              <div class="val">
                <FProportion :config="0.98"></FProportion>
                <span>4.9</span>
              </div>
            </li>
            <li>
              <div class="key">好评率</div>
              <div class="val">
                <FProportion :config="0.6"></FProportion>
                <span>60%</span>
              </div>
            </li>
          </ul>
          <div class="comment">
            <dl>
              <dt>
                <img src="../assets/images/default_header.jpg" alt="">
              </dt>
              <dd>七匹狼</dd>
            </dl>
            <p>他在这里评论了一大堆内容，具体是啥也说不清楚，就是说这个产品怎么怎么好玩，玩的怎么怎么开心，导就是说这个产品怎么怎么好玩就是说这个产品怎么怎么好玩就是说这个产品怎么怎么好玩</p>
            <div class="more-comment">
              <router-link to="/comment">查看全部点评
                <em class="icon"></em>
              </router-link>
            </div>
          </div>
        </div>
      </div>
      <!-- 问答 -->
      <div class="doubt" v-if="false">
        <div class="column-name">大家都在问</div>
        <ul>
          <li>
            <em class="icon">问</em>
            <p>这里反正就这么点位置，显示不完的这里反正就这么点位置，显示不完的</p>
            <span class="number">200个回答</span>
          </li>
          <li>
            <em class="icon">问</em>
            <p>这里反正就这么点位置，显示不完的这里反正就这么点位置，显示不完的</p>
            <span class="number">200个回答</span>
          </li>
        </ul>
        <div class="more-doubt">
          <router-link to="/doubt">查看全部提问
            <em class="icon"></em>
          </router-link>
        </div>
      </div>
      <!-- 班期 -->
      <div class="schedule">
        <div class="place">
          <span class="area"><em class="icon"></em>{{ startCity }}出发</span>
          <span v-if="!$.isEmptyArr(joinTransportList)" class="more" @click="moreDeparture">更多出发地<em class="icon"></em></span>
        </div>
        <div class="schedule-wrap">
          <div class="list">
            <ul class="clearfix">
              <li class="vux-1px" v-for="item in productPriceStockVoList.slice(0, 7)" v-bind:key="item.id">
                <div class="day">{{ item.state }} {{ item.week }}</div>
                <div class="price">&yen;{{ item.aPrice }}</div>
              </li>
            </ul>
          </div>
          <div class="more-schedule" @click="jumpSchedule">
            <span>更多班期</span>
          </div>
        </div>
      </div>
      <!-- 悬浮导航 -->
      <ul :class="['tab-navs vux-1px-b', { 'suspension': suspension }]" ref="tabNavs">
        <li :class="{ 'on': index == tabNavsActiveIndex }" v-for="(list, index) in tabNavsList" v-bind:key="list.id"
          @click="jumpToAnchor(index)">{{ list }}</li>
      </ul>
      <!-- 导航占位符 -->
      <div class="tab-navs-placehoder" v-show="suspension"></div>
      <!-- 产品经理推荐 -->
      <div class="pdt-feature" ref="pdtFeature">
        <div class="nominate">
          <div class="tit">产品经理推荐</div>
          <ul>
            <li>
              <em>&nbsp;</em><a :href="productFeatures.urlOne" v-if="productFeatures.urlOne">{{
                productFeatures.reasonOne }}</a><span v-else>{{ productFeatures.reasonOne }}</span>
            </li>
            <li v-if="productFeatures.reasonTwo">
              <em>&nbsp;</em><a :href="productFeatures.urlTwo" v-if="productFeatures.urlTwo">{{
                productFeatures.reasonTwo }}</a><span v-else>{{ productFeatures.reasonTwo }}</span>
            </li>
            <li v-if="productFeatures.reasonThree">
              <em>&nbsp;</em><a :href="productFeatures.urlThree" v-if="productFeatures.urlThree">{{
                productFeatures.reasonThree }}</a><span v-else>{{ productFeatures.reasonThree }}</span>
            </li>
          </ul>
        </div>
        <div class="feature" v-if="productFeatures.recommendDes">
          <div class="tit">产品特色</div>
          <div class="html" v-html="productFeatures.recommendDes"></div>
        </div>
      </div>
      <!-- 行程安排 -->
      <div class="pdt-trip" ref="pdtTrip">
        <div class="tit">行程安排</div>
        <div class="html" v-html="tripIntroduce.tripContent"></div>
      </div>
      <!-- 费用说明 -->
      <div class="pdt-cost" ref="pdtCost">
        <div class="tit">费用说明</div>
        <div class="column-name" v-if="!$.isEmptyArr(costDesVo.costInclude)">费用包含</div>
        <ul v-if="!$.isEmptyArr(costDesVo.costInclude)">
          <li v-for="item in costDesVo.costInclude" v-bind:key="item.id">
            <em></em>
            <div class="name">{{ item.title }}</div>
            <div class="cont" v-html="item.content"></div>
          </li>
        </ul>
        <div class="column-name" v-if="!$.isEmptyArr(costDesVo.selfCost)">自理费用</div>
        <ul v-if="!$.isEmptyArr(costDesVo.selfCost)">
          <li v-for="item in costDesVo.selfCost" v-bind:key="item.id">
            <em></em>
            <div class="name">{{ item.title }}</div>
            <div class="cont" v-html="item.content"></div>
          </li>
        </ul>
      </div>
      <!-- 签证须知 -->
      <ul class="pdt-book-notice" ref="pdtBookNotice">
        <li @click="jumpVisaNotes" v-if="!$.isEmptyArr(visaNotes)">
          <span>签证须知</span>
          <em class="icon"></em>
        </li>
        <li @click="jumpBookNotes">
          <span>预订须知</span>
          <em class="icon"></em>
        </li>
        <li @click="jumpBuyNotes">
          <span>购买须知</span>
          <em class="icon"></em>
        </li>
      </ul>
      <!-- 其他模块占位符 -->
      <div class="mod-placehoder" ref="modPlace"></div>
      <!-- 更多产品推荐 -->
      <div class="recommend" v-if="false">
        <div class="column-name">更多产品推荐</div>
        <ul class="clearfix">
          <li>
            <img src="https://ss0.bdstatic.com/-0U0bnSm1A5BphGlnYG/tam-ogel/dfb94e0cf16e81f68a5c48f4dc55dbae_259_146.jpg"
              alt="">
            <div class="title">的说法萨法撒仿盛大飞的说的说法萨法撒仿的说法萨法撒仿盛大飞的说法速度方式盛大飞的说法速度方式法速度方式</div>
            <div class="price">&yen;
              <em>8888</em>
              <strong>起/人</strong>
            </div>
          </li>
          <li>
            <img src="https://ss0.bdstatic.com/-0U0bnSm1A5BphGlnYG/tam-ogel/dfb94e0cf16e81f68a5c48f4dc55dbae_259_146.jpg"
              alt="">
            <div class="title">的说法萨法撒仿盛大飞的说的说法萨法撒仿的说法萨法撒仿盛大飞的说法速度方式盛大飞的说法速度方式法速度方式</div>
            <div class="price">&yen;
              <em>8888</em>
              <strong>起/人</strong>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <footer class="vux-1px-t" v-if="!initAjax">
      <div class="tool">
        <div v-if="$.isAppClient()" class="kf" @click="serviceAS = true">
          <em class="icon"></em>
          <span>在线客服</span>
        </div>
        <div v-else class="kf">
          <a href="Tel:020-85829620"><em class="icon"></em><span>在线客服</span></a>
        </div>
        <div class="collect" v-if="$.isAppClient() && false" @click="changeCollect">
          <em class="icon"></em>
          <span>收藏</span>
        </div>
      </div>
      <input type="button" value="开始预订" @click="jumpSchedule">
    </footer>

    <actionsheet v-model="serviceAS" :menus="serviceAsMenus" @on-click-menu="chooseServiceType" show-cancel></actionsheet>
    <FReturnTop :config="FReturnTopCfg"></FReturnTop>
  </div>
</template>

<script>
  import {
    Actionsheet
  } from 'vux'
  import {
    AlertModule,
    Alert
  } from 'vux'
  import FHeader from '../components/FHeader/FHeader'
  import FProportion from '../components/FProportion/FProportion'
  import FReturnTop from '../components/FReturnTop/FReturnTop'
  import weixinShare from '../assets/js/weixinShare'
  export default {
    name: 'lineDetails',
    data() {
      return {
        initAjax: true,

        FReturnTopCfg: {},

        activityCfg: {
          state: false,
          items: []
        },

        swiperOption: {
          pagination: {
            el: '.swiper-pagination'
          },
          autoplay: {
            disableOnInteraction: false,
          },
          on: {
            slideChangeTransitionStart: this.slideChange,
            click: this.slideClicked
          }
        },
        swiperSlides: [],
        swiperIndex: 0,

        activityLists: [],
        couponLists: [],


        suspension: false,
        tabNavsList: ['产品特色', '行程安排', '费用说明', '预订须知'],
        tabNavsActiveIndex: 0,

        startCity: '',
        supplierName: '',
        productCode: '',
        sellerProductName: '',
        sellPrice: '',
        productLable: '',
        productPriceStockVoList: [],
        productFeatures: [],
        tripIntroduce: '',
        costDesVo: '',

        visaNotes: [],
        bookNotes: [],
        buyNotes: [],

        joinTransportList: [],



        serviceAS: false,
        serviceAsMenus: {
          F: '<a href="Tel:020-85829620">语音通话</a>',
          S: '在线客服'
        }
      }
    },
    computed: {
      swiper() {
        return this.$refs.swiper.swiper
      }
    },
    created() {
      let _this = this
      _this.$.stClear()

      let recommendId = _this.$route.query.recommendId
      _this.$.stSet({
        'recommendId': recommendId ? recommendId : '18720262936'
      })

      _this.productCode = _this.$route.query.productCode
      if (!_this.productCode) {
        _this.$router.push('/routerLost')
        return
      }
      _this.$.stSet({
        'productCode': _this.productCode
      })

      _this.appGiveLoginSession()
    },
    activated() {
      this.$.stRemove('album')
      this.$.stRemove('activity')

      this.$.stRemove('visa')
      this.$.stRemove('book')
      this.$.stRemove('buy')
      
      this.$.stRemove('departure')

      let startCity = this.$.stGet('startCity')
      if (startCity) {
        this.startCity = startCity.startCityName
        this.$.stRemove('startCity')
      }
    },
    mounted() {
      this.swiper.autoplay.stop()
      this.FReturnTopCfg = this.$refs.vBody
    },
    methods: {
      // app给登录信息
      appGiveLoginSession() {
        let _this = this

        if (!_this.$.isAppClient()) {
          _this.detail()
          return
        }
        // app客户端要先获取下登录信息
        window.callMethod = function (token, loginName) {
          if (token && loginName) {
            _this.$.stSet({
              'loginSession': {
                token: token,
                loginName: loginName
              }
            })
          }
        }
        _this.detail()
      },
      // 获取产品详情
      async detail() {
        let _this = this,
          $ = _this.$

        let param = {
          productCode: _this.productCode
        }

        let res = await $.axiosPost({
          url: _this.api.detail,
          param: param,
          showLoad: true,
          hideLoad: false
        })
        if (!res) {
          return
        }
        let data = res.data

        _this.swiperSlides = data.productImgVoList
        _this.startCity = data.startCity
        _this.supplierName = data.supplierName

        _this.sellerProductName = data.sellerProductName
        _this.sellPrice = data.sellPrice
        _this.productLable = data.productLable

        // 班期
        data.productPriceStockVoList.forEach(function (list) {
          Object.assign(list, {
            aPrice: list.adultSellPrice / 100,
            cPrice: list.childrenSellPrice / 100,
            week: '周' + _this.$.getWeek(list.sellDate),
            state: _this.$.formatDay(list.sellDate, '/').substring(5)
          })
          _this.productPriceStockVoList.push(list)
        })

        _this.productFeatures = data.productFeatures
        _this.tripIntroduce = data.tripIntroduce
        _this.costDesVo = data.costDesVo
        _this.visaNotes = data.visa
        _this.bookNotes = data.reserve
        _this.buyNotes = data.buy

        _this.joinTransportList = data.joinTransportList

        _this.getProductDiscount()
      },
      // 获取活动数据
      async getProductDiscount() {
        let _this = this,
          $ = _this.$

        let res = await $.axiosPost({
          'url': _this.api.getProductDiscount,
          'param': {
            productCode: _this.$.stGet('productCode'),
            isLogin: 0
          },
          'showLoad': false,
          'hideLoad': true
        })
        if (!res) {
          return
        }

        // 优惠
        res.data.activity.forEach(function (item) {
          switch (item.discountAction) {
            case 1:
              item.label = '立减优惠'
              break
            case 2:
              item.label = '随机最大可减优惠'
              break
            case 3:
              item.label = '特价优惠'
              break
            case 4:
              item.label = '折扣优惠'
              break
            case 5:
              item.label = '赠送优惠'
              break
          }
          _this.activityLists.push(item)
        })
        // 领券
        res.data.coupon.forEach(function (item) {
          item.amount = item.amount / 100
          _this.couponLists.push(item)
        })

        _this.initAjax = false
        _this.$nextTick(function () {
          setTimeout(function () {
            _this.swiper.autoplay.start()
            _this.addScrollEvent()
          }, 166)
        })

        // 微信分享
        weixinShare.weixinSign({
          url: _this.api.wechatSign, // 验签接口
          param: { // 参数
            url: document.location.href
          },
          showLoad: false,
          hideLoad: false,
          custom: { // 自定义分享内容
            title: _this.sellerProductName,
            desc: '品质旅游，就上牛掰',
            link: document.location.href,
            imgUrl: 'https://niub-dev.oss-cn-shanghai.aliyuncs.com/logo.png'
          }
        })
      },
      // 修改slide的索引值
      slideChange() {
        this.swiperIndex = this.swiper.activeIndex
      },
      // 跳转至图册页
      slideClicked() {
        if (this.$.isEmptyArr(this.swiperSlides)) {
          return
        }
        this.$.stSet({
          'album': this.swiperSlides
        })
        this.$router.push({
          path: '/album'
        })
      },
      // 增加滚动事件
      addScrollEvent() {
        let _this = this,
          refs = _this.$refs

        let tabNavsOffsetTop = refs.tabNavs.offsetTop,
          tabNavsClientHeight = refs.tabNavs.clientHeight,
          pdtFeatureOffsetTop = refs.pdtFeature.offsetTop - tabNavsClientHeight,
          pdtTripOffsetTop = refs.pdtTrip.offsetTop - tabNavsClientHeight,
          pdtCostOffsetTop = refs.pdtCost.offsetTop - tabNavsClientHeight,
          pdtBookNoticeOffsetTop = refs.pdtBookNotice.offsetTop - tabNavsClientHeight,
          modPlaceOffsetTop = refs.modPlace.offsetTop - tabNavsClientHeight

        refs.vBody.addEventListener('scroll', function () {
          let bodyScrollTop = refs.vBody.scrollTop
          if (bodyScrollTop >= tabNavsOffsetTop) {
            _this.suspension = bodyScrollTop < modPlaceOffsetTop
          } else {
            _this.suspension = false
          }
          if (_this.suspension) {
            if (bodyScrollTop >= pdtFeatureOffsetTop && bodyScrollTop < pdtTripOffsetTop) {
              _this.tabNavsActiveIndex = 0
            }
            if (bodyScrollTop >= pdtTripOffsetTop && bodyScrollTop < pdtCostOffsetTop) {
              _this.tabNavsActiveIndex = 1
            }
            if (bodyScrollTop >= pdtCostOffsetTop && bodyScrollTop < pdtBookNoticeOffsetTop) {
              _this.tabNavsActiveIndex = 2
            }
            if (bodyScrollTop >= pdtBookNoticeOffsetTop && bodyScrollTop < modPlaceOffsetTop) {
              _this.tabNavsActiveIndex = 3
            }
          }
        })
      },
      // 跳转至滚动指定区域
      jumpToAnchor(i) {
        let _this = this,
          refs = _this.$refs,
          target

        if (i == _this.tabNavsActiveIndex) {
          return
        }

        let tabNavsClientHeight = refs.tabNavs.clientHeight,
          pdtFeatureOffsetTop = refs.pdtFeature.offsetTop - tabNavsClientHeight,
          pdtTripOffsetTop = refs.pdtTrip.offsetTop - tabNavsClientHeight,
          pdtCostOffsetTop = refs.pdtCost.offsetTop - tabNavsClientHeight,
          pdtBookNoticeOffsetTop = refs.pdtBookNotice.offsetTop - tabNavsClientHeight

        switch (i) {
          case 0:
            target = pdtFeatureOffsetTop
            break
          case 1:
            target = pdtTripOffsetTop
            break
          case 2:
            target = pdtCostOffsetTop
            break
          case 3:
            target = pdtBookNoticeOffsetTop
            break
        }
        refs.vBody.scrollTop = target + 1
        _this.tabNavsActiveIndex = i
      },
      // 获取优惠券
      getCoupon() {
        this.$router.push('/coupon')
      },
      // 获取优惠活动
      getActivity() {
        let _this = this

        _this.$.stSet({
          'activity': _this.activityLists
        })
        _this.$router.push('/activity')
      },
      // 更多出发地
      moreDeparture() {
        let _this = this

        _this.$.stSet({
          'departure': _this.joinTransportList
        })
        _this.$router.push('/departure')
      },
      // 页面跳转至签证须知
      jumpVisaNotes() {
        this.$.stSet({
          'visa': this.visaNotes
        })
        this.$router.push('/visaNotes')
      },
      // 页面跳转至预订须知
      jumpBookNotes() {
        this.$.stSet({
          'book': this.bookNotes
        })
        this.$router.push('/bookNotes')
      },
      // 页面跳转至购买须知
      jumpBuyNotes() {
        this.$.stSet({
          'buy': this.buyNotes
        })
        this.$router.push('/buyNotes')
      },
      // 跳转至班期页
      jumpSchedule() {
        let _this = this
        AlertModule.show({
          content: '敬请期待'
        })
        return

        _this.$router.push('/schedule')
      },
      // 选择客服方式
      chooseServiceType(type) {
        if (type == 'S') {
          // 召唤在线客服
          this.$.mutualToApp({
            project: 'nb',
            password: 'connetService',
            param: {}
          })
        }
      },
      // 收藏、暂停开发
      changeCollect() {

      },
    },
    components: {
      Actionsheet,
      FHeader,
      FProportion,
      FReturnTop
    }
  }
</script>