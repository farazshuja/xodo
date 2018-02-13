/* All API related helper methods */
import axios from 'axios'

//configure the url of backend
const server = 'http://localhost:3000'

/**
 * Wrapper around backend APIs
 */
let todoAPIs = {
  /**
   * Returns promise of authentication request
   * @param {string} username 
   * @param {string - MD5 hash} password 
   */
  authenticate(username, password) {
    return axios.post(`${server}/user/auth`, {
      username,
      password
    })
  },
  /**
   * Return promise of logout
   * @param {string - md5 hash} sessionId 
   */
  logout(sessionId) {
    return axios.get(`${server}/user/logout?sessionId=${sessionId}`)
  },
  /**
   * Returns promise of tasks by a user
   * @param {string} sessionId 
   */
  getAllTasksByUserSession(sessionId) {
    return axios.get(`${server}/todos?sessionId=${sessionId}&limit=100`)
  },
  /**
   * Returns promise of adding task
   * @param {object} task 
   * @param {string} sessionId 
   */
  addTask(task, sessionId) {
    return axios.put(`${server}/todo?sessionId=${sessionId}`, task)
  },
  /**
   * Returns promise of deleting task
   * @param {string} id 
   * @param {string} sessionId 
   */
  deleteTask(id, sessionId) {
    return axios.delete(`${server}/todo?sessionId=${sessionId}`, { data: {id: id} })
  },
  /**
   * Returns promise of edit task,
   * if status is passed then consider it otherwise get it from task object
   * @param {object} task 
   * @param {string} sessionId 
   * @param {string} status 
   */
  editTask(task, sessionId, status) {
    return axios.put(`${server}/todo?sessionId=${sessionId}`, {      
        id: task._id,
        title: task.title,
        description: task.description,
        status: status || task.status
    })
  }/*,
  setTaskStatus(task) {
    return axios.put(`${server}/tasks/${task.id}`, task)
  }*/
}

export default todoAPIs