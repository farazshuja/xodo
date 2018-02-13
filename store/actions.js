import TodoApi from '~/api/index'
import md5 from 'md5'


/***
 * Async mutations for application state
 */
export default {
  /**
   * Returns a Promise of authenticate request form backend
   * @param {object - vuex} context 
   * @param {object} user    
   */
  login (context, user) {    
    return TodoApi.authenticate(user.username, md5(user.password))
  },
  /**
   * Return a promise after logout request
   * @param {mutation object} commit
   */
  logout ({commit}, user) {    
    return TodoApi.logout(user.sessionId)
  },
  /**
   * Save the user in app state and localStorage
   * @param {mutation object} commit
   * @param {object} user
   */
  setUser ({commit}, user) {
    if(!user) {
      localStorage.removeItem('user')
    }
    else {
      localStorage.setItem('user', JSON.stringify(user))      
    }
    commit('setUser', user)
  },
  /**
   * Get all the tasks by the user logged in
   * @param {context} vuex
   * @param {string} sessionId 
   */
  getAllTasksByUserSession ({commit, state}, sessionId) {
    TodoApi.getAllTasksByUserSession(sessionId)
      .then((response) => {
        let tasks = response.data.data;
        tasks = tasks.map(task => {
          task.isEditMode = false
          task.description = task.description ? task.description.replace(/(\<p\>|\<\/p\>)/g, '') : ''
          return task
        })
        commit('setTasks', tasks)
      })
  },
  /**
   * Return promise of add task API
   * @param {context} vuex
   * @param {object} task
   */
  addTask({commit, state}, task) {
    return TodoApi.addTask(task, state.user.sessionId)
  },
  /**
   * Return promise of delete task API
   * @param {context} vuex
   * @param {string} id
   */
  deleteTask({commit, state}, id) {    
    return TodoApi.deleteTask(id, state.user.sessionId)
  },
  /**
   * Return promise of edit task API
   * @param {context} vuex
   * @param {object} task
   */
  editTask({commit, state}, task) {
    return TodoApi.editTask(task, state.user.sessionId)
  },
  /**
   * Edit task both on vuex state and backend API
   * @param {context} vuex
   * @param {object} task 
   */
  setTaskStatus({commit, state}, task) {
    TodoApi.editTask(task, state.user.sessionId, task.status)
      .then((response) => {
        commit('deleteTask', task._id)
        commit('addTask', task)
      })
  }
}