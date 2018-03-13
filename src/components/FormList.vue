<template>
  <div>
    <x-header>{{ label }}</x-header>
    <group>
      <cell v-for="(ls, index) in list" :key="index" @click.native="handleClick(ls)">
        <div slot="title">
          <table>
            <tr>
              <td rowspan="3" style="width: 4rem;font-size: 0.9rem" >
                <div v-text="ls.Type" :class="[{'bg-red': ls.Type==='未检查'}, {'bg-green': ls.Type === '已检查'}, 'white', 'tag']"></div>
              </td>
              <td>
                <span style="color: RGB(72, 72, 183)">计划单号：</span>
                <span v-text="ls.Code" style="font-size:0.8rem;color:#666"></span>
              </td>
            </tr>
            <tr>
              <td>
                <span style="color: RGB(72, 72, 183)">项目编号：</span>
                <span v-text="ls.EpsProjCode" style="font-size:0.8rem;color:#666"></span>
              </td>
            </tr>
            <tr>
              <td>
                <span style="color: RGB(72, 72, 183)">年度/月份/周期：</span>
                <span v-text="ls.Date" style="font-size:0.8rem;color:#666"></span>
              </td>
            </tr>
          </table>
        </div>
      </cell>
    </group>
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
  components: { Group, Cell, XHeader },
  name: "FormList",
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
      this.$vux.loading.show({
        text: "加载中..."
      });
      GetDataJson({
        datasetCode: "Report_NPMS_ENGPLAN_InspectAct",
        pageindex: "0",
        ignorefilter: "0",
        where: " InspectPID = '" + e.ID + "'"
      }).then(res => {
        this.$vux.loading.hide();
        let result = res.data;
        result = result === null ? [] : result;
        if (result.length) {
          if (result[0].Status == 35 || result[0].Status == 50) {
            this.setFormState("view");
          } else {
            this.setFormState("edit");
          }
          this.$router.push({
            name: "EngSubList",
            query: { ID: res.data[0].ID }
          });
        } else {
          this.$vux.loading.show({
            text: "创建表单中..."
          });
          setTimeout(() => {
            this.$vux.loading.hide();
            this.$router.push({
              name: "EngSubList",
              query: { ID: null }
            });
          }, 1000);
          // var guid = CreateGUID();
          // FormLoad({
          //   KeyWord: "NPMS_ENGPLAN_InspectAct",
          //   FormState: "add"
          // }).then(res => {
          //   console.log(res);
          // });
          // GetDataAndSet({
          //   queryParams: {
          //     datasetCode: "Report_NPMS_ENGPLAN_InspectPlan",
          //     pageindex: 0,
          //     where: " ID = '" + e.ID + "'",
          //     ignorefilter: "0"
          //   },
          //   //字段对应赋值————"赋值字段"："数据集字段"
          //   setParams: {
          //     InspectPID: "ID",
          //     PlanCode: "Code",
          //     ConID: "ConID",
          //     ConCode: "ConCode",
          //     ConName: "ConName",
          //     TendersID: "TendersID",
          //     TendersCode: "TendersCode",
          //     TendersName: "TendersName",
          //     TendersDescribe: "TendersDescribe",
          //     SubcontID: "SubcontID",
          //     SubcontCode: "SubcontCode",
          //     SubcontName: "SubcontName",
          //     Year: "Year",
          //     Month: "Month",
          //     Cycle: "Cycle",
          //     StartDate: "StartDate",
          //     FinishDate: "EndDate"
          //   },
          //   //需要赋值的业务对象
          //   keyWord: "NPMS_ENGPLAN_InspectAct",
          //   //默认值（会覆盖字段对应赋值）"字段":"值"
          //   defaultValues: {
          //     ID: guid,
          //     Title: "周进度检查"
          //   }
          // }).then(res => {
          //   console.log(res);
          //   this.setFormState("edit");
          // });
        }
      });
      // PageLoad({
      //   KeyWord: "NPMS_ENGPLAN_InspectAct",
      //   swhere: " InspectPID = '" + e.ID + "'"
      // }).then(res => {
      //   this.$vux.loading.hide();
      //   res = res === null ? [] : res;
      //   if (res.length) {
      //     if (res[0].Status == 35 || res[0].Status == 50) {
      //       this.setFormState("view");
      //     } else {
      //       this.setFormState("edit");
      //     }
      //   } else {
      //     this.setFormState("add");
      //   }
      //   this.$router.push({
      //     name: "EngSubList",
      //     query: { ID: res.length ? res[0].ID : null }
      //   });
      // });
    }
  },
  created() {
    this.setCurrentWin({
      id: this.$route.query.formId,
      name: this.$route.query.label,
      keyWord: this.$route.query.keyWord
    });
    this.$vux.loading.show({
      text: "加载中..."
    });
    GetDataJson({
      datasetCode: "Report_NPMS_ENGPLAN_InspectPlan",
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
    // GetFormConfig(this.$route.query.formId)
    //   .then(res => {
    //     return GetDataJson({
    //       datasetCode: "Report_NPMS_ENGPLAN_InspectPlan",
    //       pageindex: "0",
    //       ignorefilter: "0",
    //       where: ""
    //     });
    //   })
    //   .then(res => {
    //     this.list = res.data.map(v => {
    //       v.Date = `${v.Year}年${v.Month}月${v.Cycle}`;
    //       return v;
    //     });
    //     this.$vux.loading.hide();
    //   });
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.bg-green {
  background-color: #33ab70;
}
.bg-red {
  background-color: #d95353;
}
.white {
  color: #ffffff;
}
.tag {
  text-align: center;
  margin-right: 0.5rem;
  border-radius: 3px;
}
</style>