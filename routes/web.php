<?php

Route::get('/r/{slug}', 'LinksController@redirect')->name('redirect');

Route::get('{vue_capture?}', function () {
    return view('app');
})->where('vue_capture', '[\/\w\.-]*');
