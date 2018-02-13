<template>
  <div class="container container--full">
    <nav-bar @addTask="addTask()"></nav-bar>
    <div class="columns is-mobile">
      <div id="in-progress" class="column"
        @dragover.prevent="dragOver"
        @dragenter="dragEnter"
        @dragleave="dragLeave"
        @drop="drop">
          <transition-group name="bounce">
            <card v-for="task in inProgressTasks" :key="task._id" :task="task" ></card>        
          </transition-group>
      </div>
      <div id="completed" class="column"
        @dragover.prevent="dragOver"
        @dragenter="dragEnter"
        @dragleave="dragLeave"
        @drop="drop">
          <transition-group name="bounce">
            <card v-for="task in completedTasks" :key="task._id" :task="task"></card>
          </transition-group>
      </div>
    </div>
    <modal id="add-task-modal" ref="addTaskModalRef"></modal>
    <!--transition name="bounce">
      <modal id="add-task-modal" ref="addTaskModalRef"></modal>
    </transition-->
  </div>
</template>

<script>
import NavBar from '~/components/common/NavBar'
import Card from '~/components/todo/CardComponent'
import Modal from '~/components/common/Modal'

export default {
  computed: {
    inProgressTasks () {  // filter out in progress tasks
      return this.$store.getters.getIncompletedTasks
    },
    completedTasks () { // filter out completed tasks
      return this.$store.getters.getCompletedTasks
    }
  },
  components: {
    NavBar,
    Modal,
    Card
  },
  methods: {
    // handle add task event from the Modal
    addTask () {      
      this.$refs.addTaskModalRef.showModal()
    },
    // set proper drop effect on drag over
    dragOver (event) {
      event.dataTransfer.dropEffect = 'move';
    },
    // set proper class to highlight a drop area
    dragEnter (event) {
      event.target.classList.add('over')
    },
    // remove highlighted drop area
    dragLeave (event) {
      event.target.classList.remove('over')
    },
    // capture the object from data transfer object and update backend and vuex state
    drop (event) {
      event.target.classList.remove('over')
      let task = JSON.parse(event.dataTransfer.getData('card'))
      let id = event.target.id
      if(id === 'completed' && task.status !== 'completed') {
        task.status = 'completed'
        this.$store.dispatch('setTaskStatus', task)
      }
      else if (id === 'in-progress' && task.status === 'completed') {
        task.status = 'notCompleted'
        this.$store.dispatch('setTaskStatus', task)
      }
    }
  },
  // handle the session either from the local storage or backend and redirect user to login if not authorizedd
  created (obj) {
    let _user;
    if(typeof localStorage !== 'undefined') {
      _user = localStorage.getItem('user')
    }
        
    if(this.$store.state.user && this.$store.state.user.sessionId) {
      this.$store.dispatch('getAllTasksByUserSession', this.$store.state.user.sessionId)
    }
    else if(_user) {
      this.$store.commit('setUser', JSON.parse(_user))
      this.$store.dispatch('getAllTasksByUserSession', this.$store.state.user.sessionId)
    }
    else {
      this.$router.replace({ path: '/login'})  // redirect to login
    }
    
  }
}
</script>

<style>
  .column {
    border: 2px dashed transparent;
  }
  .column.over {
    border: 2px dashed #aaa;
  }
</style>

