<template>
<div
	class="g-prt__pagination">
	<button
		:disabled="currentPage === 0" 
		class ="
			g-chd__prev
			button"
		@click="prevPage"> 
	назад</button>
	
	<div
		class="
			g-chd__current-click-button
			f-prt__current-click-button">
		<button 
			v-for="n in numbersPage"
			:key="n"
			:disabled="currentPage === n - 1" 
			class="button"
			@click="page(n - 1)"> 
		{{ n }}</button></div>

	<button 
		:disabled="currentPage >= numbersPage - 1" 
		class="
			g-chd__next
			button"
		@click="nextPage">
	вперед</button>
	
</div> 
</template>

<script>
export default {
	name: "pagination",
	data(){
		return {
			test: 'test'
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

<style scoped>
	button {
		appearance: none;
		border: 0;
		border-radius: 0;
		color: inherit;
	}
	
	.g-prt__pagination {
		border-radius: 5px;
		padding: 40px 30px;
		border: 2px solid var(--blue100);
		background-color: var(--greySmoke);
		gap: 20px;

		display: grid;
		grid: 
			"next" auto
			"current-click-button" auto
			"prev" auto
			/ auto;
	}
	
	.g-chd__prev {
		grid-area: prev;
	}
	
	.g-chd__current-click-button {
		grid-area: current-click-button;
	}

	.g-chd__prev {
		grid-area: next;
	}
	
	.f-prt__current-click-button {
		display: flex;
		justify-content: center;
		flex-wrap: wrap;
	}

</style>

<style lang="scss">
	.button {
		display: flex;
		justify-content: center;
		align-items: center;
		min-width: 20px;
		height: 48px;
		margin: 5px;
		border-radius: 6px;
		padding-left: 20px;
		padding-right: 20px;
		cursor: pointer;
		font-family: 'IBM Plex Sans', sans-serif;
		color: var(--blue600);
		box-shadow: var(--shadowNormal);
		text-shadow: var(--textShadow);
		background-color: hsl(210, 100%, 90%);
		
		&:hover {
			text-shadow: none;
			box-shadow: var(--shadowHover);
		}

		&:active {
			box-shadow: var(--shadowActive);    
		}
		
		&:disabled {
			background-color: var(--grey100);
			outline: 2px solid hsl(330, 100%, 80%);
			color: hsl(330, 100%, 50%);
			cursor: auto;
			opacity: 0.5;
		}
		&:disabled:hover {
			box-shadow: none;  
			filter: none; 
		}
	}
</style>