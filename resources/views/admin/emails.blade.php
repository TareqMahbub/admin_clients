@component('mail::message')
# Weekly Clients List


{!! $client_list !!}


@component('mail::button', ['url' => ''])
Button Text
@endcomponent

Thanks,<br>
{{ config('app.name') }}
@endcomponent
