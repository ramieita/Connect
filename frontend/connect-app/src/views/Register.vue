<template>
  <div>
    <div class="body">
      <h5>
        By having a <strong>Connect</strong> account, you can join
        supportive students for a better learning.
      </h5>
      <b-form @submit.prevent="register">
        <b-form-group id="name">
          <b-form-input id="input1" v-model="name" required placeholder="Name"></b-form-input>
        </b-form-group>
        <b-form-group id="username">
          <b-form-input id="input2" v-model="username" required placeholder="Username"></b-form-input>
        </b-form-group>
        <b-form-group id="email">
          <b-form-input id="input3" v-model="email" type="email" required placeholder="Email"></b-form-input>
        </b-form-group>
        <b-form-group id="password">
          <b-form-input
            id="input4"
            v-model="password"
            type="password"
            required
            placeholder="Password"
          ></b-form-input>
        </b-form-group>
        <b-form-group id="confirm_password">
          <b-form-input
            id="input5"
            v-model="confirm_password"
            type="password"
            required
            placeholder="Confirm Password"
          ></b-form-input>
        </b-form-group>
        <b-button id="btn" type="submit" variant="success">SIGN UP</b-button>
      </b-form>
      <aside>
        Already a Connector?
        <router-link id="link" to="/login">LOG IN</router-link>
      </aside>
      <p>By continuing, you agree to our User Agreement and Privacy Policy</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "Register",
  data() {
    return {
      name: "",
      username: "",
      email: "",
      password: "",
      confirm_password: ""
    };
  },
  methods: {
    register() {
      let url = this.$store.state.url;
      this.$http
        .post(url + "signup", {
          name: this.name,
          username: this.username,
          email: this.email,
          password: this.password,
          confirm_password: this.confirm_password
        })
        .then(res => {
          if (res.data.success) {
            localStorage.setItem("jwt", res.data.token);
            this.$swal("Success", "Registration was successful.", "success");
            this.$router.push("/");
          }
        })
        .catch(err => {
          console.log(err);
          this.$swal("Error", "Something went wrong.", "error");
        });
    }
  }
};
</script>

<style scoped>
@import "../assets/style/style.css";
.body {
  padding: 35px;
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
h5, aside{
  color: #242424;
}
p {
  color: #ffffff;
}

#logo {
  margin-right: 90%;
}
</style> 