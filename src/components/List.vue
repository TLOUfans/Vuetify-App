<template>
  <div class="np-container">
    <header-bar></header-bar>
    <v-list :two-line="true">
      <v-list-tile avatar v-for="ls in list" :key="ls.title" class="np-list-item" @click="handleClick(ls)">
        <v-list-tile-content>
          <div class="list-content">
            <div class="left">
              <span class="status-icon" :style="{backgroundColor: mappingStatusColor(ls.Type)}">{{ls.Type}}</span>
            </div>
            <div class="center">
              <div class="center-content">
                <span class="center-title">项目编号：</span>
                <span class="center-des">{{ls.EpsProjCode}}</span>
              </div>
              <div class="center-content">
                <span class="center-title">年度/月份/周期：</span>
                <span class="center-des">{{ls.Date}}</span>
              </div>
              <div class="center-content">
                <span class="center-title">计划单号：</span>
                <span class="center-des">{{ls.Code}}</span>
              </div>
            </div>
          </div>
        </v-list-tile-content>
        <v-list-tile-action>
          <icon name="more" type="class" style="color: #2c3e50"></icon>
        </v-list-tile-action>
      </v-list-tile>
    </v-list>
    <np-mask :show="showMask"></np-mask>
  </div>
</template>

<script>
import { mapState, mapActions, mapMutations, mapGetters } from "vuex";
import { main, page, message, view, file } from "@/api/index";
import NpMask from './Mask';
import HeaderBar from './HeaderBar';
export default {
  components: {
    NpMask,
    HeaderBar
  },
  data() {
    return {
      list: [],
      showMask: false,
    };
  },
  computed: {
    ...mapGetters({
      formConfig: "formConfig",
      formTitle: "formTitle",
      KeyWord: "KeyWord",
      menuOption: 'menuOption',
    })
  },
  methods: {
    ...mapMutations({
      setFormId: "FORMID_MUTATION",
      setKeyValue: 'KEYVALUE_MUTATION',
      setKeyWord: 'KEYWORD_MUTATION',
    }),
    ...mapActions(["getFormConfig"]),
    mappingStatusColor(type) {
      return [
        { name: "已检查", color: "#33ab70" },
        { name: "未检查", color: "#d95353" }
      ].filter(v => v.name === type)[0].color;
    },
    handleClick(e) {
      this.setKeyValue(e.BID);
      this.setKeyWord(this.menuOption.KeyWordST);
      this.$router.push({path: '/EngFormST'});
    }
  },
  created() {
    this.showMask = true;
    this.getFormConfig()
      .then(res => {
        return view.GetDataJson({
          datasetCode: "Report_NPMS_ENGPLAN_InspectPlan",
          pageindex: "0",
          ignorefilter: "0",
          where: ""
        });
      })
      .then(res => {
        this.showMask = false;
        this.list = res.data.map(v => {
          v.Date = `${v.Year}年${v.Month}月${v.Cycle}`;
          return v;
        });
      })
      .catch(err => {
        console.log(err);
      });
  }
};
</script>

<style lang="scss" scoped>
.np-container {
  .np-list-item {
    margin-bottom: 10px;
    box-shadow: 5px 5px 10px #eeeeee;
    .list__tile__action {
      min-width: inherit;
    }
    .list-content {
      display: flex;
      align-items: center;
      justify-content: space-between;
      .left {
        margin-right: 20px;
        .status-icon {
          display: inline-block;
          white-space: nowrap;
          padding: 5px 10px;
          font-size: 0.8rem;
          color: #fff;
          border-radius: 3px;
        }
      }
      .center {
        font-size: 0.8rem;
        color: #2c3e50;
      }
    }
    .status-container {
      border-radius: 3px;
      font-size: 0.5rem;
      color: #fff;
      padding: 5px 10px;
    }
  }
}
</style>
