(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[1],{

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vuetify-loader/lib/loader.js!./node_modules/vue-loader/lib/index.js?!./resources/js/components/QuranViewer.vue?vue&type=script&lang=js&":
/*!******************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vuetify-loader/lib/loader.js!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/QuranViewer.vue?vue&type=script&lang=js& ***!
  \******************************************************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _meta_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../meta.js */ "./resources/js/meta.js");
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["default"] = ({
  data: function data() {
    return {
      page: {},
      pageNumber: null,
      isLoading: true,
      chapter: 1,
      part: 1,
      chapters: _meta_js__WEBPACK_IMPORTED_MODULE_0__["chapters"],
      parts: _meta_js__WEBPACK_IMPORTED_MODULE_0__["parts"]
    };
  },
  watch: {
    pageNumber: 'loadPage',
    initialPageNumber: 'reload'
  },
  props: ['initialPageNumber', 'title', 'corpus'],
  mounted: function mounted() {
    this.reload();
  },
  methods: {
    loadPage: function loadPage(page_number) {
      var _this = this;

      this.isLoading = true;
      axios.get('/api/quran', {
        params: {
          page_number: page_number
        }
      }).then(function (result) {
        _this.page = result.data;
        _this.isLoading = false;
        _this.chapter = _this.page.verses[0].chapter_id;
        _this.part = _this.parts.find(function (el) {
          return el.page <= _this.pageNumber;
        }).id;
      })["catch"](function (e) {
        return _this.$toast.error(e);
      });
    },
    loadChapter: function loadChapter() {
      var _this2 = this;

      this.pageNumber = this.chapters.find(function (el) {
        return el.id == _this2.chapter;
      }).page;
    },
    loadPart: function loadPart() {
      var _this3 = this;

      this.pageNumber = this.parts.find(function (el) {
        return el.id == _this3.part;
      }).page;
    },
    chapterFilter: function chapterFilter(item, queryText) {
      var chapterName = this.simplify(item.name);
      var searchText = this.simplify(queryText);
      return chapterName.indexOf(searchText) > -1;
    },
    simplify: function simplify(str) {
      return str.replace('أ', 'ا').replace('إ', 'ا').replace('ي', 'ی').replace('ة', 'ه');
    },
    sliderChanged: function sliderChanged(value) {
      this.pageNumber = value;
    },
    nextPage: function nextPage() {
      this.pageNumber = Math.min(this.pageNumber + 1, 604);
    },
    prevPage: function prevPage() {
      this.pageNumber = Math.max(this.pageNumber - 1, 1);
    },
    reload: function reload() {
      this.pageNumber = this.initialPageNumber;
    }
  },
  filters: {
    arabic: function arabic(value) {
      if (!value) return '';
      value = value.toString();
      return value.replace(/\d/g, function (d) {
        return String.fromCharCode('0x066' + d);
      });
    },
    reverse: function reverse(value) {
      if (!value) return '';
      value = value.toString();
      return value.split('').reverse().join('');
    }
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vuetify-loader/lib/loader.js!./node_modules/vue-loader/lib/index.js?!./resources/js/views/Home.vue?vue&type=script&lang=js&":
/*!******************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vuetify-loader/lib/loader.js!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/views/Home.vue?vue&type=script&lang=js& ***!
  \******************************************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _components_QuranViewer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../components/QuranViewer */ "./resources/js/components/QuranViewer.vue");
/* harmony import */ var _ZekrReadingDialog__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ZekrReadingDialog */ "./resources/js/views/ZekrReadingDialog.vue");
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//


/* harmony default export */ __webpack_exports__["default"] = ({
  mounted: function mounted() {
    this.loadCorpuses();
  },
  data: function data() {
    return {
      corpuses: [],
      corpus: 3,
      readingDialog: false,
      drawer: false,
      items: [{
        icon: "lightbulb_outline",
        text: "Notes"
      }, {
        icon: "touch_app",
        text: "Reminders"
      }, {
        divider: true
      }, {
        heading: "Labels"
      }, {
        icon: "add",
        text: "Create new label"
      }, {
        divider: true
      }, {
        icon: "settings",
        text: "Settings"
      }, {
        icon: "chat_bubble",
        text: "Trash"
      }, {
        icon: "help",
        text: "Help"
      }]
    };
  },
  methods: {
    loadCorpuses: function loadCorpuses() {
      var _this = this;

      axios.get('api/corpuses').then(function (result) {
        _this.corpuses = result.data;
      })["catch"](function (e) {
        return console.log(e);
      });
    },
    readingChanged: function readingChanged() {
      this.$emit('reading-changed');
    }
  },
  components: {
    ZekrReadingDialog: _ZekrReadingDialog__WEBPACK_IMPORTED_MODULE_1__["default"],
    QuranViewer: _components_QuranViewer__WEBPACK_IMPORTED_MODULE_0__["default"]
  },
  props: ['user']
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vuetify-loader/lib/loader.js!./node_modules/vue-loader/lib/index.js?!./resources/js/views/ZekrReadingDialog.vue?vue&type=script&lang=js&":
/*!*******************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vuetify-loader/lib/loader.js!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/views/ZekrReadingDialog.vue?vue&type=script&lang=js& ***!
  \*******************************************************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
/* harmony default export */ __webpack_exports__["default"] = ({
  name: 'zekr-reading-dialog',
  data: function data() {
    return {
      readings: [],
      selectedReading: null,
      newReading: '',
      isAdding: false,
      isSetting: false,
      rules: {
        required: function required(value) {
          return !!value || 'این فیلد نباید خالی باشد';
        }
      }
    };
  },
  props: ['currentReadingId'],
  mounted: function mounted() {
    this.loadReadings();
    this.selectedReading = this.currentReadingId;
  },
  methods: {
    loadReadings: function loadReadings() {
      var _this = this;

      axios.get('api/readings').then(function (result) {
        _this.readings = result.data;
      })["catch"](function (e) {
        return console.log(e);
      });
    },
    addReading: function addReading() {
      var _this2 = this;

      if (this.$refs.form.validate()) {
        this.isAdding = true;
        axios.post('api/readings', {
          'title': this.newReading
        }).then(function () {
          _this2.loadReadings();

          _this2.newReading = '';
        })["catch"](function (e) {
          return _this2.$toast.error(e);
        })["finally"](function () {
          return _this2.isAdding = false;
        });
      }
    },
    setReading: function setReading() {
      var _this3 = this;

      this.isSetting = true;
      axios.post('api/set-reading', {
        'reading_id': this.selectedReading
      }).then(function (result) {
        _this3.$toast.success('تلاوت انتخاب شد');

        _this3.$emit('reading-changed');
      })["catch"](function (e) {
        return _this3.$toast.error(e);
      })["finally"](function () {
        return _this3.isSetting = false;
      });
    }
  }
});

/***/ }),

/***/ "./node_modules/css-loader/index.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/vuetify-loader/lib/loader.js!./node_modules/vue-loader/lib/index.js?!./resources/js/components/QuranViewer.vue?vue&type=style&index=0&id=102119d2&scoped=true&lang=css&":
/*!*************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader??ref--6-2!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--6-3!./node_modules/vuetify-loader/lib/loader.js!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/QuranViewer.vue?vue&type=style&index=0&id=102119d2&scoped=true&lang=css& ***!
  \*************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../node_modules/css-loader/lib/css-base.js */ "./node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "\n.mushaf[data-v-102119d2] {\n    text-align: justify;\n    -moz-text-align-last: center;\n         text-align-last: center;\n\n    font-feature-settings: \"ss12\";\n}\n.verse[data-v-102119d2] {\n    display: inline;\n\n    font-family: 'Bustani', sans-serif;\n\n    color: #000;\n    line-height: 2.2;\n    font-size: 2em;\n}\n.verse-number[data-v-102119d2] {\n    color: #3490dc;\n}\n.chapter-title[data-v-102119d2] {\n    border-right: 60px dotted #ddd;\n    border-left: 60px dotted #ddd;\n    position: relative;\n}\n.revelation-location[data-v-102119d2], .chapter-number[data-v-102119d2] {\n    position: absolute;\n    top: 10px;\n    font-size: .7em;\n    width: 48px;\n    text-align: center;\n    color: #636b6f;\n}\n.revelation-location[data-v-102119d2] {\n    left: -55px\n}\n.chapter-number[data-v-102119d2] {\n    right: -55px\n}\n.prostration-mark[data-v-102119d2] {\n    color: #e3342f;\n}\n", ""]);

// exports


/***/ }),

