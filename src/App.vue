<template>
<div>
	<!-- <p>{{ count }}</p> -->
	<base-pagination/>
	<form id="search">
	Search
		<input name="query" v-model="searchQuery" />
	</form>
	

	<base-table
	:tebleData="dbData"
	:thCell="thData"
	:filter-key="searchQuery" >
	</base-table>
<base-select
		:db="db">
	</base-select>
</div>
</template>

<script>
import BaseSelect from './components/BaseSelect.vue'
import BasePagination from './components/BasePagination.vue'
import BaseTable from './components/BaseTable.vue'
export default {
	name: 'App',
	components:{BaseTable, BasePagination, BaseSelect},
	data: function() {
		return {
					searchQuery: "",
					thData: ["data", "name", "quantity", "distance"],
				//   dbData: this.$store.state.data
				//   dbData:  this.$store.getters.sortTable
				db: [
                {
                    "value": "E1",
                    "content": "Русский",
                },
                {
                    "value":"E2",
                    "content":"Английский",
                },
                {
                    "value":"E3",
                    "content":"Китайский",
                },
                {
                    "value":"E4",
                    "content":"Испанский",
                },
            ],
		}
	},
	computed: {
		dbData() { return this.$store.getters.sortTable }
// 	// 	count() {
// 	this.dbData =  this.$store.getters.sortTable }
// // 		return this.$store.state.count
	},
// 	methods: {

// 	}

 
}
</script>

<style>
   :root {
    --number-9: 0.25;
    --number-8: 0.16;
    --number-7: 0.08;
    --number-6: 0.0001;
    --number-5: 0.04;
    --number-4: 0.02;
    
    --white: #ffffff;
    --blue50: #EBF4F8;
    --blue100: #DBE2EA;
    --blue600: #0880AE;
    --blue800: #756F86;
    --blue900: #2C2738;

    --black9: rgba(0, 0, 0, var(--number-9));
    --black8: rgba(44, 39, 56, var(--number-8));
    --black7: rgba(44, 39, 56, var(--number-7));
    --black6: rgba(44, 39, 56, var(--number-6));
    --black5: rgba(44, 39, 56, var(--number-5));
    --black4: rgba(44, 39, 56, var(--number-4));

    --dropShadowButton: 
        drop-shadow(0px 4px 4px var(--black9));
    --dropShadowSelect:
        drop-shadow(0px 4px 8px var(--black5)),
        drop-shadow(0px 20px 20px var(--black5));
    --dropShadowForm:
        drop-shadow(0px 12px 24px var(--black4)),
        drop-shadow(0px 32px 64px var(--black5));
    
    --dropShadowInput: var(--dropShadowSelect);

    --textShadow: 
        0px 4px 4px var(--black9);
    
    --shadowNormal: 
        0px 2px 4px var(--black7), 
        0px 4px 8px var(--black7);
    --shadowHover: 
        0px 12px 24px var(--black7),
        0px 24px 48px var(--black8);
    --shadowActive: 
        0px 2px 4px var(--black6), 
        0px 4px 8px var(--black7);
    
    --shadowBorder: var(--blue600) 0 0 0 2px; 
    }
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
