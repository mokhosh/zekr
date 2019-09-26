<?php

namespace App\Http\Controllers;

use GuzzleHttp\Exception\BadResponseException;
use Illuminate\Auth\Events\Registered;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Http\Request;
use GuzzleHttp\Client;
use App\User;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        $http = new Client;

        try {
            $response = $http->post(url('oauth/token'), [
                'form_params' => [
                    'grant_type' => 'password',
                    'client_id' => config('auth.passport.client_id'),
                    'client_secret' => config('auth.passport.client_secret'),
                    'username' => $request->username,
                    'password' => $request->password,
                ]
            ]);

            return $response->getBody();
        } catch (BadResponseException $e) {
            switch ($e->getCode()) {
                case 400:
                    return response()->json('Invalid Request. Enter username and password.', $e->getCode());
                case 401:
                    return response()->json('Credentials didn\'t match our records.', $e->getCode());
                default:
                    return response()->json('Something went wrong.', $e->getCode());
            }
        }
    }

    public function refresh(Request $request)
    {
        $http = new Client;

        try {
            $response = $http->post(url('oauth/token'), [
                'form_params' => [
                    'grant_type' => 'refresh_token',
                    'client_id' => config('auth.passport.client_id'),
                    'client_secret' => config('auth.passport.client_secret'),
                    'refresh_token' => $request->refresh_token,
                    'scope' => '',
                ]
            ]);

            return $response->getBody();
        } catch (BadResponseException $e) {
            switch ($e->getCode()) {
                case 400:
                    return response()->json('Invalid Request. Enter refresh token.', $e->getCode());
                case 401:
                    return response()->json('Token didn\'t match our records.', $e->getCode());
                default:
                    return response()->json('Something went wrong.', $e->getCode());
            }
        }
    }

    public function register(Request $request)
    {
        $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'string', 'email', 'max:255', 'unique:users'],
            'password' => ['required', 'string', 'min:8'],
        ]);

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);

        event(new Registered($user));

        return response()->json(['access_token' => $user->createToken('register-token')->accessToken]);
    }

    public function logout()
    {
        Auth::user()->tokens()->update(['revoked' => true]);

        return response()->json('Logged out.', 200);
    }

    public function user(Request $request) {
        return $request->user()->load('reading');
    }
}
