import Vue from 'vue'
import vuex from 'vuex'
import store from '~/store'
import NavBarComponent from '~/components/common/NavBar.vue'

let $mounted

beforeEach(() => {
  Vue.use(vuex)
  $mounted = new Vue({
    template: '<nav-bar ref="navbar" @addTask="addTask()"></nav-bar>',
    store: store(),
    data () {
      return {
        addTaskCalled: false
      }
    },
    components: {
      'nav-bar': NavBarComponent
    },
    methods: {
      addTask () {
        this.addTaskCalled = true
      }
    }
  }).$mount()
})

test('navbar initialize correctly', () => {  
  let showMenu = $mounted.$refs.navbar.showMenu
  expect(showMenu).toEqual(true)
})

test('toggle menu', () => {
  let navbar = $mounted.$refs.navbar
  navbar.toggleMenu()
  expect(navbar.showMenu).toEqual(false)
})

test('add task to call parent component method', () => {
  let navbar = $mounted.$refs.navbar
  navbar.addTask()
  expect($mounted.addTaskCalled).toEqual(true)
})

test('logout session and redirect', () => {
  let navbar = $mounted.$refs.navbar
  navbar.$router = []
  // mock a success response
  navbar.setUser = jest.fn()
  
  navbar.logout = jest.fn(() => Promise.resolve({     
    data: { 
      status: 'success'
    }    
  }))    
  const spy = jest.spyOn(navbar, 'setUser')
  
  navbar.logoutSession()
  setTimeout( () => {
    expect(spy.mock.calls.length).toEqual(1)
  }, 900)  
})
/*
test('show modal', () => {
  let modal = $mounted.$refs.modalRef
  modal.showModal()
  expect(modal.show).toEqual(true)
})

test('invalid form not allowed to submit', () => {
  let modal = $mounted.$refs.modalRef
  const spy = jest.spyOn(modal, 'addTask')
  modal.title = 'something'
  modal.addNewTask()
  expect(spy.mock.calls.length).toEqual(1)
})

test('invalid form not allowed to submit', () => {
  let modal = $mounted.$refs.modalRef
  const spy = jest.spyOn(modal, 'addTask')
  modal.title = ''
  modal.addNewTask()
  expect(spy.mock.calls.length).toEqual(0)
})*/