<?php

namespace Database\Seeders;

use App\Models\Admin;
use App\Models\Client;
use Illuminate\Database\Seeder;

class ClientSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $admins = Admin::all();

        foreach($admins as $admin){
            $clients = Client::factory()->count(20)->make();
            foreach($clients as $client){
                $client->admin_id = $admin->id;
                $client->save();
            }
        }
    }
}
