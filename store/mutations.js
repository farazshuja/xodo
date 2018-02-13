export default {
  // update state with new user
  setUser (state, user) {
    state.user = user
  },
  // update state with new tasks
  setTasks (state, tasks) {
    state.tasks = tasks
  },  
  // add new task to state
  addTask (state, task) {
    state.tasks.push(task)
  },  
  // edit task thats in the state
  editTask (state, task) {    
    for(let i = 0; i < state.tasks.length; i++) {
      let _task = state.tasks[i];
      if(_task._id === task._id) {
        state.tasks[i].title = task.title
        state.tasks[i].description = task.description
        state.tasks[i].isEditMode = false        
        break;
      }
    }
  },
  // delete task based on id from state
  deleteTask (state, id) {
    for(let i = 0; i < state.tasks.length; i++) {
      if(state.tasks[i]._id === id) {
        state.tasks.splice(i, 1)
        break;
      }
    }
  },
  // handle mode to show/hide edit text boxes for a task
  setEditMode(state, {id, mode}) {    
    for(let i = 0; i < state.tasks.length; i++) {
      if(state.tasks[i]._id === id) {
        //state.tasks.splice(i, 1, )
        state.tasks[i].isEditMode = mode
        break;
      }
    }    
  }
}