@extends('layouts.app')

@section('content')
<div class="mx-auto h-full flex justify-center items-center bg-gray-300">
    <div class="w-96 bg-blue-900 rounded-lg shadow-xl p-6">
        <h1 class="pb-8 text-white text-2xl">{{ __('auth.reset') }}</h1>
        @if (session('status'))
            <div class="alert alert-success" role="alert">
                {{ session('status') }}
            </div>
        @endif

        <form method="POST" action="{{ route('password.email') }}">
            @csrf

            <div class="relative">
                <label for="email" class="uppercase text-blue-500 text-xs font-bold absolute pl-3 pt-2">{{ __('auth.email') }}</label>

                <div class="col-md-6">
                    <input id="email" type="email" name="email" value="{{ old('email') }}" required autocomplete="email" autofocus
                           placeholder="{{ __('auth.email_placeholder') }}"
                           class="pt-8 w-full rounded p-3 bg-blue-800 outline-none focus:bg-blue-700 text-gray-100">

                    @error('email')
                        <span class="text-red-600 text-sm pt-1" role="alert"><strong>{{ $message }}</strong></span>
                    @enderror
                </div>
            </div>

            <div class="pt-8">
                <button type="submit" class="uppercase rounded font-bold text-blue-800 w-full py-2 px-3 text-left bg-gray-400">
                    {{ __('auth.send_link') }}
                </button>
            </div>
        </form>
    </div>
</div>
@endsection
