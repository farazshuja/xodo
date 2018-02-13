import axios from 'axios'
import actions from '~/store/actions'

const server = 'http://localhost:3000'
const user = {
  username: 'farazshuja',
  password: '12345678',
  sessionId: 'xyzXYZxyz'
}

describe('login', () => {
  it('should call axios get method', () => {
    const spy = jest.spyOn(axios, 'post')
    actions.login({}, user)
    expect(spy).toHaveBeenCalledWith(`${server}/user/auth`, {"password": "xxxxxxxx", "username": "farazshuja"})
  })
})

describe('logout', () => {
  it('should call axios get logout', () => {
    const spy = jest.spyOn(axios, 'get')
    actions.logout({}, user)
    expect(spy).toHaveBeenCalledWith(`${server}/user/logout?sessionId=${user.sessionId}`)
  })
})

describe('getAllTasksByUserSession', () => {
  it('should call axios to get all tasks and mutate tasts', () => {
    const spy = jest.spyOn(axios, 'get')
    const commit = jest.fn()
    actions.getAllTasksByUserSession({commit}, user.sessionId)
    expect(spy).toHaveBeenCalledWith(`${server}/todos?sessionId=${user.sessionId}&limit=100`)
  })
})

describe('add/edit/delete Task', () => {
  it('should add/edit/delete a task by calling axios put method', () => {
    const spyPut = jest.spyOn(axios, 'put')
    const spyDel = jest.spyOn(axios, 'delete')
    const commit = jest.fn()
    const state = { user: { sessionId: 'xyzXYZxyz' } }
    const task = {
      _id: 1,
      title: 'title',
      description: 'description',
      status: 'notCompleted'
    }
    actions.addTask({commit, state}, task)
    expect(spyPut).toHaveBeenCalledWith(`${server}/todo?sessionId=${state.user.sessionId}`, task)

    actions.deleteTask({commit, state}, task._id)
    expect(spyDel).toHaveBeenCalledWith(`${server}/todo?sessionId=${state.user.sessionId}`, { data: {id: task._id} })

    actions.editTask({commit, state}, task)
    expect(spyPut).toHaveBeenCalledWith(`${server}/todo?sessionId=${state.user.sessionId}`, {      
      id: task._id,
      title: task.title,
      description: task.description,
      status: task.status
    })
  })
})

describe('setTaskStatus', () => {
  it('should call axios to mutate the status', () => {
    const spy = jest.spyOn(axios, 'put')
    const commit = jest.fn()
    const state = { user: { sessionId: 'xyzXYZxyz' } }
    const task = {
      _id: 1,
      title: 'title',
      description: 'description',
      status: 'notCompleted'
    }
    
    actions.setTaskStatus({commit, state}, task)
    expect(spy).toHaveBeenCalledWith(`${server}/todo?sessionId=${state.user.sessionId}`, {      
      id: task._id,
      title: task.title,
      description: task.description,
      status: task.status
    })    
  })
})