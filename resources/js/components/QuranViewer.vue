<template>
    <div>
        <el-row type="flex" justify="center" class="navigation">
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
                chapter: 1,
                chapters: [{id:1,name:"الفاتحة",page:1},{id:2,name:"البقرة",page:2},{id:3,name:"آل عمران",page:50},{id:4,name:"النساء",page:77},{id:5,name:"المائدة",page:106},{id:6,name:"الأنعام",page:128},{id:7,name:"الأعراف",page:151},{id:8,name:"الأنفال",page:177},{id:9,name:"التوبة",page:187},{id:10,name:"يونس",page:208},{id:11,name:"هود",page:221},{id:12,name:"يوسف",page:235},{id:13,name:"الرعد",page:249},{id:14,name:"ابراهيم",page:255},{id:15,name:"الحجر",page:262},{id:16,name:"النحل",page:267},{id:17,name:"الإسراء",page:282},{id:18,name:"الكهف",page:293},{id:19,name:"مريم",page:305},{id:20,name:"طه",page:312},{id:21,name:"الأنبياء",page:322},{id:22,name:"الحج",page:332},{id:23,name:"المؤمنون",page:342},{id:24,name:"النور",page:350},{id:25,name:"الفرقان",page:359},{id:26,name:"الشعراء",page:367},{id:27,name:"النمل",page:377},{id:28,name:"القصص",page:385},{id:29,name:"العنكبوت",page:396},{id:30,name:"الروم",page:404},{id:31,name:"لقمان",page:411},{id:32,name:"السجدة",page:415},{id:33,name:"الأحزاب",page:418},{id:34,name:"سبإ",page:428},{id:35,name:"فاطر",page:434},{id:36,name:"يس",page:440},{id:37,name:"الصافات",page:446},{id:38,name:"ص",page:453},{id:39,name:"الزمر",page:458},{id:40,name:"غافر",page:467},{id:41,name:"فصلت",page:477},{id:42,name:"الشورى",page:483},{id:43,name:"الزخرف",page:489},{id:44,name:"الدخان",page:496},{id:45,name:"الجاثية",page:499},{id:46,name:"الأحقاف",page:502},{id:47,name:"محمد",page:507},{id:48,name:"الفتح",page:511},{id:49,name:"الحجرات",page:515},{id:50,name:"ق",page:518},{id:51,name:"الذاريات",page:520},{id:52,name:"الطور",page:523},{id:53,name:"النجم",page:526},{id:54,name:"القمر",page:528},{id:55,name:"الرحمن",page:531},{id:56,name:"الواقعة",page:534},{id:57,name:"الحديد",page:537},{id:58,name:"المجادلة",page:542},{id:59,name:"الحشر",page:545},{id:60,name:"الممتحنة",page:549},{id:61,name:"الصف",page:551},{id:62,name:"الجمعة",page:553},{id:63,name:"المنافقون",page:554},{id:64,name:"التغابن",page:556},{id:65,name:"الطلاق",page:558},{id:66,name:"التحريم",page:560},{id:67,name:"الملك",page:562},{id:68,name:"القلم",page:564},{id:69,name:"الحاقة",page:566},{id:70,name:"المعارج",page:568},{id:71,name:"نوح",page:570},{id:72,name:"الجن",page:572},{id:73,name:"المزمل",page:574},{id:74,name:"المدثر",page:575},{id:75,name:"القيامة",page:577},{id:76,name:"الانسان",page:578},{id:77,name:"المرسلات",page:580},{id:78,name:"النبإ",page:582},{id:79,name:"النازعات",page:583},{id:80,name:"عبس",page:585},{id:81,name:"التكوير",page:586},{id:82,name:"الإنفطار",page:587},{id:83,name:"المطففين",page:587},{id:84,name:"الإنشقاق",page:589},{id:85,name:"البروج",page:590},{id:86,name:"الطارق",page:591},{id:87,name:"الأعلى",page:591},{id:88,name:"الغاشية",page:592},{id:89,name:"الفجر",page:593},{id:90,name:"البلد",page:594},{id:91,name:"الشمس",page:595},{id:92,name:"الليل",page:595},{id:93,name:"الضحى",page:596},{id:94,name:"الشرح",page:596},{id:95,name:"التين",page:597},{id:96,name:"العلق",page:597},{id:97,name:"القدر",page:598},{id:98,name:"البينة",page:598},{id:99,name:"الزلزلة",page:599},{id:100,name:"العاديات",page:599},{id:101,name:"القارعة",page:600},{id:102,name:"التكاثر",page:600},{id:103,name:"العصر",page:601},{id:104,name:"الهمزة",page:601},{id:105,name:"الفيل",page:601},{id:106,name:"قريش",page:602},{id:107,name:"الماعون",page:602},{id:108,name:"الكوثر",page:602},{id:109,name:"الكافرون",page:603},{id:110,name:"النصر",page:603},{id:111,name:"المسد",page:603},{id:112,name:"الإخلاص",page:604},{id:113,name:"الفلق",page:604},{id:114,name:"الناس",page:604}],
                part: 1,
                parts:[{id:30,page:582},{id:29,page:562},{id:28,page:542},{id:27,page:522},{id:26,page:502},{id:25,page:482},{id:24,page:462},{id:23,page:442},{id:22,page:422},{id:21,page:402},{id:20,page:382},{id:19,page:362},{id:18,page:342},{id:17,page:322},{id:16,page:302},{id:15,page:282},{id:14,page:262},{id:13,page:242},{id:12,page:222},{id:11,page:201},{id:10,page:182},{id:9,page:162},{id:8,page:142},{id:7,page:121},{id:6,page:102},{id:5,page:82},{id:4,page:62},{id:3,page:42},{id:2,page:22},{id:1,page:1}]
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
    .verse_number {
        color: #3490dc;
    }
    .prostration_mark {
        color: #e3342f;
    }
    .navigation {
        padding: .5em;
        margin-bottom: .5em;
    }
</style>
