<template>
  <div class="headSearch">
    <div class="headSearch-left">
      <div class="headSearch-provinceSelect">
        <span>院校1:</span>
        <el-select v-model="params.selectValue1" clearable  placeholder="请选择院校">
          <el-option
            v-for="item in provinceList"
            :key="item._id"
            :label="item.name"
            :value="item.name"
          >
          </el-option>
        </el-select>
      </div>
      <div class="vs">VS</div>
      <div class="headSearch-provinceSelect">
        <span>院校2:</span>
        <el-select v-model="params.selectValue2" clearable  placeholder="请选择院校">
          <el-option
            v-for="item in provinceList"
            :key="item._id"
            :label="item.name"
            :value="item.name"
          >
          </el-option>
        </el-select>
      </div>
      <el-button type="info" @click="onSearch" style="margin-left:10px">对比</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: "HeadSearch",
  data() {
    return {
      params: {
        selectValue1: "",
        selectValue2: "",
      },
      provinceList: [
        {
          name: "四川大学",
          _id: "608f5d6dcf17455418672850"
        },
        {
          name: "重庆大学",
          _id: "608f5d99cf17455418672851"
        },
      ]
    };
  },
  methods: {
    onAdd() {
      this.$emit("onAdd");
    },
    onSearch() {
      this.$emit("onSearch", this.params);
    }
  }
};
</script>

<style lang="less">
.headSearch {
  padding: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .headSearch-left {
    display: flex;
    align-items: center;
  }
  .headSearch-provinceSelect {
    span {
      margin-right: 7px;
    }
  }
  .vs{
    margin:0 10px;
  }
}
</style>
