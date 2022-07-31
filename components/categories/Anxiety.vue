<template>
    <h1>What was <b>your</b> anxiety level today</h1>
    <span class="description">Was today a stressful day or the opposite?</span>
    <div class="content">
        <span class="content__title">Today my anxiety was...</span>
        <div class="content">
            <span class="text">{{ currentValue.text }}</span>
        </div>
        <div class="content__options">
            <div class="pixel__box" :class="{'selected': (optionPixel.value === currentValue.value)}" @click="changeValue($event)" v-for="optionPixel in optionsValue" :key="optionPixel">
                <div class="pixel" :data-value="optionPixel.value">{{optionPixel.value}}</div>
            </div>
        </div>
    </div>
</template>

<script setup>
const optionsValue = [{
    value: 1,
    text: 'None'
},{
    value: 2,
    text: 'Low'
},{
    value: 3,
    text: 'Moderate'
},{
    value: 4,
    text: 'Hight'
}]

const currentValue = ref(optionsValue[2])
const changeValue = (ev) =>{
    const clickedPixelBox = ev.target.closest('.pixel__box') || ev.target
    currentValue.value = optionsValue[clickedPixelBox.querySelector('.pixel').dataset.value-1]
}
</script>

<style lang="scss" scoped>
.text{
    display: block;
    font-size: 3em;
    margin: 1em 0;
}
.content__options{
    display: flex;
    justify-content: center;
    gap: 1em;
    margin-top: 2em;
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
        background-color: #D4FF2B;
    }
    &[data-value="2"]{
        background-color: #FBFF45;
    }
    &[data-value="3"]{
        background-color: #FF772A;
    }
    &[data-value="4"]{
        background-color: #FF2A2B;
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