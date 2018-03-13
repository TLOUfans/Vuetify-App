<template>
  <div>
    <x-header>{{label}}</x-header>
    <divider>拟投入</divider>
    <group>
      <cell>
        <div slot="title">
          <span style="color: RGB(72, 72, 183);margin-right:0.3rem">人</span>
          <span v-text="list.QuasiMan" style="font-size:0.8rem;color:#666"></span>
        </div>
      </cell>
      <cell>
        <div slot="title">
          <span style="color: RGB(72, 72, 183);margin-right:0.3rem">机</span>
          <span v-text="list.QuasiEngine" style="font-size:0.8rem;color:#666"></span>
        </div>
      </cell>
      <cell>
        <div slot="title">
          <span style="color: RGB(72, 72, 183);margin-right:0.3rem">材</span>
          <span v-text="list.QuasiMaterial" style="font-size:0.8rem;color:#666"></span>
        </div>
      </cell>
    </group>
    <divider>实际投入</divider>
    <group title="人">
      <x-input 
        :show-clear="false" 
        :placeholder="formState == 'view'? '':'请输入'" 
        :require="true"
        :readonly="formState == 'view'? true: false"
        v-model="list.ActualMan"
        placeholder-align="left">
      </x-input>
    </group>
    <group title="机">
      <x-input 
        :show-clear="false" 
        :placeholder="formState == 'view'? '':'请输入'" 
        :require="true"
        :readonly="formState == 'view'? true: false"
        v-model="list.ActualEngine"
        placeholder-align="left">
      </x-input>
    </group>
    <group title="材">
      <x-input 
        :show-clear="false" 
        :placeholder="formState == 'view'? '':'请输入'" 
        :require="true"
        :readonly="formState == 'view'? true: false"
        v-model="list.ActualMaterial"
        placeholder-align="left">
      </x-input>
    </group>
    <x-button type="primary" @click.native="handleClick">下一步</x-button>
  </div>
</template>

<script>
import { Group, XInput, XHeader, XButton, Cell, Divider } from "vux";
import { PageLoad, GetFormConfig, FormLoad, SaveForm } from "@/api/page";
import { mapGetters, mapMutations } from "vuex";
import { CreateGUID } from "@/utils/page";

export default {
  components: { Group, XInput, XHeader, XButton, Cell, Divider },
  name: "Form",
  data() {
    return {
      list: {}
    };
  },
  computed: {
    ...mapGetters([
      "currentWin",
      "currentForm",
      "formState",
      "postFormData",
      "label"
    ])
  },
  methods: {
    ...mapMutations({ setPostFormData: "SET_POST_FORM_DATA" }),
    handleClick() {
      let postData = { NPMS_ENGPLAN_InspectAct_List: {} };
      postData["NPMS_ENGPLAN_InspectAct_List"]["KeyWordType"] = null;
      postData["NPMS_ENGPLAN_InspectAct_List"]["data"] = [
        {
          ...this.list,
          _state: "modified"
        }
      ];
      this.setPostFormData(postData);
      SaveForm(this.currentForm.id, postData).then(res => {
        if (res.success) {
          this.$router.push({
            name: "EngFormGrid",
            query: { ID: this.$route.query.ID }
          });
        }
      });
    }
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
        KeyWord: "NPMS_ENGPLAN_InspectAct" + "_List",
        swhere: " ID = '" + params.ID + "'"
      }).then(res => {
        this.$vux.loading.hide();
        this.list = res[0];
      });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
  .vux-divider {
    background-color: #fff;
    margin-top: .5rem;
  }
</style>