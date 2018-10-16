<template>
  <div id="app" :class="{'no-head-state': noHeadState}">
    <navigation>
      <router-view></router-view>
    </navigation>
  </div>
</template>

<script>
  export default {
    name: 'App',
    data() {
      return {
        noHeadState: this.$.isAppClient() || this.$.isWeixinClient()
      }
    },
    created() {
      this.updateViewTitle(this.$route.meta.title)
    },
    methods: {
      updateViewTitle(title) {
        document.title = title

        if (!this.$.isAppClient()) {
          return
        }
        this.$.mutualToApp({
          'project': 'nb',
          'password': 'viewTitle',
          'param': {
            'title': title
          }
        })
      },
      navigation() {
        this.$navigation.on('forward', (to, from) => {}) // 路由前进
        this.$navigation.on('back', (to, from) => {}) // 路由后退
        this.$navigation.on('replace', (to, from) => {}) // 路由替换
      }
    },
    watch: {
      $route(to){
        this.updateViewTitle(to.meta.title)
      }
    }
  }
</script>