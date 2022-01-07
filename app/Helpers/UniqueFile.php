<?php

namespace App\Helpers;

use Illuminate\Http\UploadedFile;

class UniqueFile
{
    public static function move(UploadedFile $file): string
    {
        $extension = $file->extension();
        $file_name_without_extension = basename($file->getClientOriginalName(), "." . $file->extension());
        $uniqueness_salt = time() . '_' . rand(111, 999) . rand(111, 999);
        $file_name_with_extension = "{$file_name_without_extension}_{$uniqueness_salt}.{$extension}";
        $import_directory = public_path(Path::os_safe('uploads'));

        $file->move($import_directory, $file_name_with_extension);

        return "uploads\\$file_name_with_extension";
    }
}
