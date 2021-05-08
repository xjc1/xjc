<template>
  <div class="fillcontain">
    <head-top />
    <head-search @onSearch="searchInfo" @onAdd="addInfo" />
    <div class="table_container">
      <el-table :data="tableData" highlight-current-row style="width: 100%">
        <el-table-column type="index" width="50" label="编号">
        </el-table-column>
        <el-table-column property="cname" label="院校" width="100">
        </el-table-column>
        <el-table-column property="cprovince" label="省份" width="100">
        </el-table-column>
        <el-table-column property="ckebie" label="科别"> </el-table-column>
        <el-table-column property="cpici" label="批次"> </el-table-column>
        <el-table-column property="cyear" label="年份" width="100">
        </el-table-column>
        <el-table-column property="cmax" label="最高分"> </el-table-column>
        <el-table-column property="cavg" label="平均分"> </el-table-column>
        <el-table-column property="cprorecord" label="省控线">
        </el-table-column>
      </el-table>
      <div class="Pagination" style="text-align: left; margin-top: 10px">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-size="pageSize"
          layout="total, prev, pager, next"
          :total="count"
        >
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import headTop from "@/view/components/headTop";
import headSearch from "./headSearch";
import { recommendCollegeRecord } from "@/network/collegeRecord";
export default {
  name: "professional",
  components: {
    headTop,
    headSearch
  },
  data() {
    return {
      isShowDetail: false,
      tableData: [],
      allList: [],
      queryParams: {
        cprovince: "",
        ckebie: "",
        minScore: "",
      },
      currentRow: null,
      offset: 0,
      limit: 20,
      count: 0,
      currentPage: 1,
      pageSize: 10,
      showAddProfessional: false
    };
  },
  methods: {
    async initData(params = {}) {
      const { data = [] } = await recommendCollegeRecord(params);
      this.tableData = data;
      this.allList = data;
      this.count = data.length;
      this.handleCurrentChange(this.currentPage);
      console.log("数据", data);
    },
    addInfo() {
      this.showAddProfessional = true;
    },
    closeAddProfessional() {
      this.initData(this.queryParams);
      this.showAddProfessional = false;
    },
    //搜索
    searchInfo({
      provinceValue = "",
      kebeiValue = "",
      minScore = "",
      maxScore = ""
    }) {
      if (minScore === "") {
        this.$message({
          type: "error",
          message: '请输入高考分数'
        });
        return;
      }
      this.queryParams.cprovince = provinceValue;
      this.queryParams.ckebie = kebeiValue;
      this.queryParams.minScore = minScore;
      this.initData(this.queryParams);
    },
    handleSizeChange(val) {},
    handleCurrentChange(val) {
      this.tableData = this.allList.slice(
        (val - 1) * this.pageSize,
        val * this.pageSize
      );
      this.currentPage = val;
      console.log(this.tableData);
    }
  }
};
</script>

<style lang="less">
@import "~@/style/mixin";
.table_container {
  padding: 20px;
}
</style>
