<template>
  <div class="addProfessional">
    <div class="addProfessional-section">
      <div class="addProfessional-headIcon">
        <img :src="crestIcon" />
      </div>
      <div class="addProfessional-content">
        <el-form
          :model="ruleForm"
          status-icon
          :rules="rules"
          ref="ruleForm"
          label-width="100px"
          class="demo-ruleForm"
        >
          <el-form-item label="院校" prop="cname">
        <el-select v-model="ruleForm.cname" clearable  placeholder="请选择院校" style="width:100%">
          <el-option
            v-for="item in allCollegeList"
            :key=" item._id"
            :label="item.name"
            :value="item.name"
          >
          </el-option>
        </el-select>
          </el-form-item>
          <el-form-item label="名称" prop="name">
            <el-input v-model="ruleForm.name" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="学科" prop="zxueke">
            <el-input v-model="ruleForm.zxueke" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="门类" prop="zmenlei">
            <el-input v-model.number="ruleForm.zmenlei"></el-input>
          </el-form-item>
          <el-form-item label="代码" prop="zcode">
            <el-input v-model="ruleForm.zcode"></el-input>
          </el-form-item>
          <el-form-item label="修业年限" prop="zyear">
            <el-input v-model="ruleForm.zyear"></el-input>
          </el-form-item>
          <el-form-item label="开设年份" prop="zbeginyear">
            <el-input v-model="ruleForm.zbeginyear"></el-input>
          </el-form-item>
          <el-form-item label="描述" prop="zdesc">
            <el-input v-model="ruleForm.zdesc"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')" v-show="isShowSubmit"
              >提交保存</el-button
            >
            <el-button @click="resetForm('ruleForm')">返回</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import crestIcon from "../../assets/siChuanIcon.jpeg";
import { addMajor, modifyMajor } from "@/network/major";
import {collegeMixin} from '@/mixins/collegeMixin'
export default {
  mixins:[collegeMixin],
  name: "addProfessional",
  data() {
    var validateNull = (rule, value, callback) => {
      if (value === "") {
        return callback(new Error("请输入"));
      }
      callback();
    };
    return {
      crestIcon,
      isShowSubmit: true,
      ruleForm: {
        cid: "",
        cname: "",
        name: "",
        zxueke: "",
        zmenlei: "",
        zcode: "",
        zyear: "",
        zbeginyear: "",
        zdesc: ""
      },
      rules: {
        cname: [{ validator: validateNull, trigger: "blur" }],
        name: [{ validator: validateNull, trigger: "blur" }],
        zxueke: [{ validator: validateNull, trigger: "blur" }],
        zmenlei: [{ validator: validateNull, trigger: "blur" }],
        zcode: [{ validator: validateNull, trigger: "blur" }],
        zyear: [{ validator: validateNull, trigger: "blur" }],
        zbeginyear: [{ validator: validateNull, trigger: "blur" }],
        zdesc: [{ validator: validateNull, trigger: "blur" }]
      }
    };
  },
  methods: {
    initData(majorInfo = {}, isShow) {
      this.isShowSubmit = isShow;
      if (!majorInfo._id) return;
      for (let key in majorInfo) {
        this.ruleForm[key] = majorInfo[key];
      }
    },
    submitForm(formName) {
      this.$refs[formName].validate(async (valid, submitData) => {
        if (valid) {
          console.log("ruleForm", this.ruleForm);
          const obj = {
            cid: this.ruleForm.cid,
            cname: this.ruleForm.cname,
            name: this.ruleForm.name,
            zxueke: this.ruleForm.zxueke,
            zmenlei: this.ruleForm.zmenlei,
            zcode: this.ruleForm.zcode,
            zyear: this.ruleForm.zyear,
            zbeginyear: this.ruleForm.zbeginyear,
            zdesc: this.ruleForm.zdesc
          };
          let messageStr = "新增成功";
          let res = {};
          if (this.ruleForm._id) {
            obj._id = this.ruleForm._id;
            messageStr = "修改成功";
            res = await modifyMajor(obj);
          } else {
            res = await addMajor(obj);
          }
          if (res.code == 200) {
            this.$message({
              type: "success",
              message: messageStr
            });
            setTimeout(() => {
              this.resetForm();
            }, 1000);
          } else {
            this.$message({
              type: "error",
              message: res.message
            });
          }
        } else {
          this.$notify.error({
            title: "错误",
            message: "请填写正确的专业信息",
            offset: 100
          });
          return false;
        }
      });
    },
    resetForm() {
      this.$emit("closePopup");
    }
  }
};
</script>
<style lang="less" scoped>
.addProfessional {
  position: fixed;
  background: rgba(72, 87, 106, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 100;
  width: 100%;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
  .addProfessional-section {
    width: 400px;
    background-color: #f8f8f8;
    .addProfessional-headIcon {
      margin-top: 20px;
      margin-bottom: 10px;
      display: flex;
      justify-content: center;
      img {
        width: 100px;
      }
    }
    .addProfessional-content {
      display: flex;
      justify-content: center;
      /deep/.el-form {
        width: 350px;
      }
      /deep/.el-form-item {
        margin-bottom: 5px;
      }
    }
  }
}
</style>
