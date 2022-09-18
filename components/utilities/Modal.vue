<template>
    <section class="modal" v-if="modalActive">
        <span class="modal__title">{{ title }}</span>
        <span class="modal__content">{{ content }}</span>
        <div class="modal__actions">
            <a href="#" class="modal__btn" @click="modalClose">Close</a>
            <a href="#" class="modal__btn modal__btn__primary">{{ primaryBtn }}</a>
        </div>
    </section>
</template>

<script setup>
const modalActive = ref(true)
const title = "Usunięcie konta"
const content = "Na pewno chcesz usunąć swoje konto (email@adres.pl)?"
const primaryBtn = "Delete"
const modalClose = () =>{
    modalActive.value = false
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
    a{
        color: #FFF;
        text-decoration: none;
    }
}
.modal__btn__primary{
    padding: 0.5em 1em;
    border: 2px solid #FFF;
    font-weight: bold;
}
</style>