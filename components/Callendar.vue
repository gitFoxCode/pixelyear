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
                    <td><div class="pixel" :data-date="`${n.toString().padStart(2, '0')}.01 - ${new Date(1+'/'+n+'/'+yearDate).toLocaleDateString('en-EN', {weekday: 'short'})}`" :data-value="yearPixels['january'][index]" @click="selectPixel"></div></td>
                    <td><div class="pixel" :data-date="`${n.toString().padStart(2, '0')}.02 - ${new Date(2+'/'+n+'/'+yearDate).toLocaleDateString('en-EN', {weekday: 'short'})}`" :data-value="yearPixels['february'][index]" @click="selectPixel"></div></td>
                    <td><div class="pixel" :data-date="`${n.toString().padStart(2, '0')}.03 - ${new Date(3+'/'+n+'/'+yearDate).toLocaleDateString('en-EN', {weekday: 'short'})}`" :data-value="yearPixels['march'][index]" @click="selectPixel"></div></td>
                    <td><div class="pixel" :data-date="`${n.toString().padStart(2, '0')}.04 - ${new Date(4+'/'+n+'/'+yearDate).toLocaleDateString('en-EN', {weekday: 'short'})}`" :data-value="yearPixels['april'][index]" @click="selectPixel"></div></td>
                    <td><div class="pixel" :data-date="`${n.toString().padStart(2, '0')}.05 - ${new Date(5+'/'+n+'/'+yearDate).toLocaleDateString('en-EN', {weekday: 'short'})}`" :data-value="yearPixels['may'][index]" @click="selectPixel"></div></td>
                    <td><div class="pixel" :data-date="`${n.toString().padStart(2, '0')}.06 - ${new Date(6+'/'+n+'/'+yearDate).toLocaleDateString('en-EN', {weekday: 'short'})}`" :data-value="yearPixels['june'][index]" @click="selectPixel"></div></td>
                    <td><div class="pixel" :data-date="`${n.toString().padStart(2, '0')}.07 - ${new Date(7+'/'+n+'/'+yearDate).toLocaleDateString('en-EN', {weekday: 'short'})}`" :data-value="yearPixels['july'][index]" @click="selectPixel"></div></td>
                    <td><div class="pixel" :data-date="`${n.toString().padStart(2, '0')}.08 - ${new Date(8+'/'+n+'/'+yearDate).toLocaleDateString('en-EN', {weekday: 'short'})}`" :data-value="yearPixels['august'][index]" @click="selectPixel"></div></td>
                    <td><div class="pixel" :data-date="`${n.toString().padStart(2, '0')}.09 - ${new Date(9+'/'+n+'/'+yearDate).toLocaleDateString('en-EN', {weekday: 'short'})}`" :data-value="yearPixels['september'][index]" @click="selectPixel"></div></td>
                    <td><div class="pixel" :data-date="`${n.toString().padStart(2, '0')}.10 - ${new Date(10+'/'+n+'/'+yearDate).toLocaleDateString('en-EN', {weekday: 'short'})}`" :data-value="yearPixels['october'][index]" @click="selectPixel"></div></td>
                    <td><div class="pixel" :data-date="`${n.toString().padStart(2, '0')}.11 - ${new Date(11+'/'+n+'/'+yearDate).toLocaleDateString('en-EN', {weekday: 'short'})}`" :data-value="yearPixels['november'][index]" @click="selectPixel"></div></td>
                    <td><div class="pixel" :data-date="`${n.toString().padStart(2, '0')}.12 - ${new Date(12+'/'+n+'/'+yearDate).toLocaleDateString('en-EN', {weekday: 'short'})}`" :data-value="yearPixels['december'][index]" @click="selectPixel"></div></td>
                </tr>
            </tbody>
        </table>
    </section>
</template>

<script setup>
const props = defineProps({
    yearPixels: Object,
    yearDate: String | Number,
    typeText: String,
    type: String
})

