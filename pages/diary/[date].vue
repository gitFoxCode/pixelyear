<template>
    <section class="section">
        <TopNav />
        <main>
            <h1 class="section__title">Diary <span class="section__title-date">{{ new Date().toLocaleDateString() }}</span></h1>
            <textarea class="diary__input" 
            placeholder="Today was..."
            rows="15"
            v-model="diaryText"
            ></textarea>
            <div class="error" v-if="error">{{error}}</div>
            <div class="section__buttons">
                <nuxt-link to="/daily">Close</nuxt-link>
                <button type="button" class="primary" :class="{'loading': saveLoading}"  @click="saveDiary"><nuxt-icon name="bookmark"/> Save</button>
            </div>
        </main>
    </section>
</template>

<script setup>
import { useAuth } from '~/store/auth'
definePageMeta({
    middleware: ["user"]
})
const today = useRoute().params.date
const diaryText = ref("")
const saveLoading = ref(false)
const error = ref()
const diaryExists = false

const getDiary = async () => {
    const rawResponse = await fetch(`https://pixelyear.herokuapp.com/api/journal/${today}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + useAuth().getToken
        }
    })
    if(String(rawResponse.status)[0] !== '2'){
        return error.value = `An error occurred. (${rawResponse.error}) Try again later.`
    }
    const response = await rawResponse.json()
    diaryText.value = response.content
    diaryExists = true
}

const saveDiary = async ()=>{ 
    let method = 'POST'
    saveLoading.value = true
    if(diaryExists){
        method = 'PATCH'
    }
    const rawResponse = await fetch(`https://pixelyear.herokuapp.com/api/journal/${today}`, {
        method,
        body: JSON.stringify({journal_content: diaryText.value}),
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + useAuth().getToken
        }
    })
    saveLoading.value = false
    if(String(rawResponse.status)[0] !== '2'){
        return error.value = `An error occurred. (${rawResponse.error}) Try again later.`
    }
    const response = await rawResponse.json()
    console.log(response)
    diaryExists = true
}

await getDiary()
</script>

<style lang="scss" scoped>
.section__buttons{
    display: flex;
    gap: 1em;
    justify-content: flex-end;
    button, a {
        display: flex;
        text-decoration: none;
        gap: 0.5em;
        align-items: center;
        border: none;
        background: transparent;
        color: #eee;
        cursor: pointer;
    }
    .primary{
        padding: 0.5em 1em;
        color: #eee;
        font-weight: bold;
        border: 2px solid #eee;
    }
}
main{
    display: flex;
    flex-direction: column;
    gap: 2em;
    padding: 0 1em;
}
.diary__input{
    border: none;
    background: transparent;
    background-image: url('@/assets/images/dots.png');
    background-size: 1.5em auto;
    line-height: 1em;
    width: 100%;
    color: #eee;
    height: auto;
    line-height: 1.5em;
    outline: none;
    resize: vertical;
}
.section{
    padding-top: 5em;
    display: flex;
    flex-direction: column;
    justify-content: center;
    font-family: "Monospace", sans-serif;
    text-align: center;
    min-height: calc(100vh - 5em);
    padding-bottom: 5em;
}
.section__title{
    font-weight: bold;
    font-size: 1.5em;
}
.section__title-date{
    color: #999;
}
</style>