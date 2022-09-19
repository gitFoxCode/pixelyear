<template>
    <section class="modal">
        <span class="modal__title">{{ title }}</span>
        <span class="modal__content">{{ content }}</span>
        <div class="modal__actions">
            <a href="#" class="modal__btn" @click="modalClose">Close</a>
            <button type="button" @click="confirmFunction" class="modal__btn modal__btn__primary">{{ primaryBtn }}</button>
        </div>
    </section>
</template>

<script setup>
const props = defineProps({
    title: String,
    content: String,
    primaryBtn: String,
    confirmFunction: Function
})
const emits = defineEmits(["modalClose"])

const modalClose = () =>{
    emits('modalClose')
}
</script>

<style lang="scss" scoped>
.modal{
    display: flex;
    flex-direction: column;
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    padding: 1em;
    background-color: #111;
    text-align: center;
    gap: 1em;
}
.modal__title{
    font-weight: bold;
}
.modal__actions{
    display: flex;
    justify-content: flex-end;
    align-items: center;
    gap: 2em;
    a, button{
        color: #FFF;
        text-decoration: none;
    }
}
.modal__btn__primary{
    padding: 0.5em 1em;
    background-color: transparent;
    border: 2px solid #FFF;
    font-weight: bold;
}
</style>