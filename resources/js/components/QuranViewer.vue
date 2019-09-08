<template>
    <div>
        <div>صفحه {{ page.id }}</div>
        <div class="mushaf">
            <span v-for="verse in page.verses">{{ verse.texts[0].text }} <span class="verse_number">({{ verse.number }})</span> </span>
        </div>
    </div>
</template>

<script>
    import axios from 'axios'

    export default {
        data () {
            return {
                page: {},
            }
        },
        mounted() {
            axios.get('/api/quran?page_number=30')
                .then(result => { this.page = result.data })
                .catch(e => console.log(e))
        }
    }
</script>

<style scoped>
    .mushaf {
        line-height: 2;
        font-size: 2em;
        text-align: justify;
        text-align-last: center;
    }
    .verse_number {
        color: #ed8936;
    }
</style>
