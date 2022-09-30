<template>
    <section class="category">
        <h1>What was <b>your</b> anxiety level today</h1>
        <span class="description">Was today a stressful day or the opposite?</span>
        <div class="content">
            <span class="content__title">Today my anxiety was...</span>
            <div class="content">
                <span class="text">{{ currentValue.text }}</span>
            </div>
            <categoriesInputsAnxiety :apiValue="apiValue" @emitSelected="changeValue"/>
        </div>
    </section>
</template>

<script setup>
const props = defineProps({
    apiValue: String // Value from database if a user has already filled a category 
})
const emits = defineEmits(["emitPixel"])

const empty = {
    value: "0",
    text: "Not selected"
}

const currentValue = ref(empty)

const changeValue = (ev) =>{
    currentValue.value = ev
    emits('emitPixel', {category: 'anxiety', pixel: currentValue.value.value})
}
</script>

<style lang="scss" scoped>
.text{
    display: block;
    font-size: 3em;
    margin: 1em 0;
}
</style>