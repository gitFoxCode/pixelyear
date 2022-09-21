<template>
    <section class="section">
        <TopNav goBack="/stats"/>
        <main v-if="!error">
            <Callendar
                :year="year"
                :yearDate="selectedYear"
                :type="category"
                typeText="That's how much exercise you've done this year "/>
            <div class="error__msg" v-if="changePixelError">
                {{ changePixelError }}
            </div>
            <div class="content__options">
                <div class="options__card--avg">
                    <div class="pixel" :data-value="~~averageValue">{{ averageValue }}</div>
                    <span class="card__title">Average</span>
                </div>
                <div class="pixel__box" :class="{'selected': (optionPixel.value === currentValue.value)}" @click="changeValue($event)" v-for="optionPixel in optionsValue" :key="optionPixel">
                    <div class="text">{{optionPixel.text}}</div>
                    <div class="pixel" :data-value="optionPixel.value"></div>
                </div>
            </div>
        </main>
    </section>
</template>

<script setup>
import { useAuth } from '~/store/auth'
definePageMeta({
  middleware: ["user"]
})

const category = 'exercises'

const error = ref("")
const averageValue = ref(0)
const selectedYear = useRoute().params.year || new Date().getFullYear()
const changePixelError = ref("")

const optionsValue = [{
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
}]

const currentValue = ref(optionsValue[0])

const changeValue = (ev) =>{
    const clickedPixelBox = ev.target.closest('.pixel__box') || ev.target
    currentValue.value = optionsValue[clickedPixelBox.querySelector('.pixel').dataset.value-1]
    changePixel(ev)
}

const changePixel = async (ev) => {
    let selected = document.querySelector('.pixel--selected')

    if(selected === null){
        selected = document.querySelector('.pixel--today')
    }
    
    const formatDate = `${selected.dataset.date.replace(/ -.+/, '').replace('.', '/')}/${selectedYear}`

    const response = await fetch(`https://pixelyear.herokuapp.com/api/${selectedYear}/${category}`, {
        method: 'PATCH',
        body: JSON.stringify({
            date: formatDate,
            pixel_values: ev.target.closest('.pixel').dataset.value
        }),
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + useAuth().getToken
        }
    })

    if(String(response.status)[0] !== '2'){
        changePixelError.value = "An error occurred. Try again later."
    }

    const jsonResponse = await response.json()

    if(jsonResponse.hasOwnProperty('error')){
        changePixelError.value = jsonResponse.error
    }else{
        selected.dataset.value = ev.target.closest('.pixel').dataset.value
    }

}

const { data: year } = await useLazyFetch(`https://pixelyear.herokuapp.com/api/${selectedYear}/${category}`, {
    headers:{
        'Authorization': 'Bearer ' + useAuth().getToken
    }
})

if(year.value === null){
    error.value = "An error occurred. Try again later."
} else{
    const { data: average } = await useLazyFetch(`https://pixelyear.herokuapp.com/api/mean/${selectedYear}/${category}`, {
        headers:{
            'Authorization': 'Bearer ' + useAuth().getToken
        }
    })
    averageValue.value = average.value.mean
}
</script>

<style lang="scss" scoped>
.section{
    padding-top: 6em;
    height: 100%;
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
    .text{
        font-size: 0.8em;
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
.selected .text{
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
.error__msg{
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    font-family: "Monospace", sans-serif;
    height: 100%;
    margin-top: 2em;
    padding: 1em;
    background-color: rgb(183, 50, 50);
}
.options__card--avg{
    align-self: end;
}
</style>