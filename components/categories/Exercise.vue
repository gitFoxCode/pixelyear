<template>
    <h1>Did <b>you</b> do any exercises today?</h1>
    <span class="description">You can choose many options at once. Mark what activities you did today. If you did none of these things just move on without marking anything</span>
    <div class="content">
        <span class="content__title">Today I exercised...</span>
        <div class="content-column">
            <div class="big-pixel">
                <div class="big-pixel--inner" :class="optionPixel.class" v-for="optionPixel in currentValue" :key="optionPixel"></div>
            </div>
            <div class="content__options">
                <div class="pixel__box" :class="{'selected': (currentValue.some((el)=> el.value === optionPixel.value))}" @click="changeValue($event)" v-for="optionPixel in optionsValue" :key="optionPixel">
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
    text: 'Any kind',
    class: 'pixel--blue'
},{
    value: 2,
    text: 'Workout',
    class: 'pixel--dot'
},{
    value: 3,
    text: 'Cycling',
    class: 'pixel--circle'
},{
    value: 4,
    text: 'Dancing',
    class: 'pixel--dash'
},{
    value: 5,
    text: 'Walking',
    class: 'pixel--dash-left'
}])

const empty = {
    value: 0,
    text: 'Not selected',
    class: ''
}

const currentValue = props.dbValue ? ref([]) : ref([empty])

if(props.dbValue){
    currentValue.value = []
    console.log(currentValue.value)
    for(let i = 0; i <= String(props.dbValue).length-1; i++){
        console.log('e', optionsValue.value[String(props.dbValue)[i]])
        currentValue.value.push(optionsValue.value[String(props.dbValue)[i]])
    }
    console.log(currentValue.value)
}

const changeValue = (ev) =>{
    const clickedPixelBox = ev.target.closest('.pixel__box') || ev.target
    const currentPixel = clickedPixelBox.querySelector('.pixel').dataset.value

    if (currentValue.value.some((el)=> el.value === currentPixel*1)){
        currentValue.value = currentValue.value.filter((el)=> el.value !== currentPixel*1)
    }else{
        currentValue.value.push( optionsValue.value[currentPixel-1] )
    }
    
    currentValue.value = currentValue.value.filter((el)=> el.value !== 0)
    
    emits('emitPixel', {category: 'exercises', pixel: currentValue.value.map((el)=> el.value).join('')})
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
    flex-direction: column;
    justify-content: center;
    gap: 1em;
    margin-top: 2em;
}
.content-column{
    display: flex;
    justify-content: center;
    align-items: center;
    gap: clamp(1em, 5em, 2em);
}
.big-pixel{
    position: relative;
    width: 10em;
    height: 10em;
    border-radius: 1.5em;
    background-color: #222;
    border: 0.4em solid #2D2D2D;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #222;
    overflow: hidden;
    z-index: -1;
}
.big-pixel--inner{
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
}
.pixel__box{
    display: flex;
    align-items: center;
    gap: 0.5em;
}
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