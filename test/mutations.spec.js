import mutations from '~/store/mutations.js'

let state = {
  user: {
    sessionId: 'xyz123',
    username: 'farazshuja'
  },
  tasks: [
    {_id: 1, title: 'test', description: 'test', status: 'completed'}
  ]
}

describe('mutation', () => {
  describe('setUser', () => {
    it('should set user object', () => {
      mutations.setUser(state, {
        sessionId: 'abcdef123456',
        username: 'shujafaraz'
      })
      expect(state.user.username).toEqual('shujafaraz')
    })
  })

  describe('setTasks', () => {
    it('should set tasks', () => {
      mutations.setTasks(state, [])
      expect(state.tasks.length).toEqual(0)
    })
  })

  describe('addTask', () => {
    it('should add a task', () => {      
      mutations.addTask(state, {_id: 2, title: 'new', description: 'new', status: 'notCompleted'})
      mutations.addTask(state, {_id: 3, title: 'new', description: 'new', status: 'notCompleted'})
      expect(state.tasks.length).toEqual(2)
    })
  })

  describe('editTask', () => {
    it('should edit a task', () => {      
      mutations.editTask(state, {_id: 2, title: 'updated', description: 'updated', status: 'notCompleted'})
      expect(state.tasks[0].title).toEqual('updated')
    })
  })

  describe('deleteTask', () => {
    it('should delete a task', () => {      
      mutations.deleteTask(state, 2)
      expect(state.tasks.length).toEqual(1)
    })
  })

  describe('setEditMode', () => {
    it('should delete a task', () => {      
      mutations.setEditMode(state, {id: 3, mode: true})
      expect(state.tasks[0].isEditMode).toEqual(true)
    })
  })
})