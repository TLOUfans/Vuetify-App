<template>
  <div>
    <x-header :left-options="{preventGoBack: true}" @on-click-back="handleBackBtnClick">{{label}}
      <div style="height:100%;display:flex;position:relative;top:-0.3rem" slot="right">
        <x-button type="primary" :mini="true" style="color:#fff" @click.native="handleClick">保存</x-button>
      </div>
    </x-header>
    <div v-for="(ls, index) in list" :key="index">
      <divider>{{`第${index + 1}条`}}</divider>
      <group title="本期拟完成作业">
        <x-input
          label-width="8rem"
          :show-clear="false" 
          v-model="ls.ThisSimTask"
          placeholder="请输入"
          :readonly="formState == 'view'? true: false"
          placeholder-align="left">
        </x-input>
      </group>
      <group>
        <x-switch title="已完成" :value-map="['false', 'true']" v-model="ls.Completed"></x-switch>
      </group>
      <group title="未完成的原因分析及措施">
        <x-textarea 
          :max="200" 
          v-model="ls.IncomCause"
          :readonly="formState == 'view'? true: false"
          placeholder="请输入">
        </x-textarea>
      </group>
    </div>
    <!-- <x-button type="primary" @click.native="handleClick">新增</x-button> -->
  </div>
</template>

<script>
import { Group, XInput, XHeader, XButton, XSwitch, Divider, XTextarea } from "vux";
import { PageLoad, GetFormConfig, FormLoad, SaveForm } from "@/api/page";
import { mapGetters, mapMutations } from "vuex";

export default {
  components: { Group, XInput, XHeader, XButton, XSwitch, Divider, XTextarea },
  name: "Form",
  data() {
    return {
      list: [],
      show: false
    };
  },
  computed: {
    ...mapGetters(["currentWin", "formState", "currentForm", "label"])
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
      this.setPostFormData(postData);
      SaveForm(this.currentForm.id, postData).then(res => {
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
    let params = this.$route.query;
    this.$vux.loading.show({
      text: "加载中..."
    });
    if (!params) {
      this.$vux.loading.hide();
    } else {
      PageLoad({
        KeyWord: "NPMS_ENGPLAN_InspectAct" + "_ListS",
        swhere: " FID = '" + params.ID + "'"
      }).then(res => {
        this.$vux.loading.hide();
        this.list = res;
      });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  
</style>