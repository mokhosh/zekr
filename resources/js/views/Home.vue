<template>
    <div>
        <v-navigation-drawer disable-resize-watcher v-model="drawer" app clipped color="grey lighten-4" :right="$vuetify.rtl">
            <v-list dense class="grey lighten-4">
                <v-list-item v-if="user">
                    <v-list-item-action>
                        <v-icon>person</v-icon>
                    </v-list-item-action>
                    <v-list-item-content>
                        <v-list-item-title class="grey--text">{{ user.name }}</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
                <v-list-item v-if="user">
                    <v-list-item-content>
                        <v-autocomplete
                            :items="corpuses" color="white" item-text="title" item-value="id" dense height="20"
                            v-model="corpus" label="متن"/>
                    </v-list-item-content>
                </v-list-item>
                <!--<template v-for="(item, i) in items">
                    <v-row v-if="item.heading" :key="i" align="center">
                        <v-col cols="6">
                            <v-subheader v-if="item.heading">{{ item.heading }}</v-subheader>
                        </v-col>
                        <v-col cols="6" class="text-right">
                            <v-btn small text>edit</v-btn>
                        </v-col>
                    </v-row>
                    <v-divider v-else-if="item.divider" :key="i" dark class="my-4"></v-divider>
                    <v-list-item v-else :key="i" @click>
                        <v-list-item-action>
                            <v-icon>{{ item.icon }}</v-icon>
                        </v-list-item-action>
                        <v-list-item-content>
                            <v-list-item-title class="grey&#45;&#45;text">{{ item.text }}</v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                </template>-->
                <v-list-item to="/logout">
                    <v-list-item-action>
                        <v-icon>exit_to_app</v-icon>
                    </v-list-item-action>
                    <v-list-item-content>
                        <v-list-item-title class="grey--text">خروج</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
            </v-list>
        </v-navigation-drawer>


        <v-app-bar app dark clipped-right extended extension-height="64px" color="primary" style="z-index:0">
            <v-spacer class="d-none d-md-block" />
            <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
            <v-text-field solo-inverted flat hide-details label="جستجو" prepend-inner-icon="search"></v-text-field>
            <v-spacer class="d-none d-md-block" />
        </v-app-bar>

        <v-content>
            <v-container fluid class="grey lighten-4 fill-height">
                <v-row justify="center">
                    <QuranViewer :corpus="corpus" />
                </v-row>
            </v-container>
        </v-content>
    </div>
</template>

<script>
    import QuranViewer from "../components/QuranViewer";

    export default {
        mounted () {
            this.loadCorpuses();
        },
        data: () => ({
            corpuses: [],
            corpus: 3,
            drawer: false,
            items: [
                {icon: "lightbulb_outline", text: "Notes"},
                {icon: "touch_app", text: "Reminders"},
                {divider: true},
                {heading: "Labels"},
                {icon: "add", text: "Create new label"},
                {divider: true},
                {icon: "settings", text: "Settings"},
                {icon: "chat_bubble", text: "Trash"},
                {icon: "help", text: "Help"},
            ]
        }),
        methods: {
            loadCorpuses() {
                axios.get('api/corpuses')
                    .then(result => {
                        this.corpuses = result.data;
                    })
                    .catch(e => console.log(e))
            },
        },
        components: {
            QuranViewer
        },
        props: [
            'user'
        ]
    };
</script>

<style>
    .v-navigation-drawer__border {
        display: none;
    }
</style>
