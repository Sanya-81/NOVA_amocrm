import { createStore } from 'vuex'
import data from '../../db/index.json'

export const store = createStore({
    state: {
      currentPage: 0,
      size: 6,
      db: data,
      data: data[0],
      dataLength: data[0].length,
      key: {
        TH: '',
        TD: '',
      },
      filterKey: ''
    },

    getters: {
      numbersPage: state => {
        return Math.ceil(state.dataLength / state.size);
      }, 
        
      sortTable: (state) => {
        let arr = state.data;
        let result = null;

        if (state.filterKey) {

          if(state.key.TH) {
            
            switch(state.key.TH) {
              case "имя":
              arr = arr.filter(function(obj) {
                  return String(obj[state.key.TH]).toLowerCase().indexOf(state.filterKey) > -1;
                });
              break;
              
              case "количество":
                if(state.key.TD === "дубли") {
                  arr = arr.filter((obj) => obj[state.key.TH] === +state.filterKey)
                  console.log(arr)
                }
                if(state.key.TD === "больше чем") {
                  arr = arr.filter((obj) => obj[state.key.TH] > +state.filterKey)
                  console.log(arr)
                }
                if(state.key.TD === "меньше чем") {
                  arr = arr.filter((obj) => obj[state.key.TH] < +state.filterKey)
                  console.log(arr)
                }
              // arr = arr.filter((obj) => {
              //   return state.key.TD === "дубль"
              //   ? obj[state.key.TH] === +state.filterKey
              //   : state.key.TD === "больше чем"
              //   ? obj[state.key.TH] > +state.filterKey
              //   : obj[state.key.TH] < +state.filterKey
              // })
              console.log(arr)
              break;
            }

            result = listData(arr)
            
            // обновляем длину массива для кнопок numberPage
            state.dataLength = arr.length
          }

          if (state.key.TD) {
            let order;
            switch(state.key.TD) {
              case "дубли": 
               order = 0;
              break;
               
              case "меньше чем": 
                order = -1;
                break;
                
              case "больше чем": 
                order = 1;
              break;
            }
            console.log(arr)
            arr = arr.slice().sort(function (a, b) {
              a = a[state.key.TH];
              b = b[state.key.TH];
              return (a === b ? 0 : a > b ? 1 : -1) * order;
            });
            console.log(arr)
          } 

          
          result = listData(arr)
          
        } else {
          // if (state.filterKey) {
            arr = arr.filter(function (row) {
              return Object.keys(row).some(function (key) {
                return String(row[key]).toLowerCase().indexOf(state.filterKey) > -1;
              });
            });
            //   a = a.filter(function(obj) {
              //     return Object.keys(obj).some(function(key) {
                //       return String(obj[key]).toLowerCase().indexOf(state.filterKey) > -1;
                //     });
                //   });
                
                //   b = listData(a)
                
                //   // обновляем длину массива для кнопок numberPage
                //   state.dataLength = a.length
                // } else {
                  
                  // обновляем лист таблицы после использования погинации
                  result = listData(arr)
        }
      return result
      },

      thData: state => { return state.db[1].map((obj) => obj.content) },
      db_1: state => { return state.db[1] },
      db_2: state => { return state.db[2] }
      },

      mutations: {
        increment: state => state.currentPage++,
        decrement: state => state.currentPage--,
        multiply: (state, n) => state.currentPage = n,
        filterKey: (state, vmodel) => state.filterKey = vmodel,
        key: (state, data) => {
          
          data.name === 'TH'
            ? state.key.TH = data.elem
            : state.key.TD = data.elem

          // state.filterKey = data.elem
        }
      }
    })

    function listData(arr) {
      let start =  store.state.currentPage * store.state.size;
      let end = start + store.state.size;
      return arr.slice(start, end)
    }