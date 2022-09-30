<template>
    <section class="category">
        <h1>How was the weather today?</h1>
        <span class="description">Mark what the main weather was that day</span>
        <div class="content">
            <span class="content__title">Today's weather was...</span>
            <div class="content__weather">
                <div class="icon">{{ currentValue.icon }}</div>
                <span class="weather__type">{{ currentValue.text }}</span>
            </div>
            <categoriesInputsWeather :apiValue="apiValue" @emitSelected="changeValue"/>
        </div>
    </section>
</template>

<script setup>
const props = defineProps({
    apiValue: String // Value from database if a user has already filled a category 
})
const emits = defineEmits(["emitPixel"])

const empty = {
    value: 0,
    text: 'Not selected',
    icon: '❔'
}

const currentValue = ref(empty)

const changeValue = (ev) =>{
    currentValue.value = ev
    emits('emitPixel', {category: 'weather', pixel: currentValue.value.value})
}
</script>

<style lang="scss" scoped>
.weather__type{
    text-align: center;
    text-transform: uppercase;
    font-weight: bold;
}
.content__weather .icon{
    font-size: 10rem;
    display: flex;
    align-items: center;
    justify-content: center;
}
</style>