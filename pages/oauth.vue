<template>
    Ładowanie... Proszę czekać :)
</template>

<script setup>
import { useAuth } from '~/store/auth'
const code = useRoute().query
console.log(code)


const rawResponse = await fetch('https://pixelyear.herokuapp.com/api/facebook_login', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(code)
})
console.log(rawResponse)
const response = await rawResponse.json()
console.log(response)
useAuth().login(response)
</script>