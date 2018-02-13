<template>  
  <div class="card"
    :key="task._id"
    draggable="true"
    @dragstart="dragStart"
    @dragend="dragEnd"
    :class="{'card--done': task.status === 'completed'}">
      <h1 v-if="!task.isEditMode">{{task.title}}</h1>
      <div v-else class="control card--control">
        <input v-model="title" class="input" type="text" :class="{'is-danger': title === ''}" placeholder="Title" />
      </div>        
      <div class="controls">
        <icon v-if="task.status !== 'completed' && !task.isEditMode" @click.native="editInline(task._id)" type="edit"></icon>
        <icon @click.native="deleteIt(task._id)" type="delete"></icon>
      </div>
      <p v-if="!task.isEditMode" v-html="task.description" class="description"></p>
      <div v-else class="control card--control">
        <textarea v-model="description" class="input" placeholder="description"></textarea>
        <button 
          @click="editIt(task)"
          class="button is-primary"
          :class="{'is-loading': reqInProgress}"
          :disabled="reqInProgress || title ===''">Update</button>
        <button @click="cancelInline(task._id)" class="button is-light">Cancel</button>
      </div>  

      <p class="author">Created by {{task.author.username}}</p>
  </div>
  
</template>

<script>
import Icon from '~/components/common/Icon.vue'
import {mapActions} from 'vuex'

export default {
  props: ['task'],
  components: {
    Icon
  },
  data () {
    return {
      reqInProgress: false,
      title: '',
      description: ''
    }
  },
  methods: {
    ...mapActions(['deleteTask', 'editTask']),
    // delete and set the vuex state
    deleteIt(id) {
      this.deleteTask(id) // delete request to server
        .then((response) => {
          if(response.data.status === 'error') {
            //show toast
            console.log(`${response.data.data}`)
            return
          }
          this.$store.commit('deleteTask', id)
        })
    },
    // edit task on backend and update vuex state
    editIt(task) {
      this.reqInProgress = true
      task.title = this.title
      task.description = this.description
      this.editTask(task)
        .then((response) => {
          this.reqInProgress = false
          if(response.data.status === 'error') {
            console.log(`${response.data.data}`)
            return
          }
          let task = response.data.data;
          task.isEditMode = false
          this.$store.commit('editTask', task)
        })
    },
    // handle visiblity of inline text boxes to edit task
    editInline(id) {
      this.title = this.task.title
      this.description = this.task.description
      this.$store.commit('setEditMode', {id, mode: true})
    },
    cancelInline(id) {
      this.$store.commit('setEditMode', {id, mode: false})
    },
    dragStart (event) {
      event.target.style.opacity = .4
      event.dataTransfer.setData('card', JSON.stringify(this.task))
    },
    dragEnd (event) {
      event.target.style.opacity = 1
    }
  }
}
</script>


<style>
  .card {
    background: #2a406f;
    color: #fff;
    font-size: 1.5rem;
    padding: 10px;
    margin: 10px 0;
    position: relative;
  }
  .card h1 {
    font-size: 1em;
    line-height: .9em;
    padding-right: 80px;  /* cover the controls */
  }
  .card p.description {
    font-size: .7em;
    padding-bottom: 10px;
  }
  .card p.author {
    font-size: .6em;
    color: #b4a94f;
  }
  .card .controls {
    position: absolute;
    right: 5px;
    top: 5px;
  }

  .card--done {
    background: rgba(114,184,148,.5);
    color: rgba(255,255,255,.7);
  }
  .card--done p.author {
    color: #aaa;
  }
  .card--done .svg-icon {
    fill: #ccc !important;
  }

  .card--control {
    margin-bottom: 5px;
    padding-right: 80px;
    box-sizing: border-box;
  }
  .card--control textarea  { min-height: 60px; margin-bottom: 5px;}
  .card--control button { margin-right: 5px;}



  @media screen and (max-width: 768px) {
    .card {
      font-size: 1.3rem;
    }
  }

</style>

