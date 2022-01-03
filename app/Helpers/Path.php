<?php

namespace App\Helpers;

class Path
{
    public static function ds(): string
    {
        return DIRECTORY_SEPARATOR;
    }

    /**
     * Returns OS safe path
     *
     * @param string $path
     * @return string
     */
    public static function os_safe(string $path): string
    {
        return str_replace(array('/', '\\'), array(self::ds(), self::ds()), $path);
    }
}
