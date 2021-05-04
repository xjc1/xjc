<template>
  <div class="headSearch">
    <div class="headSearch-left">
      <div class="headSearch-provinceSelect">
        <span>{{ selectLabel }}:</span>
        <el-select v-model="params.selectValue" clearable  :placeholder="placeholderText">
          <el-option
            v-if="allList.length>0"
            v-for="item in allList"
            :key=" item._id"
            :label="item.name"
            :value="item.name"
          >
          </el-option>
           <el-option
            v-if="allList.length==0"
            v-for="item in provinceList"
            :key="item.id || item._id"
            :label="item.cprovince"
            :value="item.cprovince"
          >
          </el-option>
        </el-select>
      </div>
      <div class="headSearch-contentSearch">
        <span>{{ contentSearchLabel }}:</span>
        <el-input v-model="params.inputValue" placeholder="请输入内容"></el-input>
      </div>
      <el-button type="info" @click="onSearch">搜素</el-button>
    </div>
    <div class="headSearch-right" @click="onAdd">
      <div><el-button type="info">新增</el-button></div>
    </div>
  </div>
</template>

<script>
import {provinceList} from '@/utils/constant'
export default {
  name: "headSearch",
  props: {
    allList:{
      type: Array,
      default:()=> []
    },
    placeholderText: {
      type: String,
      default: "请选择省份"
    },
    selectLabel: {
      type: String,
      default: "省份"
    },
    contentSearchLabel: {
      type: String,
      default: "名称/分类/层次"
    }
  },
  data() {
    return {
      params:{
        selectValue:'',
        inputValue:'',
      },
      provinceList,
    };
  },
  methods:{
    onAdd(){
      this.$emit('onAdd')
    },
    onSearch(){
      console.log('selectValue',this.params.selectValue,'inputValue',this.params.inputValue)
      this.$emit('onSearch',this.params)
    }
  },
  computed:{
    getValue(){

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
  .headSearch-provinceSelect{
    span{
      margin-right: 7px;
    }
  }
  .headSearch-contentSearch {
    margin: 0 20px;
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
