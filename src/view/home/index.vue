<template>
  <div class="manage_page fillcontain">
    <el-row style="height: 100%;">
      <el-col :span="4" style="min-height: 100%;background:#324057">
        <el-menu
          :default-active="defaultActive"
          style="min-height: 100%;background:#324057"
          router
        >
          <el-menu-item index="home"
            ><i class="el-icon-menu"></i>首页</el-menu-item
          >
          <el-submenu index="2" v-if="isAdmin">
            <template slot="title"
              ><i class="el-icon-document"></i>管理员</template
            >
            <el-menu-item index="collegeManage">院校管理</el-menu-item>
            <el-menu-item index="professional">专业管理</el-menu-item>
            <el-menu-item index="colleRecord">院校分数线管理</el-menu-item>
            <el-menu-item index="majorRecord">专业分数线管理</el-menu-item>
            <el-menu-item index="userCenter">用户管理</el-menu-item>
          </el-submenu>
          <el-submenu index="3" v-if="!isAdmin">
            <template slot="title"
              ><i class="el-icon-document"></i>用户</template
            >
            <el-menu-item index="searchCollege" :route="{ path: 'searchCollege', query: { isShow: true } }">查询院校</el-menu-item>
            <el-menu-item index="searchProfessional" :route="{ path: 'searchProfessional', query: { isShow: true } }">查询专业</el-menu-item>
            <el-menu-item index="searchColleRecord" :route="{ path: 'searchColleRecord', query: { isShow: true } }">查询院校分数线</el-menu-item>
            <el-menu-item index="searchMajorRecord" :route="{ path: 'searchMajorRecord', query: { isShow: true } }">查询专业分数线</el-menu-item>
            <el-menu-item index="compareCollege">院校对比</el-menu-item>
          </el-submenu>
          <el-submenu index="4">
            <template slot="title"
              ><i class="el-icon-document"></i>系统管理</template
            >
            <el-menu-item index="/">退出</el-menu-item>
          </el-submenu>
        </el-menu>
      </el-col>
      <el-col :span="20" style="height: 100%;overflow: auto;">
        <!-- <keep-alive>
          <router-view
            v-if="$route.meta && $route.meta.keepAlive"
            class="route-translate"
          ></router-view>
        </keep-alive> -->

        <router-view
          class="route-translate"
        ></router-view>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { mapState } from "vuex";
import {userMixin} from '@/mixins/userMixin'
export default {
  mixins:[userMixin],
  name: "home",
  computed: {
    ...mapState("userInfo", ["userInfo"]),
    defaultActive: function() {
      return this.$route.path.replace("/", "");
    }
  },
  mounted() {
    console.log("userInfo", this.userInfo);
  }
};
</script>

<style lang="less" scoped>
@import "~@/style/mixin";

</style>
