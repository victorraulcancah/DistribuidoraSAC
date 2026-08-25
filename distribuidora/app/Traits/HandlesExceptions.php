<?php

namespace App\Traits;

use App\Exceptions\ServiceException;
use Throwable;

trait HandlesExceptions
{
    protected function execute(callable $callback, string $errorMessage = 'Error en la operación', int $code = 500)
    {
        try {
            return $callback();
        } catch (ServiceException $e) {
            throw $e;
        } catch (Throwable $e) {
            throw new ServiceException($errorMessage, $code, $e);
        }
    }

    protected function executeOrFail(callable $callback, string $errorMessage = 'Error en la operación', int $code = 500)
    {
        try {
            return $callback();
        } catch (ServiceException $e) {
            throw $e;
        } catch (Throwable $e) {
            report($e);
            throw new ServiceException($errorMessage, $code, $e);
        }
    }
}