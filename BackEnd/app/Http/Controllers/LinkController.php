<?php

namespace App\Http\Controllers;

use App\Models\link;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class LinkController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return Link::select('id','title', 'link', 'new_tab')->get();
    }

    public function store(Request $request)
    {
        $request->validate([
            'title'=>'required',
            'link'=>'required',
        ]);

        try{
            $link = new Link();
            $link->title = $request->title;
            $link->link = $request->link;
            $link->new_tab = $request->new_tab == 'true' ? 'yes': 'no';
            $link->save();

            return response()->json([
                'message'=>'link Created Successfully!!'
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
     * @param  \App\Models\link  $link
     * @return \Illuminate\Http\Response
     */
    public function show(Link $link)
    {
        return response()->json([
            'link'=>$link
        ]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\link  $link
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, link $link)
    {
        // return  $request;
        $request->validate([
            'title'=>'required',
            'link'=>'required',
        ]);

        try{
            $link = $link;
            $link->title = $request->title;
            $link->link = $request->link;
            $link->new_tab = $request->new_tab == 'true' ? 'yes': 'no';
            $link->save();

            return response()->json([
                'message'=>'link Created Successfully!!'
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
     * @param  \App\Models\link  $link
     * @return \Illuminate\Http\Response
     */
    public function destroy(Link $link)
    {
        try {

            if($link->image){
                $exists = Storage::disk('public')->exists("link/image/{$link->image}");
                if($exists){
                    Storage::disk('public')->delete("link/image/{$link->image}");
                }
            }

            $link->delete();

            return response()->json([
                'message'=>'link Deleted Successfully!!'
            ]);

        } catch (\Exception $e) {
            \Log::error($e->getMessage());
            return response()->json([
                'message'=>'Something goes wrong while deleting a link!!'
            ]);
        }
    }
}
