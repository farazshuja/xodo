<template>
  <nav class="navbar is-transparent">
    <div class="navbar-brand">
      <nuxt-link class="navbar-item" to="todo">
        Xo<span class="bold">Do</span>
      </nuxt-link>
      <div class="navbar-burger burger" @click="toggleMenu">
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>

    <div :class="{'is-active': showMenu}" class="navbar-menu">
      <div class="navbar-end">
        <div class="navbar-item">
          <div class="field is-grouped">
            <p class="navbar-wel">Welcome {{username}}!</p>
            <p class="control">
              <button class="button is-primary add-task-btn" @click="addTask">
                <span>
                  Add New Todo
                </span>
              </button>
            </p>
            <p class="control">
              <button type="button" @click="logoutSession" class="button is-danger">
                <span>
                  Logout
                </span>
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  </nav>  
</template>

<script>
import {mapActions} from 'vuex'

export default {
  data () {
    return {
      showMenu: true,
      username: this.$store.state.user.username
    }
  },
  methods: {
    ...mapActions(['logout', 'setUser']),
    toggleMenu() {
      this.showMenu = !this.showMenu
    },
    logoutSession () {            
      this.logout(this.$store.state.user)
        .then((response) => { 
          if(response.data.status === 'success') {            
            this.setUser(null)  // clear app state
            this.$router.replace({ path: '/login'})  // redirect to login            
          }
        })      
    },
    addTask () {
      this.$emit('addTask')
    }
  }  
}
</script>


<style scoped>
  a.navbar-item {
    font-size: 3rem;
    color: #fff;
  }
  a.navbar-item:hover {
    text-decoration: none;
    color: #ddd;
    background-color: transparent;
  }
  
  .navbar-wel {
    display: flex;
    color: #fff;
    align-items: center;
    font-size: 1.4rem;
  }

  .add-task-btn {
    margin-left: 20px;
  }

  @media screen and (max-width: 1023px) {
    .navbar-menu {
      background: #637aac;
    }
    .navbar-menu.is-active {
      padding: 0
    }
    .navbar-end .field.is-grouped {
      justify-content: flex-end;
    }
    .navbar-wel {
      font-size: 1rem;
    }
  }
</style>

