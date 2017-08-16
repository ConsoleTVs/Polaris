<template>
    <div>
        <v-navigation-drawer
      temporary
      v-model="drawer"
      light
      overflow
      absolute
    >
            <v-toolbar flat class="transparent">
                <v-list class="pa-0">
                    <v-list-tile avatar tag="div" v-if="$auth.check()">
                        <v-list-tile-avatar>
                            <img :src="$auth.user().avatar" />
                        </v-list-tile-avatar>
                        <v-list-tile-content>
                            <v-list-tile-title class="grey--text">{{ $auth.user().name }}</v-list-tile-title>
                        </v-list-tile-content>
                    </v-list-tile>
                    <v-list-tile tag="div" v-if="!$auth.check()">
                        <v-list-tile-content>
                            <v-list-tile-title class="grey--text">Main Menu</v-list-tile-title>
                        </v-list-tile-content>
                    </v-list-tile>
                </v-list>
            </v-toolbar>
          <v-list class="pt-0" dense>
            <v-divider></v-divider>
            <v-list-tile v-for="item in navItems" :key="item.title" :to="{ name: item.route }">
                <v-list-tile-action>
                  <v-icon class="grey--text">{{ item.icon }}</v-icon>
                </v-list-tile-action>
                <v-list-tile-content>
                  <v-list-tile-title>{{ item.title }}</v-list-tile-title>
                </v-list-tile-content>
            </v-list-tile>
          </v-list>
        </v-navigation-drawer>
        <v-toolbar dark class="primary elevation-0" extended>
            <v-toolbar-side-icon @click.native.stop="drawer = !drawer"></v-toolbar-side-icon>
            <v-toolbar-title class="app">{{ $store.state.page.app }}</v-toolbar-title>
        </v-toolbar>
    </div>
</template>

<script>
    export default {
        data () {
            return {
                drawer: false,
                items: [
                    { title: 'Home', icon: 'home', route: 'index'},
                    { title: 'Login', icon: 'person', route: 'login', auth: false },
                    { title: 'Register', icon: 'person_add', route: 'register', auth: false },
                    { title: 'Dashboard', icon: 'dashboard', route: 'dashboard', auth: true },
                    { title: 'Links', icon: 'link', route: 'links', auth: true },
                    { title: 'Create Link', icon: 'add', route: 'create_link', auth: true },
                ],
            }
        },
        computed: {
            navItems: function () {
                return this.items.filter((item) => {
                    return ((item.auth === undefined || item.auth === null) || item.auth === this.$auth.check());
                });
            }
        },
        mounted() {
            let app = $('.app');
            let margin = 16;
            app.css({marginLeft: margin + 25, opacity: 0});

            setTimeout(function () {
                app.velocity({
                    opacity: 1,
                    marginLeft: margin,
                }, 300);
            }, 300);
        }
    }
</script>
