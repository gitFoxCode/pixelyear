<template>
    <section class="section">
        <TopNav />
        <main>
            <Callendar :year="year" />
            <section class="options">
                <div class="options__card">
                    <div class="card__pixel"></div>
                    <span class="card__title">Average</span>
                </div>
                <div class="options__cards">
                    <div class="options__card">
                        <div class="card__pixel"></div>
                        <span class="card__title">1 stars</span>
                    </div>
                    <div class="options__card">
                        <div class="card__pixel"></div>
                        <span class="card__title">2 stars</span>
                    </div>
                    <div class="options__card">
                        <div class="card__pixel"></div>
                        <span class="card__title">3 stars</span>
                    </div>
                    <div class="options__card">
                        <div class="card__pixel"></div>
                        <span class="card__title">4 stars</span>
                    </div>
                    <div class="options__card">
                        <div class="card__pixel"></div>
                        <span class="card__title">5 stars</span>
                    </div>
                </div>
            </section>
        </main>
    </section>
    
</template>

<script setup>
const { data: year } = await useLazyFetch('https://pixelyear.herokuapp.com/api/test/2019')
let average = 0
let count = 0
const merged = Object.values(year.value).join('')
for(let i = 0; i < merged.length; i++){
    if(merged[i] === 0) continue;
    count++
    average += parseInt(merged[i], 10)
}
average = average/count


console.log(average)

</script>

<style lang="scss" scoped>
main{
    padding: 0 1em;
}
.options{
    font-family: "Monospace", sans-serif;
    display: flex;
    justify-content: space-between;
}
.options__cards{
    display: flex;
    gap: 3em;
}
.options__card{
    display: flex;
    flex-direction: column;
    align-items: center;
}
.card__pixel{
    width: 2em;
    height: 2em;
    border-radius: 0.2em;
    background-color: red;
}
</style>