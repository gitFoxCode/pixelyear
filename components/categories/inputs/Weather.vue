<template>
    <div class="content__options">
        <div class="pixel__box" :class="{'selected': (optionPixel.value === currentValue.value)}" @click="changeValue($event)" v-for="optionPixel in optionsValue" :key="optionPixel">
            <div class="icon">{{optionPixel.icon}}</div>
            <div class="pixel" :data-value="optionPixel.value"></div>
        </div>
    </div>
</template>

<script setup>
const props = defineProps({
    apiValue: String // Value from database if a user has already filled a category 
})
const emits = defineEmits(["emitSelected"])

const optionsValue = [{
    value: 1,
    text: 'snowy',
    icon: '🌨'
},{
    value: 2,
    text: 'stormy',
    icon: '🌩'
},{
    value: 3,
    text: 'rainy',
    icon:'🌧'
},{
    value: 4,
    text: 'cloudy',
    icon: '☁'
},{
    value: 5,
    text: 'cloudy, but there was also sunshine',
    icon: '⛅'
},{
    value: 6,
    text: 'sunny',
    icon: '☀'
}]

const empty = {
    value: 0,
    text: 'Not selected',
    icon: '❔'
}

const currentValue = props.apiValue ? ref(optionsValue[props.apiValue-1]) : ref(empty)

if(props.apiValue){
    emits('emitSelected', currentValue.value)
}

const changeValue = (ev) =>{
    const clickedPixelBox = ev.target.closest('.pixel__box') || ev.target
    currentValue.value = optionsValue[clickedPixelBox.querySelector('.pixel').dataset.value-1]
    emits('emitSelected', currentValue.value)
}
</script>

<style lang="scss" scoped>
.content__options{
    display: flex;
    justify-content: center;
    gap: 1em;
    margin-top: 2em;
    flex-wrap: wrap;
    padding: 2em;
}
.pixel__box{
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.5em;
    .icon{
        font-size: 2em;
    }
}
.pixel{
    height: 3em;
    width: 3em;
    border-radius: 0.5em;
    background-color: #222;
    border: 2px solid #2D2D2D;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1.2em;
    font-weight: bold;
    position: relative;
    color: #222;
    cursor: pointer;
    &[data-value="1"]{
        background-color: rgb(173, 251, 255);
    }
    &[data-value="2"]{
        background-color: #AA4978;
    }
    &[data-value="3"]{
        background-color: #666D89;
    }
    &[data-value="4"]{
        background-color: #8F8A87;
    }
    &[data-value="5"]{
        background-color: rgb(255, 239, 97);
    }
    &[data-value="6"]{
        background-color: rgb(255, 199, 46);
    }
}
.selected .icon{
    transform: translateY(-0.5em)
}
.selected .pixel{
    font-size: 1.3em;
    transform: translateY(-0.5em);
    &::after{
        content: "";
        position: absolute;
        left: -0.4em;
        top: -0.4em;
        bottom: -0.4em;
        right: -0.4em;
        border: 3px solid #474747;
        border-radius: 0.7em;
    }
}
</style>