/***/ "./node_modules/css-loader/index.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/vuetify-loader/lib/loader.js!./node_modules/vue-loader/lib/index.js?!./resources/js/views/Home.vue?vue&type=style&index=0&lang=css&":
/*!*************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader??ref--6-2!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--6-3!./node_modules/vuetify-loader/lib/loader.js!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/views/Home.vue?vue&type=style&index=0&lang=css& ***!
  \*************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../node_modules/css-loader/lib/css-base.js */ "./node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "\n.v-navigation-drawer__border {\n    display: none;\n}\n", ""]);

// exports


/***/ }),

/***/ "./node_modules/extract-text-webpack-plugin/dist/loader.js?!./node_modules/style-loader/index.js!./node_modules/css-loader/index.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/vuetify-loader/lib/loader.js!./node_modules/vue-loader/lib/index.js?!./resources/js/components/QuranViewer.vue?vue&type=style&index=0&id=102119d2&scoped=true&lang=css&":
/*!*************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/extract-text-webpack-plugin/dist/loader.js??ref--6-0!./node_modules/style-loader!./node_modules/css-loader??ref--6-2!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--6-3!./node_modules/vuetify-loader/lib/loader.js!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/QuranViewer.vue?vue&type=style&index=0&id=102119d2&scoped=true&lang=css& ***!
  \*************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../../node_modules/css-loader??ref--6-2!../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../node_modules/postcss-loader/src??ref--6-3!../../../node_modules/vuetify-loader/lib/loader.js!../../../node_modules/vue-loader/lib??vue-loader-options!./QuranViewer.vue?vue&type=style&index=0&id=102119d2&scoped=true&lang=css& */ "./node_modules/css-loader/index.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/vuetify-loader/lib/loader.js!./node_modules/vue-loader/lib/index.js?!./resources/js/components/QuranViewer.vue?vue&type=style&index=0&id=102119d2&scoped=true&lang=css&");

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(/*! ../../../node_modules/style-loader/lib/addStyles.js */ "./node_modules/style-loader/lib/addStyles.js")(content, options);

if(content.locals) module.exports = content.locals;

if(false) {}

/***/ }),

/***/ "./node_modules/extract-text-webpack-plugin/dist/loader.js?!./node_modules/style-loader/index.js!./node_modules/css-loader/index.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/vuetify-loader/lib/loader.js!./node_modules/vue-loader/lib/index.js?!./resources/js/views/Home.vue?vue&type=style&index=0&lang=css&":
/*!*************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/extract-text-webpack-plugin/dist/loader.js??ref--6-0!./node_modules/style-loader!./node_modules/css-loader??ref--6-2!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--6-3!./node_modules/vuetify-loader/lib/loader.js!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/views/Home.vue?vue&type=style&index=0&lang=css& ***!
  \*************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../../node_modules/css-loader??ref--6-2!../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../node_modules/postcss-loader/src??ref--6-3!../../../node_modules/vuetify-loader/lib/loader.js!../../../node_modules/vue-loader/lib??vue-loader-options!./Home.vue?vue&type=style&index=0&lang=css& */ "./node_modules/css-loader/index.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/vuetify-loader/lib/loader.js!./node_modules/vue-loader/lib/index.js?!./resources/js/views/Home.vue?vue&type=style&index=0&lang=css&");

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(/*! ../../../node_modules/style-loader/lib/addStyles.js */ "./node_modules/style-loader/lib/addStyles.js")(content, options);

if(content.locals) module.exports = content.locals;

if(false) {}

