/**
 * Wrapper methods around state to get miscellenous objects
 */
export default {
  getUser: state => state.user,
  getAllTasks: state => state.tasks,
  getIncompletedTasks: state => state.tasks.filter(t => t.status !== 'completed'),
  getCompletedTasks: state => state.tasks.filter(t => t.status === 'completed'),
  getTask: (state, id) => state.tasks.filter(t => t.id === id)
}