import Vue from 'vue'
import vuex from 'vuex'
import store from '~/store'
import CardComponent from '~/components/todo/CardComponent.vue'

let $mounted
let event = {
  dataTransfer: {
    setData: jest.fn()
  },
  target: {
    style: {
      opacity: 0
    }
  }
}

beforeEach(() => {
  Vue.use(vuex)
  $mounted = new Vue({
    template: '<card ref="card" :task="task" :key="task.id"></card>',
    store: store(),
    components: {
      card: CardComponent
    },
    data () {
      return {
        task: {
          _id: 1,
          title: 'test title',
          description: 'test description',
          status: 'notCompleted',
          author: {
            username: 'farazshuja'
          }
        }
      }
    }    
  }).$mount()
})

test('card initialize corrected', () => {  
  let title = $mounted.$refs.card.title
  let description = $mounted.$refs.card.description
  let reqInProgress = $mounted.$refs.card.reqInProgress
  expect(title).toEqual('')
  expect(description).toEqual('')
  expect(reqInProgress).toEqual(false)
})

test('drag start set opacity', () => {
  $mounted.$refs.card.dragStart(event)
  expect(event.target.style.opacity).toEqual(.4)
  expect(event.dataTransfer.setData.mock.calls.length).toEqual(1)
})
test('drag end clearing opacity', () => {
  $mounted.$refs.card.dragEnd(event)
  expect(event.target.style.opacity).toEqual(1)
})
test('enable inline edit mode', () => {
  let card = $mounted.$refs.card
  const spy = jest.spyOn(card.$store, 'commit')
  card.editInline(1)
  expect(card.title).toEqual(card.task.title)
  expect(card.description).toEqual(card.task.description)
  expect(spy).toHaveBeenCalledWith('setEditMode', {"id": 1, "mode": true})
})
test('cancel inline edit mode', () => {
  let card = $mounted.$refs.card
  const spy = jest.spyOn(card.$store, 'commit')
  card.cancelInline(1)
  expect(spy).toHaveBeenCalledWith('setEditMode', {"id": 1, "mode": false})
})

test('edit a task and send request to backend', () => {
  let card = $mounted.$refs.card
  const spy = jest.spyOn(card.$store, 'commit')  

  // mock a success response
  card.editTask = jest.fn(() => Promise.resolve({ 
    response : { 
      data: { 
        data: {
          _id: 2,
          title: 'test 2 title',
          description: 'test 2 description',
          status: 'notCompleted',
          isEditMode: false,
          author: {
            username: 'farazshuja'
          }                            
        }
      }
    }
  }))

  const editTaskSpy = jest.spyOn(card, 'editTask')
  card.editIt({
    _id: 2,
    title: 'test',
    description: 'test',
    status: 'notCompleted'
  })
  expect(editTaskSpy.mock.calls.length).toEqual(1)
    
})
