<?php

namespace App\Exceptions;

class ValidationException extends ServiceException
{
    public function __construct(string $message = 'Error de validación', array $errors = [], ?\Throwable $previous = null)
    {
        parent::__construct($message, 422, $previous, $errors);
    }
}