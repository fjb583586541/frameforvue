<template>
  <div class="activity-v v-wrap">
    <FHeader :config="FHeaderCfg"></FHeader>
    <div class="v-body" ref="vBody">
      <ul>
        <li v-for="item in activityLists" v-bind:key="item.id">
          <div class="name cell">
            <span class="key">活动名称：</span>
            <span class="val">{{ item.activityName }}</span>
          </div>
          <div class="type cell">
            <span class="key">活动类型：</span>
            <span class="val clearfix">
              <em class="vux-1px type fl">{{ item.label }}</em>
            </span>
          </div>
          <div class="date cell">
            <span class="key">活动时间：</span>
            <span class="val">{{ item.startTime }} 至 {{ item.endTime }}</span>
          </div>
          <div class="exp cell">
            <span class="key">活动说明：</span>
            <span class="val">{{ item.activityRemark }}</span>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  import FHeader from '../components/FHeader/FHeader'
  export default {
    name: 'activity',
    data() {
      return {
        FHeaderCfg: {
          title: '优惠活动'
        },
        activityLists: []
      }
    },
    created() {
      let activity = this.$.stGet('activity')
      if (!activity) {
        this.$router.push('/routerLost')
        return
      }
      this.activityLists = activity
    },
    components: {
      FHeader
    }
  }
</script>