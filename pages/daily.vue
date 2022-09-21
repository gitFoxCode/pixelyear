<template>
    <section class="section">
        <TopNav />
    <main>
        <div class="daily__stages">
            <div class="daily__stage" 
            v-for="categoryId in 6" 
            :key="categoryId" 
            :class="{
            'daily__stage--filled': stage > categoryId-1, 
            'daily__stage--filled': databaseValues[categoryId-1]}"></div>

        </div>
        <CategoriesRate  :dbValue="databaseValues[0]" v-if="stage === 0" @emitPixel="sendPixel"/>
        <CategoriesAnxiety :dbValue="databaseValues[1]" v-if="stage === 1" @emitPixel="sendPixel"/>
        <CategoriesMood :dbValue="databaseValues[2]" v-if="stage === 2" @emitPixel="sendPixel"/>
        <CategoriesWeather :dbValue="databaseValues[3]" v-if="stage === 3" @emitPixel="sendPixel"/>
        <CategoriesExercise :dbValue="databaseValues[4]" v-if="stage === 4" @emitPixel="sendPixel"/>
        <CategoriesReading :dbValue="databaseValues[5]" v-if="stage === 5" @emitPixel="sendPixel"/>
        <CategoriesHealth :dbValue="databaseValues[6]" v-if="stage === 6" @emitPixel="sendPixel"/>
        <CategoriesCompleted v-if="stage === 7" />
        <div class="error" v-if="error">{{ error }}</div>
        <footer class="footer">
            <button type="button" class="btn" v-if="stage > 0" @click="prevStage()">Back</button>
            <button type="button" class="btn btn--primary" v-if="stage !== 7" @click="nextStage()">Next <nuxt-icon name="chevron-right" /></button>
        </footer>
    </main>
    </section>
</template>

<script setup>
import { useAuth } from '~/store/auth'
definePageMeta({
    middleware: ["user"]
})
const CATEGORIES = new Map([
    ['rate', 0],
    ['anxiety', 1],
    ['mood', 2],
    ['weather', 3],
    ['exercise', 4],
    ['reading', 5],
    ['health', 6],
    ['completed', 7]
])
const stage = location.hash ? ref(CATEGORIES.get(location.hash.replace('#',''))) : ref(0)
const error = ref("")

watch(stage, async (newStage, oldStage) => {
    location.hash = Array.from(CATEGORIES.keys())[newStage]
})

// Prepare pixel to send
const pixelToSend = {
    category: '',
    year: new Date().getFullYear(),
    date: `${new Date().getFullYear()}-${String(new Date().getMonth() + 1).padStart(2, '0')}-${String(new Date().getDate()).padStart(2, '0')}`,
    pixel_values: ''
}
// Get selected pixel from component
const sendPixel = (ev) => {
    pixelToSend.pixel_values = ev.pixel
    pixelToSend.category = ev.category
}

// Check if user today fullfiled all categories
const response = await fetch('https://pixelyear.herokuapp.com/api/updated_today/all?type=numeric', {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + useAuth().getToken
    }
})
const data = await response.json()
if(data.hasOwnProperty('error')){
    useAuth().logout()
    navigateTo('/') // TODO: Nuxt problem, change to '/'
}
// Go to completed if all categories are done
if(data.not_updated.length === 0){
    stage.value = 7
}

// Set previously set values (from database)
const databaseValues = data.updated

if(!data.updated.hasOwnProperty('0') && stage.value === 0){
    // Default important value
    pixelToSend.category = "rate"
    pixelToSend.pixel_values = 3
}

const nextStage = async ()=>{
    console.log(pixelToSend)
    // Skipping a category or omitting a category that was previously filled in
    if(databaseValues[stage.value] && pixelToSend.category === ""){
        return stage.value++
    }

    // Handling reading category with '0 pages' TODO: force the component to send this data 
    if(pixelToSend.category === "" && stage.value === 5){
        pixelToSend.category = 'reading'
        pixelToSend.pixel_values = 0
    }

    // Skipping a category
    if(pixelToSend.category === ""){
        return stage.value++
    }

    console.log("[DEBUG] Wysyłam pixel:", pixelToSend)
    const pixelChangeResponse = await fetch(`https://pixelyear.herokuapp.com/api/${new Date().getFullYear()}/${pixelToSend.category}`, {
        method: 'PATCH',
        body: JSON.stringify({
            date: pixelToSend.date,
            pixel_values: pixelToSend.pixel_values
        }),
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + useAuth().getToken
        }
    })

    console.log("[DEBUG] Wysłano")

    const pixelChangeData = await pixelChangeResponse.json()

    console.log(pixelChangeData)

    if(String(pixelChangeResponse.status)[0] !== '2'){
        error.value = `An error occurred. (${pixelChangeData.error}) Try again later.`
    }else{
        databaseValues[`${stage.value}`] = pixelToSend.pixel_values
        console.log(databaseValues)
        stage.value++
        pixelToSend.category = "" // Reset category
        pixelToSend.pixel_values = "" // Reset pixel value
    }
}
const prevStage = ()=>{
    stage.value--
    pixelToSend.category = "" // Reset category
    pixelToSend.pixel_values = "" // Reset pixel value
}
</script>
<style lang="scss">
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
.section{
    padding-top: 5em;
    display: flex;
    flex-direction: column;
    justify-content: center;
    font-family: "Monospace", sans-serif;
    text-align: center;
    min-height: calc(100vh - 5em);
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
main{
    display: flex;
    flex-direction: column;
    align-content: center;
    min-height: calc(100vh - 5em);
}
</style>