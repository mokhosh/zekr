<template>
  <v-app>
    <router-view :user="user" @reading-changed="getUser" />
  </v-app>
</template>

<script>
export default {
  name: "App",
  created() {
    let onGuestPages =
      this.$router.currentRoute.path === "/login" ||
      this.$router.currentRoute.path === "/register";
    let hasAccessToken = localStorage.getItem("access_token");
    if (hasAccessToken && !onGuestPages) {
      this.getUser();
    }
  },
  data() {
    return {
      user: null,
      get guest() {
        return !localStorage.getItem("access_token");
      }
    };
  },
  methods: {
    getUser() {
      axios
        .get("api/user")
        .then(result => {
          this.user = result.data;
        })
        .catch(e => {
          localStorage.removeItem("access_token");
          this.$router.push("/login");
        });
    }
  }
};
</script>
