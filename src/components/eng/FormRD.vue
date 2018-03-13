<template>
  <div>
    <header-bar></header-bar>
    <div v-for="(ls, index) in list" :key="index">
      <v-text-field
        label="本期拟完成作业"
        v-model="ls.ThisSimTask"
      ></v-text-field>
      <v-switch
        label="已完成"
        v-model="ls.Completed"
      ></v-switch>
      <v-text-field
        label="未完成的原因分析及措施"
        v-model="ls.IncomCause"
        multi-line
      ></v-text-field>
    </div>
    <np-mask :show="showMask"></np-mask>
    <!-- <x-button type="primary" @click.native="handleClick">新增</x-button> -->
  </div>
</template>

<script>
import { main, page, message, view, file } from "@/api/index";
import { mapGetters, mapMutations } from "vuex";
import { CreateGUID } from "@/utils/page";
import NpMask from "../Mask";
import HeaderBar from "../HeaderBar";

export default {
  components: { NpMask, HeaderBar },
  name: "Form",
  data() {
    return {
      list: {},
      showMask: false,
      message: {
        type: 'info',
        text: '保存成功',
        show: false
      }
    };
  },
  computed: {
    ...mapGetters(["KeyValue", "KeyWord", "formId"])
  },
  methods: {
    ...mapMutations({ setPostFormData: "SET_POST_FORM_DATA" }),
    handleClick(e) {
      let postData = { NPMS_ENGPLAN_InspectAct_ListS: {} };
      postData["NPMS_ENGPLAN_InspectAct_ListS"]["KeyWordType"] = null;
      postData["NPMS_ENGPLAN_InspectAct_ListS"][
        "data"
      ] = this.list.map(function(v) {
        return {
          ID: v.ID,
          ThisSimTask: v.ThisSimTask,
          Completed: v.Completed,
          IncomCause: v.IncomCause,
          _state: "modified"
        };
      });
      page.SaveForm(this.currentForm.id, postData).then(res => {
        if (res.success) {
          let _this = this;
          this.$vux.alert.show({
            title: "提示",
            content: "保存成功",
            onShow() {},
            onHide() {}
          });
        }
      });
    },
    handleBackBtnClick() {
      this.$router.go(-2);
    },
    onShow() {},
    onHide() {}
  },
  created() {
    page.PageLoad({
        KeyWord: "NPMS_ENGPLAN_InspectAct" + "_ListS",
        swhere: " FID = '" + this.$route.query.ID + "'"
      }).then(res => {
        this.list = res;
      });
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
  
</style>