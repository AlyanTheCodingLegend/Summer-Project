import { WebSocket } from "ws";

export class User {
    id: number
    socket: WebSocket

    constructor(id: number, socket: WebSocket) {
        this.id = id;
        this.socket = socket;
    }
}