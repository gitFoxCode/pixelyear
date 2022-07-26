<template>
    <header class="header">
        <span class="logo"><a href="#"><b>Pixel</b>Year</a></span>
        <button type="button" class="menu-btn"> <nuxt-icon name="hamburger" /> </button>
    </header>
</template>

<style lang="scss" scoped>
.header{
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 2em;
    padding: 1rem;
    background-color: rgba(21, 21, 21, 0.8);
    backdrop-filter: blur(5px);
}
.logo a{
    color: #FFFFFF;
    font-size: 1em;
    text-decoration: none;
    font-family: "Monospace", sans-serif;
}
.menu-btn{
    background-color: transparent;
    border: none;
    font-size: 1em;
}
</style>