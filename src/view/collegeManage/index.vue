<template>
  <div class="fillcontain">
    <head-top />
    <head-search @onAdd="addCollege" @onSearch="searchCollege" />
    <div class="table_container">
      <el-table :data="tableData" highlight-current-row style="width: 100%">
        <el-table-column type="index" width="100" label="编号">
        </el-table-column>
        <el-table-column property="clogo" label="校徽" width="220">
          <template slot-scope="scope">
            <img :src="getImg(scope.row.clogo)" class="bcg-box" />
          </template>
        </el-table-column>
        <el-table-column property="name" label="名称" width="220">
        </el-table-column>
        <el-table-column property="cprovince" label="省份"> </el-table-column>
        <el-table-column property="ctype" label="类型"> </el-table-column>
        <el-table-column property="cteshe" label="层次"> </el-table-column>
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
  </div>
</template>

<script>
import headTop from "@/view/components/headTop";
import headSearch from "@/view/components/headSearch";
import { searchCollegeInfo, deleteCollegeInfo } from "@/network/college";
import {Base64} from "js-base64";
export default {
  name: "CollegeManage",
  components: {
    headTop,
    headSearch
  },
  data() {
    return {
      queryParams: {
        cprovince: "",
        name: "",
        ctype: "",
        cteshe: "",
      },
      isShowDetail:false,
      tableData: [],
      allList: [],
      currentRow: null,
      offset: 0,
      limit: 20,
      count: 0,
      pageSize: 10,
      currentPage: 1
    };
  },
  created() {
    const {isShow = false} = this.$route.query;
    this.isShowDetail = isShow;
    console.log('this.isShowDetail',this.isShowDetail)
    this.initData(this.queryParams);
  },
  computed:{
    getImg(){
      return imgStr=> Base64.decode(imgStr)
    }
  },
  methods: {
    async initData(params = {}) {
      const { data = [] } = await searchCollegeInfo(params);
      this.tableData = data;
      this.allList = data;
      this.count = data.length;
      this.handleCurrentChange(this.currentPage);
    },
    //增加院校
    addCollege() {
      this.$router.push("/modifyCollege");
    },
    //搜索院校
    searchCollege({ selectValue = "", inputValue = "" }) {
      console.log('selectValue',selectValue,'inputValue',inputValue)
      this.queryParams.cprovince = selectValue;
      this.queryParams.name = inputValue;
      this.queryParams.ctype = inputValue;
      this.queryParams.cteshe = inputValue;
      this.initData(this.queryParams);
    },
    //删除院校
    async deleteItem({ _id = "" }) {
      const res = await deleteCollegeInfo(_id);
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
    //修改院校
    modifyItem(val = {},isShow = true) {
      console.log(val);
      this.$router.push({ name: "modifyCollege", query: { collegeInfo: val,isShow,} });
    },
    handleSizeChange(val) {},
    handleCurrentChange(val) {
      this.tableData = this.allList.slice(
        (val - 1) * this.pageSize,
        val * this.pageSize
      );
      this.currentPage = val;
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
