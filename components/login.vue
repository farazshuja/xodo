<template>
  <div class="container container--full">
    <div class="login-sec">
      <div class="logo-sec has-text-centered">
        <h1 class="logo-sec-logo">Xo<span class="semi-bold">Do</span></h1>
        <p class="logo-sec-slogan">Track your tasks without any hurdle</p>
      </div>
      <form>
        <div class="field">
          <label class="label">Username</label>
          <div class="control">
            <input 
              v-model="user.username"
              class="input"
              :class="{'is-danger': errors.username}"
              type="text"
              @keypress.enter="submit"
              placeholder="username">
          </div>
        </div>
        <div class="field">
          <label class="label">Password</label>
          <div class="control">
            <input 
              v-model="user.password"
              class="input"
              @keypress.enter="submit"
              :class="{'is-danger': errors.password}"
              type="password" placeholder="password">
          </div>
        </div>
        <div class="field is-grouped">
          <div class="control">
            <button type="button" @click="submit" class="button is-link"
              :class="{'is-loading': reqInProgress}"
              :disabled="reqInProgress">Login</button>
          </div>
        </div>
      </form>
      <hr />
      <p><a>Don't have an account, want to signup?</a></p>
    </div>
    <vue-toast ref='toast'></vue-toast>
  </div>
</template>

<script>
import {mapActions} from 'vuex'
import VueToast from 'vue-toast'

export default {
  components: {
    VueToast
  },
  data () {
    return {
      reqInProgress: false,   //to show/hide ajax indicators
      user: { // form field models
        username: '',
        password: ''
      },
      errors: { // error handling of the form
        username: false,
        password: false
      }
    }
  },
  // watch the form fields for validation errors
  watch: {
    'user.username'(newVal) {
      this.errors.username = this.user.username === ''
    },
    'user.password'(newVal) {
      this.errors.password = this.user.password === ''
    }
  },
  methods: {
    ...mapActions(['login', 'setUser']),
    isFormValid (element) {
      this.errors.username = this.user.username === ''
      this.errors.password = this.user.password === ''      

      return !this.errors.username && !this.errors.password
    },
    submit() {
      //form must be valid before proceeding
      if(!this.isFormValid()) {
        return;
      }

      this.reqInProgress = true;
      this.login(this.user)
        .then((response) => {      
          this.reqInProgress = false;  //hide ajax indictor

          let data = response.data;
          if(data.error) {
            this.errors = {
              username: true,
              password: true
            }
            //show server error via toast
            this.$refs.toast.showToast(data.error, {theme: 'error'})
          }
          else {
            // set the logged in data into state
            this.setUser({
              sessionId: data.sessionId,
              username: data.username
            })

            //redirect to authorized page
            this.$router.replace({ path: '/' })
          }
        })
        .catch ( res => this.$refs.toast.showToast(res.data.error, {theme: 'error'}) )
    }
  }
}
</script>


<style scoped>
  .container {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 20px;
  }
  .login-sec {
    max-width: 600px;    
    width: 600px;
    margin-top: -80px;
  }
  .logo-sec {
    margin-bottom: 40px;
  }
  .logo-sec-logo {
    font-size: 10em;
    font-weight: 300;
    line-height: .9em;     
  }
  .logo-sec-slogan {
    font-size: 1.54em;
  }

  @media screen and (max-width: 768px) {
    .login-sec {
      margin-top: 0;
    }
  }
</style>

