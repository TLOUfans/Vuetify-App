<template>
  <div>
    <x-header :left-options="{preventGoBack: true}" @on-click-back="handleBackBtnClick">{{label}}
      <div style="height:100%;display:flex;position:relative;top:-0.5rem" slot="right">
        <mu-raised-button label="保存" primary @click.native="handleClick" backgroundColor="#5d94d1"/>
      </div>
    </x-header>
    <mu-list class="subList">
      <mu-paper>
        <mu-row>
          <mu-col width="100" tablet="100" desktop="100">
            <mu-list-item title="责任单位" :describeText="list.SubcontName? list.SubcontName: '无'">
              <icon name="number_5" slot="left" style="font-size:3rem"></icon>
            </mu-list-item>
            <mu-list-item title="检查人" :describeText="list.CheckMan? list.CheckMan: '无'">
              <icon name="number_9" slot="left" style="font-size:3rem"></icon>
            </mu-list-item>
            <mu-list-item title="检查日期" :describeText="list.CheckDate? list.CheckDate: '无'">
              <icon name="number_4" slot="left" style="font-size:3rem"></icon>
            </mu-list-item>
            <div style="padding:0 1rem;">
              <mu-text-field label="问题描述（总包）" v-model="list.ProblemDescription" hintText="请输入"/>
            </div>
            <div style="padding:0 1rem;">
              <mu-text-field label="整改要求（总包）" labelLeft v-model="list.RectRequirements" hintText="请输入"/>
            </div>
            <div style="padding:0 1rem;">
              <mu-text-field label="原因分析（分包）" v-model="list.ReasonAnalysis" hintText="请输入"/>
            </div>
            <div style="padding:0 1rem;">
              <mu-text-field label="整改措施（分包）" labelLeft v-model="list.RectMeasures" hintText="请输入"/>
            </div>
            <div style="padding:0 1rem;">
              <mu-switch label="整改后验证结论" v-model="list.ValidateResult"></mu-switch>
            </div>
            <div style="padding:0 1rem;">
              <mu-text-field label="验证人" labelLeft v-model="list.Verifier" hintText="请输入"/>
            </div>
            <div style="padding:0 1rem;">
              <span style="color:rgba(0, 0, 0, 0.54);">验证日期</span>
              <mu-date-picker hintText="验证日期" v-model="list.VerifierDate"/>
            </div>
            <mu-raised-button label="拍照" primary @click.native="handleTakePicture" backgroundColor="#5d94d1"/>
            <mu-raised-button label="相册" primary @click.native="handlePhoto" backgroundColor="#5d94d1" style="float:right"/>
          </mu-col>
        </mu-row>
      </mu-paper>
    </mu-list>
  </div>
</template>

<script>
import {
  Group,
  XInput,
  XHeader,
  XButton,
  XSwitch,
  Divider,
  XTextarea
} from "vux";
import { PageLoad, GetFormConfig, FormLoad, SaveForm } from "@/api/page"
import { mapGetters, mapMutations } from "vuex"
import { CreateGUID } from "@/utils/guid"
import DateFormat from "@/utils/DateFormat"
import { CallAppFunction } from "@/utils/index"

