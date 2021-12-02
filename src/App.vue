<template>
<div class="g-prt__container--wrapper">
<div class="g-prt__container">
	<base-pagination
		class="g-chd__pagination">
	</base-pagination>
	<base-table
		class="g-chd__table"
		:tebleData="sortTable"
		:thCell="thData">
	</base-table>
	<form 
		class="g-prt__form g-chd__form"
		id="search">
		<input
			class="g-chd__input" 
			name="query" 
			v-model="searchQuery"/>
		<base-select
			class="g-chd__select-th"
			:db="db_1"
			:name="name[0]">
		фильтр: {{ name[0] }}
		</base-select>
		<base-select
			class="g-chd__select-td"
			:db="db_2"
			:name="name[1]">
		фильтр: {{ name[1] }}
		</base-select>
	</form>
</div>
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
			name: ['TH', 'TD']
			// searchQuery: "",
		}
	},
	computed: {
		sortTable() { return this.$store.getters.sortTable },
		thData() { return this.$store.getters.thData },
		db_1() { return this.$store.getters.db_1 },
		db_2() { return this.$store.getters.db_2 },
		searchQuery: {
			get() {
				return this.$store.state.filterKey
			},
			set(value) {
				this.$store.commit('filterKey', value);
			}
		}
// 	// 	count() 2
// 	this.sortTable =  this.$store.getters.sortTable }
// // 		return this.$store.state.count
	},

 
}
</script>

<style>
  .g-prt__container--wrapper {
        display: grid;
        height: 100vh;
        align-content: center;
        justify-content: center;
        background-color: var(--blue50);
    }
	.g-prt__container {
        border-radius: 10px;
        padding: 40px 30px;
        display: grid;
        grid: 
            "table" 275px
            "pagination" 50px
            "form" auto
            /minmax(360px, 768px);
        border: 2px solid var(--blue100);
        background-color: var(--white);
        filter: var(--dropShadowForm);
    }

	.g-chd__form { grid-area: form; }
    .g-chd__table { grid-area: table; }
    .g-chd__pagination { 
		grid-area: pagination; 
		justify-self: center;
		align-self: center;
	}

	.g-prt__form {
        border-radius: 5px;
        padding: 40px 30px;
        display: grid;
		gap: 20px;
        grid: 
            "input input" 50px
           "selectTH selectHD" auto
            / auto;
        border: 2px solid var(--blue100);
        background-color: var(--white);
        filter: var(--dropShadowForm);
    }

    .g-chd__input { grid-area: input; }
    .g-chd__selectTH { grid-area: selectTH; }
    .g-chd__selectTD { grid-area: selectTD; }
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
	--blue200: #f9f9f9;
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
	@import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@500&display=swap');

    body {
        font-family: 'IBM Plex Sans', sans-serif;
		font-size: 14px;
		color: var(--blue600);
}

table {
	border: 2px solid var(--blue900);
	border-radius: 3px;
	background-color: var(--white);
}

th {
	background-color: var(--blue800);
	color: var(--blue50);
	letter-spacing: .1em;
	
}

td {
	background-color: var(--blue200);
}

th,
td {
	min-width: 80px;
	padding: 10px 20px;
}

</style>
