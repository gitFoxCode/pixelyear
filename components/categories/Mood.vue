<template>
    <h1>What was <b>your</b> mood today?</h1>
    <span class="description">Think about how you mainly felt today. Of course, different moods you probably had throughout the day, but try to draw an average from that</span>
    <div class="content">
        <span class="content__title">Today I felt...</span>
        <div class="content__mood">
            <nuxt-icon :name="currentValue.icon"/>
            <span class="mood__type" data-value="4">{{ currentValue.text }}</span>
        </div>
        <div class="content__options">
            <div class="pixel__box" :class="{'selected': (optionPixel.value === currentValue.value)}" @click="changeValue($event)" v-for="optionPixel in optionsValue" :key="optionPixel">
                <nuxt-icon :name="optionPixel.icon" />
                <div class="pixel" :data-value="optionPixel.value"></div>
            </div>
        </div>
    </div>
</template>

<script setup>
const optionsValue = [{
    value: 1,
    text: 'Very bad',
    icon: 'emoji-sad2'
},{
    value: 2,
    text: '...',
    icon: 'emoji-sad'
},{
    value: 3,
    text: 'Normal',
    icon:'smile'
},{
    value: 4,
    text: 'Good',
    icon: 'smile'
},{
    value: 5,
    text: 'Very good!',
    icon: 'emoji-happy'
}]

const currentValue = ref(optionsValue[2])
const changeValue = (ev) =>{
    const clickedPixelBox = ev.target.closest('.pixel__box') || ev.target
    currentValue.value = optionsValue[clickedPixelBox.querySelector('.pixel').dataset.value-1]
}
// const changeValue = (ev) =>{
//     const clickedPixelBox = ev.target.closest('.pixel__box') || ev.target
//     const pixelBoxes = document.querySelectorAll('.pixel__box')
//     pixelBoxes.forEach((el)=>{
//         el.classList.remove('selected')
//     })
//     currentValue.value = optionsValue[clickedPixelBox.querySelector('.pixel').dataset.value-1]
//     clickedPixelBox.classList.add('selected')
// }
</script>

<style lang="scss" scoped>
.content__mood{
    margin-top: 2em;
    & [data-value="4"]{
        color: #8AFF88;
    }
}
.mood__type{
    text-align: center;
    text-transform: uppercase;
    font-weight: bold;
}
.content__mood .nuxt-icon{
    font-size: 10rem;
    display: flex;
    align-items: center;
    justify-content: center;
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
    .nuxt-icon{
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
        background-color: #FF2A2B;
    }
    &[data-value="2"]{
        background-color: #FF772A;
    }
    &[data-value="3"]{
        background-color: #FBFF45;
    }
    &[data-value="4"]{
        background-color: #D4FF2B;
    }
    &[data-value="5"]{
        background-color: #55FF2A;
    }
}
.selected .nuxt-icon{
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