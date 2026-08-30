<?php

namespace App\Events;

use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Contracts\Broadcasting\ShouldBroadcastNow;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class ClienteDeleted implements ShouldBroadcastNow
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public function __construct(public int $clienteId)
    {
    }

    public function broadcastOn(): array
    {
        return [new Channel('clientela.clientes')];
    }

    public function broadcastAs(): string
    {
        return 'ClienteDeleted';
    }

    public function broadcastWith(): array
    {
        return [
            'cliente_id' => $this->clienteId,
        ];
    }
}
