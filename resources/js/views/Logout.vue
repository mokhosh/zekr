<template></template>
<script>
    export default {
        name: "Logout",
        beforeCreate() {
            axios.post('api/logout')
                .then(result => {
                    localStorage.removeItem('access_token');
                    this.$router.push('/login');
                })
                .catch(e => {
                    this.$message.error('خروج با مشکل مواجه شد، دوباره تلاش کنید')
                });
        }
    }
</script>
