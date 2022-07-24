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
                <tr v-for="(i,index) in 31" :key="i">
                    <th>{{i}}</th>
                    <td><div class="pixel" :data-rate="year[0][index]"></div></td>
                    <td><div class="pixel" :data-rate="year[1][index]"></div></td>
                    <td><div class="pixel" :data-rate="year[2][index]"></div></td>
                    <td><div class="pixel" :data-rate="year[3][index]"></div></td>
                    <td><div class="pixel" :data-rate="year[4][index]"></div></td>
                    <td><div class="pixel" :data-rate="year[5][index]"></div></td>
                    <td><div class="pixel" :data-rate="year[6][index]"></div></td>
                    <td><div class="pixel" :data-rate="year[7][index]"></div></td>
                    <td><div class="pixel" :data-rate="year[8][index]"></div></td>
                    <td><div class="pixel" :data-rate="year[9][index]"></div></td>
                    <td><div class="pixel" :data-rate="year[10][index]"></div></td>
                    <td><div class="pixel" :data-rate="year[11][index]"></div></td>
                </tr>
            </tbody>
        </table>
    </section>
</template>

<script setup>
const pixels = '544520010214111542154413042433003444521244312135530325222132514205053404324210322252004314050145140212002534024201514433553341333545003102153043420453054151524551202321032223433523245450421211234255542312'.padEnd(365, 0)
const months = {
    january: 31,
    get february(){ return this.january + 28 },
    get march(){ return this.february + 31 },
    get april(){ return this.march + 30 },
    get may(){ return this.april + 31 },
    get june(){ return this.may + 30 },
    get july(){ return this.june + 31 },
    get august(){ return this.july + 31 },
    get september(){ return this.august + 30 },
    get october(){ return this.september + 31 },
    get november(){ return this.october + 30 },
    get december(){ return this.november + 31 }
}
const year = [
    pixels.substring(0,months['january']),
    pixels.substring(months['january'], months['february']),
    pixels.substring(months['february'], months['march']),
    pixels.substring(months['march'], months['april']),
    pixels.substring(months['april'], months['may']),
    pixels.substring(months['may'], months['june']),
    pixels.substring(months['june'], months['july']),
    pixels.substring(months['july'], months['august']),
    pixels.substring(months['august'], months['september']),
    pixels.substring(months['september'], months['october']),
    pixels.substring(months['october'], months['november']),
    pixels.substring(months['november'], months['december'])
]

onMounted(()=>{
    const todayPixel = document.querySelector(`tbody tr:nth-of-type(${new Date().getDate()}) td:nth-of-type(${new Date().getMonth()+1}) .pixel`)
    todayPixel.classList.add('pixel--today')
})

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
}
.pixel--today{
    border-color: #efaa3e;
    border-spacing: 15px;
    box-shadow: 0 0 0 5px #171717, 0 0 0 7px #efaa3e;
}
</style>