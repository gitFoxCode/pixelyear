<template>
    <main>
        <TopNav />
        <div class="daily__stages">
            <div class="daily__stage" :class="{'daily__stage--filled': stage > 0}"></div>
            <div class="daily__stage" :class="{'daily__stage--filled': stage > 1}"></div>
            <div class="daily__stage" :class="{'daily__stage--filled': stage > 2}"></div>
            <div class="daily__stage" :class="{'daily__stage--filled': stage > 3}"></div>
            <div class="daily__stage" :class="{'daily__stage--filled': stage > 4}"></div>
            <div class="daily__stage" :class="{'daily__stage--filled': stage > 5}"></div>
            <div class="daily__stage" :class="{'daily__stage--filled': stage > 6}"></div>
        </div>
        <CategoriesRate  v-if="stage === 0"/>
        <CategoriesAnxiety v-if="stage === 1"/>
        <CategoriesMood  v-if="stage === 2"/>
        <CategoriesWeather v-if="stage === 3"/>
        <CategoriesExercise v-if="stage === 4"/>
        <CategoriesReading v-if="stage === 5"/>
        <CategoriesHealth v-if="stage === 6"/>
        <CategoriesCompleted v-if="stage === 7"/>
        <footer class="footer">
            <button type="button" class="btn" v-if="stage > 0" @click="prevStage()">Back</button>
            <button type="button" class="btn btn--primary" v-if="stage !== 7" @click="nextStage()">Next <nuxt-icon name="chevron-right" /></button>
        </footer>
    </main>
</template>

<script setup>
const stage = ref(6)

const nextStage = ()=>{
    stage.value++
}
const prevStage = ()=>{
    stage.value--
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
main{
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
</style>