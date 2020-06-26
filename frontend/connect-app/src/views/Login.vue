<template>
<div>
  <div class ="body">
    
    <h2>
  <div class="main">
	<span>C</span>
	<span>O</span>
	<span>N</span>
	<span>N</span>
	<span>E</span>
	<span class="letter"></span>
	<span>C</span>
	<span>T</span>
</div>
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
    <Matrial/>
    <Team />
    <Footer />
  </div>
  
</template>

<script>
import Team from './Team'
import Matrial from "./Matrial"
import Footer from "./FooterLanding"
export default {
  name: "Login",
  components:    {
  Team,
  Matrial,
  Footer
  },
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
            localStorage.setItem("userId", res.data.id);
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
@import "../assets/style/Matrila.css";
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

span{
	margin: 0 15px;
	line-height: .7;
	text-shadow: 0 0 2px rgba(0, 0, 0, .45);
	animation: span 3s ease-in infinite alternate;
}
.main{
	display: flex;
	justify-content: center;
	align-items: flex-start;
}
.letter{
	display: inline-flex;
	height: 30px;
	width: 27px;
	border: 2.35px solid black;
	border-radius: 14px;
	box-shadow:
		0 0 2px rgba(0, 0, 0, .75),
		inset 0 0 2px rgba(0, 0, 0, .45);

	animation: letter 3s ease-in-out infinite alternate;
}
@keyframes span {
	0%,30%{ margin: 0 15px; }
	70%,100%{ margin: 0 5px; }
}
@keyframes letter {
	0%,30%{ width: 27px; }
	70%,100%{ width: 30vw; }
}

</style>