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
        <section class="buttons">
            <button type="button"><nuxt-icon name="google" /> Login via Google</button>
            <button type="button"><nuxt-icon name="facebook" /> Login via Facebook</button>
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
    height: 100vh;
}
.text{
    margin: 0 auto;
    max-width: 50ch;
    text-align: center;
}
.buttons{
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1em;
    margin-top: 5em;
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
</style>
