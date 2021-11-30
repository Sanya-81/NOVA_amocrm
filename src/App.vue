<template>
<div id="app">
  <p>{{ count }}</p>
  <p>
	<button @click="increment">111111111111</button>
	<button @click="decrement">111111111111</button>
  </p>
</div>
</template>

<script>

export default {
	name: 'App',
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

</style>
