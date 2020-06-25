<template>
<div>
        
 <div id="container">
  <h1>&bull; Edit Your Profile &bull;</h1>
  
 
  <form  id="contact_form">
    <div class="name">
      <label for="name"></label>
      <input type="text" placeholder="My name is" name="name" id="name_input" required v-model="username">
    </div>
    <div class="email">
      <label for="email"></label>
      <input type="email" placeholder="My e-mail is" name="email" id="email_input" required v-model="email">
    </div>
    <div class="message">
      <label for="message"></label>
      <textarea name="message" placeholder="Edit yout Bio" id="message_input" cols="30" rows="5" required v-model="text"></textarea>
    </div>
    
    <div v-on:click="update"  class="swiggleBox">
       Update 
     <svg width="130" height="65" viewBox="0 0 130 65" xmlns="http://www.w3.org/2000/svg">
    <path d="M0.6,0.5c0,5.4,0,61.5,0,61.5s4.5,5.4,9.9,0c5.4-5.4,9.9,0,9.9,0s4.5,5.4,9.9,0c5.4-5.4,9.9,0,9.9,0
    s4.5,5.4,9.9,0c5.4-5.4,9.9,0,9.9,0s4.5,5.4,9.9,0c5.4-5.4,9.9,0,9.9,0s4.5,5.4,9.9,0c5.4-5.4,9.9,0,9.9,0s4.5,5.4,9.9,0
    c5.4-5.4,9.9,0,9.9,0s4.5,5.4,9.9,0c0,0,0-56.1,0-61.5H0.6z"/>
  </svg>
</div>
   <small> please refresh the Site after the click on the Button </small>
  </form>
</div>
    </div>
</template>
<script>

export default {

  
  name: "EditProfile",
  components: {},
  data() {
    return {
      id: "",
      username: "",
      email: "",
      password: "",
      text  :"",
    };
  },
  mounted() {
    let url = this.$store.state.url;
    const headers = {
      headers: { authorization: "Bearer " + localStorage.getItem("jwt") }
    };
    this.$http
      .get(url + "/profile", headers)
      .then(res => {
        this.id = localStorage.getItem("ID");
        this.username = res.data.username;
        this.email = res.data.email;
        this.text= res.data.text;
        console.log(this.id);
      })
      .catch(err => {
        console.log(err);
      });
  },

  updated() {
      this.update();
  },
  methods :{
      update(){
    let url = this.$store.state.url;
    const headers = {
      headers: { authorization: "Bearer " + localStorage.getItem("jwt") }
    };
    this.$http
      .put(
        url + "/profile",
        {
          username: this.username,
          email: this.email,
          text : this.text,

        },
        headers
      )
      .then(res => {
        if (res.data.updated === true) {
          console.log(res);
        }
      })
      .catch(err => {
        console.log(err);
      });
  }
}
  

};
</script>
<style  scoped>
@import url(https://fonts.googleapis.com/css?family=Montserrat:400,700);
@import "../assets/style/Edit.css";

</style>