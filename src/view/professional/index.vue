<template>
  <div class="fillcontain">
    <head-top />
    <headSearch
      placeholderText="请选择院校"
      selectLabel="院校"
      contentSearchLabel="名称/学科/门类/专业代码"
      @onSearch="searchMajor"
      :allList="allCollegeList"
      @onAdd="addInfo"
    />
    <div class="table_container">
      <el-table :data="tableData" highlight-current-row style="width: 100%">
        <el-table-column type="index" width="100" label="编号">
        </el-table-column>
        <el-table-column property="name" label="名称" width="220">
        </el-table-column>
        <el-table-column property="cname" label="院校" width="220">
        </el-table-column>
        <el-table-column property="zxueke" label="学科"> </el-table-column>
        <el-table-column property="zmenlei" label="门类"> </el-table-column>
        <el-table-column property="zcode" label="代码"> </el-table-column>
        <el-table-column property="zyear" label="修业年限">
        </el-table-column>
        <el-table-column property="zbeginyear" label="开设年份">
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
    <addProfessional ref="addMajor" v-if="showAddProfessional" @closePopup="closeAddProfessional" />
  </div>
</template>

<script>
import headTop from "@/view/components/headTop";
import headSearch from "@/view/components/headSearch";
import addProfessional from "./addProfessional";
import {collegeMixin} from '@/mixins/collegeMixin'
import {
  addMajor,
  searchMajor,
  deleteMajor,
  modifyMajor
} from "@/network/major";
export default {
  mixins:[collegeMixin],
  name: "professional",
  components: {
    headTop,
    headSearch,
    addProfessional
  },
  data() {
    return {
      tableData: [],
      isShowDetail:false,
      allList: [],
      queryParams: {
        cname: "",
        name: "",
        zxueke: "",
        zmenlei: "",
        zcode: ""
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
    console.log('jjj',this.allCollegeList)
  },
  methods: {
    async initData(params = {}) {
      const { data = [] } = await searchMajor(params);
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
    searchMajor({ selectValue = "", inputValue = "" }) {
      this.queryParams.cname = selectValue;
      this.queryParams.name = inputValue;
      this.queryParams.zxueke = inputValue;
      this.queryParams.zmenlei = inputValue;
      this.queryParams.zcode = inputValue;
      this.initData(this.queryParams);
    },
    //删除
    async deleteItem({ _id = "" }) {
      const res = await deleteMajor(_id);
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
      this.showAddProfessional = true;
      console.log(val);
      this.$nextTick(() => {
        this.$refs.addMajor.initData(val,isShow)
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
