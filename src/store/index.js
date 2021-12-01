import { createStore } from 'vuex'
import data from '../../db/index.json'

export const store = createStore({
    state: {
      currentPage: 0,
      data,
      dataLength: data.length,
    },
    getters: {
      dataLength: state => console.log(state.currentPage)
    },
    mutations: {
        increment: state => state.currentPage++,
        decrement: state => state.currentPage--
    }
  })
