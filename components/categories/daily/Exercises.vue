<template>
    <section class="category">
        <h1>Did <b>you</b> do any exercises today?</h1>
        <span class="description">You can choose many options at once. Mark what activities you did today. If you did none of these things just move on without marking anything</span>
        <div class="content">
            <span class="content__title">Today I exercised...</span>
            <div class="content-column">
                <div class="big-pixel">
                    <div class="big-pixel--inner" :class="optionPixel.class" v-for="optionPixel in currentValue" :key="optionPixel"></div>
                </div>
                <categoriesInputsExercises :apiValue="apiValue" @emitSelected="changeValue"/>
            </div>
        </div>
    </section>
</template>

<script setup>
const props = defineProps({
    apiValue: String // Value from database if a user has already filled a category 
})
const emits = defineEmits(["emitPixel"])

const empty = [{
    value: 0,
    text: 'Not selected',
    class: ''
}]

const currentValue = ref(empty)

const changeValue = (ev) =>{
    currentValue.value = ev
    console.log(currentValue.value)
    emits('emitPixel', {category: 'exercises', pixel: currentValue.value.map((el)=> el.value).join('')})
}
</script>

<style lang="scss" scoped>
.content-column{
    display: flex;
    justify-content: center;
    align-items: center;
    gap: clamp(1em, 5em, 2em);
}
.big-pixel{
    position: relative;
    width: 10em;
    height: 10em;
    border-radius: 1.5em;
    background-color: #222;
    border: 0.4em solid #2D2D2D;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #222;
    overflow: hidden;
    z-index: -1;
}
.big-pixel--inner{
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
}
.pixel--dot::before{
    content: "";
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 1em;
    height: 1em;
    background: #eee;
    border-radius: 50%;
}
.pixel--circle::before{
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    border: 0.35em solid #eee;
    border-radius: 50%;
}
.pixel--dash::before{
    content: "";
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 90%;
    height: 0.5em;
    background: #eee;
}
.pixel--dash-left::before{
    content: "";
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%) rotate(-45deg);
    width: 90%;
    height: 0.5em;
    background: #eee;
}
.pixel--blue{
    background-color: rgb(67, 97, 248);
    z-index: -1;
}
</style>