<template>
    <section class="section">
        <TopNav />
        <main>
            <h1 class="title">Reset password</h1>
            <div class="inputs">
                <label class="input__box">
                    <span class="input__title">User email</span>
                    <div class="input__content">
                        <input type="text" readonly v-model="email">
                        <span class="input__icon"> <nuxt-icon name="user"/> </span>
                    </div>
                </label>
                <template v-if="verifyToken">
                    <label class="input__box">
                        <span class="input__title">New password</span>
                        <div class="input__content">
                            <input type="password" placeholder="New password" v-model="password" @keyup="strongCheck">
                            <span class="input__icon"> <nuxt-icon name="lock"/> </span>
                        </div>
                    </label>
                    <label class="input__box">
                        <span class="input__title">New re-password</span>
                        <div class="input__content">
                            <input type="password" placeholder="New password" v-model="repassword">
                            <span class="input__icon"> <nuxt-icon name="lock"/> </span>
                        </div>
                    </label>
                </template>
                <div class="strongcheck" v-if="strongCheckBox.message" :class="{
                    'strongcheck--strong': strongCheckBox.strong,
                    'strongcheck--medium': strongCheckBox.medium,
                    'strongcheck--weak': strongCheckBox.weak}
                    ">{{strongCheckBox.message}}</div>
                <div class="message" v-if="message">{{message}}</div>
                <button type="button" class="btn btn--danger" :class="{'loading': loading}" v-if="!successfullChanged" @click="resetPassword">Reset password</button>
                <button type="button" class="btn" v-if="successfullChanged" @click="navigateTo('/')">Log In</button>
            </div>
        </main> 
    </section>
</template>

<script setup>
import { useAuth } from '~/store/auth'
const verifyToken = useRoute().query.token || false;
const email = useAuth().getUser.email ? ref(useAuth().getUser.email) : ref("")
const loading = ref(false)
let message = ref("")

const password = ref("")
const repassword = ref("")
const strongCheckBox = ref({
    message: "",
    strong: false,
    medium: false,
    weak: false
})
const successfullChanged = ref(false)

// Password strong check
const strongPassword = new RegExp('(?=^.{8,}$)(?=.*\d)(?=.*[!@#$%^&*]+)(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$')
const mediumPassword = new RegExp('((?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{6,}))|((?=.*[a-z])(?=.*[A-Z])(?=.*[^A-Za-z0-9])(?=.{8,}))')
const strongCheck = () =>{
    if( strongPassword.test(password.value) ){
        strongCheckBox.value.message = "Strong password!"
        strongCheckBox.value.strong = true
        strongCheckBox.value.medium = false
        strongCheckBox.value.weak = false
    }else if (mediumPassword.test(password.value)){
        strongCheckBox.value.message = "Medium password!"
        strongCheckBox.value.strong = false
        strongCheckBox.value.medium = true
        strongCheckBox.value.weak = false
    }else{
        strongCheckBox.value.message = "Weak password"
        strongCheckBox.value.strong = false
        strongCheckBox.value.medium = false
        strongCheckBox.value.weak = true
    }
}

console.log(useRoute().query)

const resetPassword = async (ev) =>{
    if(email.value === ""){
        return;
    }
    if(verifyToken){
        ev.target.innerText = ""
        loading.value = true
        const rawResponse = await fetch(`https://pixelyear.herokuapp.com/api/reset_password`, {
            method: 'POST',
            body: JSON.stringify({password: password.value, repassword: repassword.value, token: verifyToken}),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const response = await rawResponse.json()
        loading.value = false
        ev.target.innerText = "Reset password"
        console.log(response)
        if(response.success){
            message.value = "Password changed. Log in again with your new password!"
        }else if (response.error){
            return message.value = response.error
        }else{
            return message.value = "An error occurred, please try again later"
        }
        successfullChanged.value = true
        return; 
    }
    ev.target.innerText = ""
    loading.value = true
    const rawResponse = await fetch(`https://pixelyear.herokuapp.com/api/create_password_reset_token`, {
        method: 'POST',
        body: JSON.stringify({email: email.value}),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    const response = await rawResponse.json()
    console.log(response)
    if(response.success){
        message.value = "Sent an activation link to your email address, if any"
    }else{
        message.value = "An error occurred, please try again later"
    }
    loading.value = false
    ev.target.innerText = "Reset password"

}
</script>

<style lang="scss" scoped>
.message{
    padding: 1em;
    background-color: #222;
    text-align: center;
}
.strongcheck{
    padding-left: 2em;
    position: relative;
    &::before{
        content: "";
        position: absolute;
        left: 0;
        top: 50%;
        transform: translateY(-50%);
        width: 1em;
        height: 1em;
        border-radius: 50%;
        background-color: #fff;
    }
    &.strongcheck--strong::before{
        background-color:rgb(47, 245, 50);
    }
    &.strongcheck--medium::before{
        background-color:rgb(245, 169, 47);
    }
    &.strongcheck--weak::before{
        background-color:rgb(245, 70, 47);
    }
}
.strongcheck--strong{
    color: rgb(47, 245, 50);
}
.strongcheck--medium{
    color: rgb(245, 169, 47);
}
.strongcheck--weak{
    color: rgb(245, 70, 47);
}
main{
    display: flex;
    flex-direction: column;
    align-content: center;
    min-height: calc(100vh - 5em);
    padding: 0 10%;
    padding-top: 5em;
    gap: 2em;
}
.title{
    font-weight: bold;
    text-align: center;
}
.inputs{
    display: flex;
    flex-direction: column;
    width: 90%;
    gap: 2em;
}
.input__title{
    font-weight: bold;
}
.input__content input{
    font-size: 1.2em;
    background-color: transparent;
    border: 2px solid #fff;
    text-indent: 0.5em;
    color: #FFF;
    padding: 0.5em;
    &::placeholder, &::-moz-placeholder{
        color: #ccc;
    }
    flex: 1;
}
.input__icon{
    border: 2px solid #fff;
    width: 10%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: transparent;
    color: #fff;
    border-left: none;
}
.input__content{
    display: flex;
    align-items: stretch;
    width: 100%;
}
.btn{
    padding: 0.9em;
    font-weight: bold;
    border: 2px solid #fff;
    background-color: transparent;
    font-size: 1em;
    color: #fff;
    &.btn--danger{
        color: #FF3636;
        border-color: #FF3636;
    }
    &:empty{
        padding: 1em;
    }
}
</style>