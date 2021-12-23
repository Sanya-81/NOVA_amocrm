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
            placeholder="поиск"
            class="g-chd__input input" 
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
import BaseTable      from './components/BaseTable.vue'
import BaseSelect     from './components/BaseSelect.vue'
import BasePagination from './components/BasePagination.vue'

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
    },
}
</script>

<style>
   .g-prt__container--wrapper {
        display: grid;
        height: 100vh;
        align-content: center;
        justify-content: center;
        background-color: var(--grey200);
    }
    .g-prt__container {
        border-radius: 10px;
        padding: 40px 30px;
        display: grid;
        grid: 
            "form" auto
            "table" auto
            "pagination" auto
            /minmax(360px, 768px);
        border: 2px solid var(--blue100);
        background-color: var(--grey0);
        gap: 20px
    }

    .g-chd__form { grid-area: form; }
    .g-chd__table { grid-area: table; }
    .g-chd__pagination { grid-area: pagination; }

    .g-prt__form {
        
        /* align-content: center; */
        /* justify-content: center; */
        border-radius: 5px;
        padding: 40px 30px;
        display: grid;
        gap: 20px;
        grid: 
            "input input" 50px
           "selectTH selectHD" auto
            / auto;
        border: 2px solid var(--blue100);
        background-color: var(--grey0);
        filter: var(--dropShadowForm);
    }

    .g-chd__input { grid-area: input; }
    .g-chd__selectTH { grid-area: selectTH; }
    .g-chd__selectTD { grid-area: selectTD; }
   
    @import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@500&display=swap');
 
    /* 
    BOX-SIZING важен для коррекного отображения 
    select custom AND select native 
    */
    body {
        font-size: 14px;
        font-family: 'IBM Plex Sans', sans-serif;
        box-sizing: border-box;
        color: var(--blue600);
        background-color: var(--grey0);
    }
    
    body * {
        box-sizing: inherit;
    }

</style>

<style lang="scss">
    .inputLable {
        color: var(--blue800);
    }
    
    .input {
        outline: none;
        height: 52px;
        padding-left: 16px;
        border: 1px solid var(--blue100);
        background-color: var(--grey0);
    
        &::placeholder {
            color: var(--blue600);
        }

        &:focus {
            box-shadow:
                var(--shadowNormal);

        }
        &:hover {
            box-shadow: 
                var(--shadowHover);
        }
    }
</style>
