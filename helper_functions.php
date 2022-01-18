<?php
// START LARAVEL ME UPLOAD FILE K LYE HELPER CODE
function uploadFile($file, $path)
{
    $name = time().'-'.str_replace(' ', '-', $file->getClientOriginalName());
    $file->move($path,$name);
    return $path.'/'.$name;
}
// END LARAVEL ME UPLOAD FILE K LYE HELPER CODE

// START FUNCTION JO POINT WAALI BARI DECIMAL VALUES KO POINT K BAAD 2 VALUES TAK RESTRICT KARTA HE
function twoDecimal($value)
{
	$foo = $value;
	return  number_format((float)$foo, 2, '.', '');  // Outputs -> 105.00
}
// END FUNCTION JO POINT WAALI BARI DECIMAL VALUES KO POINT K BAAD 2 VALUES TAK RESTRICT KARTA HE

// START TIME AND DATE KO CONCATENATE KAR K UNIQUE NUMBER LE KAR ANA JO ZINDAGI ME KABI REPEAT NAI HO GA
function get_date_time_numbering()
{
    $time=date('his');
    $date = date('dmY');
    return $date.$time;
}
// END TIME AND DATE KO CONCATENATE KAR K UNIQUE NUMBER LE KAR ANA JO ZINDAGI ME KABI REPEAT NAI HO GA

// START GET ONLY N RANDOM NUMBERS
function random_number($digits)
{
	$digits = 3;
	return rand(pow(10, $digits-1), pow(10, $digits)-1);
}
// END GET ONLY N RANDOM NUMBERS

// START LARAVEL ME EMAIL SEND KARNEY K LYE GET_DEFINED_VARS SE DATA AUTO PASS KARNA
function testMail()
{
    $email="kashif@gmail.com";
    $name="Kashif ali";
    $phone="3405834095";
    Mail::send('emails.engineer.test',get_defined_vars(), function ($send) use($email)
        {
            $send->to($email)->subject('Reset Password');
        });
}
// END LARAVEL ME EMAIL SEND KARNEY K LYE GET_DEFINED_VARS SE DATA AUTO PASS KARNA

// START REST PASSWORD OR UPDATE PROFILE K LARAVEL FUNCTIONS
public function resetPassword(Request $request)
    {
        $user=auth()->user();
        $password=$user->password;
        $this->validate($request, [
            'old_password' => 'required',
            'new_password' => 'required|min:8',
            'confirm_password' =>'required|same:new_password'
        ]);
        if (Hash::check($request->old_password, $password)) 
        {
            //add logic here
            $user->password = Hash::make($request->new_password);
            $user->save();
            // logout after changing password
            Auth::logout();
            return redirect('/login')->with('success','password changed successfully');
        }
        else
        {
            return redirect()->back()->with('error','Incorrect Old Password');
        }
    }

    public function updateProfile(Request $request)
    {
        $user =  auth()->user();
        $old_email=$user->email;
        $user->name = $request->name;
        $user->email = $request->email;
        $user->save();
        $contact=Contact::where("email",$old_email)->first();
        $contact->email=$request->email;
        $contact->save();
        // logout after changing name/email
        Auth::logout();
        return redirect('/login')->with('success','Credentials changed successfully,please use new credentials to SignIn');
    }
// END REST PASSWORD OR UPDATE PROFILE K LARAVEL FUNCTIONS

// START LARAVEL ME HARD CACHE KO REMOVE YA CLEAR KRNEY K LYE CODE
    Route::get('/clear-cache', function() {
    $exitCode = Artisan::call('cache:clear');
    $exitCode = Artisan::call('config:cache');
    $exitCode = Artisan::call('route:clear');
    return 'CACHE CLEARED'; //Return anything
    });
// END LARAVEL ME HARD CACHE KO REMOVE YA CLEAR KRNEY K LYE CODE

// START LARAVEL ME CARBON ME COMMON DATE PARSE KAR K PHIR DAY GET KARNA
    $day = Carbon::parse($common_php_date)->format("l");
// END LARAVEL ME CARBON ME COMMON DATE PARSE KAR K PHIR DAY GET KARNA

// START VIEW K SAATH OR VARIABLES B RENDER KARWANEY K LYE CONTROLLER KA CODE
    return response()->json([
        'html' => view('ajax.order_list',get_defined_vars())->render(),
        'description' => $list->description,
    ]);
// END VIEW K SAATH OR VARIABLES B RENDER KARWANEY K LYE CONTROLLER KA CODE

?>