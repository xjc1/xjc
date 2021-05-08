<template>
  <div class="fillcontain">
    <head-top />
    <head-search @onSearch="searchInfo" />
    <div class="table_container">
      <el-table :data="tableData" highlight-current-row style="width: 100%">
        <el-table-column label="院校名称" width="250">
          <template slot-scope="scope">
            <span>{{ tableData[scope.$index].cname }}</span>
          </template>
        </el-table-column>
        <el-table-column  :label="getOneCollegeName" width="350">
          <template slot-scope="scope">
            <img :src="getImg(collegeOneList[0].clogo)"  v-if="keyList[scope.$index] == 'clogo'"  class="bcg-box" />
            <span v-else>{{ collegeOneList[0][keyList[scope.$index]] }}</span>
          </template>
        </el-table-column>
        <el-table-column property="ckebie" label="VS"> </el-table-column>
        <el-table-column  :label="getTwoCollegeName" v-if="collegeTwoList.length > 0">
          <template slot-scope="scope">
            <img :src="getImg(collegeTwoList[0].clogo)"  v-if="keyList[scope.$index] == 'clogo'" class="bcg-box" />
            <span v-else>{{ collegeTwoList[0][keyList[scope.$index]] }}</span>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import headTop from "@/view/components/headTop";
import headSearch from "./headSearch";
import { searchCompareCollegeInfo } from "@/network/college";
import {Base64} from "js-base64";
export default {
  name: "professional",
  components: {
    headTop,
    headSearch
  },
  data() {
    return {
      keyList: [
        "clogo",
        "cprovince",
        "caddress",
        "ctype",
        "cteshe",
        "cfeatures",
        "cdesc"
      ],
      constantList: [
        {
          cname: "校徽"
        },
        { cname: "省份" },
        { cname: "地址" },
        { cname: "类型" },
        { cname: "层次" },
        { cname: "特色" },
        { cname: "简介" }
      ],
      tableData: [],
      collegeOneList: [],
      collegeTwoList: []
    };
  },
  computed:{
    getImg(){
      return imgStr=> Base64.decode(imgStr)
    },
    getOneCollegeName(){
      return this.collegeOneList[0]?this.collegeOneList[0].name:''
    },
    getTwoCollegeName(){
      return this.collegeTwoList[0]?this.collegeTwoList[0].name:''
    },
  },
  methods: {
    //搜索
    async searchInfo({ selectValue1 = "", selectValue2 = "" }) {
      if (selectValue1 == "" || selectValue2 == "") {
        this.$message({
          type: "error",
          message: "请选择对比院校"
        });
        return;
      }
      const { data = [] } = await searchCompareCollegeInfo({ name: selectValue1 });
      const { data: data2 } = await searchCompareCollegeInfo({ name: selectValue2 });
      this.collegeOneList = data;
      this.collegeTwoList = data2;
      console.log(this.collegeOneList);
      this.tableData = [];
      this.tableData = [...this.constantList];
      this.$forceUpdate();
    }
  }
};
</script>

<style lang="less">
@import "~@/style/mixin";
.table_container {
  padding: 20px;
  img{
    width: 100px;
    height: 100px;
  }
}
</style>
