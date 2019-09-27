<template>
  <v-app>
    <v-content>
      <v-container class="fill-height" fluid>
        <v-row align="center" justify="center">
          <v-col cols="12" sm="8" md="4">
            <v-card dark color="primary">
              <v-toolbar color="primary" dark flat>
                <v-toolbar-title>zekr.ai</v-toolbar-title>
              </v-toolbar>
              <v-card-text>
                <v-form ref="form">
                  <v-text-field filled label="نام" prepend-icon="person" name="name"
                    type="text" :rules="[rules.required]"></v-text-field>

                  <v-text-field filled label="ایمیل" prepend-icon="email" name="email"
                    type="text" :rules="[rules.required, rules.email]"></v-text-field>

                  <v-text-field filled label="گذرواژه" prepend-icon="lock" name="password"
                    :rules="[rules.required, rules.counter]" :append-icon="show ? 'visibility' : 'visibility_off'"
                    :type="show ? 'text' : 'password'" @click:append="show = !show"></v-text-field>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-btn text to="login">ورود</v-btn>
                <div class="flex-grow-1"></div>
                <v-btn color="success" @click="register">ثبت نام</v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
  export default {
    data: () => ({
      show: false,
      rules: {
          required: value => !!value || 'این فیلد نباید خالی باشد',
          counter: value => (!!value && value.length >= 8) || 'حداقل 8 کاراکتر',
          email: value => {
            const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            return pattern.test(value) || 'آدرس ایمیل صحیح نیست'
          },
        },
    }),
    methods: {
      register() {
        if (this.$refs.form.validate()) {
          axios.post('api/register', this.form)
                .then(result => {
                    localStorage.setItem('access_token', result.data.access_token);
                    axios.defaults.headers.common.Authorization = `Bearer ${result.data.access_token}`;
                    this.$emit('logged-in');
                    this.$router.push('/');
                })
                .catch(e => {
                    this.$toast.error('اطلاعات وارد شده صحیح نیست');
                });
        }
      }
    }
  }
</script>
