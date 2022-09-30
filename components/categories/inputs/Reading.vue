<template>
    <div class="input__box reading">
        <input type="number" min="0" max="1000" v-model="pages" @input="changePixel" />
        <div class="pixel pixel-number" data-color="1"></div>
    </div>
</template>

<script setup>
const props = defineProps({
    apiValue: String // Value from database if a user has already filled a category 
})
const emits = defineEmits(["emitSelected"])

const pages = props.apiValue ? ref(props.apiValue) : ref(0)

if(props.apiValue){
    emits('emitSelected', pages)
}

const changePixel = () =>{
    const pixel = document.querySelector('.pixel-number')

    if(pages.value === 0){
        pixel.dataset.color = 1
    }
    if(pages.value >= 1 && pages.value <= 10){
        pixel.dataset.color = 2
    }
    if(pages.value >= 11 && pages.value <= 20){
        pixel.dataset.color = 3
    }
    if(pages.value >= 21 && pages.value <= 30){
        pixel.dataset.color = 4
    }
    if(pages.value >= 31 && pages.value <= 50){
        pixel.dataset.color = 5
    }
    if(pages.value >= 51 && pages.value <= 70){
        pixel.dataset.color = 6
    }
    if(pages.value >= 71 && pages.value <= 99){
        pixel.dataset.color = 7
    }
    if(pages.value >= 100){
        pixel.dataset.color = 8
    }
    emits('emitSelected', {value: pages.value, color: pixel.dataset.color})
}
onMounted(()=>{
    changePixel()
})
</script>

<style lang="scss">
.reading .pixel{
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
    &[data-color="1"]{
        background-color: rgb(202, 202, 202);
    }
    &[data-color="2"]{
        background-color: rgb(107, 243, 255);
    }
    &[data-color="3"]{
        background-color: rgb(107, 255, 216);
    }
    &[data-color="4"]{
        background-color: rgb(107, 255, 132);
    }
    &[data-color="5"]{
        background-color: rgb(176, 255, 107);
    }
    &[data-color="6"]{
        background-color: rgb(213, 255, 107);
    }
    &[data-color="7"]{
        background-color: rgb(187, 255, 0);
    }
    &[data-color="8"]{
        background-color: rgb(150, 106, 232);
        box-shadow: rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(150, 106, 232, 0.4) 0px 25px 50px -12px;
    }
}
</style>

<style lang="scss" scoped>
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