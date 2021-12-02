<template>
<div>
    <p class="selectLabel" id="jobLabel"><slot></slot></p>
    <div class="selectWrapper">
        <select class="
                    selectNative 
                    js-selectNative
                " 
                aria-labelledby="jobLabel"
                @change= changeNative($event)
                ref='native'
        >   <option 
                value="sel"         
                disabled 
                selected
                ref="option"
            > {{elSelectState}} </option>
            <option 
                v-for = "obj of db"
                :key  = "obj.value"
                :value = obj.value
            > {{obj.content}} </option>    
            
        </select>
        <div 
            :class="{isActive: Active}"
            class="
                selectCustom 
                js-selectCustom
            " 
            :aria-hidden = ariaHidden
        ><div
            @click = openSelectCustom()
            class="selectCustom-trigger"
                ref='closeSelectRoot'
            > {{elSelectState}}</div>
            <div 
                class="selectCustom-options"
            >
                <div
                    v-for = "(obj,index) of db"
                    :key  = obj.value
                    :class="[
                        {isActive: elSelectState === obj.content}, 
                        {isHover: optionChecked === obj.value}
                    ]"
                    class = "selectCustom-option"
                    :data-value = obj.value
                    @mouseenter = "
                        optionChecked = obj.value, 
                        optionIndex = index
                    "
                    @click = "
                        elSelectState = obj.content, 
                        changeCustom($event),
                        closeSelectCustom()
                    "
                >{{obj.content}}</div>
            </div>
        </div>
    </div>
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

<style>
    .selectNative,
    .selectCustom {
        position: relative;
    }

    .selectCustom {
    position: absolute;
    width: 100%;
    top:  0;
    left: 0;
    display: none;
    }

    @media (hover: hover) {
        .selectCustom {
            display: block;
        }
 
        .selectNative:focus + .selectCustom {
            display: none;
        }
    }

    .selectNative:focus,
    .selectCustom.isActive .selectCustom-trigger {
        outline: none;
        box-shadow:
            var(--shadowBorder),
            var(--shadowActive);
    }

    .selectLabel {
        display: block;
        margin-bottom: 0.4rem;
        color: var(--blue800);
    }

    .selectWrapper {
        position: relative;
    }

    .selectNative,
    .selectCustom-trigger {
        --font:    16px;
        /* --width:  360px; */
        --height:  52px;

        /* width: 100%; */
        /* height: var(--height); */
        padding: calc((var(--height) / 2) - var(--font));
        padding-left: 16px;
        border-radius: 6px;
        box-shadow: var(--blue100) 0 0 0 2px;

        background-color: var(--white);
        font-size: var(--font);
        line-height: 2;
    }

    .selectNative {
        -webkit-appearance: none;
        -moz-appearance: none;
        border-style: none;
        background: url('../../public/dropDown.svg');
        background-color: var(--white);
        background-repeat: no-repeat;
        background-position-x: 95%;
        background-position-y: 50%;
    }

    .selectCustom-trigger { 
        position: relative;
        filter: var(--dropShadowSelect);
        cursor: pointer;
    }

    .selectCustom-trigger::after {
        content: url('../../public/dropDown.svg');
        position: absolute;
        top: -65%;
        right: 5%;
    }

    .selectCustom-trigger:hover {
        box-shadow: 
        var(--shadowBorder),
        var(--shadowHover);

    }

    .selectCustom-options {
        position: absolute;
        display: none;
        width:  100%;
        margin-top: 4px;
        padding: 12px 0;
        border-radius: 6px;
        box-shadow: var(--shadowNormal);
        background-color: var(--white);
        color: var(--900);
        z-index: 1;
    }

    .selectCustom.isActive .selectCustom-options {
        display: block;
    }

    .selectCustom-option {
        position: relative;
        padding: 0.8rem;
        padding-left: 16px;
        color: var(--blue800);
        /* background-color: var(--white); */
    }

    .selectCustom-option.isHover,
    .selectCustom-option:hover {
        background-color: var(--blue50);
        cursor: default;
    }

    .selectCustom-option:not(:last-of-type)::after {
        content: "";
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        border-bottom: 1px solid var(--blue100);
    }

    .selectCustom-option.isActive::before {
        content: "✓";
        position: absolute;
        right: 5%;
    }
</style>