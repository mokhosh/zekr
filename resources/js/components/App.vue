<template>
    <el-container>
      <el-header>
        <el-menu mode="horizontal" router>
            <el-menu-item v-if="! guest" index="/">قرآن</el-menu-item>
            <el-menu-item v-if="guest" index="/login">ورود</el-menu-item>
            <el-menu-item v-if="guest" index="/register">ثبت نام</el-menu-item>
            <el-menu-item v-if="! guest" index="/logout">خروج</el-menu-item>
        </el-menu>
      </el-header>
      <router-view v-on:logged-in="getUser"></router-view>
      <el-footer>Footer</el-footer>
    </el-container>
</template>

<script>
    export default {
        name: "App",
        created() {
            let onGuestPages = this.$router.currentRoute.path === '/login' || this.$router.currentRoute.path === '/register';
            let hasAccessToken = localStorage.getItem('access_token');
            if (hasAccessToken && ! onGuestPages) {
                this.getUser();
            }
        },
        data() {
            return {
                user: null,
                get guest() {
                    return ! localStorage.getItem('access_token');
                }
            }
        },
        methods: {
            getUser() {
                axios.get('api/user')
                    .then(result => {
                        this.user = result.data;
                    })
                    .catch(e => {
                        localStorage.removeItem('access_token');
                        this.$router.push('/login');
                    });
            }
        }
    }
</script>

<style scoped>

</style>
