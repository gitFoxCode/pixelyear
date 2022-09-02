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
            <div class="section__buttons">
                <button type="button" @click="navigateTo('/daily')">Close</button>
                <button type="button" class="primary" :class="{'loading': saveLoading}"  @click="saveDiary"><nuxt-icon name="bookmark"/> Save</button>
            </div>
        </main>
    </section>
</template>

<script setup>
    const diaryText = ref("")
    const saveLoading = ref(false)
    const saveDiary = async ()=>{ 
        console.log(diaryText.value)
        saveLoading.value = true
     }
</script>

<style lang="scss" scoped>
.section__buttons{
    display: flex;
    gap: 1em;
    justify-content: flex-end;
    button {
        display: flex;
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