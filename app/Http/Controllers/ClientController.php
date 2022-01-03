<?php

namespace App\Http\Controllers;

use App\Helpers\Path;
use App\Models\Client;
use Exception;
use Illuminate\Auth\Access\AuthorizationException;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Log;
use Illuminate\Auth\AuthenticationException;

class ClientController extends Controller
{
    public function index()
    {
        $access_key = request()->header('X-ACCESS-KEY');
        $auth_record = json_decode(Cache::get($access_key), true);
        $admin_id = $auth_record['admin_id'];

        $per_page = request()->get('per_page') ?? 10;
        if($per_page > 50) $per_page = 50;

        return Client::query()
                ->where('admin_id', $admin_id)
                ->orderBy('id', 'desc')
                ->paginate($per_page);
    }


    public function fetch(Client $client)
    {
        $access_key = request()->header('X-ACCESS-KEY');
        $auth_record = json_decode(Cache::get($access_key), true);
        $admin_id = $auth_record['admin_id'];
        if($client->admin_id != $admin_id){
            throw new AuthorizationException('Unauthorized.');
        }

        return $client;
    }


    public function add()
    {
        Log::debug(request()->__toString());
        $validated_inputs = request()->validate([
            'name' => 'required|string|max:100',
            'email' => 'required|string|max:255|email',
            'profile_picture' => 'nullable|image|mimes:jpg,bmp,png,gif|max:2048', //max 2 MB
        ]);

        if(!empty(request()->profile_picture)){
            try{
                $extension = request()->profile_picture->extension();
                $file_name_without_extension = basename(request()->profile_picture->getClientOriginalName(), "." . request()->profile_picture->extension());
                $uniqueness_salt = time() . '_' . rand(111, 999) . rand(111, 999);
                $file_name_with_extension = "{$file_name_without_extension}_{$uniqueness_salt}.{$extension}";
                $import_directory = public_path(Path::os_safe('uploads'));
                request()->file('profile_picture')->move($import_directory, $file_name_with_extension);

                $validated_inputs['profile_picture'] = "uploads\\$file_name_with_extension";
            }catch(Exception $e){
                Log::error("Failed to upload file. Exception details: " . $e->getMessage());
                return $this->make_api_response("Failed to add the client.", [], [ 'profile_picture' => [$e->getMessage()] ], 401);
            }
        }

        $access_key = request()->header('X-ACCESS-KEY');
        $auth_record = json_decode(Cache::get($access_key), true);
        if(empty($auth_record)){
            throw new AuthenticationException('Unauthenticated.');
        }

        $validated_inputs['admin_id'] = $auth_record['admin_id'];

        Client::create($validated_inputs);

        return $this->make_api_response("Client added Successful.");
    }


    public function update(Client $client)
    {
        $access_key = request()->header('X-ACCESS-KEY');
        $auth_record = json_decode(Cache::get($access_key), true);
        $admin_id = $auth_record['admin_id'];
        if($client->admin_id != $admin_id){
            throw new AuthorizationException('Unauthorized.');
        }

        $validated_inputs = request()->validate([
            'name' => 'nullable|string|max:100',
            'email' => 'nullable|string|max:255|email',
            'profile_picture' => 'nullable|image|file|mimes:jpg,bmp,png,gif|max:2048', //max 2 MB
        ]);

        if(!empty(request()->profile_picture)){
            try{
                $extension = request()->profile_picture->extension();
                $file_name_without_extension = basename(request()->profile_picture->getClientOriginalName(), "." . request()->profile_picture->extension());
                $uniqueness_salt = time() . '_' . rand(111, 999) . rand(111, 999);
                $file_name_with_extension = "{$file_name_without_extension}_{$uniqueness_salt}.{$extension}";
                $import_directory = public_path(Path::os_safe('uploads'));
                request()->file('profile_picture')->move($import_directory, $file_name_with_extension);

                $validated_inputs['profile_picture'] = "uploads\\$file_name_with_extension";
            }catch(Exception $e){
                Log::error("Failed to upload file. Exception details: " . $e->getMessage());
                return $this->make_api_response("Failed to update the client.", [], [ 'profile_picture' => [$e->getMessage()] ], 401);
            }
        }

        $old_profile_picture = $client->profile_picture;

        $client->update($validated_inputs);

        if(!empty($old_profile_picture)){
            try{
                File::delete($old_profile_picture);
            }catch(Exception $e){
                Log::error("Failed to deleted following file: $old_profile_picture. Exception details: " . $e->getMessage());
            }
        }

        return $this->make_api_response("Client updated Successfully.");
    }


    public function delete(Client $client)
    {
        $access_key = request()->header('X-ACCESS-KEY');
        $auth_record = json_decode(Cache::get($access_key), true);
        $admin_id = $auth_record['admin_id'];
        if($client->admin_id != $admin_id){
            throw new AuthorizationException('Unauthorized.');
        }

        if(!empty($client->profile_picture)){
            try{
                File::delete($client->profile_picture);
            }catch(Exception $e){
                Log::error("Failed to deleted following file: $client->profile_picture. Exception details: " . $e->getMessage());
                return $this->make_api_response("Failed to delete the client.", [], [ 'profile_picture' => [$e->getMessage()] ], 401);
            }
        }

        $client->delete();

        return $this->make_api_response("Client deleted Successfully.");
    }
}