/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vuetify-loader/lib/loader.js!./node_modules/vue-loader/lib/index.js?!./resources/js/components/QuranViewer.vue?vue&type=template&id=102119d2&scoped=true&":
/*!**********************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vuetify-loader/lib/loader.js!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/QuranViewer.vue?vue&type=template&id=102119d2&scoped=true& ***!
  \**********************************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "v-col",
    { attrs: { md: "8", lg: "6" } },
    [
      _c(
        "v-card",
        { staticClass: "mx-auto", staticStyle: { "margin-top": "-84px" } },
        [
          _c(
            "v-card-text",
            { staticClass: "pt-0" },
            [
              _c(
                "v-row",
                {
                  staticClass: "pt-0",
                  attrs: { type: "flex", justify: "center", gutter: "10" }
                },
                [
                  _c(
                    "v-col",
                    { attrs: { cols: "auto" } },
                    [
                      _c(
                        "v-btn",
                        {
                          attrs: { color: "secondary" },
                          on: {
                            click: function($event) {
                              return _vm.$emit("select-reading")
                            }
                          }
                        },
                        [_vm._v(_vm._s(_vm.title))]
                      )
                    ],
                    1
                  ),
                  _vm._v(" "),
                  _c(
                    "v-col",
                    [
                      _c("v-autocomplete", {
                        attrs: {
                          items: _vm.chapters,
                          color: "white",
                          "item-text": "name",
                          "item-value": "id",
                          dense: "",
                          height: "20",
                          label: "سوره",
                          filter: _vm.chapterFilter
                        },
                        on: { change: _vm.loadChapter },
                        model: {
                          value: _vm.chapter,
                          callback: function($$v) {
                            _vm.chapter = $$v
                          },
                          expression: "chapter"
                        }
                      })
                    ],
                    1
                  ),
                  _vm._v(" "),
                  _c(
                    "v-col",
                    { attrs: { cols: "auto" } },
                    [
                      _c("v-text-field", {
                        staticStyle: { width: "2em" },
                        attrs: {
                          label: "جزء",
                          value: _vm.part,
                          readonly: "",
                          flat: "",
                          height: "20"
                        }
                      })
                    ],
                    1
                  )
                ],
                1
              ),
              _vm._v(" "),
              _c(
                "v-row",
                { attrs: { type: "flex", justify: "center" } },
                [
                  _c("v-slider", {
                    attrs: {
                      value: _vm.pageNumber,
                      ticks: false,
                      max: 604,
                      min: 1,
                      step: "1",
                      "thumb-label": "always",
                      "thumb-size": "28",
                      "thumb-color": "secondary",
                      "append-icon": "navigate_before",
                      "prepend-icon": "navigate_next"
                    },
                    on: {
                      change: _vm.sliderChanged,
                      "click:append": _vm.nextPage,
                      "click:prepend": _vm.prevPage
                    }
                  })
                ],
                1
              ),
              _vm._v(" "),
              _c(
                "v-row",
                { attrs: { type: "flex", justify: "center" } },
                [
                  _c(
                    "v-card",
                    {
                      staticClass: "mushaf",
                      attrs: { flat: "", loading: _vm.isLoading }
                    },
                    [
                      _c(
                        "v-card-text",
                        _vm._l(_vm.page.verses, function(verse) {
                          return _c(
                            "div",
                            { key: verse.id, staticClass: "verse" },
                            [
                              verse.number === 1
                                ? _c("div", { staticClass: "chapter-title" }, [
                                    _c(
                                      "div",
                                      { staticClass: "revelation-location" },
                                      [
                                        _vm._v(
                                          _vm._s(
                                            _vm.chapters[verse.chapter_id - 1]
                                              .location
                                          )
                                        )
                                      ]
                                    ),
                                    _vm._v(
                                      "\n                                " +
                                        _vm._s(
                                          _vm.chapters[verse.chapter_id - 1]
                                            .name
                                        ) +
                                        "\n                                "
                                    ),
                                    _c(
                                      "div",
                                      { staticClass: "chapter-number" },
                                      [
                                        _vm._v(
                                          _vm._s(
                                            _vm._f("arabic")(verse.chapter_id)
                                          )
                                        )
                                      ]
                                    )
                                  ])
                                : _vm._e(),
                              _vm._v(" "),
                              verse.prostration_type
                                ? _c(
                                    "span",
                                    { staticClass: "prostration-mark" },
                                    [_vm._v("۩")]
                                  )
                                : _vm._e(),
                              _vm._v(" "),
                              _c("span", {
                                domProps: {
                                  innerHTML: _vm._s(
                                    verse.texts[_vm.corpus - 1].text
                                  )
                                }
                              }),
                              _vm._v(" "),
                              _c("span", { staticClass: "verse-number" }, [
                                _vm._v(
                                  _vm._s(
                                    _vm._f("reverse")(
                                      _vm._f("arabic")(verse.number)
                                    )
                                  ) + "۝"
                                )
                              ])
                            ]
                          )
                        }),
                        0
                      )
                    ],
                    1
                  )
                ],
                1
              )
            ],
            1
          )
        ],
        1
      )
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vuetify-loader/lib/loader.js!./node_modules/vue-loader/lib/index.js?!./resources/js/views/Home.vue?vue&type=template&id=63cd6604&":
/*!**********************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vuetify-loader/lib/loader.js!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/views/Home.vue?vue&type=template&id=63cd6604& ***!
  \**********************************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    [
      _c(
        "v-navigation-drawer",
        {
          attrs: {
            "disable-resize-watcher": "",
            app: "",
            clipped: "",
            color: "grey lighten-4",
            right: _vm.$vuetify.rtl
          },
          model: {
            value: _vm.drawer,
            callback: function($$v) {
              _vm.drawer = $$v
            },
            expression: "drawer"
          }
        },
        [
          _c(
            "v-list",
            { staticClass: "grey lighten-4", attrs: { dense: "" } },
            [
              _vm.user
                ? _c(
                    "v-list-item",
                    [
                      _c(
                        "v-list-item-action",
                        [_c("v-icon", [_vm._v("person")])],
                        1
                      ),
                      _vm._v(" "),
                      _c(
                        "v-list-item-content",
                        [
                          _c(
                            "v-list-item-title",
                            { staticClass: "grey--text" },
                            [_vm._v(_vm._s(_vm.user.name))]
                          )
                        ],
                        1
                      )
                    ],
                    1
                  )
                : _vm._e(),
              _vm._v(" "),
              _vm.user
                ? _c(
                    "v-list-item",
                    {
                      on: {
                        click: function($event) {
                          _vm.readingDialog = true
                        }
                      }
                    },
                    [
                      _c(
                        "v-list-item-action",
                        [_c("v-icon", [_vm._v("bookmarks")])],
                        1
                      ),
                      _vm._v(" "),
                      _c(
                        "v-list-item-content",
                        [
                          _c(
                            "v-list-item-title",
                            { staticClass: "grey--text" },
                            [_vm._v(_vm._s(_vm.user.reading.title))]
                          )
                        ],
                        1
                      )
                    ],
                    1
                  )
                : _vm._e(),
              _vm._v(" "),
              _c(
                "v-list-item",
                [
                  _c(
                    "v-list-item-content",
                    [
                      _c("v-autocomplete", {
                        attrs: {
                          items: _vm.corpuses,
                          color: "white",
                          "item-text": "title",
                          "item-value": "id",
                          dense: "",
                          height: "20",
                          label: "متن"
                        },
                        model: {
                          value: _vm.corpus,
                          callback: function($$v) {
                            _vm.corpus = $$v
                          },
                          expression: "corpus"
                        }
                      })
                    ],
                    1
                  )
                ],
                1
              ),
              _vm._v(" "),
              _c(
                "v-list-item",
                { attrs: { to: "/logout" } },
                [
                  _c(
                    "v-list-item-action",
                    [_c("v-icon", [_vm._v("exit_to_app")])],
                    1
                  ),
                  _vm._v(" "),
                  _c(
                    "v-list-item-content",
                    [
                      _c("v-list-item-title", { staticClass: "grey--text" }, [
                        _vm._v("خروج")
                      ])
                    ],
                    1
                  )
                ],
                1
              )
            ],
            1
          )
        ],
        1
      ),
      _vm._v(" "),
      _c(
        "v-app-bar",
        {
          staticStyle: { "z-index": "0" },
          attrs: {
            app: "",
            dark: "",
            "clipped-right": "",
            extended: "",
            "extension-height": "64px",
            color: "primary"
          }
        },
        [
          _c("v-spacer", { staticClass: "d-none d-md-block" }),
          _vm._v(" "),
          _c("v-app-bar-nav-icon", {
            on: {
              click: function($event) {
                _vm.drawer = !_vm.drawer
              }
            }
          }),
          _vm._v(" "),
          _c("v-text-field", {
            attrs: {
              "solo-inverted": "",
              flat: "",
              "hide-details": "",
              label: "جستجو",
              "prepend-inner-icon": "search"
            }
          }),
          _vm._v(" "),
          _c("v-spacer", { staticClass: "d-none d-md-block" })
        ],
        1
      ),
      _vm._v(" "),
      _c(
        "v-content",
        [
          _c(
            "v-container",
            { staticClass: "grey lighten-4 fill-height", attrs: { fluid: "" } },
            [
              _c(
                "v-row",
                { attrs: { justify: "center" } },
                [
                  _vm.user
                    ? _c("QuranViewer", {
                        ref: "quranViewer",
                        attrs: {
                          corpus: _vm.corpus,
                          initialPageNumber: _vm.user.reading.page_id,
                          title: _vm.user.reading.title
                        },
                        on: {
                          "select-reading": function($event) {
                            _vm.readingDialog = true
                          }
                        }
                      })
                    : _vm._e()
                ],
                1
              ),
              _vm._v(" "),
              _vm.user
                ? _c(
                    "v-dialog",
                    {
                      attrs: { width: "500" },
                      model: {
                        value: _vm.readingDialog,
                        callback: function($$v) {
                          _vm.readingDialog = $$v
                        },
                        expression: "readingDialog"
                      }
                    },
                    [
                      _c("zekr-reading-dialog", {
                        attrs: { currentReadingId: _vm.user.reading.id },
                        on: {
                          closed: function($event) {
                            _vm.readingDialog = false
                          },
                          "reading-changed": _vm.readingChanged
                        }
                      })
                    ],
                    1
                  )
                : _vm._e()
            ],
            1
          )
        ],
        1
      )
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vuetify-loader/lib/loader.js!./node_modules/vue-loader/lib/index.js?!./resources/js/views/ZekrReadingDialog.vue?vue&type=template&id=6f6d8e33&":
/*!***********************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vuetify-loader/lib/loader.js!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/views/ZekrReadingDialog.vue?vue&type=template&id=6f6d8e33& ***!
  \***********************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "v-card",
    [
      _c(
        "v-card-title",
        {
          staticClass: "headline grey lighten-2",
          attrs: { "primary-title": "" }
        },
        [_vm._v("\n        انتخاب تلاوت\n    ")]
      ),
      _vm._v(" "),
      _c(
        "v-card-text",
        [
          _c(
            "v-radio-group",
            {
              on: { change: _vm.setReading },
              model: {
                value: _vm.selectedReading,
                callback: function($$v) {
                  _vm.selectedReading = $$v
                },
                expression: "selectedReading"
              }
            },
            _vm._l(_vm.readings, function(reading) {
              return _c(
                "div",
                [
                  _c("v-radio", {
                    attrs: { value: reading.id },
                    scopedSlots: _vm._u(
                      [
                        {
                          key: "label",
                          fn: function() {
                            return [
                              _vm._v(
                                "\n                        " +
                                  _vm._s(reading.title) +
                                  "\n                    "
                              )
                            ]
                          },
                          proxy: true
                        }
                      ],
                      null,
                      true
                    )
                  })
                ],
                1
              )
            }),
            0
          ),
          _vm._v(" "),
          _c(
            "v-form",
            { ref: "form" },
            [
              _c("v-text-field", {
                attrs: {
                  "prepend-icon": "add",
                  label: "تلاوت جدید",
                  flat: "",
                  clearable: "",
                  rules: [_vm.rules.required],
                  loading: _vm.isAdding
                },
                on: { "click:prepend": _vm.addReading },
                model: {
                  value: _vm.newReading,
                  callback: function($$v) {
                    _vm.newReading = $$v
                  },
                  expression: "newReading"
                }
              })
            ],
            1
          )
        ],
        1
      ),
      _vm._v(" "),
      _c("v-divider"),
      _vm._v(" "),
      _c(
        "v-card-actions",
        [
          _c(
            "v-btn",
            { attrs: { color: "secondary", text: "" } },
            [
              _c("v-icon", [_vm._v("settings")]),
              _vm._v("\n            مدیریت تلاوت ها\n        ")
            ],
            1
          ),
          _vm._v(" "),
          _c("div", { staticClass: "flex-grow-1" }),
          _vm._v(" "),
          _c(
            "v-btn",
            {
              attrs: { color: "primary", text: "" },
              on: {
                click: function($event) {
                  return _vm.$emit("closed")
                }
              }
            },
            [_vm._v("\n            خب\n        ")]
          )
        ],
        1
      )
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./resources/js/components/QuranViewer.vue":
/*!*************************************************!*\
  !*** ./resources/js/components/QuranViewer.vue ***!
  \*************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _QuranViewer_vue_vue_type_template_id_102119d2_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./QuranViewer.vue?vue&type=template&id=102119d2&scoped=true& */ "./resources/js/components/QuranViewer.vue?vue&type=template&id=102119d2&scoped=true&");
