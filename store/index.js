import Vuex from 'vuex'
import state from './state'
import getters from './getters'
import mutations from './mutations'
import actions from './actions'

/**
 * Prepare the store object and utilize in Vue app
 */
const createStore = () => {
  return new Vuex.Store({
    state,
    actions,
    mutations,
    getters
})
}

export default createStore