<template>
  <div class="album-v v-wrap">
    <FHeader></FHeader>
    <div class="v-body" ref="vBody">
      <ul class="clearfix">
        <li v-for="(list, index) in thumbnails" v-bind:key="list.id" @click="show(index)">
          <img class="previewer-demo-img" :src="list.msrc">
        </li>
      </ul>
      <div v-transfer-dom>
        <previewer :list="thumbnails" ref="previewer" :options="options" @on-index-change="logIndexChange" @on-close="hide"></previewer>
        <p class="previewer-desc" v-show="descState">{{ desc }}</p>
      </div>
    </div>
    <FReturnTop :config="FReturnTopCfg"></FReturnTop>
  </div>
</template>

<script>
  import { Previewer, TransferDom } from 'vux'
  import FHeader from '../components/FHeader/FHeader'
  import FReturnTop from '../components/FReturnTop/FReturnTop'
  export default {
    name: 'album',
    data() {
      return {
        FReturnTopCfg: {},
        thumbnails: [],
        desc: '',
        descState: false,
        options: {
          getThumbBoundsFn (index) {
            // find thumbnail element
            let thumbnail = document.querySelectorAll('.previewer-demo-img')[index]
            // get window scroll Y
            let pageYScroll = window.pageYOffset || document.documentElement.scrollTop
            // optionally get horizontal scroll
            // get position of element relative to viewport
            let rect = thumbnail.getBoundingClientRect()
            
            return {x: rect.left, y: rect.top + pageYScroll, w: rect.width}
            // Good guide on how to get element coordinates:
            // http://javascript.info/tutorial/coordinates
          }
        }
      }
    },
    created() {
      let list = this.$.stGet('album')

      if (!list || this.$.isEmptyArr(list)) {
        this.$router.push('/routerLost')
        return
      }

      this.tailor(list)
    },
    mounted() {
      this.FReturnTopCfg = this.$refs.vBody
    },
    methods: {
      tailor(data) {
        let _this = this, OSSPATH = _this.api.OSSPATH, imgs = [], desc = []

        data.forEach(function (list) {
          _this.thumbnails.push({
            msrc: OSSPATH + list.imgUrl + '?x-oss-process=image/crop,w_420,h_420',
            src: OSSPATH + list.imgUrl,
            imgName: list.imgName,
            desc: list.imgDescribe
          })
        })
      },
      show (index) {
        this.$refs.previewer.show(index)
        this.desc = this.thumbnails[index].desc
        this.descState = true
      },
      hide () {
        this.descState = false
      },
      logIndexChange (arg) {
        this.desc = this.thumbnails[arg.currentIndex].desc
      }
    },
    directives: {
      TransferDom
    },
    components: {
      FHeader,
      FReturnTop,
      Previewer
    }
  }
</script>