/* harmony import */ var _QuranViewer_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./QuranViewer.vue?vue&type=script&lang=js& */ "./resources/js/components/QuranViewer.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _QuranViewer_vue_vue_type_style_index_0_id_102119d2_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./QuranViewer.vue?vue&type=style&index=0&id=102119d2&scoped=true&lang=css& */ "./resources/js/components/QuranViewer.vue?vue&type=style&index=0&id=102119d2&scoped=true&lang=css&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");
/* harmony import */ var _node_modules_vuetify_loader_lib_runtime_installComponents_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../node_modules/vuetify-loader/lib/runtime/installComponents.js */ "./node_modules/vuetify-loader/lib/runtime/installComponents.js");
/* harmony import */ var _node_modules_vuetify_loader_lib_runtime_installComponents_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vuetify_loader_lib_runtime_installComponents_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var vuetify_lib_components_VAutocomplete__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! vuetify/lib/components/VAutocomplete */ "./node_modules/vuetify/lib/components/VAutocomplete/index.js");
/* harmony import */ var vuetify_lib_components_VBtn__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! vuetify/lib/components/VBtn */ "./node_modules/vuetify/lib/components/VBtn/index.js");
/* harmony import */ var vuetify_lib_components_VCard__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! vuetify/lib/components/VCard */ "./node_modules/vuetify/lib/components/VCard/index.js");
/* harmony import */ var vuetify_lib_components_VGrid__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! vuetify/lib/components/VGrid */ "./node_modules/vuetify/lib/components/VGrid/index.js");
/* harmony import */ var vuetify_lib_components_VSlider__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! vuetify/lib/components/VSlider */ "./node_modules/vuetify/lib/components/VSlider/index.js");
/* harmony import */ var vuetify_lib_components_VTextField__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! vuetify/lib/components/VTextField */ "./node_modules/vuetify/lib/components/VTextField/index.js");






/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _QuranViewer_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _QuranViewer_vue_vue_type_template_id_102119d2_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"],
  _QuranViewer_vue_vue_type_template_id_102119d2_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  "102119d2",
  null
  
)

/* vuetify-loader */









_node_modules_vuetify_loader_lib_runtime_installComponents_js__WEBPACK_IMPORTED_MODULE_4___default()(component, {VAutocomplete: vuetify_lib_components_VAutocomplete__WEBPACK_IMPORTED_MODULE_5__["VAutocomplete"],VBtn: vuetify_lib_components_VBtn__WEBPACK_IMPORTED_MODULE_6__["VBtn"],VCard: vuetify_lib_components_VCard__WEBPACK_IMPORTED_MODULE_7__["VCard"],VCardText: vuetify_lib_components_VCard__WEBPACK_IMPORTED_MODULE_7__["VCardText"],VCol: vuetify_lib_components_VGrid__WEBPACK_IMPORTED_MODULE_8__["VCol"],VRow: vuetify_lib_components_VGrid__WEBPACK_IMPORTED_MODULE_8__["VRow"],VSlider: vuetify_lib_components_VSlider__WEBPACK_IMPORTED_MODULE_9__["VSlider"],VTextField: vuetify_lib_components_VTextField__WEBPACK_IMPORTED_MODULE_10__["VTextField"]})


/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/components/QuranViewer.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/components/QuranViewer.vue?vue&type=script&lang=js&":
/*!**************************************************************************!*\
  !*** ./resources/js/components/QuranViewer.vue?vue&type=script&lang=js& ***!
  \**************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vuetify_loader_lib_loader_js_node_modules_vue_loader_lib_index_js_vue_loader_options_QuranViewer_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/babel-loader/lib??ref--4-0!../../../node_modules/vuetify-loader/lib/loader.js!../../../node_modules/vue-loader/lib??vue-loader-options!./QuranViewer.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vuetify-loader/lib/loader.js!./node_modules/vue-loader/lib/index.js?!./resources/js/components/QuranViewer.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vuetify_loader_lib_loader_js_node_modules_vue_loader_lib_index_js_vue_loader_options_QuranViewer_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/components/QuranViewer.vue?vue&type=style&index=0&id=102119d2&scoped=true&lang=css&":
/*!**********************************************************************************************************!*\
  !*** ./resources/js/components/QuranViewer.vue?vue&type=style&index=0&id=102119d2&scoped=true&lang=css& ***!
  \**********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_extract_text_webpack_plugin_dist_loader_js_ref_6_0_node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_6_2_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_3_node_modules_vuetify_loader_lib_loader_js_node_modules_vue_loader_lib_index_js_vue_loader_options_QuranViewer_vue_vue_type_style_index_0_id_102119d2_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/extract-text-webpack-plugin/dist/loader.js??ref--6-0!../../../node_modules/style-loader!../../../node_modules/css-loader??ref--6-2!../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../node_modules/postcss-loader/src??ref--6-3!../../../node_modules/vuetify-loader/lib/loader.js!../../../node_modules/vue-loader/lib??vue-loader-options!./QuranViewer.vue?vue&type=style&index=0&id=102119d2&scoped=true&lang=css& */ "./node_modules/extract-text-webpack-plugin/dist/loader.js?!./node_modules/style-loader/index.js!./node_modules/css-loader/index.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/vuetify-loader/lib/loader.js!./node_modules/vue-loader/lib/index.js?!./resources/js/components/QuranViewer.vue?vue&type=style&index=0&id=102119d2&scoped=true&lang=css&");
