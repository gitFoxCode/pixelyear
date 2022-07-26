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
        </div>
        <!-- <CategoriesRate /> -->
        <CategoriesCompleted />
        <footer class="footer">
            <button type="button" class="btn btn--primary">Next <nuxt-icon name="chevron-right" /></button>
        </footer>
    </main>
</template>

<script setup>
const stage = ref(4)
</script>

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
}
.btn--primary{
    padding: 0.6em 1.5em;
    padding-right: 1em;
    border: 1px solid #fff;
    cursor: pointer;
    transition: background-color 0.4s;
    &:focus{
        background-color: #FFF;
        color: #222;
    }
}
</style>