export default {
  components: { Group, XInput, XHeader, XButton, XSwitch, Divider, XTextarea },
  name: "Form",
  data() {
    return {
      list: {},
      show: false
    };
  },
  computed: {
    ...mapGetters(["currentWin", "formState", "currentForm", "label"])
  },
  methods: {
    ...mapMutations({ setPostFormData: "SET_POST_FORM_DATA" }),
    handleClick(e) {
      this.$vux.loading.show({
        text: "保存中..."
      });
      let query = this.$route.query;
      let postData = { NPMS_QUA_NoticeRectification: {} };
      /* 新增 */
      if (query.formState == "add") {
        let guid = CreateGUID();
        postData["NPMS_QUA_NoticeRectification"]["KeyWordType"] = null;
        postData["NPMS_QUA_NoticeRectification"]["data"] = [
          {
            InconsistentType: "质量",
            FormType: "质量",
            ValidateResult: this.ValidateResult == true ? '合格': '不合格',
            ...this.list,
            EpsProjId: this.currentWin.EpsProjId,
            EpsProjCode: this.currentWin.EpsProjCode,
            EpsProjName: this.currentWin.EpsProjName,
            RecordSID: query.ID,
            _state: "added"
          }
        ];
      } else {
        /* 修改 */
        postData["NPMS_QUA_NoticeRectification"]["KeyWordType"] = null;
        postData["NPMS_QUA_NoticeRectification"]["data"] = [
          {
            ...this.list,
            _state: "modified"
          }
        ];
      }
      this.setPostFormData(postData);
      SaveForm(this.currentForm.id, postData).then(res => {
        this.$vux.loading.hide();
        if (res.success) {
          let _this = this;
          this.$vux.alert.show({
            title: "提示",
            content: "保存成功",
            onShow() {},
            onHide() {
              _this.$router.go(-1);
            }
          });
        }
      });
    },
    handleBackBtnClick() {
      this.$router.go(-1);
    },
    handleTakePicture() {
      var params = {}; 
      params.uploadServer = {};
      params.uploadServer.keyword = 'NPMS_QUA_NoticeRectification';
      params.uploadServer.keyvalue = this.ID;
      params.uploadServer.scale = 0.75;
      params.uploadServer.upload = "true";
      params.translateBase64 = "false";
      params.filePath = "true";
      CallAppFunction("appTakePhotos", JSON.stringify(params), "", function(res) {
        console.log(res);
      });
    },
    handlePhoto() {
      var params = {}; 
      params.uploadServer = {};
      params.uploadServer.keyword = 'NPMS_QUA_NoticeRectification',
      params.uploadServer.keyvalue = this.ID;
      params.uploadServer.scale = 0.75;
      params.uploadServer.upload = "true";
      params.translateBase64 = "false";
      params.filePath = "true";
      CallAppFunction("appOpenImagesLibrary", JSON.stringify(params), "", function(res) {
        console.log(res);
      });
    },
    onShow() {},
    onHide() {}
  },
  created() {
    let query = this.$route.query;
    let params = this.$route.params;
    this.list = {
      CheckManID: this.currentForm.CheckManID,
      CheckManCode: this.currentForm.CheckManCode,
      CheckMan: this.currentForm.CheckMan,
      CheckDate: DateFormat(new Date(this.currentForm.CheckDate), "YYYY-MM-DD")
    };
    if (query.formState === "add") {
      this.ID = CreateGUID();
      this.RecordSID = query.ID;
      Object.assign(this.list, {
        SubcontID: this.currentWin.SubcontID,
        SubcontCode: this.currentWin.SubcontCode,
        SubcontName: this.currentWin.SubcontName
      });
    } else {
      this.$vux.loading.show({
        text: "加载中..."
      });
      this.ID = query.NoticeID;
      this.RecordSID = query.ID;
      PageLoad({
        KeyWord: "NPMS_QUA_NoticeRectification",
        swhere: " ID = '" + query.NoticeID + "'"
      })
        .then(res => {
          this.$vux.loading.hide();
          this.list = res.map(v => {
            v.ValidateResult = v.ValidateResult == "True" ? true : false;
            if( query.formState == 'edit' ) {
              v.CheckManID = this.currentForm.CheckManID,
              v.CheckManCode = this.currentForm.CheckManCode,
              v.CheckMan = this.currentForm.CheckMan,
              v.CheckDate = DateFormat(new Date(this.currentForm.CheckDate), "YYYY-MM-DD")
            }
            return v;
          })[0];
        })
        .catch(err => {
          console.log(err);
          this.$vux.loading.hide();
        });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>