/* harmony import */ var _node_modules_extract_text_webpack_plugin_dist_loader_js_ref_6_0_node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_6_2_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_3_node_modules_vuetify_loader_lib_loader_js_node_modules_vue_loader_lib_index_js_vue_loader_options_QuranViewer_vue_vue_type_style_index_0_id_102119d2_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_extract_text_webpack_plugin_dist_loader_js_ref_6_0_node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_6_2_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_3_node_modules_vuetify_loader_lib_loader_js_node_modules_vue_loader_lib_index_js_vue_loader_options_QuranViewer_vue_vue_type_style_index_0_id_102119d2_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_extract_text_webpack_plugin_dist_loader_js_ref_6_0_node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_6_2_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_3_node_modules_vuetify_loader_lib_loader_js_node_modules_vue_loader_lib_index_js_vue_loader_options_QuranViewer_vue_vue_type_style_index_0_id_102119d2_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_extract_text_webpack_plugin_dist_loader_js_ref_6_0_node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_6_2_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_3_node_modules_vuetify_loader_lib_loader_js_node_modules_vue_loader_lib_index_js_vue_loader_options_QuranViewer_vue_vue_type_style_index_0_id_102119d2_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_extract_text_webpack_plugin_dist_loader_js_ref_6_0_node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_6_2_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_3_node_modules_vuetify_loader_lib_loader_js_node_modules_vue_loader_lib_index_js_vue_loader_options_QuranViewer_vue_vue_type_style_index_0_id_102119d2_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "./resources/js/components/QuranViewer.vue?vue&type=template&id=102119d2&scoped=true&":
/*!********************************************************************************************!*\
  !*** ./resources/js/components/QuranViewer.vue?vue&type=template&id=102119d2&scoped=true& ***!
  \********************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vuetify_loader_lib_loader_js_node_modules_vue_loader_lib_index_js_vue_loader_options_QuranViewer_vue_vue_type_template_id_102119d2_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../node_modules/vuetify-loader/lib/loader.js!../../../node_modules/vue-loader/lib??vue-loader-options!./QuranViewer.vue?vue&type=template&id=102119d2&scoped=true& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vuetify-loader/lib/loader.js!./node_modules/vue-loader/lib/index.js?!./resources/js/components/QuranViewer.vue?vue&type=template&id=102119d2&scoped=true&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vuetify_loader_lib_loader_js_node_modules_vue_loader_lib_index_js_vue_loader_options_QuranViewer_vue_vue_type_template_id_102119d2_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vuetify_loader_lib_loader_js_node_modules_vue_loader_lib_index_js_vue_loader_options_QuranViewer_vue_vue_type_template_id_102119d2_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./resources/js/meta.js":
/*!******************************!*\
  !*** ./resources/js/meta.js ***!
  \******************************/
