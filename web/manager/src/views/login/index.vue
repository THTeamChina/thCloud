<template>
  <div class="login-container">
    <div class="sky">
      <div class="clouds_one"></div>
      <div class="clouds_two"></div>
      <div class="clouds_three"></div>
      <div class="zhu_c"></div>
      <el-form class="login-form" autoComplete="on" :model="loginForm" :rules="loginRules" ref="loginForm" label-position="left">
        <div class="title-container">
          <h3 class="title">菲佣后台管理系统 </h3>
        </div>
        <el-form-item prop="username">
          <span class="svg-container svg-container_login">
            <svg-icon icon-class="user" />
          </span>
          <el-input name="username" type="text" v-model="loginForm.username" autoComplete="on" :placeholder="$t('login.username')" />
        </el-form-item>

        <el-form-item prop="password">
          <span class="svg-container">
            <svg-icon icon-class="password" />
          </span>
          <el-input name="password" :type="passwordType" @keyup.enter.native="handleLogin" v-model="loginForm.password" autoComplete="on" :placeholder="$t('login.password')" />
          <span class="show-pwd" @click="showPwd">
            <svg-icon icon-class="eye" />
          </span>
        </el-form-item>

        <el-button type="primary" style="width:100%;margin-bottom:30px;position:relative" :loading="loading" @click.native.prevent="handleLogin">{{$t('login.logIn')}}</el-button>

      </el-form>
    </div>


  </div>
</template>

<script>
  import { isvalidUsername } from '@/utils/validate'

  export default {
    name: 'login',
    data() {
      const validateUsername = (rule, value, callback) => {
        if (!isvalidUsername(value)) {
          callback(new Error(this.$t('login.validate.username')))
        } else {
          callback()
        }
      }
      const validatePassword = (rule, value, callback) => {
        // if (value.length < 6) {
        //   callback(new Error(this.$t('login.validate.password')))
        // } else {
          callback()
        // }
      }
      return {
        loginForm: {
          username: '',
          password: ''
        },
        loginRules: {
          username: [{ required: true, trigger: 'blur', validator: validateUsername }],
          password: [{ required: true, trigger: 'blur', validator: validatePassword }]
        },
        passwordType: 'password',
        loading: false,
        showDialog: false
      }
    },
    methods: {
      showPwd() {
        if (this.passwordType === 'password') {
          this.passwordType = ''
        } else {
          this.passwordType = 'password'
        }
      },
      handleLogin() {
        this.$refs.loginForm.validate(valid => {
          if (valid) {
            this.loading = true
            this.$store.dispatch('Login', this.loginForm).then(() => {
              this.loading = false
              this.$router.push({ path: '/' })
            }).catch(() => {
              this.loading = false
              this.$message({
                message: this.$t('login.result.invaid'),
                type: 'error',
                duration: 5 * 1000
              })
            })
          } else {
            console.log('error submit!!')
            return false
          }
        })
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss">
  @import './index.scss';
</style>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import './index.scoped.scss';
</style>
<style scoped>

  .sky {
    height: 100vh;
    background: #007fd5;
    position: relative;
    overflow: hidden;
    -webkit-animation: sky_background 50s ease-out infinite;
    -moz-animation: sky_background 50s ease-out infinite;
    -o-animation: sky_background 50s ease-out infinite;
    animation: sky_background 50s ease-out infinite;
    -webkit-transform: translate3d(0, 0, 0);
    -ms-transform: translate3d(0, 0, 0);
    -o-transform: translate3d(0, 0, 0);
    transform: translate3d(0, 0, 0);
  }

  .zhu_c {
    background: url("img/zhu.png") no-repeat;
    background-size: contain;
    position: absolute;
    width: 100%;
    height: 27%;
    vertical-align: bottom;
    bottom: 0px;
  }

  .clouds_one {
    background: url("img/cloud_one.png") repeat-x;
    position: absolute;
    left: 0;
    top: -10%;
    height: 100%;
    width: 300%;
    -webkit-animation: cloud_one 50s linear infinite;
    -moz-animation: cloud_one 50s linear infinite;
    -o-animation: cloud_one 50s linear infinite;
    animation: cloud_one 50s linear infinite;
    -webkit-transform: translate3d(0, 0, 0);
    -ms-transform: translate3d(0, 0, 0);
    -o-transform: translate3d(0, 0, 0);
    transform: translate3d(0, 0, 0);
  }

  .clouds_two {
    background: url("img/cloud_two.png") repeat-x;
    position: absolute;
    left: 0;
    top: -10%;
    height: 100%;
    width: 300%;
    -webkit-animation: cloud_two 75s linear infinite;
    -moz-animation: cloud_two 75s linear infinite;
    -o-animation: cloud_two 75s linear infinite;
    animation: cloud_two 75s linear infinite;
    -webkit-transform: translate3d(0, 0, 0);
    -ms-transform: translate3d(0, 0, 0);
    -o-transform: translate3d(0, 0, 0);
    transform: translate3d(0, 0, 0);
  }

  .clouds_three {
    background: url("img/cloud_three.png") repeat-x;
    position: absolute;
    left: 0;
    top: -10%;
    height: 100%;
    width: 300%;
    -webkit-animation: cloud_three 100s linear infinite;
    -moz-animation: cloud_three 100s linear infinite;
    -o-animation: cloud_three 100s linear infinite;
    animation: cloud_three 100s linear infinite;
    -webkit-transform: translate3d(0, 0, 0);
    -ms-transform: translate3d(0, 0, 0);
    -o-transform: translate3d(0, 0, 0);
    transform: translate3d(0, 0, 0);
  }

  @-webkit-keyframes sky_background {
    0% {
      background: #007fd5;
      color: #007fd5
    }

    50% {
      background: #4b88b1;
      color: #a3d9ff
    }

    100% {
      background: #007fd5;
      color: #007fd5
    }
  }

  @-moz-keyframes sky_background {
    0% {
      background: #007fd5;
      color: #007fd5
    }

    50% {
      background: #4b88b1;
      color: #a3d9ff
    }

    100% {
      background: #007fd5;
      color: #007fd5
    }
  }

  @keyframes sky_background {
    0% {
      background: #007fd5;
      color: #007fd5
    }

    50% {
      background: #4b88b1;
      color: #a3d9ff
    }

    100% {
      background: #007fd5;
      color: #007fd5
    }
  }

  @-webkit-keyframes cloud_one {
    0% {
      left: 0
    }

    100% {
      left: -200%
    }
  }

  @-moz-keyframes cloud_one {
    0% {
      left: 0
    }

    100% {
      left: -200%
    }
  }

  @keyframes cloud_one {
    0% {
      left: 0
    }

    100% {
      left: -200%
    }
  }

  @-webkit-keyframes cloud_two {
    0% {
      left: 0
    }

    100% {
      left: -200%
    }
  }

  @-moz-keyframes cloud_two {
    0% {
      left: 0
    }

    100% {
      left: -200%
    }
  }

  @keyframes cloud_two {
    0% {
      left: 0
    }

    100% {
      left: -200%
    }
  }

  @-webkit-keyframes cloud_three {
    0% {
      left: 0
    }

    100% {
      left: -200%
    }
  }

  @-moz-keyframes cloud_three {
    0% {
      left: 0
    }

    100% {
      left: -200%
    }
  }

  @keyframes cloud_three {
    0% {
      left: 0
    }

    100% {
      left: -200%
    }
  }
</style>
