<template>
    <section class="callendar" :class="type">
        <span class="date">{{new Date().getDate()}} July {{ yearDate }}</span>
        <span class="callendar__type">{{ typeText }}</span>
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
                    <td><div class="pixel" :data-date="`${n.toString().padStart(2, '0')}.01 - ${new Date(1+'/'+n+'/'+yearDate).toLocaleDateString('en-EN', {weekday: 'short'})}`" :data-value="year['january'][index]" @click="selectPixel"></div></td>
                    <td><div class="pixel" :data-date="`${n.toString().padStart(2, '0')}.02 - ${new Date(2+'/'+n+'/'+yearDate).toLocaleDateString('en-EN', {weekday: 'short'})}`" :data-value="year['february'][index]" @click="selectPixel"></div></td>
                    <td><div class="pixel" :data-date="`${n.toString().padStart(2, '0')}.03 - ${new Date(3+'/'+n+'/'+yearDate).toLocaleDateString('en-EN', {weekday: 'short'})}`" :data-value="year['march'][index]" @click="selectPixel"></div></td>
                    <td><div class="pixel" :data-date="`${n.toString().padStart(2, '0')}.04 - ${new Date(4+'/'+n+'/'+yearDate).toLocaleDateString('en-EN', {weekday: 'short'})}`" :data-value="year['april'][index]" @click="selectPixel"></div></td>
                    <td><div class="pixel" :data-date="`${n.toString().padStart(2, '0')}.05 - ${new Date(5+'/'+n+'/'+yearDate).toLocaleDateString('en-EN', {weekday: 'short'})}`" :data-value="year['may'][index]" @click="selectPixel"></div></td>
                    <td><div class="pixel" :data-date="`${n.toString().padStart(2, '0')}.06 - ${new Date(6+'/'+n+'/'+yearDate).toLocaleDateString('en-EN', {weekday: 'short'})}`" :data-value="year['june'][index]" @click="selectPixel"></div></td>
                    <td><div class="pixel" :data-date="`${n.toString().padStart(2, '0')}.07 - ${new Date(7+'/'+n+'/'+yearDate).toLocaleDateString('en-EN', {weekday: 'short'})}`" :data-value="year['july'][index]" @click="selectPixel"></div></td>
                    <td><div class="pixel" :data-date="`${n.toString().padStart(2, '0')}.08 - ${new Date(8+'/'+n+'/'+yearDate).toLocaleDateString('en-EN', {weekday: 'short'})}`" :data-value="year['august'][index]" @click="selectPixel"></div></td>
                    <td><div class="pixel" :data-date="`${n.toString().padStart(2, '0')}.09 - ${new Date(9+'/'+n+'/'+yearDate).toLocaleDateString('en-EN', {weekday: 'short'})}`" :data-value="year['september'][index]" @click="selectPixel"></div></td>
                    <td><div class="pixel" :data-date="`${n.toString().padStart(2, '0')}.10 - ${new Date(10+'/'+n+'/'+yearDate).toLocaleDateString('en-EN', {weekday: 'short'})}`" :data-value="year['october'][index]" @click="selectPixel"></div></td>
                    <td><div class="pixel" :data-date="`${n.toString().padStart(2, '0')}.11 - ${new Date(11+'/'+n+'/'+yearDate).toLocaleDateString('en-EN', {weekday: 'short'})}`" :data-value="year['november'][index]" @click="selectPixel"></div></td>
                    <td><div class="pixel" :data-date="`${n.toString().padStart(2, '0')}.12 - ${new Date(12+'/'+n+'/'+yearDate).toLocaleDateString('en-EN', {weekday: 'short'})}`" :data-value="year['december'][index]" @click="selectPixel"></div></td>
                </tr>
            </tbody>
        </table>
    </section>
</template>

<script setup>
const props = defineProps({
    year: Object,
    yearDate: String || Number,
    typeText: String,
    type: String
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
    if(ev.target.dataset.value === undefined){
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
.callendar__type{
    display: block;
    color: #888;
    font-family: "Monospace", sans-serif;
    text-align: center;
    margin-bottom: 2em;
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
}
.pixel--today{
    border-color: #efaa3e;
    border-spacing: 15px;
    box-shadow: 0 0 0 5px #171717, 0 0 0 7px #efaa3e;
}
.pixel--selected{
    border-color: #3e4def;
    border-spacing: 15px;
    box-shadow: 0 0 0 5px #171717, 0 0 0 7px #3e4def;
    transform: scale(1.2);
    position: relative;
    &::after{
        content: attr(data-date);
        white-space: nowrap;
        position: absolute;
        top: -2em;
        left: 50%;
        transform: translateX(-50%);
        background-color: #222;
        font-size: 0.6em;
        padding: 0 1em;
        border-radius: 0.2em;
    }
}

.rate .pixel{
    &[data-value="0"]{
        background-color: transparent;
    }
    &[data-value="1"]{
        background-color: #FF2A2B;
    }
    &[data-value="2"]{
        background-color: #FF772A;
    }
    &[data-value="3"]{
        background-color: #FBFF45;
    }
    &[data-value="4"]{
        background-color: #D4FF2B;
    }
    &[data-value="5"]{
        background-color: #55FF2A;
    }
    &[data-value="x"]{
        background-color: #000;
    }
}
</style>