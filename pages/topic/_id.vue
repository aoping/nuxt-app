<template>
  <div>
    {{topic}}
  </div>
</template>

<script>
import {getTopic} from '@/store/services'
export default {
  async asyncData({ params }) {
    const res = await getTopic(params.id)
    let topicUser = {}
    if (res.success) {
      return { topic: res.data }
    }
  },
  data() {
    return {
      topic: null,
    }
  },
  components: {},
}
</script>

<style scoped>

</style>
