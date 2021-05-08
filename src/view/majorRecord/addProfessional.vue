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
            <el-select
              style="width:100%"
              v-model="ruleForm.cname"
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
          </el-form-item>
          <el-form-item label="专业" prop="zname">
            <el-select
              style="width:100%"
              v-model="ruleForm.zname"
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
          </el-form-item>
          <el-form-item label="省份" prop="zprovince">
            <el-select
              style="width:100%"
              v-model="ruleForm.zprovince"
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
          </el-form-item>
          <el-form-item label="科别" prop="zkebie">
            <el-select
              style="width:100%"
              v-model="ruleForm.zkebie"
              clearable
              placeholder="请选择科别"
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
          <el-form-item label="批次" prop="zpici">
            <el-select
              style="width:100%"
              v-model="ruleForm.zpici"
              clearable
              placeholder="请选择批次"
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
          <el-form-item label="年份" prop="zyear">
            <el-input v-model="ruleForm.zyear"></el-input>
          </el-form-item>
          <el-form-item label="最高分" prop="zmax">
            <el-input v-model="ruleForm.zmax"></el-input>
          </el-form-item>
          <el-form-item label="平均分" prop="zavg">
            <el-input v-model="ruleForm.zavg"></el-input>
          </el-form-item>
          <el-form-item label="省控线" prop="zprorecord">
            <el-input v-model="ruleForm.zprorecord"></el-input>
          </el-form-item>
          <el-form-item label="录取人数" prop="znum">
            <el-input v-model="ruleForm.znum"></el-input>
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
import { provinceList, keciList, piciList } from "@/utils/constant";
import { collegeMixin } from "@/mixins/collegeMixin";
import { majorMixin } from "@/mixins/majorMixin";
import crestIcon from "../../assets/siChuanIcon.jpeg";
import { addMajorRecord, modifyMajorRecord } from "@/network/majorRecord";
export default {
  mixins: [collegeMixin, majorMixin],
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
      isShowSubmit: true,
      crestIcon,
      ruleForm: {
        zid: "",
        zname: "",
        zprovince: "",
        zkebie: "",
        zpici: "",
        zyear: "",
        zmax: "",
        zavg: "",
        zprorecord: "",
        znum: "",
        cid: "",
        cname: ""
      },
      rules: {
        cname: [{ validator: validateNull, trigger: "blur" }],
        zname: [{ validator: validateNull, trigger: "blur" }],
        zprovince: [{ validator: validateNull, trigger: "blur" }],
        zkebie: [{ validator: validateNull, trigger: "blur" }],
        zpici: [{ validator: validateNull, trigger: "blur" }],
        zyear: [{ validator: validateNull, trigger: "blur" }],
        zmax: [{ validator: validateNull, trigger: "blur" }],
        zavg: [{ validator: validateNull, trigger: "blur" }],
        zprorecord: [{ validator: validateNull, trigger: "blur" }],
        znum: [{ validator: validateNull, trigger: "blur" }]
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
            zid: this.ruleForm.zid,
            zname: this.ruleForm.zname,
            zprovince: this.ruleForm.zprovince,
            zkebie: this.ruleForm.zkebie,
            zpici: this.ruleForm.zpici,
            zyear: this.ruleForm.zyear,
            zmax: this.ruleForm.zmax,
            zavg: this.ruleForm.zavg,
            cname: this.ruleForm.cname,
            cid: this.ruleForm.cid,
            zid: this.ruleForm.zid,
            zprorecord: this.ruleForm.zprorecord,
            znum: this.ruleForm.znum
          };
          console.log(obj);
          let messageStr = "新增成功";
          let res = {};
          if (this.ruleForm._id) {
            obj._id = this.ruleForm._id;
            messageStr = "修改成功";
            res = await modifyMajorRecord(obj);
          } else {
            res = await addMajorRecord(obj);
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
