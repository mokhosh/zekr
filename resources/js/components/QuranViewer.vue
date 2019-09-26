<template>
    <v-col md="8" lg="6">
        <v-card class="mx-auto" style="margin-top: -84px">
            <!--<v-card-title><v-btn>{{ title }}</v-btn></v-card-title>-->
            <v-card-text class="pt-0">
                <v-row type="flex" justify="center" class="pt-0" gutter="10">
                    <v-col cols="auto">
                        <v-btn @click="$emit('select-reading')">{{ title }}</v-btn>
                    </v-col>
                    <v-col>
                        <v-autocomplete
                            :items="chapters" color="white" item-text="name" item-value="id" dense height="20"
                            v-model="chapter" label="سوره" @change="loadChapter" :filter="chapterFilter"/>
                    </v-col>
                    <v-col cols="auto">
                        <v-text-field label="جزء" :value="part" readonly flat style="width:2em" height="20" />
                    </v-col>
                </v-row>
                <v-row type="flex" justify="center">
                    <v-slider
                        @change="sliderChanged" :value="pageNumber"
                        :ticks="false" :max="604" :min="1" step="1" thumb-label="always" thumb-size="28" thumb-color="accent"
                        append-icon="navigate_before" prepend-icon="navigate_next"
                        @click:append="nextPage" @click:prepend="prevPage"/>
                </v-row>

                <v-row type="flex" justify="center">
                    <v-card flat class="mushaf" :loading="isLoading">
                        <v-card-text>
                            <div v-for="verse in page.verses" class="verse" :key="verse.id">
                                <div v-if="verse.number === 1" class="chapter-title">
                                    <div class="revelation-location">{{ chapters[verse.chapter_id - 1].location}}</div>
                                    {{ chapters[verse.chapter_id - 1].name }}
                                    <div class="chapter-number">{{ verse.chapter_id | arabic }}</div>
                                </div>
                                <span v-if="verse.prostration_type" class="prostration-mark">&#x06E9;</span>
                                <span v-html="verse.texts[corpus - 1].text"></span>
                                <span class="verse-number">{{ verse.number | arabic | reverse }}&#x06DD;</span>
                            </div>
                        </v-card-text>
                    </v-card>
                </v-row>
            </v-card-text>
            <!--<v-card-actions>
                <v-btn text>Click</v-btn>
            </v-card-actions>-->
        </v-card>
    </v-col>
</template>

<script>
    import {parts, chapters} from '../meta.js'

    export default {
        data() {
            return {
                page: {},
                pageNumber: null,
                isLoading: true,
                chapter: 1,
                part: 1,
                chapters,
                parts,
            }
        },
        watch: {
            pageNumber: 'loadPage'
        },
        props: [
            'initialPageNumber',
            'title',
            'corpus'
        ],
        mounted() {
            this.pageNumber = this.initialPageNumber;
        },
        methods: {
            loadPage(page_number) {
                this.isLoading = true;
                axios.get('/api/quran', {params: {page_number}})
                    .then(result => {
                        this.page = result.data;
                        this.isLoading = false;
                        this.chapter = this.page.verses[0].chapter_id;
                        this.part = this.parts.find(el => el.page <= this.pageNumber).id;
                    })
                    .catch(e => this.$toast.error(e));
            },
            loadChapter() {
                this.pageNumber = this.chapters.find(el => el.id == this.chapter).page;
            },
            loadPart() {
                this.pageNumber = this.parts.find(el => el.id == this.part).page;
            },
            chapterFilter(item, queryText) {
                const chapterName = this.simplify(item.name);
                const searchText = this.simplify(queryText);

                return chapterName.indexOf(searchText) > -1;
            },
            simplify(str) {
                return str.replace('أ', 'ا').replace('إ', 'ا').replace('ي', 'ی').replace('ة', 'ه');
            },
            sliderChanged(value) {
                this.pageNumber = value;
            },
            nextPage() {
                this.pageNumber = Math.min(this.pageNumber + 1, 604);
            },
            prevPage() {
                this.pageNumber = Math.max(this.pageNumber - 1, 1);
            },
        },
        filters: {
            arabic(value) {
                if (!value) return '';
                value = value.toString();
                return value.replace(/\d/g, d => String.fromCharCode('0x066' + d));
            },
            reverse(value) {
                if (!value) return '';
                value = value.toString();
                return value.split('').reverse().join('');
            }
        }
    }
</script>

<style scoped>
    .mushaf {
        text-align: justify;
        text-align-last: center;

        font-feature-settings: "ss12";
    }

    .verse {
        display: inline;

        font-family: 'Bustani', sans-serif;

        color: #000;
        line-height: 2.2;
        font-size: 2em;
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

    .revelation-location {
        left: -55px
    }

    .chapter-number {
        right: -55px
    }

    .prostration-mark {
        color: #e3342f;
    }
</style>
