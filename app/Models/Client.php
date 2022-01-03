<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Client extends Model
{
    use HasFactory;

    protected $fillable = [
        'admin_id',
        'name',
        'email',
        'profile_picture',
    ];

    public function service(): BelongsTo
    {
        return $this->belongsTo(Service::class);
    }
}
