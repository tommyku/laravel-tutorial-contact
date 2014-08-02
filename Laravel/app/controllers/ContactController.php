<?php

class ContactController extends BaseController {

	public function contactList()
	{
        $select = DB::table('contact')
            ->get();
        return Response::json($select, 200);
	}
    
	public function getContact($id)
	{
        $select = DB::table('contact')
            ->where('id', '=', $id)
            ->take(1)
            ->get();
        return Response::json($select[0], 200);
	}
    
	public function newContact()
	{
        $id = DB::table('contact')->insertGetId(
            [
                'name' => Input::get("name"),
                'email' => Input::get("email"),
                'tel' => Input::get("tel"),
                'address' => Input::get("address"),
                'photo' => Input::get("photo")
            ]
        );
        
        return Response::json(['id'=>$id], 200);
	}
    
	public function delContact($id)
	{
        $delete = DB::table('contact')
                    ->where('id', '=', $id)
                    ->delete();
        return Response::make("", 200);
	}

}