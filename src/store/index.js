import { createStore } from 'vuex'
import data from '../../db/index.json'

export const store = createStore({
    state: {
      currentPage: 0,
      size: 2,
      data,
      dataLength: data.length,
      filterKey: ''
    },
    getters: {
      numbersPage: state =>  Math.ceil(state.dataLength / state.size),
      sortTable: (state) => {
        // if (state.filterKey) {
        //   // tebleData = tebleData.filter(function (row) {
        //   //   return Object.keys(row).some(function (key) {
        //   //     return String(row[key]).toLowerCase().indexOf(filterKey) > -1;
        //   //   });
        //   // });
        // } 
        let a = state.data
        // let start =  state.currentPage * state.size;
        // let end = start + state.size;
        // let b = a.slice(start, end) 
        let b = listData(a)
        // state.currentPage = 0;
        return b
        
      },
      // Page: (state, getters) => {
        //   getters.sortTable(state) 
        // }
      },
      mutations: {
        increment: state => state.currentPage++,
        decrement: state => state.currentPage--,
        multiply: (state, n) => state.currentPage = n
        
      }
    })

    function listData(a) {
      let start =  store.state.currentPage * store.state.size;
      let end = start + store.state.size;
      return a.slice(start, end)
    }