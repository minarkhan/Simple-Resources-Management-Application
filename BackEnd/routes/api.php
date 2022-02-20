<?php

use App\Http\Controllers\FileUploadController;
use App\Http\Controllers\HtmlSnippetController;
use App\Http\Controllers\LinkController;
use App\Http\Controllers\ProductController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::resource('products',ProductController::class);

Route::resource('fileUploads',FileUploadController::class);
Route::resource('links',LinkController::class);
Route::resource('htmlsnippets',HtmlSnippetController::class);
Route::get('htmlsnippets_show/{id}',[HtmlSnippetController::class, 'htmlSnippet_show']);
Route::get('htmlsnippets_delete/{id}',[HtmlSnippetController::class, 'htmlsnippets_delete']);
