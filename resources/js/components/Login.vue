<template>
    <div>
        <el-form ref="form" :rules="rules" :model="form" label-width="120px">
          <el-form-item label="ایمیل" prop="username">
            <el-input v-model="form.username"></el-input>
          </el-form-item>
            <el-form-item label="گذرواژه" prop="password">
            <el-input v-model="form.password" show-password></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="login">ورود</el-button>
          </el-form-item>
        </el-form>
    </div>
</template>

<script>
    export default {
        name: "Login",
        data() {
            return {
                form: {
                    username: '',
                    password: ''
                },
                rules: {
                    username: [
                        { required: true, message: 'لطفا ایمیل خود را وارد کنید', trigger: 'blur' },
                        { type: 'email', required: true, message: 'ایمیل وارد شده صحیح نیست', trigger: 'blur' },
                    ],
                    password: [
                        { required:true, message: 'لطفا گذرواژه خود را وارد کنید', trigger: 'blur' }
                    ]
                }
            }
        },
        methods: {
            login () {
                this.$refs['form'].validate((valid) => {
                  if (valid) {
                    axios.post('api/login', this.form)
                        .then(result => {
                            localStorage.setItem('access_token', result.data.access_token);
                            axios.defaults.headers.common['Authorization'] = 'Bearer ' + result.data.access_token;
                            this.$emit('logged-in');
                            this.$router.push('/');
                        })
                        .catch(e => {
                            this.$message.error('اطلاعات وارد شده صحیح نیست');
                        })
                  } else {
                    return false;
                  }
                });
            }
        }
    }
</script>

<style scoped>

</style>
