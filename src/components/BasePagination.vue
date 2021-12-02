<template>
<div>
    <button
      
        :disabled="currentPage === 0" 
        @click="prevPage">
    назад
    </button>
    <button 
        v-for="n in numbersPage"
        :key="n"
        :disabled="currentPage === n - 1" 
        @click="page(n - 1)">
    {{n}}</button>
    <button 
        :disabled="currentPage >= numbersPage - 1" 
        @click="nextPage">
    вперед
    </button>
</div> 
</template>

<script>
export default {
    name: "pagination",
    computed: {
        numbersPage() {
            return this.$store.getters.numbersPage
        },

        currentPage() {
            return this.$store.state.currentPage
        }
    },

    methods: {
        prevPage() {
            this.$store.commit('decrement');
        },

        page(n) {
            this.$store.commit('multiply', n);
            console.log(n)
        },

        nextPage() {
            this.$store.commit('increment');
        },
    }
}
</script>

<style lang="scss">
  button {
        appearance: none;
        border: 0;
        border-radius: 0;
        background: none;
        color: inherit;
    }
button {
        display: inline-flex;
        justify-content: center;
        align-items: center;
        min-width: 20px;
        height: 48px;
        margin: 0 5px;
        border-radius: 6px;
        padding-left: 20px;
        padding-right: 20px;
         
        cursor: pointer;
        color: var(--blue50);
        font-family: 'IBM Plex Sans', sans-serif;
        box-shadow: var(--shadowNormal);
        text-shadow: var(--textShadow);
        background-color: var(--blue800);
        
        &:hover {
            text-shadow: none;
            filter: var(--dropShadowButton)
        }

        &:active {
            // border: 2px solid var(--blue900);
            box-shadow: var(--shadowActive);    
        }
        
        &:disabled {
            background-color: var(--blue100);
            outline: 2px solid red;
            color: red;
            cursor: auto;
            opacity: 0.5;
        }
        &:disabled:hover {
            box-shadow: none;  
            filter: none; 
        }
    }
</style>