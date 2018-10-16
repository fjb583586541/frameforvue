<template>
  <header class="FHeader">
    <span class="left-icon" @click="goBack"></span>
    <h1 class="title">{{ config.title }}</h1>
    <span class="right-icon vh"></span>
  </header>
</template>

<script>
  export default {
    name: 'FHeader',
    props: ['config'],
    activated() {
      if (!this.$.isAppClient()) {
        return
      }
      this.$.mutualToApp({
        'project': 'nb',
        'password': 'viewTitle',
        'param': {
          title: this.$route.meta.title
        }
      })
    },
    methods: {
      goBack() {
        this.$router.back(-1)
      }
    }
  }
</script>