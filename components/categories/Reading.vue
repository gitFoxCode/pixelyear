<template>
    <h1>Have <b>you</b> read anything today?</h1>
    <span class="description">Mark how many pages you have read today - any book, ebook that is not social media</span>
    <div class="content">
        <span class="content__title">Today I read...</span>
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
const optionsValue = ref([{
    value: 0,
    text: '0 pages'
},{
    value: 1,
    text: '1-10 p.'
},{
    value: 2,
    text: '11-20 p.'
},{
    value: 3,
    text: '21-30 p.'
},{
    value: 4,
    text: '30-50 p.'
},{
    value: 5,
    text: '50-70 p.'
},{
    value: 6,
    text: '70-99 p.'
},{
    value: 7,
    text: '100+ p.'
}])

const currentValue = ref(optionsValue.value[0])
const changeValue = (ev) =>{
    const clickedPixelBox = ev.target.closest('.pixel__box') || ev.target
    const currentPixel = clickedPixelBox.querySelector('.pixel').dataset.value

    currentValue.value = optionsValue.value[currentPixel]

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
    justify-content: center;
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
        background-color: rgb(107, 255, 216);
    }
    &[data-value="3"]{
        background-color: rgb(107, 255, 132);
    }
    &[data-value="4"]{
        background-color: rgb(176, 255, 107);
    }
    &[data-value="5"]{
        background-color: rgb(213, 255, 107);
    }
    &[data-value="6"]{
        background-color: rgb(187, 255, 0);
    }
    &[data-value="7"]{
        background-color: rgb(150, 106, 232);
        box-shadow: rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(150, 106, 232, 0.4) 0px 25px 50px -12px;
    }
}

.pixel--blue{
    background-color: rgb(67, 97, 248);
    z-index: -1;
}
.selected .icon{
    transform: translateX(-0.5em)
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