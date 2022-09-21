<template>
    <section class="section">
        <TopNav goBack="/daily#completed"/>
        <main>
            <div class="cards">
                <div class="card" v-for="year in years.years" :key="year">
                    <span class="title">{{ year }}</span>
                    <p>Statistics from {{ year }}</p>
                    <nuxt-link :to="`/stats/${year}`" class="general">General statistics</nuxt-link>
                    <ul class="links">
                        <li><nuxt-link :to="`/rate/${year}`">Rate</nuxt-link></li>
                        <li><nuxt-link :to="`/anxiety/${year}`">Anxiety</nuxt-link></li>
                        <li><nuxt-link :to="`/mood/${year}`">Mood</nuxt-link></li>
                        <li><nuxt-link :to="`/weather/${year}`">Weather</nuxt-link></li>
                        <li><nuxt-link :to="`/exercise/${year}`">Exercises</nuxt-link></li>
                        <li><nuxt-link :to="`/reading/${year}`">Reading</nuxt-link></li>
                        <li><nuxt-link :to="`/health/${year}`">Health</nuxt-link></li>
                    </ul>
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
const { data: years } = await useLazyFetch(`https://pixelyear.herokuapp.com/api/active_years`, {
    headers:{
        'Authorization': 'Bearer ' + useAuth().getToken
    }
})
console.log(years.value)
</script>

<style lang="scss" scoped>
main{
    padding-top: 6rem;
}
.general{
    display: block;
    padding: 1em;
    border: 1px solid #eee;
    flex: 1;
    margin-top: 1em;
    font-weight: bold;
}
a{
    color: #fff;
    text-decoration: none;
}
.links{
    display: flex;
    flex-wrap: wrap;
    gap: 1em;
    margin-top: 2em;
    li{
        flex: 1;
    }
    a{
        display: block;
        flex-shrink: 1;
        padding: 1em;
        border: 1px solid #eee;
    }
}
.cards{
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    gap: 1em;
}
.card{
    padding: 1em;
    background-color: #222;
    border-radius: 0.5em;
    text-align: center;
    padding-bottom: 2em;
    background-image: url('@/assets/icons/pixels.svg');
    background-position: calc(100% - 1em) 1em;
    background-size: 20%;
    background-repeat: no-repeat;
    margin: 0 1em;
}
.title{
    font-weight: bold;
    font-size: 2em;
}
p{
    color: #999;
}
</style>