<template>
  <div class="mask" v-if="show">
    <v-progress-circular indeterminate :size="50" color="primary"></v-progress-circular>
  </div>
</template>

<script>
export default {
  name: 'NpMask',
  props: {
    show: {
      type: Boolean,
      default: false
    }
  }
};
</script>

<style lang="scss" scoped>
.mask {
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
  top: 0;
  left: 0;
  background-color: #aaaaaa;
  opacity: 0.5;
  z-index: 1000;
}
</style>
