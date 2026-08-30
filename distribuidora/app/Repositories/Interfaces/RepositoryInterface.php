<?php

namespace App\Repositories\Interfaces;

interface RepositoryInterface
{
    public function all(array $columns = ['*']);
    public function find($id, array $columns = ['*']);
    public function create(array $data);
    public function update($id, array $data);
    public function delete($id);
    public function findBy(string $field, $value, array $columns = ['*']);
}