onMounted(()=>{
    
    const todayPixel = document.querySelector(`tbody tr:nth-of-type(${new Date().getDate()}) td:nth-of-type(${new Date().getMonth()+1}) .pixel`)
    todayPixel.classList.add('pixel--today')

    if(props.type === 'exercises'){
        const classes = ['none', 'pixel--blue', 'pixel--dot', 'pixel--circle', 'pixel--dash', 'pixel--dash-left']

        const pixels = document.querySelectorAll('tbody .pixel')
        pixels.forEach((pixel)=>{
            const pixelValue = pixel.dataset.value
            if(pixelValue != 0 && pixelValue != undefined){
                for(let i = 0; i <= String(pixelValue).length-1; i++){
                    const separatedValue = String(pixelValue)[i]

                    const newDiv = document.createElement('div')
                    newDiv.classList.add('pixel--inner')
                    newDiv.classList.add(classes[separatedValue-1])
                    pixel.appendChild(newDiv)

                    console.log(String(pixelValue)[i])
                }
                console.log(pixelValue)
            }
        })
    }
    if(props.type === "reading"){
        const pixels = document.querySelectorAll('tbody .pixel')
        pixels.forEach((pixel)=>{
            const pages = pixel.dataset.value
            if(pages === 0){
                pixel.dataset.color = "1"
            }
            if(pages >= 10  && pages <= 10){
                pixel.dataset.color = "2"
            }
            if(pages >= 11  && pages <= 20){
                pixel.dataset.color = "3"
            }
            if(pages >= 21  && pages <= 30){
                pixel.dataset.color = "4"
            }
            if(pages >= 31  && pages <= 50){
                pixel.dataset.color = "5"
            }
            if(pages >= 51  && pages <= 70){
                pixel.dataset.color = "6"
            }
            if(pages >= 51  && pages <= 70){
                pixel.dataset.color = "7"
            }
            if(pages >= 51  && pages <= 70){
                pixel.dataset.color = "8"
            }
        })
    }

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
.pixel--inner {
    z-index: 2 !important;
}
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
    position: relative;
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
        color: #eee;
        font-weight: normal;
    }
}
.pixel{
    &[data-value="0"]{
        background-color: transparent;
    }
}
.rate .pixel, .mood .pixel{
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
.weather .pixel{
    &[data-value="1"]{
        background-color: rgb(173, 251, 255);
    }
    &[data-value="2"]{
        background-color: #AA4978;
    }
    &[data-value="3"]{
        background-color: #666D89;
    }
    &[data-value="4"]{
        background-color: #8F8A87;
    }
    &[data-value="5"]{
        background-color: rgb(255, 239, 97);
    }
    &[data-value="6"]{
        background-color: rgb(255, 199, 46);
    }
}
.health .pixel{
    &[data-value="1"]{
        background-color: rgb(107, 243, 255);
    }
    &[data-value="2"]{
        background-color: rgb(44, 252, 196);
    }
    &[data-value="3"]{
        background-color: rgb(48, 140, 252);
    }
    &[data-value="4"]{
        background-color: rgb(83, 34, 241);
    }
}
.anxiety .pixel{
    &[data-value="1"]{
        background-color: #D4FF2B;
    }
    &[data-value="2"]{
        background-color: #FBFF45;
    }
    &[data-value="3"]{
        background-color: #FF772A;
    }
    &[data-value="4"]{
        background-color: #FF2A2B;
    }
}
.reading .pixel{
    &[data-color="1"]{
        background-color: rgb(202, 202, 202);
    }
    &[data-color="2"]{
        background-color: rgb(107, 243, 255);
    }
    &[data-color="3"]{
        background-color: rgb(107, 255, 216);
    }
    &[data-color="4"]{
        background-color: rgb(107, 255, 132);
    }
    &[data-color="5"]{
        background-color: rgb(176, 255, 107);
    }
    &[data-color="6"]{
        background-color: rgb(213, 255, 107);
    }
    &[data-color="7"]{
        background-color: rgb(187, 255, 0);
    }
    &[data-color="8"]{
        background-color: rgb(150, 106, 232);
        box-shadow: rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(150, 106, 232, 0.4) 0px 25px 50px -12px;
    }
}

</style>

<style lang="scss">
    /// TODO: :v-deep(), delete
.exercises .pixel{
    .pixel--inner{
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
    }
    .pixel--blue{
        background-color: rgb(67, 97, 248);
        z-index: -1;
    }
    .pixel--dot::before{
        content: "";
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 5px;
        height: 5px;
        background: #eee;
        border-radius: 50%;
    }
    .pixel--circle::before{
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        border: 2px solid #eee;
        border-radius: 50%;
    }
    .pixel--dash::before{
        content: "";
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 90%;
        height: 0.5em;
        background: #eee;
    }
    .pixel--dash-left::before{
        content: "";
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%) rotate(-45deg);
        width: 90%;
        height: 0.5em;
        background: #eee;
    }
}
</style>