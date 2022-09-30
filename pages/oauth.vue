<template>
    Loading... Please wait...
</template>

<script setup>
import { useAuth } from '~/store/auth'
const code = useRoute().query


/* Facebook */
const rawResponse = await fetch('https://pixelyear.herokuapp.com/api/facebook_login', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(code)
})
const response = await rawResponse.json()
useAuth().login(response)
</script>