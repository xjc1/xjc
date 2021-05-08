<template>
  <div class="headSearch">
    <div class="headSearch-left">
      <div class="headSearch-provinceSelect">
        <span>省份:</span>
        <el-select
          v-model="params.provinceValue"
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
        <el-select v-model="params.kebeiValue" clearable placeholder="全部" style="width:100px">
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
        <span>高考分数:</span>
        <el-input v-model.number="params.minScore" placeholder="请输入高考分数"  style="width:150px"></el-input>
      </div>
      <el-button type="info" @click="onSearch">搜索</el-button>
    </div>
    <div class="headSearch-right" @click="onAdd" v-if="isAdmin">
      <div><el-button type="info">新增</el-button></div>
    </div>
  </div>
</template>

<script>
import { provinceList, keciList, piciList } from "@/utils/constant";
import { collegeMixin } from "@/mixins/collegeMixin";
import { majorMixin } from "@/mixins/majorMixin";
import { mapState} from "vuex";
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
        provinceValue: "",
        kebeiValue: "",
        minScore: "",
        maxScore: "",
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
      this.$emit("onSearch", this.params);
    },
    setMaxValue(){
      this.params.maxScore = this.params.maxScore<this.params.minScore?this.params.minScore:this.params.maxScore;
    }
  },
  computed: {
    ...mapState("userInfo", ["isAdmin"]),
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
