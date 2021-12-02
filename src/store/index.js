import { createStore } from 'vuex'
import data from '../../db/index.json'

export const store = createStore({
    state: {
      currentPage: 0,
      size: 3,
      db: data,
      data: data[0],
      dataLength: data[0].length,
      filterKey: ''
    },
    getters: {
      numbersPage: state => {
        console.log(state.dataLength)
        return Math.ceil(state.dataLength / state.size);
      }, 
        
      sortTable: (state) => {
        let a = state.data;
        let b = {};

        if (state.filterKey) {
          a = a.filter(function (row) {
            return Object.keys(row).some(function (key) {
              return String(row[key]).toLowerCase().indexOf(state.filterKey) > -1;
            });
          });

          b = listData(a)
          
          // обновляем длину массива для кнопок numberPage
          state.dataLength = a.length
        } else {
          
          // обновляем лист таблицы после использования погинации
          b = listData(a)
        }
      return b
      },

      thData: state => { return state.db[1].map((obj) => obj.content) },
      db_1: state => { return state.db[1] },
      db_2: state => { return state.db[2] }
      },

      mutations: {
        increment: state => state.currentPage++,
        decrement: state => state.currentPage--,
        multiply: (state, n) => state.currentPage = n,
        filterKey: (state, vmodel) => state.filterKey = vmodel
        
      }
    })

    function listData(a) {
      let start =  store.state.currentPage * store.state.size;
      let end = start + store.state.size;
      return a.slice(start, end)
    }