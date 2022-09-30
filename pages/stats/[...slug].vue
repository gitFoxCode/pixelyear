<template>
    <section class="section">
        <TopNav goBack="/stats"/>
        <main v-if="$route.params.slug.length === 0">
           Ogólne statystyki tutaj...
        </main>
        <main v-if="$route.params.slug.length === 1">
           Ogólne statystyki na rok {{ year }}
        </main>
        <main v-if="$route.params.slug.length === 2">
           Ogólne statystyki na rok XXXX dla czegostam
           <Callendar 
           :yearDate="year"
           :yearPixels="yearPixels"
           :type="category"
           typeText="That's how much exercise you've done this year"/>

           <categoryInput :apiValue="apiValue.value" @emitSelected="changeValue" v-if="category !== 'rate'"/>
        </main>
        <main v-else>
            Error
        </main>
    </section>
</template>

<script setup lang="ts">
const error = ref(null)
const route = useRoute()
const year = Number(route.params.slug[0]) || null
const category = String(route.params.slug[1]).toLowerCase() || null 
const yearPixels = ref(null)
const categoryInput = shallowRef(null) /// TODELETE

const apiValue = ref("0")

const changeValue = async (ev)=>{
    const selected: HTMLElement = document.querySelector('.pixel--selected') || document.querySelector('.pixel--today')
    const date = `${year}-${selected.dataset.date.replace(/ -.+/, '').split('.').reverse().join('-')}`

    const rawResponse = await useApi(`${year}/${category}`, {method: 'PATCH', token: true, body: {
        date,
        pixel_values: ev.value
    }})

    const response = await rawResponse.json()
    // if(response.hasOwnProperty('success')){
        selected.dataset.value = ev.value
        if(category === "reading"){
            selected.dataset.color = ev.color
        }
    // }else{
        //error.value = response.error
    //}
    console.log(response)
}

// Available categories 
const CATEGORIES = ['rate', 'anxiety', 'mood', 'exercises', 'reading', 'weather', 'health']



if(route.params.slug.length >= 1){
    verifyYear(year)
}
if(route.params.slug.length >= 2){
    verifyCategory(category)
    const rawResponse = await useApi(`${year}/${category}`, { token: true })
    console.log(rawResponse)
    const response = await rawResponse.json()
    console.log(response)
    yearPixels.value = response

    /* Dynamic component */
    if(category !== "rate"){
        const categoryNameImport = `${category.charAt(0).toUpperCase() + category.slice(1)}` 
        categoryInput.value = (await import(`../../components/categories/inputs/${categoryNameImport}.vue`)).default
    }
    /* ----------------- */
}

async function verifyYear(year: any){
    if(isNaN(year) && typeof year == 'number' || year === 0){
        return location.href = '/stats'
    }
}
async function verifyCategory(category: any){
    if(!isNaN(Number(category)) || typeof category !== 'string'){
        return location.href = '/stats'
    }
    if(!CATEGORIES.includes(category)){
        return location.href = '/stats'
    }
}
</script>