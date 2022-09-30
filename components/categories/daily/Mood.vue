<template>
    <section class="category">
        <h1>What was <b>your</b> mood today?</h1>
        <span class="description">Think about how you mainly felt today. Of course, different moods you probably had throughout the day, but try to draw an average from that</span>
        <div class="content">
            <span class="content__title">Today I felt...</span>
            <div class="content__mood">
                <div class="icon">{{ currentValue.icon }}</div>
                <span class="mood__type">{{ currentValue.text }}</span>
            </div>
            <categoriesInputsMood :apiValue="apiValue" @emitSelected="changeValue"/>
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
    icon: '🤐'
}

const currentValue = ref(empty)

const changeValue = (ev) =>{
    currentValue.value = ev
    emits('emitPixel', {category: 'mood', pixel: currentValue.value.value})
}
</script>

<style lang="scss" scoped>
.content__mood{
    margin-top: 2em;
    & [data-value="4"]{
        color: #8AFF88;
    }
}
.mood__type{
    text-align: center;
    text-transform: uppercase;
    font-weight: bold;
}
.content__mood .icon{
    font-size: 10rem;
    display: flex;
    align-items: center;
    justify-content: center;
}
</style>