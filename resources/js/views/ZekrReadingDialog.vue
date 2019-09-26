<template>
    <v-card>
        <v-card-title class="headline grey lighten-2" primary-title>
            انتخاب تلاوت
        </v-card-title>

        <v-card-text>
            <v-radio-group v-model="selectedReading">
                <div v-for="reading in readings">
                    <v-radio :value="reading.id">
                        <template v-slot:label>
                            {{ reading.title }} (صفحه {{ reading.page_id }})
                        </template>
                    </v-radio>
                </div>
            </v-radio-group>
            <v-btn text><v-icon>add</v-icon> ایجاد تلاوت جدید</v-btn>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
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
        },
    }
</script>
