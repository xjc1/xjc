<template>
  <div class="headSearch">
    <div class="headSearch-left">
      <div class="headSearch-provinceSelect">
        <span>院校:</span>
        <el-select
          v-model="params.selectValue1"
          clearable
          placeholder="请选择院校"
        >
          <el-option
            v-for="item in allCollegeList"
            :key="'allCollegeList' + item._id"
            :label="item.name"
            :value="item.name"
          >
          </el-option>
        </el-select>
      </div>
      <div class="headSearch-provinceSelect">
        <span>专业:</span>
        <el-select
          v-model="params.selectValue2"
          clearable
          placeholder="请选择专业"
        >
          <el-option
            v-for="item in allMajorList"
            :key="'allMajorList' + item._id"
            :label="item.name"
            :value="item.name"
          >
          </el-option>
        </el-select>
      </div>
      <div class="headSearch-provinceSelect">
        <span>省份:</span>
        <el-select
          v-model="params.selectValue3"
          clearable
          placeholder="请选择省份"
        >
          <el-option
            v-for="item in provinceList"
            :key="'provinceList' + item.id"
            :label="item.cprovince"
            :value="item.cprovince"
          >
          </el-option>
        </el-select>
      </div>
      <div class="headSearch-provinceSelect">
        <span>科别:</span>
        <el-select v-model="params.selectValue4" clearable placeholder="全部">
          <el-option
            v-for="item in keciList"
            :key="'keciList' + item.id"
            :label="item.name"
            :value="item.name"
          >
          </el-option>
        </el-select>
      </div>
      <div class="headSearch-provinceSelect">
        <span>批次:</span>
        <el-select
          v-model="params.selectValue5"
          clearable
          placeholder="全部"
        >
          <el-option
            v-for="item in piciList"
            :key="'piciList' + item.id"
            :label="item.name"
            :value="item.name"
          >
          </el-option>
        </el-select>
      </div>
      <div class="headSearch-contentSearch">
        <span>年份:</span>
        <el-input
          v-model="params.inputValue"
          placeholder="请输入年份"
        ></el-input>
      </div>
      <el-button type="info" @click="onSearch">搜素</el-button>
    </div>
    <div class="headSearch-right" @click="onAdd">
      <div><el-button type="info">新增</el-button></div>
    </div>
  </div>
</template>

<script>
import { provinceList, keciList, piciList } from "@/utils/constant";
import { collegeMixin } from "@/mixins/collegeMixin";
import { majorMixin } from "@/mixins/majorMixin";
export default {
  mixins: [collegeMixin, majorMixin],
  name: "HeadSearch",
  props: {
    placeholderText: {
      type: String,
      default: "请选择省份"
    },
    selectLabel: {
      type: String,
      default: "省份"
    }
  },
  data() {
    return {
      params: {
        selectValue1: "",
        selectValue2: "",
        selectValue3: "",
        selectValue4: "",
        selectValue5: "",
        inputValue: ""
      },
      provinceList,
      keciList,
      piciList
    };
  },
  methods: {
    onAdd() {
      this.$emit("onAdd");
    },
    onSearch() {
      console.log(
        "selectValue",
        this.params.selectValue,
        "inputValue",
        this.params.inputValue
      );
      this.$emit("onSearch", this.params);
    }
  },
  computed: {
    getValue() {}
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
    flex-wrap: wrap;
    align-items: center;
  }
  .headSearch-provinceSelect {
    margin-right: 10px;
    margin-bottom: 10px;
    span {
      margin-right: 7px;
    }
  }
  .headSearch-contentSearch {
    margin-right: 20px;
    display: flex;
    span {
      display: block;
      white-space: nowrap;
      line-height: 40px;
      margin-right: 7px;
    }
  }
}
</style>
