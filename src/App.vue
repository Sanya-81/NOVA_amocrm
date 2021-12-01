<template>
<div>
  <p>{{ count }}</p>
  <p>
	<button @click="increment">111111111111</button>
	<button @click="decrement">111111111111</button>
  </p>
  <div id="demo">
      <form id="search">
        Search <input name="query" v-model="searchQuery" />
      </form>
      <BaseTable
        :heroes="gridData"
        :columns="gridColumns"
        :filter-key="searchQuery" 
      >
      </BaseTable>
    </div>
</div>
</template>

<script>
import BaseTable from './components/BaseTable.vue'
export default {
	name: 'App',
	components:{BaseTable},
	data: function() {
		return {
          searchQuery: "",
          gridColumns: ["name", "data", "quantity", "distance"],
          gridData: this.$store.state.db
		}
	},
	computed: {
	count() {
		return this.$store.state.count
	}
  },
  methods: {
	increment() {
		this.$store.commit('increment')
	},
	decrement() {
		this.$store.commit('decrement')
	}
  }
}
</script>

<style>
body {
  font-family: Helvetica Neue, Arial, sans-serif;
  font-size: 14px;
  color: #444;
}

table {
  border: 2px solid #42b983;
  border-radius: 3px;
  background-color: #fff;
}

th {
  background-color: #42b983;
  color: rgba(255, 255, 255, 0.66);
  cursor: pointer;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

td {
  background-color: #f9f9f9;
}

th,
td {
  min-width: 120px;
  padding: 10px 20px;
}

th.active {
  color: #fff;
}

th.active .arrow {
  opacity: 1;
}

.arrow {
  display: inline-block;
  vertical-align: middle;
  width: 0;
  height: 0;
  margin-left: 5px;
  opacity: 0.66;
}

.arrow.asc {
  border-left: 4px solid transparent;
  border-right: 4px solid transparent;
  border-bottom: 4px solid #fff;
}

.arrow.dsc {
  border-left: 4px solid transparent;
  border-right: 4px solid transparent;
  border-top: 4px solid #fff;
}

</style>
