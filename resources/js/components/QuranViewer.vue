<template>
    <div class="quran-viewer">
        <div class="navigation">
            <div><button @click="currentPageNumber --">قبل</button></div>
            <div v-show="isSelecting">
                <input
                    v-model="currentPageNumber"
                    @blur="isSelecting = false"
                    @keyup.up="currentPageNumber ++"
                    @keyup.down="currentPageNumber --"
                    ref="pageNumberInput"
                    id="pageNumberInput"
                >
            </div>
            <div v-show="! isSelecting" @click="startSelecting">صفحه {{ currentPageNumber | arabic }}</div>
            <div><button @click="currentPageNumber ++">بعد</button></div>
        </div>

        <div class="mushaf">
            <span v-for="verse in page.verses">
                <span v-if="verse.prostration_type" class="prostration_mark">&#x06E9;</span>
                <span v-html="verse.texts[corpusId].text"></span>
                <span class="verse_number">{{ verse.number | arabic | reverse }}&#x06DD;</span>
            </span>
        </div>
    </div>
</template>

<script>
    import axios from 'axios'

    export default {
        data () {
            return {
                page: {},
                currentPageNumber: 1,
                isSelecting: false,
                corpusId: 2
            }
        },
        watch: {
            currentPageNumber (val, old) {
                if (val <= 0 || val > 604) {
                    this.currentPageNumber = old;
                } else {
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
                    })
                    .catch(e => console.log(e));
            },
            startSelecting () {
                this.isSelecting = true;
                this.$nextTick(() => {
                    this.$refs.pageNumberInput.focus();
                    this.$refs.pageNumberInput.select();
                });
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
    .quran-viewer {
        width: 1000px;
        margin: 0 auto;
    }
    .mushaf {
        line-height: 2;
        font-size: 2em;
        text-align: justify;
        text-align-last: center;

        font-feature-settings: "ss12";
        width: 1000px;
    }
    .verse_number {
        color: #3490dc;
    }
    .prostration_mark {
        color: #e3342f;
    }
    .navigation {
        display: flex;
        justify-content: space-around;
        width: 200px;
        margin: 0 auto;
    }
    #pageNumberInput {
        width: 3em;
    }
</style>
