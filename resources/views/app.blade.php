<!DOCTYPE html>
<html lang="{{ app()->getLocale() }}">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <!-- CSRF Token -->
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <meta name="app-name" content="{{ config('app.name') }}">

    <title>Polaris</title>

    <!-- Styles -->
    <link href="{{ asset('css/app.css') }}" rel="stylesheet">
</head>
<body>
<div id="app" v-cloak>
    <v-app standalone v-if="$auth.ready()">
        <toolbar></toolbar>
        <v-layout row style="margin-left: 3%; margin-right: 3%;">
            <v-flex xs12 md10 offset-md1 lg8 offset-lg2>
                <v-card class="card--flex-toolbar main-card">
                    <v-toolbar card class="white" prominent>
                        <v-toolbar-title class="subheading page--title" v-show="$store.state.page.title">
                            @{{ $store.state.page.title + ' - ' + $store.state.page.description }}
                        </v-toolbar-title>
                        <v-spacer></v-spacer>
                        <loader></loader>
                    </v-toolbar>
                    <v-divider></v-divider>
                    <v-card-text>
                        <transition name="fade" mode="out-in">
                            <router-view></router-view>
                        </transition>
                    </v-card-text>
                </v-card>
            </v-flex>
        </v-layout>
        <toast></toast>
    </v-app>
</div>

<!-- Scripts -->
<script src="{{ asset('js/app.js') }}"></script>
</body>
</html>
