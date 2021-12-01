<template>
<div>
    <button 
        :disabled="currentPage === 0" 
        @click="prevPage">
    Previous
    </button>
    {{ currentPage }}
    <button 
        :disabled="currentPage >= dataLength" 
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
            dataLength: this.$store.state.dataLength
        }
    },

    computed: {
        currentPage() {
            return this.$store.state.currentPage
        }
    },

    methods: {
        prevPage() {
            this.$store.commit('decrement')
	},
        nextPage() {
            this.$store.commit('increment');
        }
  }
}
</script>

<style>

</style>