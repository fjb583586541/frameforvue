<template>
  <div class="businessLicence-v v-wrap">
    <FHeader></FHeader>
    <div class="v-body" ref="vBody">
      <img src="../assets/images/yyzz.jpg">
    </div>
  </div>
</template>

<script>
  import FHeader from '../components/FHeader/FHeader'
  export default {
    name: 'businessLicence',
    components: {
      FHeader
    }
  }
</script>