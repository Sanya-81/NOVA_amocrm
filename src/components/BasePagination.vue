<template>
<div>
    <button 
        :disabled="currentPage === 0" 
        @click="prevPage">
    Previous
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
    Next
    </button>
</div> 
</template>

<script>
export default {
    name: "pagination",
    data: function() {
        return {
            }
    },

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

<style>

</style>