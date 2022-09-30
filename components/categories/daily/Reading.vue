<template>
    <section class="category">
        <h1>Have <b>you</b> read anything today?</h1>
        <span class="description">Mark how many pages you have read today - any book, ebook that is not social media</span>
        <div class="content">
            <span class="content__title">Today I read...</span>
            <div class="text">{{ pages }} pages</div>
            <categoriesInputsReading :apiValue="apiValue" @emitSelected="changeValue" />
        </div>
    </section>
</template>

<script setup>
const props = defineProps({
    apiValue: String // Value from database if a user has already filled a category 
})
const emits = defineEmits(["emitPixel"])

const pages = props.apiValue ? ref(props.apiValue) : ref(0)

const changeValue = (ev) =>{
    pages.value = ev.value
    emits('emitPixel', {category: 'reading', pixel: pages.value})
}

</script>

<style lang="scss" scoped>
.text{
    display: block;
    font-size: 3em;
    margin: 1em 0;
}
.content{
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 2em;
}
</style>