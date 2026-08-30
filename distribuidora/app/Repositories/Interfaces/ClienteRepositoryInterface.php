<?php

namespace App\Repositories\Interfaces;

interface ClienteRepositoryInterface extends RepositoryInterface
{
    public function findByDocumento(string $numeroDocumento);

    public function findByRazonSocial(string $razonSocial);

    public function paginate(int $perPage = 15, array $filters = []);
}
