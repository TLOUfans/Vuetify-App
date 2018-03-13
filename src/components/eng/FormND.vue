<template>
  <div>
    <header-bar></header-bar>
    <v-divider inset>拟投入</v-divider>
    <v-list two-line>
      <v-list-tile :key="list.title">
        <v-list-tile-content>
          <v-list-tile-title v-text="'人'"></v-list-tile-title>
          <v-list-tile-sub-title v-html="list.QuasiMan"></v-list-tile-sub-title>
        </v-list-tile-content>
      </v-list-tile>
      <v-list-tile :key="list.title">
        <v-list-tile-content>
          <v-list-tile-title v-text="'机'"></v-list-tile-title>
          <v-list-tile-sub-title v-html="list.QuasiEngine"></v-list-tile-sub-title>
        </v-list-tile-content>
      </v-list-tile>
      <v-list-tile :key="list.title">
        <v-list-tile-content>
          <v-list-tile-title v-text="'材'"></v-list-tile-title>
          <v-list-tile-sub-title v-html="list.QuasiMaterial"></v-list-tile-sub-title>
        </v-list-tile-content>
      </v-list-tile>
    </v-list>
    <v-divider inset>实际投入</v-divider>
    <v-list two-line>
      <v-list-tile :key="list.title">
        <v-list-tile-content>
          <v-text-field id="testing" label="人" v-model="list.ActualMan"></v-text-field>
        </v-list-tile-content>
      </v-list-tile>
      <v-list-tile :key="list.title">
        <v-list-tile-content>
          <v-text-field id="testing" label="机" v-model="list.ActualEngine"></v-text-field>
        </v-list-tile-content>
      </v-list-tile>
      <v-list-tile :key="list.title">
        <v-list-tile-content>
          <v-text-field id="testing" label="材" v-model="list.ActualMaterial"></v-text-field>
        </v-list-tile-content>
      </v-list-tile>
      <v-btn block color="secondary" dark style="color:#333" @click="handleClick">保存</v-btn>
    </v-list>
    <np-mask :show="showMask"></np-mask>
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
    hideToast() {
      this.toast = false;
      if (this.toastTimer) clearTimeout(this.toastTimer);
    },
    showToast({ type, text }) {
      this.message = {
        type: type,
        text: text,
        show: true
      };
      if (this.toastTimer) clearTimeout(this.toastTimer);
      this.toastTimer = setTimeout(() => {
        this.message.show = false;
      }, 2000);
    },
    handleClick() {
      let postData = { NPMS_ENGPLAN_InspectAct_List: {} };
      postData["NPMS_ENGPLAN_InspectAct_List"]["KeyWordType"] = null;
      postData["NPMS_ENGPLAN_InspectAct_List"]["data"] = [
        {
          ...this.list,
          _state: "modified"
        }
      ];
      page.SaveForm(this.formId, postData).then(res => {
        if (res.success) {
          this.$router.push({
            name: "EngFormRD",
            query: { ID: this.$route.query.ID }
          });
        }
      });
    }
  },
  created() {
    this.showMask = true;
    page
      .PageLoad({
        KeyWord: this.KeyWord + "_List",
        swhere: " ID = '" + this.$route.query.ID + "'"
      })
      .then(res => {
        this.showMask = false;
        this.showToast({text: '保存成功'});
        this.list = res[0];
      })
      .catch(err => {
        console.error(err);
      });
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.vux-divider {
  background-color: #fff;
  margin-top: 0.5rem;
}
</style>