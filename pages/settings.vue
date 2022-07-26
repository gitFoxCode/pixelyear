<template>
    <section class="section">
        <TopNav />
        <main class="settings">
            <div class="avatar">
                <label>
                    <img :src="`https://pixelyear.herokuapp.com/api/avatar/${user.uuid}`" alt="User avatar" />
                    <nuxt-icon name="edit" class="avatar__icon" />
                    <input type="file" id="avatar" name="avatar" style="display:none" @change="changeAvatar" />
                </label>
                <div class="error-msg" v-if="avatarError">{{avatarError}}</div>
            </div>
            <h1 class="title">Settings</h1>
            <div class="inputs">
                <label class="input__box">
                    <span class="input__title">E-mail</span>
                    <div class="input__content">
                        <input type="text" :value="user.email" readonly>
                        <span class="input__icon"> <nuxt-icon name="lock"/> </span>
                    </div>
                </label>
                <label class="input__box">
                    <span class="input__title">Hasło</span>
                    <div class="input__content">
                        <input type="password" placeholder="New password" readonly value="******">
                        <a href="/reset-password" class="input__icon"> <nuxt-icon name="edit"/> </a>
                    </div>
                </label>
                <button type="button" class="btn">Log out of all devices</button>
                <button type="button" class="btn btn--danger" @click="modalOpen">Delete account</button>
            </div>
        </main> 
        <UtilitiesModal 
        v-if="modalActive"
        title="Deleting an account" 
        :content="`Are you sure you want to delete your account (${user.email})? This option cannot be undone.`"
        primaryBtn="Delete"
        :confirmFunction="deleteAccount"
        @modalClose="modalClose"/>
    </section>
</template>

<script setup>
import { useAuth } from '~/store/auth'
definePageMeta({
    middleware: ["user"]
})

const user = useAuth().getUser
const modalActive = ref(false)
const avatarError = ref("")

const deleteAccount = async ()=>{
    const rawResponse = await fetch('https://pixelyear.herokuapp.com/api/delete_account', {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + useAuth().getToken
        }
    })
    
    const response = await rawResponse.json()
    if(response?.success){
        useAuth().logout()
        return navigateTo('/')
    }
}

const modalOpen = ()=>{
    modalActive.value = true
}

const modalClose = ()=>{
    modalActive.value = false
}

const changeAvatar = async (ev) =>{
    avatarError.value = ""
    const formData = new FormData()
    console.log(ev.target.files[0])
    formData.append('avatar', ev.target.files[0])
    for (var key of formData.entries()) {
        console.log(key[0] + ', ' + key[1]);
    }
    const rawResponse = await useApi('upload_avatar', 
    {method: 'PATCH', token: true, formdata: true, rawbody: true, body: formData})
    console.log(rawResponse)
    const response = await rawResponse.json()
    console.log(response)
    if(response?.error){
        avatarError.value = response.error
    }
}

</script>

<style lang="scss" scoped>
.settings{
    display: flex;
    flex-direction: column;
    align-items: center;
}
.avatar img{
    width: 10em;
    height: 10em;
    border-radius: 50%;
    object-fit: cover;
}
.error-msg{
    margin-top: 1em;
    margin-bottom: 1em;
    background-color: #FF3636;
    padding: 1em;
}
.avatar label{
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
}
.avatar__icon{
    position: absolute;
    right: 20%;
    bottom: 0;
    color: #ccc;
}
.title{
    font-weight: bold;
}
.input__box{
    display: flex;
    flex-direction: column;
    gap: 0.5em;
    width: 100%;
}
.inputs{
    display: flex;
    flex-direction: column;
    width: 90%;
    gap: 2em;
}
.input__title{
    font-weight: bold;
}
.input__content input{
    font-size: 1.2em;
    background-color: transparent;
    border: 2px solid #fff;
    text-indent: 0.5em;
    color: #FFF;
    padding: 0.5em;
    &::placeholder, &::-moz-placeholder{
        color: #ccc;
    }
    flex: 1;
}
.input__icon{
    border: 2px solid #fff;
    width: 10%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: transparent;
    color: #fff;
    border-left: none;
}
.input__content{
    display: flex;
    align-items: stretch;
    width: 100%;
}
.btn{
    padding: 0.9em;
    font-weight: bold;
    border: 2px solid #fff;
    background-color: transparent;
    font-size: 1em;
    color: #fff;
    &.btn--danger{
        color: #FF3636;
        border-color: #FF3636;
    }
}
</style>