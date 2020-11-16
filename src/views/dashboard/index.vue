<template>
  <div class="dashboard-container">
    <div class="dashboard-text">
      height：{{height}}
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { getNowHeight } from '@/utils/auth'

export default {
  name: 'Dashboard',
  computed: {
    ...mapGetters([
      'name'
    ])
  },
  date(){
    return{
      height:0
    }
  },
  created(){
    this.height = getNowHeight()
  },
  methods: {
    NowHeight(){
      this.height = getNowHeight()
    }
  },
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
