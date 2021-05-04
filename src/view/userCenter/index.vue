<template>
  <div class="fillcontain">
    <head-top />
    <div class="table_container">
      <el-table :data="tableData" highlight-current-row style="width: 100%">
        <el-table-column type="index" width="50" label="编号">
        </el-table-column>
        <el-table-column property="name" label="用户名" width="100">
        </el-table-column>
        <el-table-column property="realName" label="真实姓名" width="100">
        </el-table-column>
        <el-table-column property="telPhone" label="电话"> </el-table-column>
        <el-table-column property="createTime" label="注册时间">
        </el-table-column>
        <el-table-column property="role" label="身份" width="100">
        </el-table-column>

        <el-table-column label="操作" width="100">
          <template slot-scope="scope">
            <el-button  plain size="small"  icon="el-icon-delete"  @click="deleteItem(scope.row)"
              >删除</el-button
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
import { serachUserList,deletUser } from "@/network/login";
export default {
  name: "professional",
  components: {
    headTop
  },
  data() {
    return {
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
    this.initData();
  },
  methods: {
    async initData(params = {}) {
      let { data = [] } = await serachUserList(params);
      data = data.map(item => {
        item.role = item.role == "user" ? "用户" : "管理员";
        return item;
      });
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
      this.initData();
      this.showAddProfessional = false;
    },
    //搜素
    searchInfo({ selectValue = "", inputValue = "" }) {
      this.queryParams.cid = selectValue;
      this.queryParams.ckebie = inputValue;
      this.queryParams.cpici = inputValue;
      this.queryParams.cyear = inputValue;
      this.initData();
    },
    //删除
    async deleteItem({ _id = "" }) {
      const res = await deletUser(_id);
      console.log("res", res);
      if (res.code == 200) {
        this.$message({
          type: "success",
          message: "删除成功"
        });
        setTimeout(() => {
          this.initData();
        }, 500);
      } else {
        this.$message({
          type: "error",
          message: res.message
        });
      }
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
