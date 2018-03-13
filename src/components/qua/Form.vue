<template>
  <div>
    <x-header>{{label}}</x-header>
     <mu-list v-for="(ls,index) in list" :key="index" class="subList">
      <mu-paper>
        <mu-row>
          <mu-col width="100" tablet="100" desktop="100">
            <mu-list-item title="分项工程" :describeText="ls.BranchOptionProj? ls.BranchOptionProj: '无'">
              <icon name="number_5" slot="left" style="font-size:3rem"></icon>
            </mu-list-item>
            <mu-divider inset/>
            <mu-list-item title="质量编码" :describeText="ls.QuaCode? ls.QuaCode: '无'">
              <icon name="number_9" slot="left" style="font-size:3rem"></icon>
            </mu-list-item>
            <mu-divider inset/>
            <mu-list-item title="质量检查项" :describeText="ls.QuaCheck? ls.QuaCheck: '无'">
              <icon name="number_4" slot="left" style="font-size:3rem"></icon>
            </mu-list-item>
            <mu-divider inset/>
            <mu-list-item title="合格要求" :describeText="ls.QuaReq? ls.QuaReq: '无'">
              <icon name="number_6" slot="left" style="font-size:3rem"></icon>
            </mu-list-item>
            <mu-divider inset/>
            <mu-list-item title="主控/一般" :describeText="ls.MasterOrNormal? ls.MasterOrNormal: '无'">
              <icon name="number_8" slot="left" style="font-size:3rem"></icon>
            </mu-list-item>
            <mu-divider inset/>
            <mu-list-item>
              <mu-switch label="取消检查" labelLeft v-model="ls.CancelCheck" @change="(e) => handleSwitch(e, ls)"/>
            </mu-list-item>
            <mu-list-item>
              <mu-switch label="是否合格" labelLeft v-model="ls.IsQua" :disabled="ls.CancelCheck"/>
            </mu-list-item>
            <div style="padding:0 1rem">
              <mu-text-field label="实测实量数据" v-model="ls.MeasureData" hintText="请输入" :disabled="ls.CancelCheck"/>
            </div>
            <mu-raised-button 
              v-if="!(ls.CancelCheck || ls.IsQua)"
              :label="!IsNullGuid(ls.RecordSID)? '编辑整改通知单': '发起整改通知单'" 
              :backgroundColor="!IsNullGuid(ls.RecordSID)?'#4caf50' :'#5d95d0'" 
              fullWidth class="next-btn" 
              @click="handleNextBtnClick(ls)"/>
          </mu-col>
        </mu-row>
      </mu-paper>
    </mu-list>
  </div>
</template>

<script>
import { Group, XInput, XHeader, XButton, Cell, Divider } from "vux";
import { PageLoad, GetFormConfig, FormLoad, SaveForm } from "@/api/page";
import { mapGetters, mapMutations } from "vuex";
import { GetDataJson, GetDataAndSet } from "@/api/view";
import { CreateGUID, IsNullGuid } from "@/utils/guid";

export default {
  components: { Group, XInput, XHeader, XButton, Cell, Divider },
  name: "Form",
  data() {
    return {
      list: []
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
    handleSwitch(e, ls) {
      if(e == true) {
        ls.IsQua = true;
      }
    },
    handleClick() {
      this.$vux.loading.show({
        text: "保存中..."
      });
      let postData = { NPMS_QUA_InspectAct_ListS: {} };
      postData["NPMS_QUA_InspectAct_ListS"]["KeyWordType"] = null;
      postData["NPMS_QUA_InspectAct_ListS"]["data"] = this.list.map(v => {
        v["_state"] = "modified";
        return v;
      });
      this.setPostFormData(postData);
      SaveForm(this.currentForm.id, postData)
        .then(res => {
          this.$vux.loading.hide();
          if (res.success) {
            this.$router.push({
              name: "QuaFormGrid",
              query: { ID: this.$route.query.ID }
            });
          }
        })
        .catch(err => {
          console.log(err);
          this.$vux.loading.hide();
        });
    },
    handleNextBtnClick(ls) {
      this.$vux.loading.show({
        text: "保存中..."
      });
      let postData = { NPMS_QUA_InspectAct_ListS: {} };
      postData["NPMS_QUA_InspectAct_ListS"]["KeyWordType"] = null;
      postData["NPMS_QUA_InspectAct_ListS"]["data"] = this.list.map(v => {
        v["_state"] = "modified";
        return v;
      });
      this.setPostFormData(postData);
      SaveForm(this.currentForm.id, postData).then(res => {
        this.$vux.loading.hide();
        if (res.success) {
          let status = [
            { key: "0", value: "edit" },
            { key: "35", value: "view" },
            { key: "50", value: "view" },
            { key: null, value: "add" }
          ].filter(v => {
            return v.key == ls.Status;
          })[0]["value"];
          let query = {
            formState: status,
            NoticeID: ls.BID,
            ID: ls.ID
          };
          let params = {
            ...ls
          }
          this.$router.push({
            name: "QuaFormGrid",
            query: query,
            params: params
          });
        }
      });
    },
    IsNullGuid(data) {
      return IsNullGuid(data);
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
      GetDataJson({
        datasetCode: "Report_NPMS_QUA_InspectAct_ListS",
        pageindex: "0",
        ignorefilter: "0",
        where: " FID = '" + params.ID + "'"
      }).then(res => {
        this.$vux.loading.hide();
        let _this = this;
        if (!res.data.length) {
          this.$vux.alert.show({
            title: "提示",
            content: "暂无数据",
            onShow() {},
            onHide() {
              _this.$router.go(-1);
            }
          });
        } else {
          this.list = res.data;
        }
      });
    }
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