/*! exports provided: parts, chapters */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "parts", function() { return parts; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "chapters", function() { return chapters; });
var parts = [{
  id: 30,
  page: 582
}, {
  id: 29,
  page: 562
}, {
  id: 28,
  page: 542
}, {
  id: 27,
  page: 522
}, {
  id: 26,
  page: 502
}, {
  id: 25,
  page: 482
}, {
  id: 24,
  page: 462
}, {
  id: 23,
  page: 442
}, {
  id: 22,
  page: 422
}, {
  id: 21,
  page: 402
}, {
  id: 20,
  page: 382
}, {
  id: 19,
  page: 362
}, {
  id: 18,
  page: 342
}, {
  id: 17,
  page: 322
}, {
  id: 16,
  page: 302
}, {
  id: 15,
  page: 282
}, {
  id: 14,
  page: 262
}, {
  id: 13,
  page: 242
}, {
  id: 12,
  page: 222
}, {
  id: 11,
  page: 201
}, {
  id: 10,
  page: 182
}, {
  id: 9,
  page: 162
}, {
  id: 8,
  page: 142
}, {
  id: 7,
  page: 121
}, {
  id: 6,
  page: 102
}, {
  id: 5,
  page: 82
}, {
  id: 4,
  page: 62
}, {
  id: 3,
  page: 42
}, {
  id: 2,
  page: 22
}, {
  id: 1,
  page: 1
}];
var chapters = [{
  "id": 1,
  "location": "مکی",
  "order": 5,
  "name": "الفاتحة",
  "page": 1
}, {
  "id": 2,
  "location": "مدنی",
  "order": 87,
  "name": "البقرة",
  "page": 2
}, {
  "id": 3,
  "location": "مدنی",
  "order": 89,
  "name": "آل عمران",
  "page": 50
}, {
  "id": 4,
  "location": "مدنی",
  "order": 92,
  "name": "النساء",
  "page": 77
}, {
  "id": 5,
  "location": "مدنی",
  "order": 112,
  "name": "المائدة",
  "page": 106
}, {
  "id": 6,
  "location": "مکی",
  "order": 55,
  "name": "الأنعام",
  "page": 128
}, {
  "id": 7,
  "location": "مکی",
  "order": 39,
  "name": "الأعراف",
  "page": 151
}, {
  "id": 8,
  "location": "مدنی",
  "order": 88,
  "name": "الأنفال",
  "page": 177
}, {
  "id": 9,
  "location": "مدنی",
  "order": 113,
  "name": "التوبة",
  "page": 187
}, {
  "id": 10,
  "location": "مکی",
  "order": 51,
  "name": "يونس",
  "page": 208
}, {
  "id": 11,
  "location": "مکی",
  "order": 52,
  "name": "هود",
  "page": 221
}, {
  "id": 12,
  "location": "مکی",
  "order": 53,
  "name": "يوسف",
  "page": 235
}, {
  "id": 13,
  "location": "مدنی",
  "order": 96,
  "name": "الرعد",
  "page": 249
}, {
  "id": 14,
  "location": "مکی",
  "order": 72,
  "name": "ابراهيم",
  "page": 255
}, {
  "id": 15,
  "location": "مکی",
  "order": 54,
  "name": "الحجر",
  "page": 262
}, {
  "id": 16,
  "location": "مکی",
  "order": 70,
  "name": "النحل",
  "page": 267
}, {
  "id": 17,
  "location": "مکی",
  "order": 50,
  "name": "الإسراء",
  "page": 282
}, {
  "id": 18,
  "location": "مکی",
  "order": 69,
  "name": "الكهف",
  "page": 293
}, {
  "id": 19,
  "location": "مکی",
  "order": 44,
  "name": "مريم",
  "page": 305
}, {
  "id": 20,
  "location": "مکی",
  "order": 45,
  "name": "طه",
  "page": 312
}, {
  "id": 21,
  "location": "مکی",
  "order": 73,
  "name": "الأنبياء",
  "page": 322
}, {
  "id": 22,
  "location": "مدنی",
  "order": 103,
  "name": "الحج",
  "page": 332
}, {
  "id": 23,
  "location": "مکی",
  "order": 74,
  "name": "المؤمنون",
  "page": 342
}, {
  "id": 24,
  "location": "مدنی",
  "order": 102,
  "name": "النور",
  "page": 350
}, {
  "id": 25,
  "location": "مکی",
  "order": 42,
  "name": "الفرقان",
  "page": 359
}, {
  "id": 26,
  "location": "مکی",
  "order": 47,
  "name": "الشعراء",
  "page": 367
}, {
  "id": 27,
  "location": "مکی",
  "order": 48,
  "name": "النمل",
  "page": 377
}, {
  "id": 28,
  "location": "مکی",
  "order": 49,
  "name": "القصص",
  "page": 385
}, {
  "id": 29,
  "location": "مکی",
  "order": 85,
  "name": "العنكبوت",
  "page": 396
}, {
  "id": 30,
  "location": "مکی",
  "order": 84,
  "name": "الروم",
  "page": 404
}, {
  "id": 31,
  "location": "مکی",
  "order": 57,
  "name": "لقمان",
  "page": 411
}, {
  "id": 32,
  "location": "مکی",
  "order": 75,
  "name": "السجدة",
  "page": 415
}, {
  "id": 33,
  "location": "مدنی",
  "order": 90,
  "name": "الأحزاب",
  "page": 418
}, {
  "id": 34,
  "location": "مکی",
  "order": 58,
  "name": "سبإ",
  "page": 428
}, {
  "id": 35,
  "location": "مکی",
  "order": 43,
  "name": "فاطر",
  "page": 434
}, {
  "id": 36,
  "location": "مکی",
  "order": 41,
  "name": "يس",
  "page": 440
}, {
  "id": 37,
  "location": "مکی",
  "order": 56,
  "name": "الصافات",
  "page": 446
}, {
  "id": 38,
  "location": "مکی",
  "order": 38,
  "name": "ص",
  "page": 453
}, {
  "id": 39,
  "location": "مکی",
  "order": 59,
  "name": "الزمر",
  "page": 458
}, {
  "id": 40,
  "location": "مکی",
  "order": 60,
  "name": "غافر",
  "page": 467
}, {
  "id": 41,
  "location": "مکی",
  "order": 61,
  "name": "فصلت",
  "page": 477
}, {
  "id": 42,
  "location": "مکی",
  "order": 62,
  "name": "الشورى",
  "page": 483
}, {
  "id": 43,
  "location": "مکی",
  "order": 63,
  "name": "الزخرف",
  "page": 489
}, {
  "id": 44,
  "location": "مکی",
  "order": 64,
  "name": "الدخان",
  "page": 496
}, {
  "id": 45,
  "location": "مکی",
  "order": 65,
  "name": "الجاثية",
  "page": 499
}, {
  "id": 46,
  "location": "مکی",
  "order": 66,
  "name": "الأحقاف",
  "page": 502
}, {
  "id": 47,
  "location": "مدنی",
  "order": 95,
  "name": "محمد",
  "page": 507
}, {
  "id": 48,
  "location": "مدنی",
  "order": 111,
  "name": "الفتح",
  "page": 511
}, {
  "id": 49,
  "location": "مدنی",
  "order": 106,
  "name": "الحجرات",
  "page": 515
}, {
  "id": 50,
  "location": "مکی",
  "order": 34,
  "name": "ق",
  "page": 518
}, {
  "id": 51,
  "location": "مکی",
  "order": 67,
  "name": "الذاريات",
  "page": 520
}, {
  "id": 52,
  "location": "مکی",
  "order": 76,
  "name": "الطور",
  "page": 523
}, {
  "id": 53,
  "location": "مکی",
  "order": 23,
  "name": "النجم",
  "page": 526
}, {
  "id": 54,
  "location": "مکی",
  "order": 37,
  "name": "القمر",
  "page": 528
}, {
  "id": 55,
  "location": "مدنی",
  "order": 97,
  "name": "الرحمن",
  "page": 531
}, {
  "id": 56,
  "location": "مکی",
  "order": 46,
  "name": "الواقعة",
  "page": 534
}, {
  "id": 57,
  "location": "مدنی",
  "order": 94,
  "name": "الحديد",
  "page": 537
}, {
  "id": 58,
  "location": "مدنی",
  "order": 105,
  "name": "المجادلة",
  "page": 542
}, {
  "id": 59,
  "location": "مدنی",
  "order": 101,
  "name": "الحشر",
  "page": 545
}, {
  "id": 60,
  "location": "مدنی",
  "order": 91,
  "name": "الممتحنة",
  "page": 549
}, {
  "id": 61,
  "location": "مدنی",
  "order": 109,
  "name": "الصف",
  "page": 551
}, {
  "id": 62,
  "location": "مدنی",
  "order": 110,
  "name": "الجمعة",
  "page": 553
}, {
  "id": 63,
  "location": "مدنی",
  "order": 104,
  "name": "المنافقون",
  "page": 554
}, {
  "id": 64,
  "location": "مدنی",
  "order": 108,
  "name": "التغابن",
  "page": 556
}, {
  "id": 65,
  "location": "مدنی",
  "order": 99,
  "name": "الطلاق",
  "page": 558
}, {
  "id": 66,
  "location": "مدنی",
  "order": 107,
  "name": "التحريم",
  "page": 560
}, {
  "id": 67,
  "location": "مکی",
  "order": 77,
  "name": "الملك",
  "page": 562
}, {
  "id": 68,
  "location": "مکی",
  "order": 2,
  "name": "القلم",
  "page": 564
}, {
  "id": 69,
  "location": "مکی",
  "order": 78,
  "name": "الحاقة",
  "page": 566
}, {
  "id": 70,
  "location": "مکی",
  "order": 79,
  "name": "المعارج",
  "page": 568
}, {
  "id": 71,
  "location": "مکی",
  "order": 71,
  "name": "نوح",
  "page": 570
}, {
  "id": 72,
  "location": "مکی",
  "order": 40,
  "name": "الجن",
  "page": 572
}, {
  "id": 73,
  "location": "مکی",
  "order": 3,
  "name": "المزمل",
  "page": 574
}, {
  "id": 74,
  "location": "مکی",
  "order": 4,
  "name": "المدثر",
  "page": 575
}, {
  "id": 75,
  "location": "مکی",
  "order": 31,
  "name": "القيامة",
  "page": 577
}, {
  "id": 76,
  "location": "مدنی",
  "order": 98,
  "name": "الانسان",
  "page": 578
}, {
  "id": 77,
  "location": "مکی",
  "order": 33,
  "name": "المرسلات",
  "page": 580
}, {
  "id": 78,
  "location": "مکی",
  "order": 80,
  "name": "النبإ",
  "page": 582
}, {
  "id": 79,
  "location": "مکی",
  "order": 81,
  "name": "النازعات",
  "page": 583
}, {
  "id": 80,
  "location": "مکی",
  "order": 24,
  "name": "عبس",
  "page": 585
}, {
  "id": 81,
  "location": "مکی",
  "order": 7,
  "name": "التكوير",
  "page": 586
}, {
  "id": 82,
  "location": "مکی",
  "order": 82,
  "name": "الإنفطار",
  "page": 587
}, {
  "id": 83,
  "location": "مکی",
  "order": 86,
  "name": "المطففين",
  "page": 587
}, {
  "id": 84,
  "location": "مکی",
  "order": 83,
  "name": "الإنشقاق",
  "page": 589
}, {
  "id": 85,
  "location": "مکی",
  "order": 27,
  "name": "البروج",
  "page": 590
}, {
  "id": 86,
  "location": "مکی",
  "order": 36,
  "name": "الطارق",
  "page": 591
}, {
  "id": 87,
  "location": "مکی",
  "order": 8,
  "name": "الأعلى",
  "page": 591
}, {
  "id": 88,
  "location": "مکی",
  "order": 68,
  "name": "الغاشية",
  "page": 592
}, {
  "id": 89,
  "location": "مکی",
  "order": 10,
  "name": "الفجر",
  "page": 593
}, {
  "id": 90,
  "location": "مکی",
  "order": 35,
  "name": "البلد",
  "page": 594
}, {
  "id": 91,
  "location": "مکی",
  "order": 26,
  "name": "الشمس",
  "page": 595
}, {
  "id": 92,
  "location": "مکی",
  "order": 9,
  "name": "الليل",
  "page": 595
}, {
  "id": 93,
  "location": "مکی",
  "order": 11,
  "name": "الضحى",
  "page": 596
}, {
  "id": 94,
  "location": "مکی",
  "order": 12,
  "name": "الشرح",
  "page": 596
}, {
  "id": 95,
  "location": "مکی",
  "order": 28,
  "name": "التين",
  "page": 597
}, {
  "id": 96,
  "location": "مکی",
  "order": 1,
  "name": "العلق",
  "page": 597
}, {
  "id": 97,
  "location": "مکی",
  "order": 25,
  "name": "القدر",
  "page": 598
}, {
  "id": 98,
  "location": "مدنی",
  "order": 100,
  "name": "البينة",
  "page": 598
}, {
  "id": 99,
  "location": "مدنی",
  "order": 93,
  "name": "الزلزلة",
  "page": 599
}, {
  "id": 100,
  "location": "مکی",
  "order": 14,
  "name": "العاديات",
  "page": 599
}, {
  "id": 101,
  "location": "مکی",
  "order": 30,
  "name": "القارعة",
  "page": 600
}, {
  "id": 102,
  "location": "مکی",
  "order": 16,
  "name": "التكاثر",
  "page": 600
}, {
  "id": 103,
  "location": "مکی",
  "order": 13,
  "name": "العصر",
  "page": 601
}, {
  "id": 104,
  "location": "مکی",
  "order": 32,
  "name": "الهمزة",
  "page": 601
}, {
  "id": 105,
  "location": "مکی",
  "order": 19,
  "name": "الفيل",
  "page": 601
}, {
  "id": 106,
  "location": "مکی",
  "order": 29,
  "name": "قريش",
  "page": 602
}, {
  "id": 107,
  "location": "مکی",
  "order": 17,
  "name": "الماعون",
  "page": 602
}, {
  "id": 108,
  "location": "مکی",
  "order": 15,
  "name": "الكوثر",
  "page": 602
}, {
  "id": 109,
  "location": "مکی",
  "order": 18,
  "name": "الكافرون",
  "page": 603
}, {
  "id": 110,
  "location": "مدنی",
  "order": 114,
  "name": "النصر",
  "page": 603
}, {
  "id": 111,
  "location": "مکی",
  "order": 6,
  "name": "المسد",
  "page": 603
}, {
  "id": 112,
  "location": "مکی",
  "order": 22,
  "name": "الإخلاص",
  "page": 604
}, {
  "id": 113,
  "location": "مکی",
  "order": 20,
  "name": "الفلق",
  "page": 604
}, {
  "id": 114,
  "location": "مکی",
  "order": 21,
  "name": "الناس",
  "page": 604
}];

