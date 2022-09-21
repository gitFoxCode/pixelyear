<template>
    <header class="header">
        <span class="logo"><a href="/"><b>Pixel</b>Year</a></span>
        <nuxt-link :to="props.goBack" class="btn-prev" v-if="props.goBack"><nuxt-icon name="back" fill/> go back</nuxt-link>
        <button type="button" class="menu-btn" @click="toggleMenu"> 
            <nuxt-icon name="hamburger" v-if="!activeMenu"/> 
            <nuxt-icon name="close" v-else/> 
        </button>
        <nav class="navigation" v-show="activeMenu">
            <div class="user">
                <div class="user__avatar"></div>
                <span class="user__email">{{ user.email }}</span>
            </div>
            <ul>
                <li><nuxt-link to="/daily"> <nuxt-icon name="daily"/> Daily</nuxt-link></li>
                <li><nuxt-link to="/stats"> <nuxt-icon name="stats"/> Stats</nuxt-link></li>
                <li><nuxt-link to="/settings"> <nuxt-icon name="cog"/> Settings</nuxt-link></li>
                <li><nuxt-link to="/logout"> <nuxt-icon name="logout"/> Logout</nuxt-link></li>
            </ul>
        </nav>
    </header>
</template>

<script setup>
import { useAuth } from '~/store/auth'

const props = defineProps({
    goBack: String
})

const user = useAuth().getUser

const activeMenu = ref(false)
const toggleMenu = ()=>{
    activeMenu.value = !activeMenu.value
    if(activeMenu.value){
        document.querySelector('main').classList.add("menu__active")
    }else{
        document.querySelector('main').classList.remove("menu__active")
    }
    console.log("Open menu")
}
</script>

<style lang="scss">
.menu__active{
    z-index: -1;
    transform: perspective(1244px) rotateY(14deg) translateZ(0) scale(0.5) translateX(-50%) translateY(calc(-50% + 6rem));
}
</style>

<style lang="scss" scoped>
.btn-prev{
    display: flex;
    align-items: center;
    gap: 1em;
    font-size: 0.9em;
    color: #EEE;
    text-decoration: none;
    margin-left: auto;
    margin-right: 2em;
    & .nuxt-icon{
        stroke-width: 2px;
    }
}
.navigation{
    position: absolute;
    top: 6rem;
    right: 0;
    font-size: 0.6em;
    background-color: rgba(21, 21, 21, 0.8);
    z-index: 2;
    padding: 1em;
    .user{
        display: flex;
        gap: 1em;
        align-items: center;
        padding-bottom: 1em;
        border-bottom: 1px solid #eee;
    }
    .user__avatar{
        display: block;
        width: 2em;
        height: 2em;
        background: #eee;
        border-radius: 100%;
    }
    a{
        text-decoration: none;
        color: #fff;
        display: flex;
        align-items: center;
        gap: 0.5em;
    }
    ul{
        display: flex;
        flex-direction: column;
        padding-top: 1em;
        gap: 1em;
    }
    li{
        margin-left: auto;
    }
}
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
    color: #fff;
    background-color: transparent;
    border: none;
    font-size: 1em;
}
</style>