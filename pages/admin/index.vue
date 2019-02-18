<template>
  <div>需要登录后才可见</div>
</template>

<script>
export default {
  middleware: "auth",
  data() {
    return {};
  },
  components: {}
};
</script>

<style scoped>
</style>
