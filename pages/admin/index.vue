<template>
  <div>
    <p>{{user.email}}</p>
    <p>{{user.nickname}}</p>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  layout: 'admin',
  middleware: "auth",
  data() {
    return {};
  },
  computed: {
    ...mapState(['user'])
  },
  components: {}
};
</script>

<style scoped>
</style>
