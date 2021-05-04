<template>
  <div class="fillcontain">
    <head-top />
    <head-search
      @onSearch="searchInfo"
      @onAdd="addInfo"
    />
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
        <el-table-column property="cnum" label="录取人数" width="100">
        </el-table-column>
        <el-table-column label="操作" width="200">
          <template slot-scope="scope">
            <el-button plain size="small" icon="el-icon-edit" @click="modifyItem(scope.row)" v-show="!isShowDetail"
              >修改</el-button
            >
            <el-button plain size="small"  icon="el-icon-delete" @click="deleteItem(scope.row)" v-show="!isShowDetail"
              >删除</el-button
            >
            <el-button plain size="small" icon="el-icon-edit" @click="modifyItem(scope.row,false)" v-show="isShowDetail"
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
import {
  searchCollegeRecord,
  deleteCollegeRecord
} from "@/network/collegeRecord";
export default {
  name: "professional",
  components: {
    headTop,
    headSearch,
    addProfessional
  },
  data() {
    return {
      isShowDetail:false,
      tableData: [],
      allList: [],
      queryParams: {
        cid: "",
        ckebie: "",
        cpici: "",
        cyear: ""
      },
      currentRow: null,
      offset: 0,
      limit: 20,
      count: 0,
      currentPage: 1,
      pageSize: 1,
      showAddProfessional: false
    };
  },
  created() {
    const {isShow = false} = this.$route.query;
    this.isShowDetail = isShow;
    this.initData(this.queryParams);
  },
  methods: {
    async initData(params = {}) {
      const { data = [] } = await searchCollegeRecord(params);
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
    //搜素
    searchInfo({ selectValue = "",selectValue2 = "",selectValue3 = "", inputValue = "" }) {
      this.queryParams.cprovince = selectValue;
      this.queryParams.ckebie = selectValue2;
      this.queryParams.cpici = selectValue3;
      this.queryParams.cyear = inputValue;
      this.initData(this.queryParams);
    },
    //删除
    async deleteItem({ _id = "" }) {
      const res = await deleteCollegeRecord(_id);
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
    modifyItem(val = {},isShow = true) {
      console.log(val);
      this.showAddProfessional = true;
      this.$nextTick(() => {
        this.$refs.addMajor.initData(val,isShow);
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
