<template>
  <div class="alter" v-if="show">
    <v-alert outline :color="type" :icon="mappingIcon(type)" :value="true">
      <slot></slot>
    </v-alert>
  </div>
</template>

<script>
export default {
  name: 'alert',
  props: {
    type: {
      type: String,
      default: "info"
    },
    show: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    mappingIcon() {
      return [
        { type: "error", icon: "warning" },
        { type: "warning", icon: "priority_high" },
        { type: "info", icon: "info" },
        { type: "success", icon: "check_circle" }
      ].filter(v => this.type === v.type)[0].icon;
    }
  },
  updated() {
    this.$nextTick(() => {
      let timer = setTimeout(() => {
        this.$emit('update:show', false);
        clearTimeout(timer);
      }, 5000);
    })
  }
};
</script>

<style lang="scss" scoped>
  .alter {
    position: absolute;
    margin: 30px auto;
  }
</style>
