<template>
 <table>
        <thead>
          <tr>
            <th v-for="key in thCell"
              @click="sortBy(key)"
              :key="key"
              :class="{ active: sortKey == key }">
              {{ key}}
              <span class="arrow" :class="sortOrders[key] > 0 ? 'asc' : 'dsc'">
              </span>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr 
            v-for="entry in filteredHeroes"
            :key="entry"
            >

            <td v-for="key in thCell"
                :key="key">
              {{entry[key]}}
            </td>
          </tr>
        </tbody>
      </table>
</template>

<script>
export default {
     props: {
          tebleData: Array,
          thCell: Array,
          filterKey: String
        },
        data: function () {
          var sortOrders = {};
          this.thCell.forEach(function (key) {
            sortOrders[key] = 1;
          });
          return {
            sortKey: "",
            sortOrders: sortOrders
          };
        },
        computed: {
          filteredHeroes: function () {
            var sortKey = this.sortKey;
            // var filterKey = this.filterKey && this.filterKey.toLowerCase();
            var order = this.sortOrders[sortKey] || 1;
            var tebleData = this.tebleData;
            // if (filterKey) {
            //   tebleData = tebleData.filter(function (row) {
            //     return Object.keys(row).some(function (key) {
            //       return String(row[key]).toLowerCase().indexOf(filterKey) > -1;
            //     });
            //   });
            // }
            if (sortKey) {
              tebleData = tebleData.slice().sort(function (a, b) {
                a = a[sortKey];
                b = b[sortKey];
                return (a === b ? 0 : a > b ? 1 : -1) * order;
              });
            }
            return tebleData;
          }
        },
        // filters: {
        //   capitalize: function (str) {
        //     return str.charAt(0).toUpperCase() + str.slice(1);
        //   }
        // },
        methods: {
          sortBy: function (key) {
            this.sortKey = key;
            this.sortOrders[key] = this.sortOrders[key] * -1;
          }
        }
    }
</script>

<style>

</style>