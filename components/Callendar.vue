<template>
    <section class="callendar">
        <span class="date">{{new Date().getDate()}} July</span>
        <table>
            <thead>
                <tr>
                    <th></th>
                    <th>J</th>
                    <th>F</th>
                    <th>M</th>
                    <th>A</th>
                    <th>M</th>
                    <th>J</th>
                    <th>J</th>
                    <th>A</th>
                    <th>S</th>
                    <th>O</th>
                    <th>N</th>
                    <th>D</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(n,index) in 31" :key="n">
                    <th>{{n}}</th>
                    <td><div class="pixel" :data-rate="year['january'][index]" @click="selectPixel"></div></td>
                    <td><div class="pixel" :data-rate="year['february'][index]" @click="selectPixel"></div></td>
                    <td><div class="pixel" :data-rate="year['march'][index]" @click="selectPixel"></div></td>
                    <td><div class="pixel" :data-rate="year['april'][index]" @click="selectPixel"></div></td>
                    <td><div class="pixel" :data-rate="year['may'][index]" @click="selectPixel"></div></td>
                    <td><div class="pixel" :data-rate="year['june'][index]" @click="selectPixel"></div></td>
                    <td><div class="pixel" :data-rate="year['july'][index]" @click="selectPixel"></div></td>
                    <td><div class="pixel" :data-rate="year['august'][index]" @click="selectPixel"></div></td>
                    <td><div class="pixel" :data-rate="year['september'][index]" @click="selectPixel"></div></td>
                    <td><div class="pixel" :data-rate="year['october'][index]" @click="selectPixel"></div></td>
                    <td><div class="pixel" :data-rate="year['november'][index]" @click="selectPixel"></div></td>
                    <td><div class="pixel" :data-rate="year['december'][index]" @click="selectPixel"></div></td>
                </tr>
            </tbody>
        </table>
    </section>
</template>

<script setup>
defineProps({
    year: Object
})



onMounted(()=>{
    const todayPixel = document.querySelector(`tbody tr:nth-of-type(${new Date().getDate()}) td:nth-of-type(${new Date().getMonth()+1}) .pixel`)
    todayPixel.classList.add('pixel--today')
})

const selectPixel = (ev)=>{
    const allPixels = [...document.querySelectorAll(".pixel")]
    allPixels.forEach((el)=>{
        el.classList.remove("pixel--selected")
    })
    if(ev.target.dataset.rate === undefined){
        return;
    }
    ev.target.classList.add("pixel--selected")
}
</script>

<style lang="scss" scoped>
table{
    width: 100%;
    font-size: 1.5em;
    font-family: "Monospace", sans-serif;
}
.date{
    display: block;
    width: 100%;
    text-align: center;
    font-size: 2em;
    font-family: "Monospace", sans-serif;
    font-weight: bold;
}
th,td{
    text-align: left;
}
.pixel{
    width: 1em;
    height: 1em;
    border-radius: 2px;
    border: 1px solid #222222;
    background-color: #000;
    cursor: pointer;
    &[data-rate="0"]{
        background-color: transparent;
    }
    &[data-rate="1"]{
        background-color: #F9937C;
    }
    &[data-rate="2"]{
        background-color: #f9c77c;
    }
    &[data-rate="3"]{
        background-color: #ffd23d;
    }
    &[data-rate="4"]{
        background-color: #cdf97c;
    }
    &[data-rate="5"]{
        background-color: #A4F97C;
    }
    &[data-rate="x"]{
        background-color: #000;
    }
}
.pixel--today{
    border-color: #efaa3e;
    border-spacing: 15px;
    box-shadow: 0 0 0 5px #171717, 0 0 0 7px #efaa3e;
}
.pixel--selected{
    border-color: #efaa3e;
    border-spacing: 15px;
    box-shadow: 0 0 0 5px #171717, 0 0 0 7px #efaa3e;
}
</style>