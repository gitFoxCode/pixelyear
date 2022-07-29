<template>
    <h1>How was the weather today?</h1>
    <span class="description">Mark what the main weather was that day</span>
    <div class="content">
        <span class="content__title">Today's weather was...</span>
        <div class="content__mood">
            <div class="icon">IKONA</div>
            <span class="mood__type" data-value="4">IKONA_TEKST</span>
        </div>
        <div class="content__options">
            PIKSELE
            <!-- <div class="pixel__box" :class="{'selected': (optionPixel.value === currentValue.value)}" @click="changeValue($event)" v-for="optionPixel in optionsValue" :key="optionPixel">
                <div class="icon">{{optionPixel.icon}}</div>
                <div class="pixel" :data-value="optionPixel.value"></div>
            </div> -->
        </div>
    </div>
</template>