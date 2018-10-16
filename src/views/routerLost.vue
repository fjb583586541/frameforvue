<template>
  <div class="routerLost-v v-wrap">
    <FHeader></FHeader>
    <div class="v-body" ref="vBody">
      <div class="err-img">
        <img src="../assets/images/404.png" alt="404错误">
      </div>
      <div class="hint">唉，真不巧，网页走丢了</div>
      <div class="back-v">
        <router-link to="/register">返回注册页</router-link>
      </div>
    </div>
  </div>
</template>

<script>
  import FHeader from '../components/FHeader/FHeader'
  export default {
    name: 'routerLost',
    components: {
      FHeader
    }
  }
</script>