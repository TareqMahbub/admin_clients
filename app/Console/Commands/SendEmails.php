<?php

namespace App\Console\Commands;

use App\Mail\AdminEmail;
use App\Models\Admin;
use App\Models\Client;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;

class SendEmails extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'send:emails';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Sends weekly emails';

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Execute the console command.
     *
     * @return int
     */
    public function handle()
    {
        ini_set('max_execution_time', '0');

        Admin::query()->orderBy('id')->chunk(100, function ($admins) {
            foreach($admins as $admin){
                Client::query()->where('admin_id', $admin->id)->orderBy('id')->chunk(100, function ($clients) use($admin) {

                    /**
                     * Original Mail Sending Code
                     */
                    //Mail::to([ $admin->email ])->send(new AdminEmail($clients));

                    /**
                     * Outputing to Log File
                     */
                    $mail = new AdminEmail($clients->toArray());
                    Log::debug($mail->render());
                });
            }
        });

        return 0;
    }
}
