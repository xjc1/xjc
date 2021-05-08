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
        <el-table-column property="zname" label="专业名称" width="100">
        </el-table-column>
        <el-table-column property="zprovince" label="省份"> </el-table-column>
        <el-table-column property="zkebie" label="科别"> </el-table-column>
        <el-table-column property="zpici" label="批次" width="100">
        </el-table-column>
        <el-table-column property="zyear" label="年份"> </el-table-column>
        <el-table-column property="zmax" label="最高分"> </el-table-column>
        <el-table-column property="zavg" label="平均分"> </el-table-column>
        <el-table-column property="zprorecord" label="省控线">
        </el-table-column>
        <el-table-column property="znum" label="录取人数" width="100">
        </el-table-column>
        <el-table-column label="操作" width="200">
          <template slot-scope="scope">
            <el-button
              plain
              size="small"
              icon="el-icon-edit"
              @click="modifyItem(scope.row)"
              v-show="!isShowDetail"
              >修改</el-button
            >
            <el-button
              plain
              size="small"
              icon="el-icon-delete"
              @click="deleteItem(scope.row)"
              v-show="!isShowDetail"
              >删除</el-button
            >
            <el-button
              plain
              size="small"
              icon="el-icon-edit"
              @click="modifyItem(scope.row, false)"
              v-show="isShowDetail"
              >详情</el-button
            >
          </template>
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
    <addProfessional
      ref="addMajor"
      v-if="showAddProfessional"
      @closePopup="closeAddProfessional"
    />
  </div>
</template>

<script>
import headTop from "@/view/components/headTop";
import headSearch from "./headSearch";
import addProfessional from "./addProfessional";
import { searchMajorRecord, deleteMajorRecord } from "@/network/majorRecord";
export default {
  name: "professional",
  components: {
    headTop,
    headSearch,
    addProfessional
  },
  data() {
    return {
      isShowDetail: false,
      tableData: [],
      allList: [],
      queryParams: {
        cname: "",
        zname: "",
        zprovince: "",
        zkebie: "",
        zpici: "",
        zyear: ""
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
  created() {
    const { isShow = false } = this.$route.query;
    this.isShowDetail = isShow;
    this.initData(this.queryParams);
  },
  methods: {
    async initData(params = {}) {
      const { data = [] } = await searchMajorRecord(params);
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
      selectValue1 = "",
      selectValue2 = "",
      selectValue3 = "",
      selectValue4 = "",
      selectValue5 = "",
      inputValue = ""
    }) {
      this.queryParams.cname = selectValue1;
      this.queryParams.zname = selectValue2;
      this.queryParams.zprovince = selectValue3;
      this.queryParams.zkebie = selectValue4;
      this.queryParams.zpici = selectValue5;
      this.queryParams.zyear = inputValue;
      this.initData(this.queryParams);
    },
    //删除
    async deleteItem({ _id = "" }) {
      const res = await deleteMajorRecord(_id);
      console.log("res", res);
      if (res.code == 200) {
        this.$message({
          type: "success",
          message: "删除成功"
        });
        setTimeout(() => {
          this.initData(this.queryParams);
        }, 500);
      } else {
        this.$message({
          type: "error",
          message: res.message
        });
      }
    },
    //修改
    modifyItem(val = {}, isShow = true) {
      this.showAddProfessional = true;
      console.log(val);
      this.$nextTick(() => {
        this.$refs.addMajor.initData(val, isShow);
      });
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
