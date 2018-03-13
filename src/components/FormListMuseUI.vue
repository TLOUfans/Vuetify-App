<template>
  <div>
    <x-header>{{ label }}</x-header>
    <mu-list>
      <mu-paper v-for="(ls,index) in list" :key="index">
        <mu-row >
          <mu-col width="100" tablet="90" desktop="90">
            <mu-list-item align="left" @click.native="handleClick(ls, index)">
              <div slot="title">
                <div>
                  <span style="color: rgb(93, 148, 209)">计划单号：</span>
                  <span v-text="ls.Code" style="font-size:0.8rem;color:#666"></span>
                </div>
                <div>
                  <span style="color: rgb(93, 148, 209)">项目编号：</span>
                <span v-text="ls.EpsProjCode" style="font-size:0.8rem;color:#666"></span>
                </div>
                <div>
                  <span style="color: rgb(93, 148, 209)">年度/月份/周期：</span>
                  <span v-text="ls.Date" style="font-size:0.8rem;color:#666"></span>
                </div>
              </div>
              <mu-badge :content="ls.Type" :color="GetStateColor(ls.Type)" slot="left"/>
            </mu-list-item>
          </mu-col>
        </mu-row>
      </mu-paper>
    </mu-list>
  </div>
</template>

<script>
import { Group, Cell, XHeader } from "vux";
import { PageLoad, GetFormConfig, FormLoad } from "@/api/page";
import { GetDataJson, GetDataAndSet } from "@/api/view";
import { mapMutations, mapGetters } from "vuex";
import base64 from "@/utils/Base64";
import { CreateGUID } from "@/utils/guid";
export default {
  components: { XHeader },
  data() {
    return {
      list: []
    };
  },
  computed: {
    ...mapGetters(["currentWin", "label"])
  },
  methods: {
    ...mapMutations({
      setCurrentWin: "SET_CURRENT_WIN",
      setFormState: "SET_FORM_STATE"
    }),
    handleClick(e) {
      this.setCurrentWin({
        id: this.$route.query.formId,
        name: this.$route.query.label,
        keyWord: this.$route.query.keyWord,
        SubcontID: e.SubcontID,
        SubcontCode: e.SubcontCode,
        SubcontName: e.SubcontName,
        EpsProjId: e.EpsProjId,
        EpsProjCode: e.EpsProjCode,
        EpsProjName: e.EpsProjName
      });
      if (e.Type == "未检查") {
        this.$vux.loading.show({
          text: "创建表单中..."
        });
        setTimeout(() => {
          this.$vux.loading.hide();
          this.$router.push({
            name: "QuaubList",
            query: { ID: null }
          });
        }, 1000);
      } else if (e.Type == "已检查") {
        this.$router.push({
          name: "QuaSubList",
          query: { ID: e.BID }
        });
      }
    },
    GetStateColor(type) {
      return [
        { name: "已检查", color: "#33ab70" },
        { name: "未检查", color: "#d95353" }
      ].filter(v => v.name === type)[0].color;
    }
  },
  created() {
    this.$vux.loading.show({
      text: "加载中..."
    });
    GetDataJson({
      datasetCode: "Report_NPMS_QUA_InspectPlan",
      pageindex: "0",
      ignorefilter: "0",
      where: ""
    }).then(res => {
      this.$vux.loading.hide();
      this.list = res.data.map(v => {
        v.Date = `${v.Year}年${v.Month}月${v.Cycle}`;
        return v;
      });
    });
  }
};
</script>

<style>
.mu-paper {
  margin-bottom: 5px;
}
.mu-item-left {
  width: 50px;
}

.mu-text-field {
  width: 100%;
}
.mu-date-picker {
  width: 100%;
}
</style>

