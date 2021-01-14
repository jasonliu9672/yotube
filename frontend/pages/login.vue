<template>
  <v-row justify="center">
    <v-card
      elevation="2"
      class="text-center pt-3"
      width="500"
      :loading="loginLoading"
    >
      <v-container class="pt-7">
        <div class="d-flex flex-row justify-center align-center">
          <v-img max-height="75" max-width="150" src="/yotubelive.png"></v-img>
          <p class="WelcomeText">Welcome</p>
        </div>
        <v-card-text>
          <v-tabs v-model="tab">
            <v-tab v-for="option in tabOptions" :key="option">{{
              option
            }}</v-tab>
          </v-tabs>
          <v-tabs-items v-model="tab">
            <v-tab-item :key="0">
              <v-container class="px-0">
                <v-form>
                  <p class="text-left mb-1">使用者名稱</p>
                  <v-text-field
                    outlined
                    dense
                    solo
                    color="red"
                    v-model="loginUser.username"
                    required
                  ></v-text-field>
                  <p class="text-left mb-1">密碼</p>
                  <v-text-field
                    outlined
                    dense
                    solo
                    color="red"
                    type="password"
                    v-model="loginUser.password"
                    required
                  ></v-text-field>
                  <v-alert
                    v-model="loginResponse.isPop"
                    dense
                    outlined
                    :type="loginResponse.style"
                  >
                    {{ loginResponse.text }}
                  </v-alert>
                  <v-btn block @click.prevent="login">登入</v-btn>
                  <v-container class="mt-4">
                    <v-row align="center">
                      <v-divider></v-divider>或者<v-divider></v-divider>
                    </v-row>
                  </v-container>
                  <v-btn
                    color="blue-grey"
                    class="ma-2 white--text"
                    block
                    @click="googleLogin"
                  >
                    <v-icon right dark class="mr-5"> mdi-google </v-icon>
                    使用Google帳號登入
                  </v-btn>
                  <!-- <v-btn block @click="googleLogin">以 Google 登入</v-btn> -->
                </v-form>
              </v-container>
            </v-tab-item>
            <v-tab-item :key="1">
              <v-form>
                <p class="text-left mb-1">使用者名稱</p>
                <v-text-field
                  outlined
                  dense
                  solo
                  color="red"
                  v-model="registerUser.username"
                  :rules="usernameRules"
                ></v-text-field>
                <p class="text-left mb-1">密碼</p>
                <v-text-field
                  outlined
                  dense
                  solo
                  color="red"
                  type="password"
                  v-model="registerUser.password"
                  :rules="passwordRules"
                  required
                ></v-text-field>
                <p class="text-left mb-1">確認密碼</p>
                <v-text-field
                  outlined
                  dense
                  solo
                  color="red"
                  type="password"
                  v-model="registerUser.confirmPassword"
                  :rules="confirmPasswordRules.concat(passwordConfirmationRule)"
                  required
                ></v-text-field>
                <v-alert
                  v-model="registerResponse.isPop"
                  dense
                  outlined
                  :type="registerResponse.style"
                >
                  {{ registerResponse.text }}
                </v-alert>
                <p>點擊「註冊」即代表您已閱讀並瞭解服務條款及隱私權聲明。</p>
                <v-btn @click.prevent="register">註冊</v-btn>
              </v-form>
            </v-tab-item>
          </v-tabs-items>
        </v-card-text>
      </v-container>
    </v-card>
  </v-row>
</template>
<script>
import { userRegister } from "../apis/user.js";
export default {
  layout: "empty",
  middleware: "notAuthenticated",
  data() {
    return {
      tab: null,
      tabOptions: ["Login", "Register"],
      usernameRules: [
        (v) => !!v || "Name is required",
        (v) => (v && v.length <= 10) || "Name must be less than 10 characters",
      ],
      passwordRules: [(v) => !!v || "Password is required"],
      confirmPasswordRules: [(v) => !!v || "Password is required"],
      loginUser: {},
      registerUser: {},
      registerResponse: { isPop: false, text: "", style: "error" },
      loginResponse: { isPop: false, text: "", style: "error" },
      loginLoading: false,
      loginType: "local",
    };
  },
  methods: {
    // login(){
    //   this.$store.dispatch("user/login",this.user)
    // }
    register() {
      let vm = this;
      userRegister(vm.registerUser)
        .then((res) => {
          vm.registerResponse.isPop = true;
          vm.registerResponse.text = res.message;
          if (res.success) {
            vm.registerResponse.style = "success";
          } else {
            vm.registerResponse.style = "error";
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    login() {
      let vm = this;
      vm.loginLoading = true;
      vm.$store.dispatch("user/login", vm.loginUser).then((res) => {
        vm.loginResponse.text = res.message;
        if (res.success) {
          vm.loginResponse.style = "success";
          vm.$router.push("/");
        } else {
          vm.loginResponse.isPop = true;
          vm.loginResponse.style = "error";
        }
        vm.loginLoading = false;
      });
    },
    googleLogin() {
      this.$gAuth
        .signIn()
        .then((user) => {
          // On success do something, refer to https://developers.google.com/api-client-library/javascript/reference/referencedocs#googleusergetid
          console.log("user", user.getBasicProfile().uu.split("@")[0]);
          let vm = this;
          vm.loginLoading = true;
          //vm.loginType = "google";
          vm.loginUser = {
            username: user.getBasicProfile().uu.split("@")[0],
            password: "",
            loginType: "google",
            id_token: user.Bc.id_token,
          };
          vm.$store.dispatch("user/login", vm.loginUser).then((res) => {
            vm.loginResponse.text = res.message;
            if (res.success) {
              vm.loginResponse.style = "success";
              vm.$router.push("/");
            } else {
              vm.loginResponse.isPop = true;
              vm.loginResponse.style = "error";
            }
            vm.loginLoading = false;
          });
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
  computed: {
    passwordConfirmationRule() {
      return () =>
        this.registerUser.password === this.registerUser.confirmPassword ||
        "Password must match";
    },
  },
};
</script>
<style lang="scss">
.WelcomeText {
  display: inline-block;
  font-weight: bold;
  font-size: 20px;
}
</style>