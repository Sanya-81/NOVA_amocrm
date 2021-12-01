import { createStore } from 'vuex'
import db from '../../db/index.json'

export const store = createStore({
    state: {
      count: 0,
      db,
    },
    mutations: {
        increment: state => state.count++,
        decrement: state => state.count--
    }
  })
