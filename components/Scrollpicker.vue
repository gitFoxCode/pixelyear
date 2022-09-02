<template>
    <div class="scroll__wrapper">
        <div class="scroll__item">1</div>
        <div class="scroll__item">2</div>
        <div class="scroll__item active">3</div>
        <div class="scroll__item">4</div>
        <div class="scroll__item">5</div>
        <div class="scroll__item">6</div>
        <div class="scroll__item">7</div>
        <div class="scroll__item">8</div>
        <div class="scroll__item">9</div>
        <div class="scroll__item">10</div>
        <div class="scroll__item">11</div>
        <div class="scroll__item">12</div>
        <div class="scroll__item">13</div>
        <div class="scroll__item">14</div>
        <div class="scroll__item">15</div>
    </div>
</template>

<style lang="scss" scoped>
.scroll__wrapper{
    height: calc((5em) + 7em);
    overflow: hidden;
    user-select: none;
    scroll-snap-align: center;
}
.scroll__wrapper.active{
    border: 1px solid #666;
    cursor: grabbing;
}
.scroll__item{
    padding: 0.5em;
}
.scroll__item.active{
    background-color: #666;
    scroll-snap-type: y mandatory;
}
</style>

<script setup>
onMounted(()=>{
    const scroller = document.querySelector('.scroll__wrapper')
    let isDown = false
    let startY
    let scrollTop

    scroller.addEventListener('mousedown', (ev)=>{
        isDown = true
        scroller.classList.add('active')
        startY = ev.pageY 
        scrollTop = scroller.scrollTop
    })
    scroller.addEventListener('mouseleave', ()=>{
        isDown = false
        scroller.classList.remove('active')
        
    })
    scroller.addEventListener('mouseup', ()=>{
        isDown = false
        scroller.classList.remove('active')
        
    })
    scroller.addEventListener('mousemove', (ev)=>{
        if(!isDown) return;
        ev.preventDefault()

        const y = ev.pageY
        const howFar = ((y - startY) * 3)
        console.log({y, startY, howFar})
        scroller.scrollTop = scrollTop - howFar

        console.log(Math.round(scroller.scrollTop/32) +1)
    })
})
</script>