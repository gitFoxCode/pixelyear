<template>
    <section class="category">
        <h1>How was <b>your</b> day?</h1>
        <span class="description">Rate your day on a scale of 1 to 5 comparing it to other days of your life, try to be as objective as possible</span>
        <div class="content">
            <span class="content__title">Today's day was...</span>

            <div class="content__rating-box">
                <span class="content__rating-rate"><span class="value">3</span></span>
                <span class="content__rating--hr">/</span>
                <span class="content__rating">5</span>
                <span class="content__text"><span class="value-text">pretty average</span></span>
            </div>
            <div class="content__options">
                <div class="pixel" v-for="pixel in pixels" 
                :data-value="pixel.value" 
                :key="pixel"  
                @click="selectPixel($event)"
                :class="{'pixel--selected': (pixel.value === currentPixel.value)}">{{ pixel.value }}</div>
            </div>
        </div>
    </section>
</template>

<script setup>
const props = defineProps({
    apiValue: String // Value from database if a user has already filled a category 
})
const emits = defineEmits(["emitPixel"])

const pixels = [{
    value: 1,
    text: 'very bad'
},{
    value: 2,
    text: 'bad'
},{
    value: 3,
    text: 'pretty average'
},{
    value: 4,
    text: 'good'
},{
    value: 5,
    text: 'great!'
}]

const currentPixel = props.apiValue ? ref(pixels[props.apiValue-1]) : ref(pixels[2])

// The main category in which ratings are required
if(!props.apiValue){
    emits('emitPixel', {category: 'rate', pixel: 3})
}

const selectPixel = (ev) =>{
    currentPixel.value = pixels[ev.target.dataset.value-1]
    const rateValue = document.querySelector('.value')
    const rateValueText = document.querySelector('.value-text')
    rateValue.classList.add('value--transform')
    rateValueText.classList.add('value-text--transform')
    setTimeout(()=>{ // TODO: Remove or change to requestanimaterate
        rateValueText.innerText = pixels[ev.target.dataset.value-1].text
        rateValue.innerText = ev.target.dataset.value
        setTimeout(()=>{
            rateValueText.classList.remove('value-text--transform')
            rateValue.classList.remove('value--transform')
        }, 250)
    }, 250)
    emits('emitPixel', {category: 'rate', pixel: ev.target.dataset.value})
}
</script>

<style lang="scss" scoped>
.content__rating-box{
    position: relative;
    display: flex;
    justify-content: center;
    height: 10rem;
    margin-top: 4em;
    margin-bottom: 1em;
}
.content__rating-rate{
    display: block;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 3em;
    font-weight: bold;
    height: 1em;
    width: 0.7em;
    position: relative;
    overflow: hidden;
    .value{
        position: absolute;
    }
}
.value--transform{
    animation: change 0.5s forwards;
}
.value-text--transform{
    animation: changeText 0.5s forwards;
}
@keyframes change{
    0%{
        transform: translateY(0);
    }
    50%{
        transform: translateY(-70%);
        opacity: 0;
    }
    51%{
        transform: translateY(70%);
        opacity: 0;
    }
    100%{
        opacity: 1;
        transform: translateY(0%);
    }
}
@keyframes changeText{
    0%{
        transform: translate(-50%, 0);
    }
    50%{
        transform: translate(-50%, -70%);
        opacity: 0;
    }
    51%{
        transform: translate(-50%, 70%);
        opacity: 0;
    }
    100%{
        opacity: 1;
        transform: translate(-50%, 0%);
    }
}
.content__rating-rate--transform{
    position: absolute;
    transform: translateY(100%);
}
.content__rating{
    font-size: 2em;
    color: #606060;
    font-weight: bold;
}
.content__rating--hr{
    font-size: 2em;
    color: #606060;
    font-weight: bold;
}
.content__text{
    position: absolute;
    bottom: 2em;
    left: 50%;
    transform: translateX(-50%);
    height: 1.5em;
    width: 100%;
    font-weight: bold;
    overflow: hidden;
    & .value-text{
        position: absolute;
        white-space: nowrap;
        left: 50%;
        transform: translateX(-50%);
        top: 0;  
    }
}
.content__options{
    display: flex;
    justify-content: center;
    gap: 1em;
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
.pixel--selected{
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