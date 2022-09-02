<template>
    <section class="completed">
        <div class="info">
            <nuxt-icon name="smile" />
            <h1>You filled your day today!</h1>
            <span class="text">Come back again tomorrow</span>
        </div>
        <div class="actions">
            <a href="#"><nuxt-icon name="bookmark" fill/> Diary</a>
            <a href="#">See stats</a>
        </div>
    </section>
</template>

<style lang="scss" scoped>
.completed{
    display: flex;
    flex-grow: 1;
    flex-direction: column;
    justify-content: space-around;
}
.nuxt-icon{
    display: flex;
    justify-content: center;
    font-size: 3rem;
}
.text{
    font-size: 0.9em;
    color: #666;
}
.actions{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 1em;
}
.actions a{
    display: flex;
    gap: 0.5em;
    justify-content: center;
    align-items: center;
    text-decoration: none;
    padding: 0.8rem 3.5rem;
    border: 1px solid #FFF;
    color: #FFF;
    .nuxt-icon{
        font-size: 1em;
    }
}
</style>