<?php

namespace App\Services\Interfaces;

interface UserServiceInterface extends ServiceInterface
{
    public function findByEmail(string $email);
    public function changePassword($id, string $newPassword);
}