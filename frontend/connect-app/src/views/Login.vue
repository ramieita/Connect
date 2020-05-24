<template>
  <div class ="body">
    <h2>
      <strong>Connect</strong>
      <br />- simplify your student life -
    </h2>
    <img src="../assets/img/logo.png" alt="logo" id="logo" />
    <h3>Sign in</h3>
    <b-form id="form" @submit.prevent="login">
      <b-form-group id="username">
        <b-form-input id="input1" v-model="username" required placeholder="Username"></b-form-input>
      </b-form-group>
      <b-form-group id="email">
        <b-form-input id="input2" v-model="email" type="email" required placeholder="Email"></b-form-input>
      </b-form-group>
      <b-form-group id="password">
        <b-form-input
          id="input3"
          v-model="password"
          type="password"
          required
          placeholder="Password"
        ></b-form-input>
      </b-form-group>
      <b-button id="btn" type="submit" variant="success">LOG IN</b-button>
    </b-form>
    <aside>
      New to Connect?
      <router-link id="link" to="/register">SIGN UP</router-link>
    </aside>
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      username: "",
      email: "",
      password: ""
    };
  },
  methods: {
    login() {
      let url = this.$store.state.url;
      this.$http
        .post(url + "login", {
          username: this.username,
          email: this.email,
          password: this.password
        })
        .then(res => {
          if (res.data.success) {
            localStorage.setItem("jwt", res.data.token);
            this.$swal("Connect", "Login was successful.", "success");
            this.$router.push("/");
          }
        })
        .catch(err => {
          console.log(err);
          this.$swal("Try again", "Check your entered data.", "error");
        });
    }
  }
};
</script>

<style scoped>
@import "../assets/style/style.css";
.body {
  padding: 40px;
  background: linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab);
  background-size: 400% 400%;
  animation: gradient 15s ease infinite;
}

@keyframes gradient {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}

</style>