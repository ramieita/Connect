<template>
<div>
        
 <div id="container">
  <h1>&bull; Edit Your Profile &bull;</h1>
  
 
  <form  id="contact_form">
    <div class="nameP">
      <label for="nameP"></label>
      <input type="text" placeholder="My name is" name="name" id="name_input" required v-model="username">
    </div>
    <div class="emailP">
      <label for="emailP"></label>
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

html {
    font-family: 'Montserrat', Arial, sans-serif;
    -ms-text-size-adjust: 100%;
    -webkit-text-size-adjust: 100%;
  }
  
  
  body {
    background: #F2F3EB;
  }
  
  .swiggleBox {
    width: 130px;
    height: 65px;
    margin: 15px auto;
    color:#292b2c;
    font-family: 'Open Sans', sans-serif;
    font-size: 1.15rem;
    line-height: 65px;
    text-transform: uppercase;
    text-align: center;
    position: relative;
    cursor: pointer;
  }
  svg {
    position: absolute;
    top: 0;
    left: 0;
  }
   svg path{
    fill: none;
    stroke:#292b2c;
    stroke-width: 1;
  }
  .swiggleBox:hover svg path {
    stroke:#292b2c;
  }
  svg path {
    stroke-dasharray: 265, 0;
    -webkit-transition: all 1s ease-in-out;
    -moz-transition: all 1s ease-in-out;
    -ms-transition: all 1s ease-in-out;
    -o-transition: all 1s ease-in-out;
    transition: all 1s ease-out;
  }
  .swiggleBox:hover svg path {
    stroke-width: 3;
    stroke-dasharray: 0, 350;
    stroke-dashoffset: 20;
    -webkit-transition: all 1s ease-in-out;
    -moz-transition: all 1s ease-in-out;
    -ms-transition: all 1s ease-in-out;
    -o-transition: all 1s ease-in-out;
    transition: all 1s ease-out;
  }
  
   input, textarea {
    color: #5A5A5A;
    font: inherit;
    margin: 0;
  }
  
  input {
    line-height: normal;
  }
  
  textarea {
    overflow: auto;
  }
  
  #container {
   
    box-shadow: 0px 0px 4px 0px #b0b3b7;
    max-width: 1200px;
    margin: 60px auto;
    position: relative;
  }
  
  form {
    padding: 37.5px;
    margin: 50px 0;
  }
  
  h1 {
    color: #292b2c;
    font-size: 32px;
    font-weight: 700;
    letter-spacing: 7px;
    text-align: center;
    text-transform: uppercase;
  }
  
  
  
  
  .emailP {
      float: right;
      width: 45%;
  }
  
  input[type='text'], [type='email'], select, textarea {
      background: none;
    border: none;
      border-bottom: solid 2px #292b2c;
      color: #474544;
      font-size: 1.000em;
    font-weight: 400;
    letter-spacing: 1px;
      margin: 0em 0 1.875em 0;
      padding: 0 0 0.875em 0;
    text-transform: uppercase;
      width: 100%;
      -webkit-box-sizing: border-box;
      -moz-box-sizing: border-box;
      -ms-box-sizing: border-box;
      -o-box-sizing: border-box;
      box-sizing: border-box;
      -webkit-transition: all 0.3s;
      -moz-transition: all 0.3s;
      -ms-transition: all 0.3s;
      -o-transition: all 0.3s;
      transition: all 0.3s;
  }
  
  input[type='text']:focus, [type='email']:focus, textarea:focus {
      outline: none;
      padding: 0 0 0.875em 0;
  }
  
  .message {
      float: none;
  }
  
  .nameP {
      float: left;
      width: 45%;
  }
  
  
  textarea {
      line-height: 150%;
      height: 150px;
      resize: none;
      width: 100%;
  }
  
  ::-webkit-input-placeholder {
      color: #474544;
  }
  
  :-moz-placeholder { 
      color: #474544;
      opacity: 1;
  }
  
  ::-moz-placeholder {
      color: #474544;
      opacity: 1;
  }
  
  :-ms-input-placeholder {
      color: #474544;
  }
  
  
  
  @media screen and (max-width: 768px) {
    #container {
      margin: 20px auto;
      width: 95%;
    }
  }
  
  @media screen and (max-width: 480px) {
    h1 {
      font-size: 26px;
    }
  }
  
  @media screen and (max-width: 420px) {
    h1 {
      font-size: 18px;
    }
    
    input[type='text'], [type='email'], textarea {
      font-size: 0.875em;
    }
  }
  

</style>