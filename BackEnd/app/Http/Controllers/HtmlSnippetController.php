<?php

namespace App\Http\Controllers;

use App\Models\HtmlSnippet;
use App\Models\link;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class HtmlSnippetController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return HtmlSnippet::select('id','title', 'description', 'html_snippet')->get();
    }

    public function store(Request $request)
    {
        // return $request;
        $request->validate([
            'title'=>'required',
            'description'=>'required',
            // 'html_snippet'=>'required',
        ]);

        try{
            $htmlSnippet = new HtmlSnippet();
            $htmlSnippet->title = $request->title;
            $htmlSnippet->description = $request->description;
            $htmlSnippet->html_snippet = $request->html_snippet;
            $htmlSnippet->save();

            return response()->json([
                'message'=>'HTML Snippet Created Successfully!!'
            ]);
        }catch(\Exception $e){
            \Log::error($e->getMessage());
            return response()->json([
                'message'=>'Something goes wrong while creating a link!!'
            ],500);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\link  $htmlSnippet
     * @return \Illuminate\Http\Response
     */
    public function htmlSnippet_show( $id)
    {
        // return 'minar';
        return response()->json([
            'htmlSnippet'=> HtmlSnippet::find($id),
        ]);
    }
    public function show(HtmlSnippet $htmlSnippet)
    {
        // return 'minar';
        return response()->json([
            'htmlSnippet'=>$htmlSnippet
        ]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\link  $htmlSnippet
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, HtmlSnippet $htmlSnippet)
    {
        // return  $request->id;
        $request->validate([
            'title'=>'required',
            'description'=>'required',
            // 'new_tab'=>'required',
        ]);

        try{
            $htmlSnippet = HtmlSnippet::findOrFail($request->id);
            $htmlSnippet->title = $request->title;
            $htmlSnippet->description = $request->description;
            $htmlSnippet->html_snippet = $request->html_snippet;
            $htmlSnippet->save();
            // return $htmlSnippet;

            return response()->json([
                'message'=>'HTML Snippet Updated Successfully!!'
            ]);
        }catch(\Exception $e){
            \Log::error($e->getMessage());
            return response()->json([
                'message'=>'Something goes wrong while creating a link!!'
            ],500);
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\link  $htmlSnippet
     * @return \Illuminate\Http\Response
     */
    public function htmlsnippets_delete($id)
    {
        // return $htmlSnippet;
        try {
            $htmlSnippet = HtmlSnippet::find($id);
            $htmlSnippet->delete();

            return response()->json([
                'message'=>'HTML Snippet Deleted Successfully!!'
            ]);

        } catch (\Exception $e) {
            \Log::error($e->getMessage());
            return response()->json([
                'message'=>'Something goes wrong while deleting a link!!'
            ]);
        }
    }
}
