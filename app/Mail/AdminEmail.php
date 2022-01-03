<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class AdminEmail extends Mailable
{
    use Queueable, SerializesModels;

    private $clients;

    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct(array $clients)
    {
        $this->clients = $clients;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        $client_list = '';

        foreach($this->clients as $client){
            $client_list .= "* {$client['name']}, {$client['email']}" . PHP_EOL;
        }

        return $this->markdown('admin.emails', ['client_list' => $client_list]);
    }
}
