<template>
  <div class="register">
    <div class="register-title">用户注册</div>
    <div class="register-content">
      <el-form
        :model="ruleForm"
        status-icon
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="用户名：" prop="userName">
          <el-input v-model="ruleForm.userName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码：" prop="pass">
          <el-input
            type="password"
            v-model="ruleForm.pass"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="确认密码：" prop="checkPass">
          <el-input
            type="password"
            v-model="ruleForm.checkPass"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="电话：" prop="tel">
          <el-input v-model.number="ruleForm.tel"></el-input>
        </el-form-item>
        <el-form-item label="真实姓名：" prop="realName">
          <el-input v-model="ruleForm.realName"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')"
            >提交</el-button
          >
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { register } from "@/network/login";
import moment from "moment";
export default {
  name: "register",
  data() {
    var checkUserName = (rule, value, callback) => {
      if (value === "") {
        return callback(new Error("请输入用户名"));
      }
      callback();
    };
    var checkTel = (rule, value, callback) => {
      if (value === "") {
        return callback(new Error("请输入电话"));
      }
      callback();
    };
    var checkRealName = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入真实姓名"));
      }
      callback();
    };
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.ruleForm.checkPass !== "") {
          this.$refs.ruleForm.validateField("checkPass");
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.ruleForm.pass) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      ruleForm: {
        pass: "",
        checkPass: "",
        userName: "",
        tel: "",
        realName: ""
      },
      rules: {
        pass: [{ validator: validatePass, trigger: "blur" }],
        checkPass: [{ validator: validatePass2, trigger: "blur" }],
        userName: [{ validator: checkUserName, trigger: "blur" }],
        tel: [{ validator: checkTel, trigger: "blur" }],
        realName: [{ validator: checkRealName, trigger: "blur" }]
      }
    };
  },
  methods: {
    async submitForm(formName) {
      this.$refs[formName].validate(async (valid, submitData) => {
        if (valid) {
          console.log(this.ruleForm);
          const createTime = moment()
            .locale("zh-cn")
            .format("YYYY-MM-DD HH:mm:ss");
          const res = await register({
            name: this.ruleForm.userName,
            realName: this.ruleForm.realName,
            password: this.ruleForm.pass,
            telPhone: this.ruleForm.tel,
            createTime
          });
          if (res.code == 200) {
            this.$message({
              type: "success",
              message: "注册成功"
            });
            this.$router.push({ name: "login" });
          } else {
            this.$message({
              type: "error",
              message: res.message
            });
          }
        } else {
          this.$message({
            type: "success",
            message: "注册失败"
          });
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
};
</script>

<style lang="less" scoped>
.register {
  .register-title {
    font-weight: 600;
    font-size: 18px;
    text-align: center;
    line-height: 24px;
    padding: 20px;
  }
  .register-content {
    display: flex;
    justify-content: center;
    margin: 0 auto;
    /deep/.el-form {
      width: 400px;
    }
  }
}
</style>
