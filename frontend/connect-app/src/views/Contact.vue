<template>
    <div>
     
     <Navbar/>
     <div class="backgroound">
        
     
     </div>
     <!-- about us-->   
     <!-- about-->
    <section id="about" class="text">
      <div class="container">
        <div class="row">
          <div class="col-lg-6">
            <h2 class="heading">About Us</h2>
            <p class="lead">This can be an about section.</p>
            <p>Impossible considered invitation him men instrument saw celebrated unpleasant. Put rest and must set kind next many near nay. He exquisite continued explained middleton am. Voice hours young woody has she think equal. Estate moment he at on wonder at season little. Six garden result summer set family esteem nay estate. End admiration mrs unreserved discovered comparison especially invitation. </p>
            <p>Delightful unreserved impossible few estimating men favourable see entreaties. She propriety immediate was improving. He or entrance humoured likewise moderate. Much nor game son say feel. Fat make met can must form into gate. Me we offending prevailed discovery. </p>
          </div>
          <div class="col-lg-5 mx-auto">
            <p><img src="@/assets/img/japan-mountains.jpg" alt="" class="img-fluid rounded-circle"></p>
          </div>
        </div>
      </div>
    </section>
     <!--about us -->
     <!-- form-->
     <section id="contact" style="background-color: #fff;" class="text-page pb-4"> 
      <div class="container">
        <div class="row">
          <div class="col-lg-12">
            <h2 class="heading">Contact</h2>
            <div class="row">
              <div class="col-lg-6">
                <form class="contact-form" @submit.prevent="sendEmail">
                  <div class="controls">
                    <div class="row">
                      <div class="col-md-6">
                        <div class="form-group">
                          <label for="name">Your firstname </label>
                          <input type="text" name="name" v-model="name" placeholder="Enter your firstname" required="required" class="form-control">
                        </div>
                      </div>
                      <div class="col-md-6">
                        <div class="form-group">
                          <label for="surname">Your lastname </label>
                          <input type="text" name="lastname" v-model="lastname" placeholder="Enter your  lastname" required="required" class="form-control">
                        </div>
                      </div>
                    </div>
                    <div class="form-group">
                      <label for="surname">Your email</label>
                      <input type="email" name="email" v-model="email" placeholder="Enter your  email" required="required" class="form-control">
                    </div>
                    <div class="form-group">
                      <label for="surname">Your message for us </label>
                      <textarea rows="4" name="message" v-model="message" placeholder="Enter your message" required="required" class="form-control"></textarea>
                    </div>
                    <div class="text-center">
                      <input  type="submit" value="Send message"  class="btn btn-outline-primary ">
                    </div>
                    
                  </div>
                </form>
              </div>
              <div class="col-lg-6 block">
                <p>Effects present letters inquiry no an removed or friends. Desire behind latter me though in. Supposing shameless am he engrossed up additions. My possible peculiar together to. Desire so better am cannot he up before points. Remember mistaken opinions it pleasure of debating. Court front maids forty if aware their at. Chicken use are pressed removed. </p>
                <p>Able an hope of body. Any nay shyness article matters own removal nothing his forming. Gay own additions education satisfied the perpetual. If he cause manor happy. Without farther she exposed saw man led. Along on happy could cease green oh. </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <div id="map"></div>
   


    </div>
</template>

<script>

import emailjs from 'emailjs-com';
import Navbar from "../components/navigation/Navbar";


export default {
    name :"Contact",
    components:{
        Navbar,
    
    },
    data (){
    return {
    email :"",
    name :"",
    lastname:"",
    message :"",
    }
    },
    methods:{
          sendEmail: (e) => {
      emailjs.sendForm('gmail', 'emailsend', e.target, 'user_iSGZWERXpC5mVeXmHA3rA')
        .then((result) => {
            console.log('SUCCESS!', result.status, result.text);
        }, (error) => {
            console.log('FAILED...', error);
        });
    }
    }
}
</script>
<style  scoped>
.backgroound{
    background-image: url("../assets/img/black.jpg");
    height: 600px; 
    background-position: center; /* Center the image */
   
    background-size: cover; 
   
}






.block{
    padding-top: 50px;
}
.btn-outline-primary {
    background-color:#C0C0C0;
    border-color:black;
    color: black;
}
.btn-outline-primary:hover {
    background-color:#C0C0C0;
    border-color:black;
    color: black;
}
img{
    width: 80%;
}
.contact-form {
  margin-bottom: 40px;
}

p.social {
  text-align: center;
  margin-top: 20px;
}

p.social a {
  margin: 0 10px 0 0;
  color: #fff;
  display: inline-block;
  width: 38px;
  height: 38px;
  border-radius: 19px;
  line-height: 38px;
  font-size: 15px;
  text-align: center;
  -webkit-transition: all 0.3s;
  transition: all 0.3s;
  vertical-align: bottom;
}



p.social a.gplus {
  background-color: #333;
}
p.social a.email {
  background-color: #666;
}
.heading{
    font-size: 20px;
    text-align: center;
    padding-bottom:15px ;

  font: normal normal normal 20px/1 Helvetica, arial, sans-serif;
  border-bottom: 2px solid #000;
  background:#000;
  color:#fff;
  
  display:inline-block;
  padding:3px 15px;
  margin-left:10px;
}
.heading:after{
  left:0px;
  display:block;
  position:absolute;
  width:100%;
  height:3px;
  margin-top:2px;
  content: " ";
  background:#000;
}


.form-control {
  padding: 0.375rem 0.75rem;
  font-size: 1rem;
  line-height: 1.5;
  color: #555;
  background-color: #fff;
  border: 1px solid #ced4da;
  border-radius: 0rem;
  -webkit-transition: border-color 0.15s ease-in-out, -webkit-box-shadow 0.15s ease-in-out;
  transition: border-color 0.15s ease-in-out, -webkit-box-shadow 0.15s ease-in-out;
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out, -webkit-box-shadow 0.15s ease-in-out;
}
.form-control::-ms-expand {
  background-color: transparent;
  border: 0;
}

.form-control:focus {
  color: #555;
  background-color: #fff;
  border-color: #737373;
  outline: 0;
  -webkit-box-shadow: 0 0 0 0.2rem rgba(51, 51, 51, 0.25);
  box-shadow: 0 0 0 0.2rem rgba(51, 51, 51, 0.25);
}

.form-control::-webkit-input-placeholder {
  color: #6c757d;
}

.form-control:-ms-input-placeholder {
  color: #6c757d;
}

.form-control::-ms-input-placeholder {
  color: #6c757d;
}

.form-control::placeholder {
  color: #6c757d;
}

.form-control:disabled, .form-control[readonly] {
  background-color: #eee;
}

select.form-control:not([size]):not([multiple]) {
  height: calc(2.25rem + 2px);
}

select.form-control:focus::-ms-value {
  color: #555;
  background-color: #fff;
}

.form-control-sm {
  padding: 0.25rem 0.5rem;
  font-size: 0.875rem;
  line-height: 1.5;
  border-radius: 0rem;
}

select.form-control-sm:not([size]):not([multiple]) {
  height: calc(1.8125rem + 2px);
}

.form-control-lg {
  padding: 0.5rem 1rem;
  font-size: 1.25rem;
  line-height: 1.5;
  border-radius: 0rem;
}

select.form-control-lg:not([size]):not([multiple]) {
  height: calc(2.875rem + 2px);
}


</style>