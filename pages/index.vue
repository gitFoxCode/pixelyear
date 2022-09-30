<template>
    <section class="section nonav">
        <main>
            <span class="logo">
                <a href="#">
                    <b>
                        <span class="colored">
                            <span class="colored--item">P</span>
                            <span class="colored--item">i</span>
                            <span class="colored--item">x</span>
                            <span class="colored--item">e</span>
                            <span class="colored--item">l</span>
                        </span> 
                    </b>
                    Year
                </a>
            </span>
            <p class="text">Raport your every day how your day went, check your stats and draw conclusions!</p>
            <form @submit="onSubmit">
                <section class="inputs">
                    <label>
                        <span class="input__title">E-mail</span>
                        <input type="email" placeholder="jan@kowalski.pl" v-model="formData.email" />
                    </label>
                    <label>
                        <span class="input__title">Password</span>
                        <input type="password" placeholder="********" v-model="formData.password"/>
                    </label>
                </section>
                <span class="error-msg" v-if="error.status">{{ error.message }}</span>
                <section class="buttons">
                    <button type="submit" class="btn--green" :class="{'loading': loadingState}"><nuxt-icon name="key" /> Log in</button>
                    <p>Don't have an account?  <a href="/register">Register</a></p>
                    <p>Did you forget your password?  <a href="/reset-password">Reset password</a></p>
                </section>
                <section class="buttons">
                    <button type="button"><nuxt-icon name="google" /> Login via Google</button>
                    <button type="button" @click="loginFacebook"><nuxt-icon name="facebook" /> Login via Facebook</button>
                </section>
            </form>
        </main> 
    </section>
</template>

<script setup lang="ts">
import { useAuth } from '~/store/auth'
definePageMeta({
    middleware: ["guest"]
})

const formData = ref({
    email: '',
    password: '',
    never_expire: true
})

const error = ref({
    status: false,
    message: ''
})

const loadingState = ref(false)

/* Facebook login [HTTPS require] */
const loginFacebook = async () => {
    const state = 'string'
    const redirect = `${window.location.host}/oauth`
    const appID = "583211373601189" // useRuntimeConfig().FACEBOOK_APP_ID
    const scope = "email"
    window.location.href = `https://www.facebook.com/v15.0/dialog/oauth?client_id=${appID}&redirect_uri=${redirect}&state=${state}&scope=${scope}`
}
/* ---------------------- */

const onSubmit = async (ev: any)=>{
    ev.preventDefault()

    loadingState.value = true

    const rawResponse = await useApi('login', {
        method: 'POST',
        body: formData.value
    })

    const response = await rawResponse.json()

    loadingState.value = false

    if(String(rawResponse.status)[0] !== '2'){
        console.log("Login error - ", rawResponse, response)
        error.value.status = true
        error.value.message = response.error
    } else {
        useAuth().login(response)
        return navigateTo('/daily')
    }
}

// Logo animation
const colors = [
    '#A4F97C',
    '#F9937C',
    '#FB9C45',
    '#45A3FB',
    '#FB45D3',
    '#45E5FB',
    '#FB4545',
    ]
let indexOffset = 0
setInterval(()=>{
    document.querySelectorAll('.colored--item').forEach((letter: HTMLElement, index)=>{
        letter.style.color = colors[(index + indexOffset) % colors.length]
        indexOffset++
    })
}, 1000)
</script>

<style lang="scss" scoped>
.inputs{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 1em;
    padding-top: 2.5em;
    width: 100%;
    label{
        min-width: 70%;
        display: flex;
        flex-direction: column;
        gap: 0.5em;
    }
    .input__title{
        font-weight: bold;
        font-size: 1.5em;
    }
    input{
        font-size: 1em;
        padding: 0.5em 1em;
    }
}
.text{
    margin: 0 auto;
    max-width: 50ch;
    text-align: center;
    padding: 0 1em;
}
.buttons{
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1em;
    width: 70%;
    padding-top: 2em;
    button{
        display: flex;
        align-items: center;
        gap: 1em;
        width: 100%;
        border: 2px solid #fff;
        background-color: transparent;
        color: #fff;
        padding: 1em;
        font-weight: bold;
        &:focus{
            color: #222;
            background-color: #fff;

        }
        &.btn--green{
            color: rgb(64, 209, 91);
            border-color: rgb(64, 209, 91);
            &:focus{
                color: #222;
                background: rgb(64, 209, 91);;
            }
        }
    }
    p{
         text-align: center;
    }
    a{
        color: #fff;
        font-weight: bold;
    }
}
.logo{
    display: block;
    width: 100%;
    text-align: center;
    font-size: 3em;
    padding-top: 1em;
    a{
        color: #FFFFFF;
        text-decoration: none;
        font-family: "Monospace", sans-serif;
        text-align:center;
    }
}
.colored--item{
    transition: color 0.2s;
}
.error-msg{
    margin-top: 2em;
    background-color: rgba(255, 41, 41, 0.5);
    width: 75%;
    padding: 1em;
    text-align: center;
}
form{
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}
</style>