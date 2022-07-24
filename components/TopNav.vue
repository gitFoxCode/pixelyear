<template>
    <header class="header">
        <span class="logo"><a href="#"><b>Pixel</b>Year</a></span>
        <button type="button" class="menu-btn"> <nuxt-icon name="hamburger" /> </button>
    </header>
</template>

<style lang="scss" scoped>
.header{
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 2em;
    padding: 1rem;
}
.logo a{
    color: #FFFFFF;
    font-size: 1.5em;
    text-decoration: none;
    font-family: "Monospace", sans-serif;
}
.menu-btn{
    background-color: transparent;
    border: none;
    font-size: 1.5em;
}
</style>