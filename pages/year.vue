<template>
    <section class="section">
        <TopNav />
        <main>
            <Callendar 
             v-if="!error"
            :year="year"
            :yearDate="2022"/>
            <div class="error__msg" v-else>
                {{ error }}
            </div>
            <section class="options">
                <div class="options__card">
                    <div class="card__pixel card__pixel--avg">{{3}}</div>
                    <span class="card__title">Average</span>
                </div>
                <div class="options__cards">
                    <div class="options__card" @click="changePixel">
                        <div class="card__pixel" data-rate="1"></div>
                        <span class="card__title">1 stars</span>
                    </div>
                    <div class="options__card" @click="changePixel">
                        <div class="card__pixel" data-rate="2"></div>
                        <span class="card__title">2 stars</span>
                    </div>
                    <div class="options__card" @click="changePixel">
                        <div class="card__pixel" data-rate="3"></div>
                        <span class="card__title">3 stars</span>
                    </div>
                    <div class="options__card" @click="changePixel">
                        <div class="card__pixel" data-rate="4"></div>
                        <span class="card__title">4 stars</span>
                    </div>
                    <div class="options__card" @click="changePixel">
                        <div class="card__pixel" data-rate="5"></div>
                        <span class="card__title">5 stars</span>
                    </div>
                </div>
            </section>
        </main>
    </section>
    
</template>

<script setup>
definePageMeta({
  middleware: ["auth"]
  // or middleware: 'auth'
})

const error = ref("")

const { data: year } = await useLazyFetch('https://pixelyear.herokuapp.com/api/2022/rate', {
    headers:{
        'Authorization': 'Bearer ' + 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6InRlc3RAdGVzdC5wbCIsImNyYXRpb25fZGF0ZSI6IjIwMjItMDgtMTEgMTU6NTI6NDMuMTY4MjMyIiwiZXhwaXJhdGlvbl9kYXRlIjoiMjAyMi0wOC0xMSAxNjoyMjo0My4xNjgyNDcifQ.8ZmZ8OnfSXmK40CQn17hHJXuScigZdBR_hsfuQ60ZGw'
    }
})

console.log(year)


// TODO: Obsłużyć błędy
if(year.value.statusCode === 500){
    error.value = "An error occurred. Try again later."
}
// let average = ref(0)
// let count = 0
// const merged = Object.values(year.value).join('')
// for(let i = 0; i < merged.length; i++){
//     if(merged[i] === 0) continue;
//     count++
//     average.value += parseInt(merged[i], 10)
// }
// average.value = average.value/count

const changePixel = (ev) => {
    let selected = document.querySelector('.pixel--selected')
    if(selected === null){
        selected = document.querySelector('.pixel--today')
    }
    selected.dataset.rate = ev.target.closest('.card__pixel').dataset.rate
}

onMounted(()=>{
    document.querySelector('.card__pixel--avg').dataset.rate =3
})

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
    background-color: red;
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: bold;
    text-shadow: 0px 0px 2px #000;
    color: #222;
}
.card__pixel[data-rate="1"]{
    background-color: #F86868;
}
.card__pixel[data-rate="2"]{
    background-color: #F9D67C;
}
.card__pixel[data-rate="3"]{
    background-color: #FB9C45;
}
.card__pixel[data-rate="4"]{
    background-color: #A4F97C;
}
.card__pixel[data-rate="5"]{
    background-color: #82FF47;
}
</style>