<template>
  <div>
    <x-header>{{ label }}</x-header>
    <mu-list v-for="(ls,index) in list" :key="index" class="subList">
      <mu-paper>
        <mu-row>
          <mu-col width="100" tablet="100" desktop="100">
            <mu-sub-header style="text-align:center">{{'第' + (index + 1) + '条'}}</mu-sub-header>
            <mu-list-item title="子项编号" :describeText="ls.SubCode">
              <icon name="number_5" slot="left" style="font-size:3rem"></icon>
            </mu-list-item>
            <mu-divider inset/>
            <mu-list-item @click.native="handleClick(ls, index)" title="子项名称" :describeText="ls.SubName">
              <icon name="number_9" slot="left" style="font-size:3rem"></icon>
              <icon name="arrow-right" slot="right" style="font-size:3rem"></icon>
            </mu-list-item>
            <mu-divider inset/>
            <mu-list-item title="部位" :describeText="ls.Parts">
              <icon name="number_4" slot="left" style="font-size:3rem"></icon>
            </mu-list-item>
            <mu-divider inset/>
            <mu-list-item title="检查日期">
              <icon name="calendar" slot="left" style="font-size:3rem"></icon>
              <mu-date-picker hintText="检查日期" v-model="ls.CheckDate" format="YYYY-MM-DD"/>
            </mu-list-item>
          </mu-col>
          <!-- <mu-col width="25" tablet="25" desktop="25"  style="padding-right:10px">
            <mu-raised-button label="下一级" backgroundColor="#5d95d0" fullWidth class="next-btn"/>
          </mu-col> -->
        </mu-row>
      </mu-paper>
    </mu-list>
  </div>
</template>

<script>
import { Group, Cell, XHeader } from "vux";
import { PageLoad, GetFormConfig, FormLoad, SaveForm } from "@/api/page";
import { mapGetters, mapMutations } from "vuex";
import { CreateGUID } from "@/utils/page";
import DateFormat from "@/utils/DateFormat";

export default {
  components: { Group, Cell, XHeader },
  name: "SubList",
  data() {
    return {
      list: []
    };
  },
  computed: {
    ...mapGetters(["currentWin", "formState", "label", "currentForm"])
  },
  methods: {
    handleClick(e) {
      this.$vux.loading.show({
        text: "保存中..."
      });
      let postData = { NPMS_QUA_InspectAct_List: {} };
      postData["NPMS_QUA_InspectAct_List"]["KeyWordType"] = null;
      postData["NPMS_QUA_InspectAct_List"]["data"] = this.list.map(v => {
        v["_state"] = "modified";
        return v;
      });
      this.setPostFormData(postData);
      SaveForm(this.currentForm.id, postData)
        .then(res => {
          let params = this.$route.query;
          this.setCurrentForm({
            id: "878eb34b-90cf-4d1a-a8b2-f5318b9f1309",
            name: "周质量检查",
            keyValue: this.formState == "add" ? CreateGUID() : params.ID,
            keyWord: "NPMS_QUA_InspectAct" + "_List",
            keyWordType: "BO",
            CheckManID: e.CheckManID,
            CheckManCode: e.CheckManCode,
            CheckMan: e.CheckManName,
            CheckDate: e.CheckDate
          });
          this.$router.push({ name: "QuaForm", query: { ID: e.ID } });
          this.$vux.loading.hide();
        })
        .catch(err => {
          console.log(err);
          this.$vux.loading.hide();
        });
    },
    ...mapMutations({
      setCurrentForm: "SET_CURRENT_FORM",
      setPostFormData: "SET_POST_FORM_DATA"
    })
  },
  created() {
    let params = this.$route.query;
    this.$vux.loading.show({
      text: "加载中..."
    });
    if (!params) {
      this.$vux.loading.hide();
    } else {
      this.$vux.loading.hide();
      if (!params.ID) {
        let _this = this;
        this.$vux.alert.show({
          title: "提示",
          content: "暂无检查",
          onShow() {},
          onHide() {
            _this.$router.go(-1);
          }
        });
      } else {
        PageLoad({
          KeyWord: "NPMS_QUA_InspectAct" + "_List",
          swhere: " FID = '" + params.ID + "'"
        }).then(res => {
          this.$vux.loading.hide();
          this.list = res;
        });
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.mu-paper {
  margin-bottom: 5px;
}
.next-btn {
  margin-top: 1rem;
}
.mu-sub-header {
  margin-top: 0;
}
</style>