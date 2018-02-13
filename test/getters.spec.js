import getters from '~/store/getters.js'

let state = {
  user: {
    sessionId: 'xyz123',
    username: 'farazshuja'
  },
  tasks: [
    {id: 1, title: 'test', description: 'test', status: 'completed'},
    {id: 2, title: 'test in progress', description: 'test in progress', status: 'notCompleted'}
  ]
}

describe('getters', () => {
  describe('getUser', () => {
    it('should get user object from state', () => {
      let user = getters.getUser(state)
      expect(user.username).toEqual('farazshuja')
    })
  })
  describe('getAllTasks', () => {
    it('should get all tasks from state', () => {
      let tasks = getters.getAllTasks(state)
      expect(tasks.length).toEqual(2)
    })
  })
  describe('getIncompletedTasks', () => {
    it('should get incompleted tasks from state', () => {
      let tasks = getters.getIncompletedTasks(state)
      expect(tasks.length).toEqual(1)
    })
  })
  describe('getCompletedTasks', () => {
    it('should get completed tasks from state', () => {
      let tasks = getters.getCompletedTasks(state)
      expect(tasks.length).toEqual(1)
    })
  })
  describe('getTask', () => {
    it('should get a task from state', () => {
      let tasks = getters.getTask(state, 2)      
      expect(tasks[0].status).toEqual('notCompleted')
    })
  })
  
})