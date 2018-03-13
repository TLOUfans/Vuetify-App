<template>
  <div class="np-container">
    <header-bar></header-bar>
    <ul class="np-list">
      <li v-for="ls in list" :key="ls.ID" class="np-list-item" @click="handleClick(ls)">
        <div class="list-content">
          <div class="center">
            <div class="center-content">
              <span class="center-title">子项编号：</span>
              <span class="center-des">{{ls.SubCode}}</span>
            </div>
            <div class="center-content">
              <span class="center-title">子项名称：</span>
              <span class="center-des">{{ls.SubName}}</span>
            </div>
            <div class="center-content">
              <span class="center-title">检查日期：</span>
              <mu-date-picker v-model="ls.CheckDate" :format="'YYYY-MM-DD'" hintText="请选择" inputClass="inputWidth"/>
            </div>
          </div>
          <div class="right">
            <icon name="more" type="class"></icon>
          </div>
        </div>
      </li>
    </ul>
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
  name: "EngFormST",
  data() {
    return {
      list: [],
      showMask: false,
      modal: false,
      menu: "",
      date: ""
    };
  },
  computed: {
    ...mapGetters(["KeyValue", "KeyWord", "formId"])
  },
  methods: {
    handleClick(e) {
      e["_state"] = "modified";
      let postData = { NPMS_ENGPLAN_InspectAct_List: {} };
      postData["NPMS_ENGPLAN_InspectAct_List"]["KeyWordType"] = null;
      postData["NPMS_ENGPLAN_InspectAct_List"]["data"] = [e];
      page.SaveForm(this.formId, postData).then(res => {
        if(res.success === true) {
          this.router.go(-1);
        } else {

        }
      }).catch(err => {
        console.error(err);
      })
    }
  },
  created() {
    this.showMask = true;
    if (!this.KeyValue) {
      alert("暂无检查");
      this.$router.go(-1);
    } else {
      page
        .PageLoad({
          KeyWord: this.KeyWord + "_List",
          swhere: " FID = '" + this.KeyValue + "'"
        })
        .then(res => {
          this.showMask = false;
          if (Array.isArray(res))
            this.list = res.map(v => {
              let ddate = new Date(v.CheckDate);
              v.CheckDate = `${ddate.getFullYear()}-${ddate.getMonth() + 1}-${ddate.getDate()}`;
              return v;
            });
        })
        .catch(err => {
          console.error(err);
        });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.inputWidth {
  width: 100px;
}
.np-container {
  .np-list {
    list-style: none;
    padding: 10px 0px;
    box-shadow: 5px 5px 10px #eeeeee;
    .np-list-item {
      margin: 0 20px;
      .list-content {
        display: flex;
        align-items: center;
        justify-content: space-between;
        .center {
          font-size: 1rem;
          .center-content {
            text-align: left;
          }
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
}
</style>