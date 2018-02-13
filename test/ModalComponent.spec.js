import Vue from 'vue'
import vuex from 'vuex'
import store from '~/store'
import ModalComponent from '~/components/common/Modal.vue'

let $mounted

beforeEach(() => {
  Vue.use(vuex)
  $mounted = new Vue({
    template: '<modal ref="modalRef"></modal>',
    store: store(),
    components: {
      modal: ModalComponent
    }        
  }).$mount()
})

test('modal initialize corrected', () => {  
  let title = $mounted.$refs.modalRef.title
  expect(title).toEqual('task name')
})

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
})