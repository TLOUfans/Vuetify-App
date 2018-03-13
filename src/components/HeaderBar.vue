<template>
  <div class="toolbar">
    <div class="left" @click="handleBackClick()">
      <icon name="back" type="class" :style="{color: '#fff', fontSize: '1.5rem'}"></icon>
    </div>
    <div class="center">{{label? label: formTitle}}</div>
    <div class="right"></div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "HeaderBar",
  props: {
    label: {
      type: String,
      default: ""
    },
    backMethods: {
      type: Function
    }
  },
  computed: {
    ...mapGetters(["formTitle"])
  },
  methods: {
    handleBackClick() {
      if (this.backMethods) {
        this.backMethods();
      } else {
        this.$router.go(-1);
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.toolbar {
  display: flex;
  padding: 0 15px;
  background-color: #409eff;
  align-items: center;
  align-content: space-between;
  .left {
    height: 40px;
    display: flex;
    align-items: center;
  }
  .center {
    text-align: center;
    width: 100%;
    color: #fff;
  }
  .right {
    width: 40px;
  }
}
</style>