/***/ }),

/***/ "./resources/js/views/Home.vue":
/*!*************************************!*\
  !*** ./resources/js/views/Home.vue ***!
  \*************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Home_vue_vue_type_template_id_63cd6604___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Home.vue?vue&type=template&id=63cd6604& */ "./resources/js/views/Home.vue?vue&type=template&id=63cd6604&");
/* harmony import */ var _Home_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Home.vue?vue&type=script&lang=js& */ "./resources/js/views/Home.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _Home_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Home.vue?vue&type=style&index=0&lang=css& */ "./resources/js/views/Home.vue?vue&type=style&index=0&lang=css&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");
/* harmony import */ var _node_modules_vuetify_loader_lib_runtime_installComponents_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../node_modules/vuetify-loader/lib/runtime/installComponents.js */ "./node_modules/vuetify-loader/lib/runtime/installComponents.js");
/* harmony import */ var _node_modules_vuetify_loader_lib_runtime_installComponents_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vuetify_loader_lib_runtime_installComponents_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var vuetify_lib_components_VAppBar__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! vuetify/lib/components/VAppBar */ "./node_modules/vuetify/lib/components/VAppBar/index.js");
/* harmony import */ var vuetify_lib_components_VAutocomplete__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! vuetify/lib/components/VAutocomplete */ "./node_modules/vuetify/lib/components/VAutocomplete/index.js");
/* harmony import */ var vuetify_lib_components_VGrid__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! vuetify/lib/components/VGrid */ "./node_modules/vuetify/lib/components/VGrid/index.js");
/* harmony import */ var vuetify_lib_components_VContent__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! vuetify/lib/components/VContent */ "./node_modules/vuetify/lib/components/VContent/index.js");
/* harmony import */ var vuetify_lib_components_VDialog__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! vuetify/lib/components/VDialog */ "./node_modules/vuetify/lib/components/VDialog/index.js");
/* harmony import */ var vuetify_lib_components_VIcon__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! vuetify/lib/components/VIcon */ "./node_modules/vuetify/lib/components/VIcon/index.js");
/* harmony import */ var vuetify_lib_components_VList__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! vuetify/lib/components/VList */ "./node_modules/vuetify/lib/components/VList/index.js");
/* harmony import */ var vuetify_lib_components_VNavigationDrawer__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! vuetify/lib/components/VNavigationDrawer */ "./node_modules/vuetify/lib/components/VNavigationDrawer/index.js");
/* harmony import */ var vuetify_lib_components_VTextField__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! vuetify/lib/components/VTextField */ "./node_modules/vuetify/lib/components/VTextField/index.js");






/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _Home_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _Home_vue_vue_type_template_id_63cd6604___WEBPACK_IMPORTED_MODULE_0__["render"],
  _Home_vue_vue_type_template_id_63cd6604___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* vuetify-loader */

















_node_modules_vuetify_loader_lib_runtime_installComponents_js__WEBPACK_IMPORTED_MODULE_4___default()(component, {VAppBar: vuetify_lib_components_VAppBar__WEBPACK_IMPORTED_MODULE_5__["VAppBar"],VAppBarNavIcon: vuetify_lib_components_VAppBar__WEBPACK_IMPORTED_MODULE_5__["VAppBarNavIcon"],VAutocomplete: vuetify_lib_components_VAutocomplete__WEBPACK_IMPORTED_MODULE_6__["VAutocomplete"],VContainer: vuetify_lib_components_VGrid__WEBPACK_IMPORTED_MODULE_7__["VContainer"],VContent: vuetify_lib_components_VContent__WEBPACK_IMPORTED_MODULE_8__["VContent"],VDialog: vuetify_lib_components_VDialog__WEBPACK_IMPORTED_MODULE_9__["VDialog"],VIcon: vuetify_lib_components_VIcon__WEBPACK_IMPORTED_MODULE_10__["VIcon"],VList: vuetify_lib_components_VList__WEBPACK_IMPORTED_MODULE_11__["VList"],VListItem: vuetify_lib_components_VList__WEBPACK_IMPORTED_MODULE_11__["VListItem"],VListItemAction: vuetify_lib_components_VList__WEBPACK_IMPORTED_MODULE_11__["VListItemAction"],VListItemContent: vuetify_lib_components_VList__WEBPACK_IMPORTED_MODULE_11__["VListItemContent"],VListItemTitle: vuetify_lib_components_VList__WEBPACK_IMPORTED_MODULE_11__["VListItemTitle"],VNavigationDrawer: vuetify_lib_components_VNavigationDrawer__WEBPACK_IMPORTED_MODULE_12__["VNavigationDrawer"],VRow: vuetify_lib_components_VGrid__WEBPACK_IMPORTED_MODULE_7__["VRow"],VSpacer: vuetify_lib_components_VGrid__WEBPACK_IMPORTED_MODULE_7__["VSpacer"],VTextField: vuetify_lib_components_VTextField__WEBPACK_IMPORTED_MODULE_13__["VTextField"]})


/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/views/Home.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/views/Home.vue?vue&type=script&lang=js&":
/*!**************************************************************!*\
  !*** ./resources/js/views/Home.vue?vue&type=script&lang=js& ***!
  \**************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vuetify_loader_lib_loader_js_node_modules_vue_loader_lib_index_js_vue_loader_options_Home_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/babel-loader/lib??ref--4-0!../../../node_modules/vuetify-loader/lib/loader.js!../../../node_modules/vue-loader/lib??vue-loader-options!./Home.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vuetify-loader/lib/loader.js!./node_modules/vue-loader/lib/index.js?!./resources/js/views/Home.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vuetify_loader_lib_loader_js_node_modules_vue_loader_lib_index_js_vue_loader_options_Home_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/views/Home.vue?vue&type=style&index=0&lang=css&":
/*!**********************************************************************!*\
  !*** ./resources/js/views/Home.vue?vue&type=style&index=0&lang=css& ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_extract_text_webpack_plugin_dist_loader_js_ref_6_0_node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_6_2_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_3_node_modules_vuetify_loader_lib_loader_js_node_modules_vue_loader_lib_index_js_vue_loader_options_Home_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/extract-text-webpack-plugin/dist/loader.js??ref--6-0!../../../node_modules/style-loader!../../../node_modules/css-loader??ref--6-2!../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../node_modules/postcss-loader/src??ref--6-3!../../../node_modules/vuetify-loader/lib/loader.js!../../../node_modules/vue-loader/lib??vue-loader-options!./Home.vue?vue&type=style&index=0&lang=css& */ "./node_modules/extract-text-webpack-plugin/dist/loader.js?!./node_modules/style-loader/index.js!./node_modules/css-loader/index.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/vuetify-loader/lib/loader.js!./node_modules/vue-loader/lib/index.js?!./resources/js/views/Home.vue?vue&type=style&index=0&lang=css&");
