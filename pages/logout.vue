<template>
    
</template>
<script setup>
import { useAuth } from '~/store/auth'

useAuth().logout()
console.log("Wylogowano!")
navigateTo('/')
</script>