<template>
    <main>
        <h1>Welcome! </h1>
        <p class="text">This could be the first day of the rest of your life - consciously</p>
        <section class="login">
            <label>
                <span class="input__title">E-mail</span>
                <input type="email" placeholder="jan@kowalski.pl"/>
            </label>
            <label>
                <span class="input__title">Password</span>
                <input type="password" placeholder="********"/>
            </label>
            <label>
                <span class="input__title">Repeat password</span>
                <input type="password" placeholder="********"/>
            </label>
        </section>
        <section class="buttons">
            <button type="button" class="btn--green"><nuxt-icon name="lock" /> Register</button>
            <p>Do you already have an account? <a href="/">Log in</a></p>
        </section>
        <section class="buttons">
            <button type="button"><nuxt-icon name="google" /> Register via Google</button>
            <button type="button"><nuxt-icon name="facebook" /> Register via Facebook</button>
        </section>
    </main>
</template>

<script setup>
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
</style>
