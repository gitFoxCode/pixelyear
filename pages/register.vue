<template>
    <section class="section nonav">
        <main>
            <h1>Welcome!</h1>
            <p class="text">This could be the first day of the rest of your life - consciously</p>
            <form @submit="onSubmit">
                <section class="inputs">
                    <label>
                        <span class="input__title">E-mail</span>
                        <input type="email" placeholder="jan@kowalski.pl" v-model="formData.email" minlength="3" maxlength="50"/>
                    </label>
                    <label>
                        <span class="input__title">Password</span>
                        <input type="password" placeholder="********" v-model="formData.password" minlength="3"/>
                    </label>
                    <label>
                        <span class="input__title">Repeat password</span>
                        <input type="password" placeholder="********" v-model="formData.repassword" @keyup="validate" minlength="3"/>
                    </label>
                </section>
                <span class="error-msg" v-if="error.status">{{ error.message }}</span>
                <section class="buttons">
                    <button type="submit" class="btn--green" :class="{'loading': loadingState}"><nuxt-icon name="lock" /> Register</button>
                    <p>Do you already have an account? <a href="/">Log in</a></p>
                </section>
                <section class="buttons">
                    <button type="button"><nuxt-icon name="google" /> Register via Google</button>
                    <button type="button"><nuxt-icon name="facebook" /> Register via Facebook</button>
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
    repassword: ''
})

const error = ref({
    status: false,
    message: ''
})

const loadingState = ref(false)

const validate = (ev: any) => {
    if(ev.target.type === "password"){
        const passwordInputs = document.querySelectorAll("input[type='password']")
        if(passwordInputs[0].value !== ev.target.value){
                ev.target.classList.add('invalid')
        }else{
            ev.target.classList.remove('invalid')
        }
    }
}

const onSubmit = async (ev: any)=>{
    ev.preventDefault()

    loadingState.value = true

    const rawResponse = await useApi('register', {
        method: 'POST',
        body: formData.value
    })

    const response = await rawResponse.json()

    loadingState.value = false

    if(String(rawResponse.status)[0] !== '2'){
        error.value.status = true
        error.value.message = response.error
    } else{
        useAuth().login(response)
        return navigateTo('/')
    }
}
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
    &:last-of-type{
        margin-top: 1.5em;
    }
}
h1{
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
form{
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}
.error-msg{
    margin-top: 2em;
    background-color: rgba(255, 41, 41, 0.5);
    width: 75%;
    padding: 1em;
    text-align: center;
}
.invalid{
    border: 2px solid red;
}
</style>