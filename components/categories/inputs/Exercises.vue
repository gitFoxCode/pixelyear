<template>
    <div class="content__options">
        <div class="pixel__box" :class="{'selected': (currentValue.some((el)=> el.value === optionPixel.value))}" @click="changeValue($event)" v-for="optionPixel in optionsValue" :key="optionPixel">
            <div class="pixel" :class="optionPixel.class" :data-value="optionPixel.value"></div>
            <div class="pixel-text">{{optionPixel.text}}</div>
        </div>
    </div>
</template>

<script setup>
const props = defineProps({
    apiValue: String // Value from database if a user has already filled a category 
})
const emits = defineEmits(["emitSelected"])

const optionsValue = ref([{
    value: 1,
    text: 'None',
    class: 'empty'
},{
    value: 2,
    text: 'Any kind',
    class: 'pixel--blue'
},{
    value: 3,
    text: 'Workout',
    class: 'pixel--dot'
},{
    value: 4,
    text: 'Cycling',
    class: 'pixel--circle'
},{
    value: 5,
    text: 'Dancing',
    class: 'pixel--dash'
},{
    value: 6,
    text: 'Walking',
    class: 'pixel--dash-left'
}])

const empty = [{
    value: 0,
    text: 'Not selected',
    class: ''
}]

const currentValue = props.apiValue ? ref(optionsValue[props.apiValue-1]) : ref(empty)

if(props.apiValue){
    emits('emitSelected', currentValue.value)
}

const changeValue = (ev) =>{
    const clickedPixelBox = ev.target.closest('.pixel__box') || ev.target
    const currentPixel = clickedPixelBox.querySelector('.pixel').dataset.value

    if(currentPixel == 1){
        currentValue.value = [optionsValue.value[0]]
    }else{
        if (currentValue.value.some((el)=> el.value === currentPixel*1)){
            currentValue.value = currentValue.value.filter((el)=> el.value !== currentPixel*1)
        }else{
            currentValue.value.push( optionsValue.value[currentPixel-1] )
        }
        currentValue.value = currentValue.value.filter((el)=> el.value !== 1)
    }

    
    currentValue.value = currentValue.value.filter((el)=> el.value !== 0)
    
    emits('emitSelected', currentValue.value)
}
</script>

<style lang="scss">
.pixel--dot::before{
    content: "";
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 1em;
    height: 1em;
    background: #eee;
    border-radius: 50%;
}
.pixel--circle::before{
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    border: 0.35em solid #eee;
    border-radius: 50%;
}
.pixel--dash::before{
    content: "";
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 90%;
    height: 0.5em;
    background: #eee;
}
.pixel--dash-left::before{
    content: "";
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%) rotate(-45deg);
    width: 90%;
    height: 0.5em;
    background: #eee;
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
}
.pixel--blue{
    background-color: rgb(67, 97, 248);
    z-index: -1;
}
</style>

<style lang="scss" scoped>
.content__options{
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 1em;
    margin-top: 2em;
}
.pixel__box{
    display: flex;
    align-items: center;
    gap: 0.5em;
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