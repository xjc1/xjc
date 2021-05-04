<template>
  <div class="addProfessional">
    <div class="addProfessional-section">
      <div class="addProfessional-headIcon">
        <h3>新增</h3>
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
            <el-select
              v-model="ruleForm.cname"
              clearable
              placeholder="请选择院校"
              style="width:100%"
            >
              <el-option
                v-for="item in allCollegeList"
                :key="item._id"
                :label="item.name"
                :value="item.name"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="省份" prop="cprovince">
            <el-select
              v-model="ruleForm.cprovince"
              clearable
              placeholder="请选择省份"
              style="width:100%"
            >
              <el-option
                v-for="item in provinceList"
                :key="'provinceList' + item.id"
                :label="item.cprovince"
                :value="item.cprovince"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="科别" prop="ckebie">
            <el-select
              v-model="ruleForm.ckebie"
              clearable
              placeholder="请选择科别"
              style="width:100%"
            >
              <el-option
                v-for="item in keciList"
                :key="'keciList' + item.id"
                :label="item.name"
                :value="item.name"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="批次" prop="cpici">
            <el-select
              v-model="ruleForm.cpici"
              clearable
              placeholder="请选择批次"
              style="width:100%"
            >
              <el-option
                v-for="item in piciList"
                :key="'piciList' + item.id"
                :label="item.name"
                :value="item.name"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="年份" prop="cyear">
            <el-input v-model="ruleForm.cyear"></el-input>
          </el-form-item>
          <el-form-item label="最高分" prop="cmax">
            <el-input v-model="ruleForm.cmax"></el-input>
          </el-form-item>
          <el-form-item label="平均分" prop="cavg">
            <el-input v-model="ruleForm.cavg"></el-input>
          </el-form-item>
          <el-form-item label="省控线" prop="cprorecord">
            <el-input v-model="ruleForm.cprorecord"></el-input>
          </el-form-item>
          <el-form-item label="录取人数" prop="cnum">
            <el-input v-model="ruleForm.cnum"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button
              type="primary"
              @click="submitForm('ruleForm')"
              v-show="isShowSubmit"
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
import { collegeMixin } from "@/mixins/collegeMixin";
import { provinceList, keciList, piciList } from "@/utils/constant";
import { addCollegeRecord, modifyCollegeRecord } from "@/network/collegeRecord";
export default {
  mixins: [collegeMixin],
  name: "addProfessional",
  data() {
    var validateNull = (rule, value, callback) => {
      if (value === "") {
        return callback(new Error("请输入"));
      }
      callback();
    };
    return {
      provinceList,
      keciList,
      piciList,
      crestIcon,
      isShowSubmit: true,
      ruleForm: {
        cprovince: "",
        ckebie: "",
        cpici: "",
        cyear: "",
        cmax: "",
        cavg: "",
        cid: "",
        cname: "",
        cprorecord: "",
        cnum: ""
      },
      rules: {
        cprovince: [{ validator: validateNull, trigger: "blur" }],
        ckebie: [{ validator: validateNull, trigger: "blur" }],
        cpici: [{ validator: validateNull, trigger: "blur" }],
        cyear: [{ validator: validateNull, trigger: "blur" }],
        cmax: [{ validator: validateNull, trigger: "blur" }],
        cavg: [{ validator: validateNull, trigger: "blur" }],
        cname: [{ validator: validateNull, trigger: "blur" }],
        cprorecord: [{ validator: validateNull, trigger: "blur" }],
        cnum: [{ validator: validateNull, trigger: "blur" }]
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
            cprovince: this.ruleForm.cprovince,
            ckebie: this.ruleForm.ckebie,
            cpici: this.ruleForm.cpici,
            cyear: this.ruleForm.cyear,
            cmax: this.ruleForm.cmax,
            cavg: this.ruleForm.cavg,
            cname: this.ruleForm.cname,
            cid: this.ruleForm.cid,
            cprorecord: this.ruleForm.cprorecord,
            cnum: this.ruleForm.cnum
          };
          let messageStr = "新增成功";
          let res = {};
          if (this.ruleForm._id) {
            obj._id = this.ruleForm._id;
            messageStr = "修改成功";
            res = await modifyCollegeRecord(obj);
          } else {
            res = await addCollegeRecord(obj);
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
