<?php

use Illuminate\Http\Request;

Route::post('/auth/login', 'UsersController@login');
Route::post('/auth/register', 'UsersController@register');
Route::middleware(['jwt.auth'])->group(function () {
    Route::get('/user', 'UsersController@user');
    Route::post('/auth/logout', 'UsersController@logout');
    Route::prefix('links')->group(function () {
        Route::get('/', 'LinksController@links');
        Route::post('/create', 'LinksController@create');
        Route::get('/total_views', 'LinksController@totalViews');
        Route::get('{id}', 'LinksController@link');
    });
    Route::middleware(['jwt.refresh'])->group(function () {
        Route::get('/user/refresh', 'UsersController@refresh');
    });
});