/* harmony import */ var _node_modules_extract_text_webpack_plugin_dist_loader_js_ref_6_0_node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_6_2_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_3_node_modules_vuetify_loader_lib_loader_js_node_modules_vue_loader_lib_index_js_vue_loader_options_Home_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_extract_text_webpack_plugin_dist_loader_js_ref_6_0_node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_6_2_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_3_node_modules_vuetify_loader_lib_loader_js_node_modules_vue_loader_lib_index_js_vue_loader_options_Home_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_extract_text_webpack_plugin_dist_loader_js_ref_6_0_node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_6_2_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_3_node_modules_vuetify_loader_lib_loader_js_node_modules_vue_loader_lib_index_js_vue_loader_options_Home_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_extract_text_webpack_plugin_dist_loader_js_ref_6_0_node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_6_2_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_3_node_modules_vuetify_loader_lib_loader_js_node_modules_vue_loader_lib_index_js_vue_loader_options_Home_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_extract_text_webpack_plugin_dist_loader_js_ref_6_0_node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_6_2_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_3_node_modules_vuetify_loader_lib_loader_js_node_modules_vue_loader_lib_index_js_vue_loader_options_Home_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "./resources/js/views/Home.vue?vue&type=template&id=63cd6604&":
/*!********************************************************************!*\
  !*** ./resources/js/views/Home.vue?vue&type=template&id=63cd6604& ***!
  \********************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vuetify_loader_lib_loader_js_node_modules_vue_loader_lib_index_js_vue_loader_options_Home_vue_vue_type_template_id_63cd6604___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../node_modules/vuetify-loader/lib/loader.js!../../../node_modules/vue-loader/lib??vue-loader-options!./Home.vue?vue&type=template&id=63cd6604& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vuetify-loader/lib/loader.js!./node_modules/vue-loader/lib/index.js?!./resources/js/views/Home.vue?vue&type=template&id=63cd6604&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vuetify_loader_lib_loader_js_node_modules_vue_loader_lib_index_js_vue_loader_options_Home_vue_vue_type_template_id_63cd6604___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vuetify_loader_lib_loader_js_node_modules_vue_loader_lib_index_js_vue_loader_options_Home_vue_vue_type_template_id_63cd6604___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./resources/js/views/ZekrReadingDialog.vue":
/*!**************************************************!*\
  !*** ./resources/js/views/ZekrReadingDialog.vue ***!
  \**************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _ZekrReadingDialog_vue_vue_type_template_id_6f6d8e33___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ZekrReadingDialog.vue?vue&type=template&id=6f6d8e33& */ "./resources/js/views/ZekrReadingDialog.vue?vue&type=template&id=6f6d8e33&");
/* harmony import */ var _ZekrReadingDialog_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ZekrReadingDialog.vue?vue&type=script&lang=js& */ "./resources/js/views/ZekrReadingDialog.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");
/* harmony import */ var _node_modules_vuetify_loader_lib_runtime_installComponents_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../node_modules/vuetify-loader/lib/runtime/installComponents.js */ "./node_modules/vuetify-loader/lib/runtime/installComponents.js");
/* harmony import */ var _node_modules_vuetify_loader_lib_runtime_installComponents_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vuetify_loader_lib_runtime_installComponents_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var vuetify_lib_components_VBtn__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! vuetify/lib/components/VBtn */ "./node_modules/vuetify/lib/components/VBtn/index.js");
/* harmony import */ var vuetify_lib_components_VCard__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! vuetify/lib/components/VCard */ "./node_modules/vuetify/lib/components/VCard/index.js");
/* harmony import */ var vuetify_lib_components_VDivider__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! vuetify/lib/components/VDivider */ "./node_modules/vuetify/lib/components/VDivider/index.js");
/* harmony import */ var vuetify_lib_components_VForm__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! vuetify/lib/components/VForm */ "./node_modules/vuetify/lib/components/VForm/index.js");
/* harmony import */ var vuetify_lib_components_VIcon__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! vuetify/lib/components/VIcon */ "./node_modules/vuetify/lib/components/VIcon/index.js");
/* harmony import */ var vuetify_lib_components_VRadioGroup__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! vuetify/lib/components/VRadioGroup */ "./node_modules/vuetify/lib/components/VRadioGroup/index.js");
/* harmony import */ var vuetify_lib_components_VTextField__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! vuetify/lib/components/VTextField */ "./node_modules/vuetify/lib/components/VTextField/index.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _ZekrReadingDialog_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _ZekrReadingDialog_vue_vue_type_template_id_6f6d8e33___WEBPACK_IMPORTED_MODULE_0__["render"],
  _ZekrReadingDialog_vue_vue_type_template_id_6f6d8e33___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* vuetify-loader */












_node_modules_vuetify_loader_lib_runtime_installComponents_js__WEBPACK_IMPORTED_MODULE_3___default()(component, {VBtn: vuetify_lib_components_VBtn__WEBPACK_IMPORTED_MODULE_4__["VBtn"],VCard: vuetify_lib_components_VCard__WEBPACK_IMPORTED_MODULE_5__["VCard"],VCardActions: vuetify_lib_components_VCard__WEBPACK_IMPORTED_MODULE_5__["VCardActions"],VCardText: vuetify_lib_components_VCard__WEBPACK_IMPORTED_MODULE_5__["VCardText"],VCardTitle: vuetify_lib_components_VCard__WEBPACK_IMPORTED_MODULE_5__["VCardTitle"],VDivider: vuetify_lib_components_VDivider__WEBPACK_IMPORTED_MODULE_6__["VDivider"],VForm: vuetify_lib_components_VForm__WEBPACK_IMPORTED_MODULE_7__["VForm"],VIcon: vuetify_lib_components_VIcon__WEBPACK_IMPORTED_MODULE_8__["VIcon"],VRadio: vuetify_lib_components_VRadioGroup__WEBPACK_IMPORTED_MODULE_9__["VRadio"],VRadioGroup: vuetify_lib_components_VRadioGroup__WEBPACK_IMPORTED_MODULE_9__["VRadioGroup"],VTextField: vuetify_lib_components_VTextField__WEBPACK_IMPORTED_MODULE_10__["VTextField"]})


/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/views/ZekrReadingDialog.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/views/ZekrReadingDialog.vue?vue&type=script&lang=js&":
/*!***************************************************************************!*\
  !*** ./resources/js/views/ZekrReadingDialog.vue?vue&type=script&lang=js& ***!
  \***************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vuetify_loader_lib_loader_js_node_modules_vue_loader_lib_index_js_vue_loader_options_ZekrReadingDialog_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/babel-loader/lib??ref--4-0!../../../node_modules/vuetify-loader/lib/loader.js!../../../node_modules/vue-loader/lib??vue-loader-options!./ZekrReadingDialog.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vuetify-loader/lib/loader.js!./node_modules/vue-loader/lib/index.js?!./resources/js/views/ZekrReadingDialog.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vuetify_loader_lib_loader_js_node_modules_vue_loader_lib_index_js_vue_loader_options_ZekrReadingDialog_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/views/ZekrReadingDialog.vue?vue&type=template&id=6f6d8e33&":
/*!*********************************************************************************!*\
  !*** ./resources/js/views/ZekrReadingDialog.vue?vue&type=template&id=6f6d8e33& ***!
  \*********************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vuetify_loader_lib_loader_js_node_modules_vue_loader_lib_index_js_vue_loader_options_ZekrReadingDialog_vue_vue_type_template_id_6f6d8e33___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../node_modules/vuetify-loader/lib/loader.js!../../../node_modules/vue-loader/lib??vue-loader-options!./ZekrReadingDialog.vue?vue&type=template&id=6f6d8e33& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vuetify-loader/lib/loader.js!./node_modules/vue-loader/lib/index.js?!./resources/js/views/ZekrReadingDialog.vue?vue&type=template&id=6f6d8e33&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vuetify_loader_lib_loader_js_node_modules_vue_loader_lib_index_js_vue_loader_options_ZekrReadingDialog_vue_vue_type_template_id_6f6d8e33___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vuetify_loader_lib_loader_js_node_modules_vue_loader_lib_index_js_vue_loader_options_ZekrReadingDialog_vue_vue_type_template_id_6f6d8e33___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

}]);