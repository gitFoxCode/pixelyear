<template>
    <main>
        <span class="logo">
            <a href="#">
                <b><span class="colored">
                    <span class="colored--item">P</span>
                    <span class="colored--item">i</span>
                    <span class="colored--item">x</span>
                    <span class="colored--item">e</span>
                    <span class="colored--item">l</span>
                    </span>
                </b>Year
                </a>
            </span>
        <p class="text">Raport your every day how your day went, check your stats and draw conclusions!</p>
        <form @submit="onSubmit">
            <section class="login">
                <label>
                    <span class="input__title">E-mail</span>
                    <input type="email" placeholder="jan@kowalski.pl" v-model="formData.email"/>
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
            </section>
            <section class="buttons">
                <button type="button"><nuxt-icon name="google" /> Login via Google</button>
                <button type="button"><nuxt-icon name="facebook" /> Login via Facebook</button>
            </section>
        </form>
    </main>
</template>

<script setup>
const formData = ref({
    email: '',
    password: ''
})

const error = ref({
    status: false,
    message: ''
})

const loadingState = ref(false)

const onSubmit = async (ev)=>{
    ev.preventDefault()

    loadingState.value = true

    const response = await fetch('https://pixelyear.herokuapp.com/api/login', {
        method: 'POST',
        body: JSON.stringify(formData.value),
        headers: {
            'Content-Type': 'application/json'
        }
    })

    loadingState.value = false

    if(String(response.status)[0] !== '2'){
        console.log()
        console.log(response)
        error.value.status = true
        error.value.message = (await response.json()).error
        console.log(error.value)
    } else{
        console.log(response)
        // navigateTo('/daily')
    }
}

if(process.client){

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

    setInterval(() => {
    document.querySelectorAll('.colored--item').forEach((letter, index) => {
        letter.style.color = colors[(index + indexOffset) % 7]
    })
    indexOffset++
    }, 1000)

}
</script>

<style lang="scss" scoped>
main{
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-family: "Monospace", sans-serif;
    min-height: 100vh;
    padding-bottom: 3em;
}
.login{
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
