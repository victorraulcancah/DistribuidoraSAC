<?php

namespace App\Exceptions;

use Exception;
use Throwable;

class ServiceException extends Exception
{
    protected array $errors = [];

    public function __construct(string $message = 'Error en el servicio', int $code = 500, ?Throwable $previous = null, array $errors = [])
    {
        parent::__construct($message, $code, $previous);
        $this->errors = $errors;
    }

    public function getErrors(): array
    {
        return $this->errors;
    }

    public function withErrors(array $errors): static
    {
        $this->errors = $errors;
        return $this;
    }
}