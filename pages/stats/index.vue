<template>
    <section class="section">
        <TopNav goBack="/daily#completed"/>
        <main>
            <div class="cards">
                <div class="card" v-for="year in years" :key="year">
                    <span class="title">{{ year }}</span>
                    <p>Statistics from {{ year }}</p>
                    <nuxt-link :to="`/stats/${year}`" class="general">General statistics</nuxt-link>
                    <ul class="links">
                        <li><nuxt-link :to="`/stats/${year}/rate`">Rate</nuxt-link></li>
                        <li><nuxt-link :to="`/stats/${year}/anxiety`">Anxiety</nuxt-link></li>
                        <li><nuxt-link :to="`/stats/${year}/mood`">Mood</nuxt-link></li>
                        <li><nuxt-link :to="`/stats/${year}/weather`">Weather</nuxt-link></li>
                        <li><nuxt-link :to="`/stats/${year}/exercises`">Exercises</nuxt-link></li>
                        <li><nuxt-link :to="`/stats/${year}/reading`">Reading</nuxt-link></li>
                        <li><nuxt-link :to="`/stats/${year}/health`">Health</nuxt-link></li>
                    </ul>
                </div>
            </div>
        </main>
    </section>
</template>

<script setup>
definePageMeta({
    middleware: ["user"]
})

const rawResponse = await useApi('active_years', {
    method: 'GET',
    token: true
})

const years = ref(null)
const response = await rawResponse.json()

years.value = response.years
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