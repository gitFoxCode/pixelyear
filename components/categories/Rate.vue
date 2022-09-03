<template>
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
            <div class="pixel" data-rate="1" @click="selectPixel($event)">1</div>
            <div class="pixel" data-rate="2" @click="selectPixel($event)">2</div>
            <div class="pixel pixel--selected" data-rate="3" @click="selectPixel($event)">3</div>
            <div class="pixel" data-rate="4" @click="selectPixel($event)">4</div>
            <div class="pixel" data-rate="5" @click="selectPixel($event)">5</div>
        </div>
    </div>
</template>

<script setup>
const emits = defineEmits(["emitPixel"])
const pixels = ref()
const rateTexts = ['very bad', 'bad', 'pretty average', 'good', 'great!']
if(process.client){
    pixels.value = document.querySelectorAll('.pixel')
}
const selectPixel = (ev) =>{
    pixels.value.forEach((pixel)=>{
        pixel.classList.remove('pixel--selected')
    })
    ev.target.classList.add('pixel--selected')
    const rateValue = document.querySelector('.value')
    const rateValueText = document.querySelector('.value-text')
    rateValue.classList.add('value--transform')
    rateValueText.classList.add('value-text--transform')
    setTimeout(()=>{
        rateValueText.innerText = rateTexts[ev.target.dataset.rate-1]
        rateValue.innerText = ev.target.dataset.rate
        setTimeout(()=>{
            rateValueText.classList.remove('value-text--transform')
            rateValue.classList.remove('value--transform')
        }, 250)
    }, 250)
    emits('emitPixel', {category: 'rate', pixel: ev.target.dataset.rate})
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
    &[data-rate="1"]{
        background-color: #FF2A2B;
    }
    &[data-rate="2"]{
        background-color: #FF772A;
    }
    &[data-rate="3"]{
        background-color: #FBFF45;
    }
    &[data-rate="4"]{
        background-color: #D4FF2B;
    }
    &[data-rate="5"]{
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