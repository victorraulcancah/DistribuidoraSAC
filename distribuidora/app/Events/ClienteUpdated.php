<?php

namespace App\Events;

use App\Models\Cliente;
use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Contracts\Broadcasting\ShouldBroadcastNow;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class ClienteUpdated implements ShouldBroadcastNow
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public function __construct(public Cliente $cliente)
    {
    }

    public function broadcastOn(): array
    {
        return [new Channel('clientela.clientes')];
    }

    public function broadcastAs(): string
    {
        return 'ClienteUpdated';
    }

    public function broadcastWith(): array
    {
        return [
            'cliente' => $this->cliente->fresh('vendedor'),
        ];
    }
}
