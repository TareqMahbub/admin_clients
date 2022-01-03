<?php

namespace App\Helpers;

class Token
{
    public static function basicToken(string $header)
    {
        $position = strrpos($header, 'Basic ');

        if ($position !== false) {
            $header = substr($header, $position + 6);

            return strpos($header, ',') !== false ? strstr(',', $header, true) : $header;
        }
    }
}
