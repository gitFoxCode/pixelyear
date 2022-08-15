<template>
    <section class="section">
        <TopNav />
        <main v-if="!error">
            <Callendar
            :year="year"
            :yearDate="selectedYear"
            type="rate"
            typeText="This is how you rated your year"/>
            <div class="error__msg" v-if="changePixelError">
                {{ changePixelError }}
            </div>
            <section class="options">
                <div class="options__card">
                    <div class="card__pixel card__pixel--avg" :data-value="~~averageValue">{{ averageValue }}</div>
                    <span class="card__title">Average</span>
                </div>
                <div class="options__cards">
                    <div class="options__card" @click="changePixel">
                        <div class="card__pixel" data-value="1"></div>
                        <span class="card__title">1 stars</span>
                    </div>
                    <div class="options__card" @click="changePixel">
                        <div class="card__pixel" data-value="2"></div>
                        <span class="card__title">2 stars</span>
                    </div>
                    <div class="options__card" @click="changePixel">
                        <div class="card__pixel" data-value="3"></div>
                        <span class="card__title">3 stars</span>
                    </div>
                    <div class="options__card" @click="changePixel">
                        <div class="card__pixel" data-value="4"></div>
                        <span class="card__title">4 stars</span>
                    </div>
                    <div class="options__card" @click="changePixel">
                        <div class="card__pixel" data-value="5"></div>
                        <span class="card__title">5 stars</span>
                    </div>
                </div>
            </section>
        </main>
        <main v-else>
            <span class="error__msg">{{ error }}</span>
        </main>
    </section>
    
</template>

<script setup>
definePageMeta({
  middleware: ["user"]
})

import { useAuth } from '~/store/auth'

const error = ref("")
const averageValue = ref(0)
const selectedYear = useRoute().params.year || new Date().getFullYear()
const changePixelError = ref("")

const { data: year } = await useLazyFetch(`https://pixelyear.herokuapp.com/api/${selectedYear}/rate`, {
    headers:{
        'Authorization': 'Bearer ' + useAuth().getToken
    }
})

if(year.value === null){
    error.value = "An error occurred. Try again later."
} else{
    const { data: average } = await useLazyFetch(`https://pixelyear.herokuapp.com/api/mean/${selectedYear}/rate`, {
        headers:{
            'Authorization': 'Bearer ' + useAuth().getToken
        }
    })

    averageValue.value = average.value.mean
}

const changePixel = async (ev) => {
    let selected = document.querySelector('.pixel--selected')

    if(selected === null){
        selected = document.querySelector('.pixel--today')
    }
    const formatDate = `${selected.dataset.date.replace(/ -.+/, '').replace('.', '/')}/${selectedYear}`

    const response = await fetch('https://pixelyear.herokuapp.com/api/2022/rate', {
        method: 'PATCH',
        body: JSON.stringify({
            date: formatDate,
            pixel_values: ev.target.closest('.card__pixel').dataset.value
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
        selected.dataset.value = ev.target.closest('.card__pixel').dataset.value
    }

}
</script>

<style lang="scss" scoped>
main{
    padding: 0 1em;
    padding-top: 5em;
    padding-bottom: 5rem;
}
.options{
    font-family: "Monospace", sans-serif;
    display: flex;
    justify-content: space-between;
    margin-top: 5rem;
}
.options__cards{
    display: flex;
    gap: 3em;
}
.options__card{
    display: flex;
    flex-direction: column;
    align-items: center;
    cursor: pointer;
    gap: 0.5em;
}
.card__pixel{
    width: 3em;
    height: 3em;
    border-radius: 0.2em;
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: bold;
    text-shadow: 0px 0px 2px #000;
    color: #222;
}
.card__pixel[data-value="1"]{
    background-color: #FF2A2B;
}
.card__pixel[data-value="2"]{
    background-color: #FF772A;
}
.card__pixel[data-value="3"]{
    background-color: #FBFF45;
}
.card__pixel[data-value="4"]{
    background-color: #D4FF2B;
}
.card__pixel[data-value="5"]{
    background-color: #55FF2A;
}
.error__msg{
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    font-family: "Monospace", sans-serif;
    height: 100%;
}
.section{
    height: 100%;
}
main{
    height: 100%;
}
</style>