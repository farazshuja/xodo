<template>
  <transition name="bounce">
    <div v-if="show" class="modal" :class="{'is-active': show}">
      <div class="modal-background"></div>
      <div class="modal-content">
        <h1 class="title">Add a task</h1>
        <form>
          <div class="field">
            <label class="label">Title</label>
            <div class="control">
              <input 
                v-model="title" 
                class="input" 
                type="text" 
                :class="{'is-danger': title === ''}"
                placeholder="Title">
            </div>
          </div>
          <div class="field">
            <label class="label">Description</label>
            <div class="control">
              <textarea v-model="description" class="textarea" placeholder="Description"></textarea>
            </div>
          </div>
          <div class="field is-grouped">
            <div class="control">
              <button @click="addNewTask" 
                type="button" 
                class="button is-primary"
                :class="{'is-loading': reqInProgress}"
                :disabled="reqInProgress || title === ''">Submit</button>
            </div>
            <div class="control">
              <button type="button" class="button is-light" @click="show=false">Cancel</button>
            </div>
          </div>        
        </form>
      </div>
      <button class="modal-close is-large" aria-label="close" @click="show = false"></button>
    </div>
  </transition>
</template>

<script>
import {mapActions} from 'vuex'

export default {  
  data () {
    return {
      show: false,
      reqInProgress: false,
      title: 'task name',
      description: '',
      errors: {
        title: false,
        description: false
      }
    }
  },
  methods: {
    ...mapActions(['addTask']),
    showModal (hide) {
      this.show = hide || true
    },
    // send request to backend to add a new task and update the vuex state
    addNewTask () {      
      // check if form is valid
      if(this.title === '') {
        return;
      }

      this.reqInProgress = true;
      this.addTask({
          title: this.title,
          description: this.description,
          status: 'notCompleted'
        })
      .then((response) => {
        let task = response.data.data;
        task.author = {
          _id: task.author,
          username: this.$store.state.user.username
        }
        this.$store.commit('addTask', task)
        this.reqInProgress = false;
        this.show = false
      })
    }
  }
}
</script>

<style>
  .modal-content {
    padding: 20px;
    background: #3a507f;
    border-radius: 3px;
  }
  .modal-content h1.title {
    color: #fff;
    margin-bottom: 10px;
  }
</style>


