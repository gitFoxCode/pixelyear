<template>
    <h1>Have <b>you</b> read anything today?</h1>
    <span class="description">Mark how many pages you have read today - any book, ebook that is not social media</span>
    <div class="content">
        <span class="content__title">Today I read...</span>
        <div class="content">
            <div class="text">{{ pages }} pages</div>
            <div class="input__box">
                <input type="number" min="0" max="1000" v-model="pages" @input="changePixel" />
                <div class="pixel pixel-number" data-value="1"></div>
            </div>
        </div>
    </div>
</template>

<script setup>
const props = defineProps({
    dbValue: String // Value from database if a user has already filled a category 
})
const emits = defineEmits(["emitPixel"])

const pages = props.dbValue ? ref(props.dbValue) : ref(0)

const changePixel = () =>{
    const pixel = document.querySelector('.pixel-number')

    if(pages.value === 0){
        pixel.dataset.value = 1
    }
    if(pages.value >= 1 && pages.value <= 10){
        pixel.dataset.value = 2
    }
    if(pages.value >= 11 && pages.value <= 20){
        pixel.dataset.value = 3
    }
    if(pages.value >= 21 && pages.value <= 30){
        pixel.dataset.value = 4
    }
    if(pages.value >= 31 && pages.value <= 50){
        pixel.dataset.value = 5
    }
    if(pages.value >= 51 && pages.value <= 70){
        pixel.dataset.value = 6
    }
    if(pages.value >= 71 && pages.value <= 99){
        pixel.dataset.value = 7
    }
    if(pages.value >= 100){
        pixel.dataset.value = 8
    }
    emits('emitPixel', {category: 'reading', pixel: pages.value})
}

// const optionsValue = ref([{
//     value: 1,
//     text: '0 pages'
// },{
//     value: 2,
//     text: '1-10 p.'
// },{
//     value: 3,
//     text: '11-20 p.'
// },{
//     value: 4,
//     text: '21-30 p.'
// },{
//     value: 5,
//     text: '31-50 p.'
// },{
//     value: 6,
//     text: '51-70 p.'
// },{
//     value: 7,
//     text: '70-99 p.'
// },{
//     value: 8,
//     text: '100+ p.'
// }])

// const currentValue = ref(optionsValue.value[0])
// const changeValue = (ev) =>{
//     const clickedPixelBox = ev.target.closest('.pixel__box') || ev.target
//     const currentPixel = clickedPixelBox.querySelector('.pixel').dataset.value

//     currentValue.value = optionsValue.value[currentPixel]

// }
</script>

<style lang="scss" scoped>
.text{
    display: block;
    font-size: 3em;
    margin: 1em 0;
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
        background-color: rgb(202, 202, 202);
    }
    &[data-value="2"]{
        background-color: rgb(107, 243, 255);
    }
    &[data-value="3"]{
        background-color: rgb(107, 255, 216);
    }
    &[data-value="4"]{
        background-color: rgb(107, 255, 132);
    }
    &[data-value="5"]{
        background-color: rgb(176, 255, 107);
    }
    &[data-value="6"]{
        background-color: rgb(213, 255, 107);
    }
    &[data-value="7"]{
        background-color: rgb(187, 255, 0);
    }
    &[data-value="8"]{
        background-color: rgb(150, 106, 232);
        box-shadow: rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(150, 106, 232, 0.4) 0px 25px 50px -12px;
    }
}

.input__box{
    display: flex;
    gap: 1em;
    justify-content: center;
}
.input__box input{
    padding: 1em 1.5em;
    background-color: transparent;
    border: 2px solid #FFF;
    font-family: "Monospace", sans-serif;
    color: #fff;
    font-weight: bold;
    font-size: 1em;
}
.pixel-number{
    transition: background-color 0.5s;
}
</style>