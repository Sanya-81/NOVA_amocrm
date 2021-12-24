<template>
<div>
	<p 
		class="select-label" 
		id="jobLabel">   
		<slot></slot></p>
		
	<div 
		class="select-wrapper">
		<select 
			class="select-native" 
			aria-labelledby="jobLabel"
			@change= changeNative($event)
			ref='native'>
			<option 
				value="sel"         
				disabled 
				selected
				ref="option"> 
			{{ elSelectState }}</option>

			<option 
				v-for = "obj of db"
				:key  = "obj.value"
				:value = obj.value>
			{{ obj.content }}</option></select>

		<div 
			class="select-custom" 
			:class="{isActive: Active}"
			:aria-hidden = ariaHidden>   
			<div
				@click = openSelectCustom()
				class="select-custom-trigger"
				ref='closeSelectRoot'>
				
			{{ elSelectState }}</div>
			<div 
				class="select-custom-options">
				<div
					v-for = "(obj,index) of db"
					:key  = obj.value
					:class="[
						{isActive: elSelectState === obj.content}, 
						{isHover: optionChecked === obj.value}
					]"
					class = "select-custom-option"
					:data-value = obj.value
					@mouseenter = "
						optionChecked = obj.value, 
						optionIndex = index "
					@click = "
						elSelectState = obj.content, 
						changeCustom($event),
						closeSelectCustom()">
				{{obj.content}}</div></div></div></div>
</div>
</template>

<script>
export default {
	props: {
		db: {
			type: Array,
		},
		name: {
			type: String,
			default: 'фильтр'
		}
	},
	data() {
		return {
			Active: false,
			ariaHidden: 'true',
			optionChecked: null,
			optionIndex: -1,
			value: '',
			content: '',
			'data-value': '',
			elSelectState: 'выбирите ячейку',
		}
	},
	
	watch: {
		elSelectState(){
			console.log(this.elSelectState)
			console.log(this.name)
			this.$store.commit({
				type: 'key', 
				elem: this.elSelectState,
				name: this.name
			});
		},

	},

	methods: {
		changeNative(event) {
			const nativeValue = event.target.value;
			const proxy = this.db.filter((obj, index) => {
				this.optionIndex = index;
				return obj.value === nativeValue}); 
			this.elSelectState =  proxy[0].content
			this.optionChecked = nativeValue
		},

		changeCustom(event) {
			this.$refs.native.value = event.target.getAttribute("data-value")
			console.log(event.target)
		},

		openSelectCustom() {
			this.Active = !this.Active
			this.ariaHidden = 'false';
		},

		closeSelectCustom() {
			this.ariaHidden = 'true';
			this.Active = false
		},
		
		closeSelectRoot(e) {
			const el = this.$refs.closeSelectRoot;
			const target = e.target;
			if  (el != target && !el.contains(target)) {
				this.Active = false
			}
		},
		
		currentOptionValue() {
			const optionValue = this.db[this.optionIndex].value
			this.optionChecked = optionValue
		},

		KeyboardNavigation(e) {
			if(this.Active && e.keyCode === 40){
				e.preventDefault();
				
				if(this.optionIndex != this.db.length - 1){
					this.optionIndex++;
					this.currentOptionValue();
				} 
			}

			if(this.Active && e.keyCode === 38){
				e.preventDefault();
				
				if(this.optionIndex > 0){
					this.optionIndex--;
					this.currentOptionValue();
				}
			}

			if(this.Active && e.keyCode === 13 || e.keyCode === 32){
				this.$refs.native.value = this.db[this.optionIndex].value
				this.elSelectState = this.db[this.optionIndex].content
				this.closeSelectCustom()
			}

			if(this.Active && e.keyCode === 27){
				this.closeSelectCustom()
			}
		}
	},

	created() {
		document.addEventListener('click', this.closeSelectRoot)
		document.addEventListener('keydown', this.KeyboardNavigation)
	},
	
	destroy() {
		document.removeEventListener('click', this.closeSelectRoot)
		document.removeEventListener('keydown', this.KeyboardNavigation)
	}
}
</script>

<style scoped>
	.select-native,
	.select-custom {
		position: relative;
	}

	.select-custom {
	position: absolute;
	width: 100%;
	top:  0;
	left: 0;
	display: none;
	}

	@media (hover: hover) {
		.select-custom {
			display: block;
		}
 
		.select-native:focus + .select-custom {
			display: none;
		}
	}

	.select-native:focus,
	.select-custom.isActive .select-custom-trigger {
		outline: none;
		box-shadow:
			var(--shadowNormal);
	}

	.select-label {
		display: block;
		margin-bottom: 0.4rem;
		color: var(--blue800);
	}

	.select-wrapper {
		position: relative;
	}

	.select-native,
	.select-custom-trigger {
		--font:    16px;
		--height:  52px;

		width: 100%;
		height: var(--height);
		padding: calc((var(--height) / 2) - var(--font));
		padding-left: 16px;
		border-radius: 6px;
		box-shadow: var(--blue100) 0 0 0 2px;

		background-color: var(--blueSmoke);
		font-size: var(--font);
		line-height: 2;
	}

	.select-native {
		-webkit-appearance: none;
		-moz-appearance: none;
		border-style: none;
		background: url('../../public/dropDown.svg');
		background-color: var(--grey0);
		background-repeat: no-repeat;
		background-position-x: 95%;
		background-position-y: 50%;
	}

	.select-custom-trigger { 
		position: relative;
		cursor: pointer;
	}

	.select-custom-trigger::after {
		content: url('../../public/dropDown.svg');
		position: absolute;
		top: -65%;
		right: 5%;
	}

	.select-custom-trigger:hover {
		box-shadow: 
		var(--shadowHover);
	}

	.select-custom-options {
		position: absolute;
		display: none;
		width:  100%;
		margin-top: 4px;
		padding: 12px 0;
		border-radius: 6px;
		box-shadow: var(--shadowNormal);
		background-color: var(--grey0);
		z-index: 1;
	}

	.select-custom.isActive .select-custom-options {
		display: block;
	}

	.select-custom-option {
		position: relative;
		padding: 0.8rem;
		padding-left: 16px;
		color: var(--blue800);
	}

	.select-custom-option.isHover,
	.select-custom-option:hover {
		background-color: var(--blue100);
		cursor: default;
	}

	.select-custom-option:not(:last-of-type)::after {
		content: "";
		position: absolute;
		bottom: 0;
		left: 0;
		width: 100%;
		border-bottom: 1px solid var(--blue100);
	}

	.select-custom-option.isActive::before {
		content: "✓";
		position: absolute;
		right: 5%;
	}
</style>