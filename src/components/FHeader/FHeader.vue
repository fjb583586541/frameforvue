<template>
  <header class="FHeader">
    <span class="left-icon" @click="goBack"></span>
    <h1 class="title">{{ $route.meta.title }}</h1>
    <span class="right-icon vh"></span>
  </header>
</template>

<script>
  export default {
    name: 'FHeader',
    methods: {
      goBack() {
        this.$router.back(-1)
      }
    }
  }
</script>