<template>
  <div class="login_page fillcontain">
    <transition name="form-fade" mode="in-out">
      <section class="form_contianer" v-show="showLogin">
        <div class="manage_tip">
          <p>高考志愿辅助系统</p>
        </div>
        <el-form :model="loginForm" :rules="rules" ref="loginForm">
          <el-form-item prop="username">
            <el-input v-model="loginForm.username" placeholder="用户名"
              ><span>dsfsf</span></el-input
            >
          </el-form-item>
          <el-form-item prop="password">
            <el-input
              type="password"
              placeholder="密码"
              v-model="loginForm.password"
            ></el-input>
          </el-form-item>
          <el-form-item class="login-btn">
            <el-button
              type="primary"
              @click="submitForm('loginForm')"
              class="submit_btn"
              >登陆</el-button
            >
            <el-button
              type="info"
              @click="goToRegister"
              class="submit_btn"
              >用户注册</el-button
            >
          </el-form-item>
        </el-form>
        <p class="tip">&copy2021高考志愿辅助系统</p>
      </section>
    </transition>
  </div>
</template>

<script>
import { login } from "@/network/login";
import { mapMutations } from "vuex";

export default {
  data() {
    return {
      loginForm: {
        username: "",
        password: ""
      },
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" }
        ],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }]
      },
      showLogin: false
    };
  },
  mounted() {
    this.showLogin = true;
  },
  methods: {
    ...mapMutations('userInfo',["setUserInfo",'setUserPermission']),
    async submitForm(formName) {
      this.$refs[formName].validate(async valid => {
        if (valid) {
          const res = await login({
            name: this.loginForm.username,
            password: this.loginForm.password
          });
          if (res.code == 200) {
            this.$message({
              type: "success",
              message: "登录成功"
            });
            this.setUserPermission(false)
            this.setUserInfo({name:this.loginForm.username,password:this.loginForm.password})
            this.$router.push("home");
          } else {
            this.$message({
              type: "error",
              message: res.message
            });
          }
        } else {
          this.$notify.error({
            title: "错误",
            message: "请输入正确的用户名、密码",
            offset: 250
          });
          return false;
        }
      });
    },
    goToRegister(){
      this.$router.push({name:'register'})
    },
  },
};
</script>

<style lang="less" scoped>
@import "../../style/mixin.less";
.login_page {
  background-color: #324057;
}
.manage_tip {
  position: absolute;
  width: 100%;
  top: -100px;
  left: 0;
  p {
    font-size: 34px;
    color: #fff;
  }
}
.form_contianer {
  .wh(320px, 210px);
  .ctp(320px, 210px);
  padding: 25px;
  border-radius: 5px;
  text-align: center;
  background-color: #fff;
  .submit_btn {
    width: 100%;
    font-size: 16px;
  }
}
.tip {
  font-size: 12px;
  color: red;
}
.form-fade-enter-active,
.form-fade-leave-active {
  transition: all 1s;
}
.form-fade-enter,
.form-fade-leave-active {
  transform: translate3d(0, -50px, 0);
  opacity: 0;
}
.login-btn{
  /deep/.el-form-item__content{
    display: flex;
  }
  .submit_btn{
    width: 50%;
  }
}
</style>
