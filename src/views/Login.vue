<template>
  <form class="login-form">
      <input v-model="username">
      <input v-model="password" type="password">
      <button type="submit" @click.prevent="loginUser">
          Login
      </button>
  </form>
</template>

<style lang="scss" scoped>
.login-form {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    max-width: 300px;
    max-height: 200px;
    > * {
        margin-top: 10px;
    }
}
</style>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
// import HelloWorld from '@/components/HelloWorld.vue'; // @ is an alias to /src

@Component({})
export default class LoginView extends Vue {

    // properties declaration
    private username: string = '';
    private password: string = '';

    private loginUser(): void {
        const username = this.username;
        const password = this.password;

        this.$store.dispatch('getUserToken', { username, password })
            .then(() => {
                this.$store.dispatch('initializeUser')
                    .then(() => {
                        // clear login credentials
                        this.username = '';
                        this.password = '';
                    });
            });
    }
}
</script>
