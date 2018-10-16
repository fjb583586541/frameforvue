<template>
  <div class="doubt-v v-wrap">
    <FHeader :config="FHeaderCfg"></FHeader>
    <div :class="['v-body', { 'can-ask': $.isAppClient() }]" ref="vBody">
      <div class="load-more-mod" ref="contWrap">
        <div class="item" v-for="item in questionList" v-bind:key="item.id" @click="$router.push('/doubtDetail')">
          <h2>九寨沟地震了，现在还开放吗？还接待散客吗？是否对外开放?</h2>
          <p>
            <span class="adopt">采纳</span>
            <span class="optimum">最佳</span>游客1号：您好，新闻上说，现在只接待团队，暂时不接待散客。并且只开放部分景点，每新闻上说，游客1号：您好，新闻上说，现在只接待团队，暂时不接待散客。并且只开放部分景点，每新闻上说</p>
          <dl>
            <dt>
              <img src="http://niub-dev.oss-cn-shanghai.aliyuncs.com/1535612415754144462.jpg">
              <span>篮球1号</span>
            </dt>
            <dd>
              <span class="consult">
                <em class="icon"></em>36</span>
              <span class="msg">
                <em class="icon"></em>36</span>
            </dd>
          </dl>
        </div>
        <div class="loading" v-show="ajaxing && page > 1">
          <em class="icon"></em>正在加载</div>
        <div class="no-more" v-show="finish">没有更多了~</div>
      </div>
    </div>
    <footer class="ask-on" v-if="$.isAppClient()">
      <div>我要提问</div>
    </footer>
    <FReturnTop :config="FReturnTopCfg"></FReturnTop>
  </div>
</template>

<script>
  import FHeader from '../components/FHeader/FHeader'
  import FReturnTop from '../components/FReturnTop/FReturnTop'
  export default {
    name: 'doubt',
    data() {
      return {
        FHeaderCfg: {
          title: '全部提问'
        },
        FReturnTopCfg: {},

        questionList: [],

        contWrapHeight: 0,

        finish: false, // 判断是否加载结束
        ajaxing: false, // 是否正在加载中
        limit: 10, // 每次加载的数据量
        page: 1, // 页码
        criticalPoint: 200, // 加载临界点 
      }
    },
    created() {
      this.productDetail()
    },
    mounted() {
      this.FReturnTopCfg = this.$refs.vBody
      this.bindScroll()
    },
    methods: {
      async productDetail() {
        let _this = this,
          $ = _this.$,
          load = _this.page == 1

        _this.ajaxing = true

        let res = await $.axiosPost({
          url: _this.api.test2,
          param: {
            page: _this.page
          },
          load: load
        })
        if (!res) {
          _this.ajaxing = false
          return
        }

        let limit = _this.page < 5 ? _this.limit : 5

        let data = []
        for (let i = 0; i < limit; i++) {
          data.push(1)
        }

        _this.handleData(data)
      },
      handleData(data) {
        let _this = this

        if (data.length < _this.limit) {
          _this.finish = true
        }

        _this.questionList = _this.questionList.concat(data)

        _this.$nextTick(function () {
          _this.contWrapHeight = _this.$refs.contWrap.clientHeight
        })

        _this.ajaxing = false
        _this.page++
      },
      bindScroll() {
        let _this = this,
          vBody = _this.$refs.vBody

        vBody.addEventListener('scroll', function () {
          let maxScroll = _this.contWrapHeight - vBody.clientHeight

          if (maxScroll - vBody.scrollTop <= _this.criticalPoint && !_this.ajaxing && !_this.finish) {
            _this.productDetail()
          }
        })
      },
    },
    components: {
      FHeader,
      FReturnTop
    }
  }
</script>