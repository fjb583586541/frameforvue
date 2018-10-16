<template>
  <div class="demo-v v-wrap">
    <FHeader></FHeader>
    <div class="v-body" ref="vBody"></div>
  </div>
</template>

<script>
  import FHeader from '../components/FHeader/FHeader'
  export default {
    name: 'demo',
    components: {
      FHeader
    }
  }
</script>