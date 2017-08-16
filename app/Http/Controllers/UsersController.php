<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests\LoginUser;
use App\Http\Requests\RegisterUser;
use App\User;
use JWTAuth;

/**
 * Class UsersController
 *
 * @package App\Http\Controllers
 * @author Erik Campobadal <soc@erik.cat>
 */
class UsersController extends Controller
{
    public function register(RegisterUser $request)
    {
        $user = User::create($request->only(['name', 'email', 'password']));

        return response([
            'status' => 'success',
            'msg' => 'Account created',
            'data' => $user
        ], 200);
    }

    /**
     * Returns the authentication token if the credentials are correct.
     *
     * @author Erik Campobadal <soc@erik.cat>
     *
     * @param  LoginRequest $request
     *
     * @return json
     */
    public function login(LoginUser $request)
    {
        $credentials = $request->only('email', 'password');

        if (!$token = JWTAuth::attempt($credentials)) {
            return response([
                'status' => 'error',
                'error' => 'invalid.credentials',
                'msg' => 'Invalid Credentials'
            ], 400);
        }

        return response([
            'status' => 'success',
            'msg' => 'Login successful!'
        ])
        ->header('Authorization', $token);
    }

    /**
     * Returns the current logged in user.
     *
     * @author Erik Campobadal <soc@erik.cat>
     *
     * @param  Request $request
     *
     * @return json
     */
    public function user(Request $request)
    {
        $user = auth()->user();

        $user['avatar'] = $user->avatar(100, 'blue');

        return response([
            'status' => 'success',
            'data' => $user
        ]);
    }

    /**
     * Invalidates the current request token.
     *
     * @author Erik Campobadal <soc@erik.cat>
     *
     * @return json
     */
    public function logout()
    {
        JWTAuth::invalidate();

        return response([
            'status' => 'success',
            'msg' => 'Logged out'
        ], 200);
    }

    /**
     * Refreshes the current token.
     *
     * @author Erik Campobadal <soc@erik.cat>
     *
     * @return json
     */
    public function refresh()
    {
        return response([
            'status' => 'success'
        ]);
    }
}
