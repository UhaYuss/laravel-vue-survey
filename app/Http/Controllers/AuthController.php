<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\Rules\Password;


class AuthController extends Controller
{

    public function register(Request $request)
    {
        $data = $request->validate([
            'name' => 'required|string',
            'email' => 'required|email|string|unique:users,email',
            'password' => [
                'required',
                'string',
                Password::min(8)->letters()->mixedCase()->numbers()->symbols()
            ]
        ]);
        /**
         * @var User $user
         */
        $user = User::create([
            'name' => $data['name'],
            'email' => $data['email'],
            'password' => bcrypt($data['password'])
        ]);
        $token = $user->createToken('main')->plainTextToken;
        return response(
            [
                'user' => $user,
                'token' => $token
            ],
            201
        );
    }
    public function login(Request $request)
    {
        $data = $request->validate([
            'email' => 'required|email|string',
            'password' => 'required|string',
            'remember' => 'boolean'
        ]);
        $rememeber = $data['remember'] ?? false;
        unset($data['remember']);
        if (!Auth::attempt($data,$rememeber)) {
            return response(['message' => 'Invalid credentials'], 422);
        }
        $user = Auth::user();
        $token = $user->createToken('main')->plainTextToken;
        return response(
            [
                'user' => $user,
                'token' => $token
            ],
            200
        );
    }
    public function logout ()
    {
       /**@var User $user**/
        $user = Auth::user();
        $user->currentAccessToken()->delete();
        return response([
            'success' => true
        ]);
    }
}
