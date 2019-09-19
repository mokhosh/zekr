<template>
    <div>
        <el-form ref="form" :rules="rules" :model="form" label-width="120px">
          <el-form-item label="نام" prop="name">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
            <el-form-item label="ایمیل" prop="email">
            <el-input v-model="form.email"></el-input>
          </el-form-item>
          <el-form-item label="گذرواژه" prop="password">
            <el-input v-model="form.password" show-password></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="register">ثبت نام</el-button>
          </el-form-item>
        </el-form>
    </div>
</template>

<script>
    export default {
        name: "Register",
        data() {
            return {
                form: {
                    name: '',
                    email: '',
                    password: ''
                },
                rules: {
                    name: [
                        { required: true, min: 3, message: 'نام شما باید بیشتر از 3 حرف داشته باشد', trigger: 'blur' }
                    ],
                    email: [
                        { required: true, message: 'لطفا ایمیل خود را وارد کنید', trigger: 'blur' },
                        { type: 'email', required: true, message: 'ایمیل وارد شده صحیح نیست', trigger: 'blur' },
                    ],
                    password: [
                        { required: true, min: 8, message: 'گذرواژه باید بیش از 7 کاراکتر داشته باشد', trigger: 'blur' }
                    ]
                }
            }
        },
        methods: {
            register () {
                this.$refs['form'].validate((valid) => {
                  if (valid) {
                    axios.post('api/register', this.form)
                        .then(result => {
                            localStorage.setItem('access_token', result.data.access_token);
                            axios.defaults.headers.common['Authorization'] = 'Bearer ' + result.data.access_token;
                            this.$emit('logged-in');
                            this.$router.push('/');
                        })
                        .catch(e => {
                            this.$message.error('خطای سرور، با مدیر تماس بگیرید');
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
