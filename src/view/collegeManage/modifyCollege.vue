<template>
  <div class="modifyCollege">
    <head-top />
    <div class="modifyCollege-headIcon">
      <!-- <img :src="crestIcon" /> -->
    </div>
    <div class="modifyCollege-content">
      <el-form
        :model="ruleForm"
        status-icon
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="名称" prop="name">
          <el-input v-model="ruleForm.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="所属省份" prop="cprovince">
          <!-- <el-input v-model="ruleForm.cprovince" autocomplete="off"></el-input> -->
          <el-select
            v-model="ruleForm.cprovince"
            placeholder="请选择省份"
            style="width:100%"
          >
            <el-option
              v-for="item in provinceList"
              :key="item.id"
              :label="item.cprovince"
              :value="item.cprovince"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="校徽图片" prop="clogo">
          <!-- <el-input
            v-model="ruleForm.clogo"
            autocomplete="off"
            readonly
          ></el-input> -->
          <el-upload
            class="upload-demo"
            :auto-upload="false"
            action="#"
            :on-change="getFile"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :limit="1"
            :on-exceed="handleExceed"
            :file-list="fileList"
          >
            <el-button size="small" type="primary">点击上传</el-button>
          </el-upload>
        </el-form-item>
        <el-form-item label="院校分类" prop="ctype">
          <el-input v-model.number="ruleForm.ctype"></el-input>
        </el-form-item>
        <el-form-item label="院校层次" prop="cteshe">
          <el-input v-model="ruleForm.cteshe"></el-input>
        </el-form-item>
        <el-form-item label="院校特色" prop="cfeatures">
          <el-input v-model="ruleForm.cfeatures"></el-input>
        </el-form-item>
        <el-form-item label="院校地址" prop="caddress">
          <el-input v-model="ruleForm.caddress"></el-input>
        </el-form-item>
        <el-form-item label="描述" prop="cdesc">
          <el-input v-model="ruleForm.cdesc"></el-input>
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
</template>

<script>
import headTop from "@/view/components/headTop";
import crestIcon from "../../assets/siChuanIcon.jpeg";
import { addCollegeInfo, modifyCollegeInfo } from "@/network/college";
import { provinceList } from "@/utils/constant";
import {Base64} from 'js-base64'
export default {
  name: "modifyCollege",
  components: {
    headTop
  },
  data() {
    var validateNull = (rule, value, callback) => {
      if (value === "") {
        return callback(new Error("请输入"));
      }
      callback();
    };
    return {
      fileList: [],
      provinceList,
      crestIcon,
      isShowSubmit: true,
      ruleForm: {
        name: "",
        cprovince: "",
        caddress: "",
        ctype: "",
        clevel: "",
        clogo: "",
        cteshe: "",
        cdesc: "",
        cfeatures: ""
      },
      rules: {
        name: [{ validator: validateNull, trigger: "blur" }],
        cprovince: [{ validator: validateNull, trigger: "blur" }],
        caddress: [{ validator: validateNull, trigger: "blur" }],
        ctype: [{ validator: validateNull, trigger: "blur" }],
        clevel: [{ validator: validateNull, trigger: "blur" }],
        cteshe: [{ validator: validateNull, trigger: "blur" }],
        cdesc: [{ validator: validateNull, trigger: "blur" }],
        cfeatures: [{ validator: validateNull, trigger: "blur" }]
      }
    };
  },
  created() {
    const { collegeInfo = {}, isShow = true } = this.$route.query;
    this.isShowSubmit = isShow;
    if (!collegeInfo._id) return;
    for (let key in collegeInfo) {
      this.ruleForm[key] = collegeInfo[key];
    }
  },
  methods: {
    handleRemove(file, fileList) {
    },
    handlePreview(file) {
    },
    handleExceed(files, fileList) {
      this.$message.warning(
        `当前限制选择 1 个文件，本次选择了 ${
          files.length
        } 个文件，共选择了 ${files.length + fileList.length} 个文件`
      );
    },
    getFile(file) {
      this.getBase64(file.raw).then(res => {
       const imgStr= Base64.encode(res)
        this.ruleForm.clogo = imgStr;
      });
    },
    getBase64(file) {
      return new Promise(function(resolve, reject) {
        let reader = new FileReader();
        let imgResult = "";
        reader.readAsDataURL(file);
        reader.onload = function() {
          imgResult = reader.result;
        };
        reader.onerror = function(error) {
          reject(error);
        };
        reader.onloadend = function() {
          resolve(imgResult);
        };
      });
    },

    async submitForm(formName) {
      this.$refs[formName].validate(async (valid, submitData) => {
        if (valid) {
          console.log("ruleForm", this.ruleForm);
          const obj = {
            name: this.ruleForm.name,
            cprovince: this.ruleForm.cprovince,
            caddress: this.ruleForm.caddress,
            ctype: this.ruleForm.ctype,
            clevel: this.ruleForm.clevel,
            clogo: this.ruleForm.clogo,
            cteshe: this.ruleForm.cteshe,
            cdesc: this.ruleForm.cdesc,
            cfeatures: this.ruleForm.cfeatures
          };
          let messageStr = "新增成功";
          let res = {};
          if (this.ruleForm._id) {
            obj._id = this.ruleForm._id;
            messageStr = "修改成功";
            res = await modifyCollegeInfo(obj);
          } else {
            res = await addCollegeInfo(obj);
          }
          if (res.code == 200) {
            this.$message({
              type: "success",
              message: messageStr
            });
            setTimeout(() => {
              this.$router.push("collegeManage");
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
            message: "请填写正确的院校信息",
            offset: 100
          });
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
      this.$router.go(-1);
    }
  }
};
</script>
<style lang="less" scoped>
.modifyCollege {
  .modifyCollege-headIcon {
    margin-top: 20px;
    margin-bottom: 10px;
    display: flex;
    justify-content: center;
    img {
      width: 150px;
    }
  }
  .modifyCollege-content {
    display: flex;
    justify-content: center;
    /deep/.el-form {
      width: 400px;
    }
  }
}
</style>
