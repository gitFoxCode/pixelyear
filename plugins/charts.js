import { Line } from 'vue-chartjs'

export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.vueApp.component('line-chart', {
        extends: Line,
        props: ['data', 'options'],
        mounted () {
            this.renderChart(this.data, this.options)
        }
    })
})