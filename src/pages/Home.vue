<template>
  <v-container grid-list-md text-xs-center style="margin-top:1rem">
    <v-layout row wrap>
      <v-flex xs4 v-for="(ls, index) in list" :key="index">
        <div class="np-box" @click="handleClick">
          <div class="np-icon">
            <span class="np-badge" v-text="limitNumber(ls.msgNumber)" style="font-size:0.7rem"></span>
            <icon :name="icons[index]" type="class" :style="{color: colors[index], fontSize: '2.5rem'}"></icon>
          </div>
          <div class="np-title">
            <span class="np-title-text" v-text="ls.label"></span>
          </div>
        </div>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { main, page, message, view, file } from "@/api/index"
import base64 from "@/utils/Base64"

export default {
  data() {
    return {
      colors: [ "#c23531", "#2f4554", "#61a0a8", "#d48265", "#91c7ae", "#749f83", "#ca8622", "#bda29a", "#6e7074", "#546570", "#c4ccd3" ],
      icons: ['schedule', 'quality', 'process', 'HSE', 'safe', 'construction', 'document-edit', 'document-list'],
      list: [
        {
          label: "进度检查",
          msgNumber: 11,
          formId: "1d5a7680-06c8-411e-ac72-35cc5d4ab9a3",
          keyWord: "NPMS_ENGPLAN_InspectPlan"
        },
        {
          label: "质量检查",
          msgNumber: 222,
          formId: "56c977c1-0d24-4349-8254-4252f0520d4a",
          keyWord: "NPMS_QUA_InspectPlan"
        },
        { label: "特殊过程检查", msgNumber: 333 },
        { label: "HSE检查", msgNumber: 444 },
        { label: "安全专项检查", msgNumber: 55 },
        { label: "施工其他检查", msgNumber: 66 },
        { label: "整改通知单", msgNumber: 77 },
        { label: "HSE图文库", msgNumber: 88 }
      ]
    };
  },
  methods: {
    handleClick() {
      this.$router.push({path: '/List'});
    },
    limitNumber(number) {
      return Number(number) > 99 ? '99+': number;
    }
  },
  created() {
    main.Login("admin", "NJPoweron@123").then(res => {
      console.log("登陆成功！");
    });
  }
};
</script>

<style lang="scss" scoped>
.np-box {
  display: flex;
  height: 4rem;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  margin: 1.5rem;
  position: relative;
  .np-badge {
    position: absolute;
    background-color: #f74c31;
    display: flex;
    align-items: center;
    color: #ffffff;
    padding: 0.1rem 0.3rem;
    border-radius: 30%;
    top: -1rem;
    right: -1.5rem;
  }
  .np-icon {
    position: relative;
    font-size: 3rem;
    margin-bottom: 0.3rem;
  }
  .np-title {
    .np-title-text {
      white-space: nowrap;
    }
  }
}
</style>
