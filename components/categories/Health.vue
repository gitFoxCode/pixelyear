<template>
    <h1>How was <b>your</b> health today?</h1>
    <span class="description">Mark how you felt health-wise today. </span>
    <div class="content">
        <span class="content__title">Today I felt...</span>
        <div class="content">
            <div class="text">{{ currentValue.text }}</div>
            <div class="content__options">
                <div class="pixel__box" :class="{'selected': (optionPixel.value === currentValue.value)}" @click="changeValue($event)" v-for="optionPixel in optionsValue" :key="optionPixel">
                    <div class="pixel" :class="optionPixel.class" :data-value="optionPixel.value"></div>
                    <div class="pixel-text">{{optionPixel.text}}</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
const props = defineProps({
    dbValue: String // Value from database if a user has already filled a category 
})
const emits = defineEmits(["emitPixel"])

const optionsValue = ref([{
    value: 1,
    text: 'Healthy'
},{
    value: 2,
    text: 'Mild symptoms'
},{
    value: 3,
    text: 'Sickness'
},{
    value: 4,
    text: 'Servere sickness'
}])

const currentValue = ref(optionsValue.value[0])
const changeValue = (ev) =>{
    const clickedPixelBox = ev.target.closest('.pixel__box') || ev.target
    const currentPixel = clickedPixelBox.querySelector('.pixel').dataset.value

    currentValue.value = optionsValue.value[currentPixel-1]
    emits('emitPixel', {category: 'health', pixel: currentValue.value.value})
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
    flex-wrap: wrap;
    justify-content: flex-start;
    align-content: center;
    gap: 2em;
    margin-top: 2em;
    padding: 0 2em;
}
.content{
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 2em;
}
.pixel__box{
    display: flex;
    align-items: center;
    gap: 0.5em;
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
        background-color: rgb(107, 243, 255);
    }
    &[data-value="2"]{
        background-color: rgb(44, 252, 196);
    }
    &[data-value="3"]{
        background-color: rgb(48, 140, 252);
    }
    &[data-value="4"]{
        background-color: rgb(83, 34, 241);
    }
}


.selected .pixel{
    font-size: 1.3em;
    transform: translateX(-0.5em);
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