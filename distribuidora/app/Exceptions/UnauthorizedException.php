<?php

namespace App\Exceptions;

class UnauthorizedException extends ServiceException
{
    public function __construct(string $message = 'No autorizado', ?\Throwable $previous = null)
    {
        parent::__construct($message, 401, $previous);
    }
}