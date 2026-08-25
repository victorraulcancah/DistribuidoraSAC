<?php

namespace App\Exceptions;

class NotFoundException extends ServiceException
{
    public function __construct(string $message = 'Recurso no encontrado', ?\Throwable $previous = null)
    {
        parent::__construct($message, 404, $previous);
    }
}