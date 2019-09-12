<template>
    <div>
        <el-row type="flex" justify="center" class="navigation">
            <el-input-number v-model="currentPageNumber" :min="1" :max="604" step-strictly="true" size="mini"></el-input-number>
        </el-row>

        <el-row type="flex" justify="center">
            <el-col :lg="12" class="mushaf" v-loading="isLoading">
                <span v-for="verse in page.verses">
                    <span v-if="verse.prostration_type" class="prostration_mark">&#x06E9;</span>
                    <span v-html="verse.texts[corpusId].text"></span>
                    <span class="verse_number">{{ verse.number | arabic | reverse }}&#x06DD;</span>
                </span>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    import axios from 'axios'

    export default {
        data () {
            return {
                page: {},
                currentPageNumber: 1,
                corpusId: 2,
                isLoading: true,
            }
        },
        watch: {
            currentPageNumber (val, old) {
                if (val <= 0 || val > 604) {
                    this.currentPageNumber = old;
                } else {
                    this.isLoading = true;
                    this.loadPage(val);
                }
            }
        },
        mounted() {
            if (window.localStorage.currentPageNumber) {
                this.currentPageNumber = window.localStorage.currentPageNumber;
            } else {
                this.loadPage(this.currentPageNumber);
            }
        },
        methods: {
            loadPage (page_number) {
                axios.get('/api/quran', { params: {page_number} })
                    .then(result => {
                        this.page = result.data;
                        window.localStorage.currentPageNumber = this.currentPageNumber;
                        this.isLoading = false;
                    })
                    .catch(e => this.$message.error(e));
            }
        },
        filters: {
            arabic (value) {
                if (!value) return '';
                value = value.toString();
                return value.replace(/\d/g, d => String.fromCharCode('0x066'+d));
            },
            reverse (value) {
                if (!value) return '';
                value = value.toString();
                return value.split('').reverse().join('');
            }
        }
    }
</script>

<style scoped>
    .mushaf {
        font-family: 'Bustani', sans-serif;

        line-height: 2;
        font-size: 2em;
        text-align: justify;
        text-align-last: center;

        font-feature-settings: "ss12";
        padding: .5em;
        border: 1px solid #ddd;
        border-radius: 4px;
        background: #f6f6f6;
    }
    .verse_number {
        color: #3490dc;
    }
    .prostration_mark {
        color: #e3342f;
    }
</style>
