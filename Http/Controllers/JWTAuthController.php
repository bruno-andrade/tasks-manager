<?php

namespace App\Http\Controllers;

use App\Http\Requests\RegisterRequest;
use App\Http\Requests\LoginRequest;
use App\Http\Resources\UserResource;
use App\Models\User;
use App\Traits\ApiResponse;
use Illuminate\Support\Facades\Hash;
use Tymon\JWTAuth\Facades\JWTAuth;
use Tymon\JWTAuth\Exceptions\JWTException;
use Illuminate\Http\JsonResponse;

class JWTAuthController extends Controller
{
    use ApiResponse;

    public function register(RegisterRequest $request): JsonResponse
    {

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);

        $token = JWTAuth::fromUser($user);

        return $this->success([
            'user' => new UserResource($user),
            'token' => $token
        ], "Usuário registrado com sucesso", 201);
    }

    public function login(LoginRequest $request): JsonResponse
    {
        $credentials = $request->only('email', 'password');

        if (!$token = JWTAuth::attempt($credentials)) {
            return $this->error("Credenciais inválidas", 401);
        }

        $user = auth()->user();

        return $this->success([
            'user' => new UserResource($user),
            'token' => $token
        ], "Login realizado com sucesso");
    }

    public function getUser(): JsonResponse
    {
        try {
            $user = JWTAuth::parseToken()->authenticate();
            if (!$user) {
                return $this->error("Usuário não encontrado", 404);
            }
        } catch (JWTException $e) {
            return $this->error("Token inválido", 400);
        }

        return $this->success(new UserResource($user), "Usuário autenticado");
    }

    public function logout(): JsonResponse
    {
        JWTAuth::invalidate(JWTAuth::getToken());
        return $this->success(null, "Logout realizado com sucesso");
    }
}
