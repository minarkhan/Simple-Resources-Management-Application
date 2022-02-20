<?php

namespace App\Http\Controllers;

use App\Models\FileUpload;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class FileUploadController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return FileUpload::select('id','title','description','image')->get();
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        // return $request;
        $request->validate([
            'title'=>'required',
            'description'=>'required',
            // 'image'=>'required|image'
        ]);

        try{
            $imageName = Str::random().'.'.$request->image->getClientOriginalExtension();
            Storage::disk('public')->putFileAs('fileUpload/image', $request->image,$imageName);
            FileUpload::create($request->post()+['image'=>$imageName]);

            return response()->json([
                'message'=>'fileUpload Created Successfully!!'
            ]);
        }catch(\Exception $e){
            \Log::error($e->getMessage());
            return response()->json([
                'message'=>'Something goes wrong while creating a fileUpload!!'
            ],500);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\fileUpload  $fileUpload
     * @return \Illuminate\Http\Response
     */
    public function show(FileUpload $fileUpload)
    {
        return response()->json([
            'fileUpload'=>$fileUpload
        ]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\fileUpload  $fileUpload
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, fileUpload $fileUpload)
    {
        
        $request->validate([
            'title'=>'required',
            'description'=>'required',
            'image'=>'nullable'
        ]);

        try{

            $fileUpload->fill($request->post())->update();

            if($request->hasFile('image')){

                // remove old image
                if($fileUpload->image){
                    $exists = Storage::disk('public')->exists("fileUpload/image/{$fileUpload->image}");
                    if($exists){
                        Storage::disk('public')->delete("fileUpload/image/{$fileUpload->image}");
                    }
                }

                $imageName = Str::random().'.'.$request->image->getClientOriginalExtension();
                Storage::disk('public')->putFileAs('fileUpload/image', $request->image,$imageName);
                $fileUpload->image = $imageName;
                $fileUpload->save();
            }

            return response()->json([
                'message'=>'fileUpload Updated Successfully!!'
            ]);

        }catch(\Exception $e){
            \Log::error($e->getMessage());
            return response()->json([
                'message'=>'Something goes wrong while updating a fileUpload!!'
            ],500);
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\fileUpload  $fileUpload
     * @return \Illuminate\Http\Response
     */
    public function destroy(FileUpload $fileUpload)
    {
        try {

            if($fileUpload->image){
                $exists = Storage::disk('public')->exists("fileUpload/image/{$fileUpload->image}");
                if($exists){
                    Storage::disk('public')->delete("fileUpload/image/{$fileUpload->image}");
                }
            }

            $fileUpload->delete();

            return response()->json([
                'message'=>'fileUpload Deleted Successfully!!'
            ]);

        } catch (\Exception $e) {
            \Log::error($e->getMessage());
            return response()->json([
                'message'=>'Something goes wrong while deleting a fileUpload!!'
            ]);
        }
    }
}
