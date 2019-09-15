<template>
    <div>
        <el-row type="flex" justify="center" class="navigation">
            <el-select v-model="corpus" size="mini" filterable>
                <el-option
                    v-for="corpus in corpuses"
                    :key="corpus.id"
                    :label="corpus.title"
                    :value="corpus.id - 1">
                </el-option>
            </el-select>
            <el-tooltip content="جزء" placement="bottom">
                <el-input-number v-model="part" :min="1" :max="30" step-strictly size="mini" @change="loadPart"></el-input-number>
            </el-tooltip>
            <el-select v-model="chapter" size="mini" filterable @change="loadChapter">
                <el-option
                    v-for="chapter in chapters"
                    :key="chapter.id"
                    :label="chapter.name"
                    :value="chapter.id">
                </el-option>
            </el-select>
            <el-tooltip content="صفحه" placement="bottom">
                <el-input-number v-model="currentPageNumber" :min="1" :max="604" step-strictly size="mini"></el-input-number>
            </el-tooltip>
        </el-row>

        <el-row type="flex" justify="center">
            <el-col :lg="12" class="mushaf" v-loading="isLoading">
                <div v-for="verse in page.verses" class="verse" :key="verse.id">
                    <div v-if="verse.number === 1" class="chapter-title">
                        <div class="revelation-location">{{ chapters[verse.chapter_id - 1].location}}</div>
                        {{ chapters[verse.chapter_id - 1].name }}
                        <div class="chapter-number">{{ verse.chapter_id | arabic }}</div>
                    </div>
                    <span v-if="verse.prostration_type" class="prostration-mark">&#x06E9;</span>
                    <span v-html="verse.texts[corpus].text"></span>
                    <span class="verse-number">{{ verse.number | arabic | reverse }}&#x06DD;</span>
                </div>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    import axios from 'axios'
    import {parts, chapters} from '../meta.js'

    export default {
        data () {
            return {
                page: {},
                currentPageNumber: 1,
                corpus: 2,
                isLoading: true,
                chapter: 1,
                part: 1,
                chapters,
                parts,
                corpuses: []
            }
        },
        watch: {
            currentPageNumber: 'loadPage'
        },
        mounted() {
            this.loadCorpuses();
            if (window.localStorage.currentPageNumber) {
                this.currentPageNumber = window.localStorage.currentPageNumber;
            } else {
                this.loadPage(this.currentPageNumber);
            }
        },
        methods: {
            loadCorpuses () {
                axios.get('api/corpuses')
                    .then(result => {
                        this.corpuses = result.data;
                    })
                    .catch(e => console.log(e))
            },
            loadPage (page_number) {
                this.isLoading = true;
                axios.get('/api/quran', { params: {page_number} })
                    .then(result => {
                        this.page = result.data;
                        this.isLoading = false;
                        this.chapter = this.page.verses[0].chapter_id;
                        this.part = this.parts.find(el => el.page <= this.currentPageNumber).id;
                        window.localStorage.currentPageNumber = this.currentPageNumber;
                    })
                    .catch(e => this.$message.error(e));
            },
            loadChapter () {
                this.currentPageNumber = this.chapters.find(el => el.id === this.chapter).page;
            },
            loadPart () {
                this.currentPageNumber = this.parts.find(el => el.id === this.part).page;
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
        background: #f8fbfd;
    }
    .verse {
        display: inline;
    }
    .verse-number {
        color: #3490dc;
    }
    .chapter-title {
        border-right: 60px dotted #ddd;
        border-left: 60px dotted #ddd;
        position: relative;
    }
    .revelation-location, .chapter-number {
        position: absolute;
        top: 10px;
        font-size: .7em;
        width: 48px;
        text-align: center;
        color: #636b6f;
    }
    .revelation-location { left: -55px }
    .chapter-number { right: -55px }
    .prostration-mark {
        color: #e3342f;
    }
    .navigation {
        padding: .5em;
        margin-bottom: .5em;
    }
</style>
