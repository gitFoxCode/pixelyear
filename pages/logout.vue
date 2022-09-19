<template>
    
</template>
<script setup>
import { useAuth } from '~/store/auth'

console.log("Wylogowano!")
useAuth().logout()
</script>