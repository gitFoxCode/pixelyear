<template>
    <section class="section">
        <TopNav />
        <main>
            <div class="daily__stages">
                <div class="daily__stage" 
                v-for="categoryId in CATEGORIES.size" 
                :key="categoryId"
                :class="{
                    'daily__stage--filled': apiValues[categoryId-1]
                }"></div>
            </div>
            <component :is="dailyCategories[stage]" :apiValue="apiValues[stage]" @emitPixel="getPixel"/>
            <div class="error" v-if="error"> {{ error }} </div>
            <footer class="footer">
                <button type="button" class="btn" v-if="stage > 0" @click="prevStage()">Back</button>
                <button type="button" class="btn btn--primary" v-if="stage !== CATEGORIES.size-1" @click="nextStage()">Next <nuxt-icon name="chevron-right" /></button>
            </footer>
        </main>
    </section>
</template>

<script setup lang="ts">
import { useAuth } from '~/store/auth'
definePageMeta({
    middleware: ['user']
})
const dailyCategories = [
    await resolveComponent('categoriesDailyRate'),
    await resolveComponent('categoriesDailyAnxiety'),
    await resolveComponent('categoriesDailyMood'),
    await resolveComponent('categoriesDailyWeather'),
    await resolveComponent('categoriesDailyExercises'),
    await resolveComponent('categoriesDailyReading'),
    await resolveComponent('categoriesDailyHealth'),
    await resolveComponent('categoriesDailyCompleted'),
]

const CATEGORIES = new Map([
    ['rate', 0],
    ['anxiety', 1],
    ['mood', 2],
    ['weather', 3],
    ['exercises', 4],
    ['reading', 5],
    ['health', 6],
    ['completed', 7]
])

const stage = location.hash ? ref(CATEGORIES.get(location.hash.replace('#',''))) : ref(0)
const error = ref("")

if(location.hash === "#undefined"){
    location.hash = ''
}

// Hash navigation
watch(stage, async(newStage, oldStage)=>{
    location.hash = Array.from(CATEGORIES.keys())[newStage]
})

// Prepare pixel to send
const pixelToSend = {
    category: null,
    year: new Date().getFullYear(),
    date: `${new Date().getFullYear()}-${String(new Date().getMonth() + 1).padStart(2, '0')}-${String(new Date().getDate()).padStart(2, '0')}`,
    pixel_values: null
}

// Get selected pixel from component
const getPixel = (ev: any) => {
    pixelToSend.pixel_values = ev.pixel
    pixelToSend.category = ev.category
}

// Check if user today fullfiled all categories 
const rawResponse = await useApi('updated_today/all?type=numeric', {token: true})
const response = await rawResponse.json()

if(response.hasOwnProperty('error')){
    await useAuth().logout() // TODO: Not always error means token expired
}

// Go to completed if all categories are done
if(response.not_updated.length === 0){
    stage.value = CATEGORIES.size-1
}
console.log('[DEBUG] updated', response)
// Set previously set values (from API)
const apiValues = response.updated

const getNextStage = () =>{
    pixelToSend.category = null
    pixelToSend.pixel_values = ""
    return stage.value++
}

const nextStage = async ()=>{
    // Skipping a category or omitting a category that was previously filled in
    console.log(apiValues[stage.value], pixelToSend.category)
    if(pixelToSend.category === null){
        return getNextStage()
    }

    if(apiValues[stage.value] !== undefined && pixelToSend.category === null){
        return getNextStage()
    }

    if(apiValues[stage.value]*1 === pixelToSend.pixel_values*1){
        return getNextStage()
    }

    console.log('[DEBUG] Sending pixel: ', pixelToSend)
    
    // Sending new pixel
    const rawResponse = await useApi(`${new Date().getFullYear()}/${pixelToSend.category}`, {
        method: 'PATCH',
        body: {
            date: pixelToSend.date,
            pixel_values: pixelToSend.pixel_values
        },token: true})

    console.log('[DEBUG] Wysłano')

    const response = await rawResponse.json()

    console.log(`[DEBUG] Response:`, response)

    if(String(rawResponse.status)[0] !== '2'){
        error.value = `An error occurred. (${response.error}) Try again later.`
    }else{
        apiValues[`${stage.value}`] = String(pixelToSend.pixel_values)
        return getNextStage()
    }
}

const prevStage = ()=>{
    stage.value--
    pixelToSend.category = null
    pixelToSend.pixel_values = ""
}
</script>

<style lang="scss">
// Styles for elements common to each category
h1{
    font-size: 1.5em;
    font-weight: normal;
    margin-top: 1em;
}
.description{
    display: block;
    font-size: 0.9em;
    color: #818181;
    padding: 0 1em;
}
.content{
    margin-top: 2rem;
}
.content__title{
    display: block;
    font-size: 1.2em;
    text-align: left;
    margin-left: 2em;
}
</style>

<style lang="scss" scoped>
.error{
    margin-top: 1em;
    padding: 1em;
    background-color: #912e2e;
}
.daily__stages{
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 1em;
}
.daily__stage{
    width: 0.6rem;
    height: 0.6rem;
    border: 0.2rem solid #6C6C6C;
    border-radius: 50%;
}
.daily__stage--filled{
    background-color: #6C6C6C;
}
.footer{
    width: 100%;
    display: flex;
    justify-content: flex-end;
    margin-top: 2em;
    gap: 2em;
    margin-bottom: 2em;
}
.btn{
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 0.5em;
    border: none;
    background-color: transparent;
    color: #FFF;
    font-weight: bold;
    cursor: pointer;
}
.btn--primary{
    padding: 0.6em 1.5em;
    padding-right: 1em;
    border: 1px solid #fff;
    transition: background-color 0.4s;
    &:focus{
        background-color: #FFF;
        color: #222;
    }
}
</style>