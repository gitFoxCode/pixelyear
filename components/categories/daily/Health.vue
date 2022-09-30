<template>
    <section class="category">
        <h1>How was <b>your</b> health today?</h1>
        <span class="description">Mark how you felt health-wise today. </span>
        <div class="content">
            <span class="content__title">Today I felt...</span>
            <div class="text">{{ currentValue.text }}</div>
            <categoriesInputsHealth :apiValue="apiValue" @emitSelected="changeValue"/>
        </div>
    </section>
</template>

<script setup>
const props = defineProps({
    apiValue: String
})
const emits = defineEmits(["emitPixel"])

const empty = {
    value: 0,
    text: 'Not selected'
}

const currentValue = ref(empty)

const changeValue = (ev) =>{
    currentValue.value = ev
    emits('emitPixel', {category: 'health', pixel: currentValue.value.value})
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