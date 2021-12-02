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
              case "расстояние":
                // необходимо предварительно отфильтровать по числам
                // прежде чем переходить к фильру по TD ниже
                if(state.key.TD === "дубли") {
                  arr = arr.filter((obj) => obj[state.key.TH] === +state.filterKey)
                }
                if(state.key.TD === "больше чем") {
                  arr = arr.filter((obj) => obj[state.key.TH] > +state.filterKey)
                }
                if(state.key.TD === "меньше чем") {
                  arr = arr.filter((obj) => obj[state.key.TH] < +state.filterKey)
                }
              break;
            }
            // обновляем лист таблицы после использования погинации
            result = listData(arr)
            // обновляем длину массива для кнопок numberPage
            state.dataLength = arr.length
          }
          
          // после нахождения всех совпадений в фильтр: TH
          // сортируем для таблицы по параметрам фильтр: TD  
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
          } 
          
        // обновляем лист таблицы после использования погинации
        result = listData(arr)
        
        // если нет поиска по фильтру, работаем с чистым data[0]
        // числа будут строками! из-за String()  
        } else { 
            arr = arr.filter(function (row) {
              return Object.keys(row).some(function (key) {
                return String(row[key]).toLowerCase().indexOf(state.filterKey) > -1;
              });
            });

        // обновляем лист таблицы после использования погинации
        result = listData(arr)
        }

      return result
      },

      thData: state => { return state.db[1].map((obj) => obj.content) },
      //удаляем первый объект дата, чтобы убрать его из фильтра TH 
      db_1: state => { return state.db[1].slice(1)},
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
        }
      }
    })

    // определение того, сколько строк предсавлено для отображения в таблице
    // и по сколько перелистывать при использовании погинации
    function listData(arr) {
      let start =  store.state.currentPage * store.state.size;
      let end = start + store.state.size;
      return arr.slice(start, end)
    }