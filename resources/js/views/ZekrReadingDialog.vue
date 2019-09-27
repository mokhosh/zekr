<template>
    <v-card>
        <v-card-title class="headline grey lighten-2" primary-title>
            انتخاب تلاوت
        </v-card-title>

        <v-card-text>
            <v-radio-group v-model="selectedReading" @change="setReading">
                <div v-for="reading in readings">
                    <v-radio :value="reading.id">
                        <template v-slot:label>
                            {{ reading.title }}
                        </template>
                    </v-radio>
                </div>
            </v-radio-group>
            <v-form ref="form">
                <v-text-field prepend-icon="add" @click:prepend="addReading"
                              label="تلاوت جدید" v-model="newReading" flat
                              clearable :rules="[rules.required]" :loading="isAdding" />
            </v-form>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
            <v-btn color="secondary" text>
                <v-icon>settings</v-icon>
                مدیریت تلاوت ها
            </v-btn>
            <div class="flex-grow-1"></div>
            <v-btn color="primary" text @click="$emit('closed')">
                خب
            </v-btn>
        </v-card-actions>
    </v-card>
</template>
<script>
    export default {
        name: 'zekr-reading-dialog',
        data() {
            return {
                readings: [],
                selectedReading: null,
                newReading: '',
                isAdding: false,
                isSetting: false,
                rules: {
                    required: value => !!value || 'این فیلد نباید خالی باشد',
                },
            }
        },
        props: [
            'currentReadingId',
        ],
        mounted() {
            this.loadReadings();
            this.selectedReading = this.currentReadingId;
        },
        methods: {
            loadReadings() {
                axios.get('api/readings')
                    .then(result => {
                        this.readings = result.data;
                    })
                    .catch(e => console.log(e))
            },
            addReading() {
                if (this.$refs.form.validate()) {
                    this.isAdding = true;
                    axios.post('api/readings', {'title': this.newReading})
                        .then(() => {
                            this.loadReadings();
                            this.newReading = '';
                        })
                        .catch(e => this.$toast.error(e))
                        .finally(() => this.isAdding = false)
                }
            },
            setReading()
            {
                this.isSetting = true;
                axios.post('api/set-reading', {'reading_id': this.selectedReading})
                        .then(result => {
                            this.$toast.success('تلاوت انتخاب شد');
                            this.$emit('reading-changed');
                        })
                        .catch(e => this.$toast.error(e))
                        .finally(() => this.isSetting = false)
            }
        },
    }
</script>
