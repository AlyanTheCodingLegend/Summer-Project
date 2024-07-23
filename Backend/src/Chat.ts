import { User } from "./User";
import { MessageType } from "./ChatManager";

export class Chat {
    id: number
    users: User[]
    messages: MessageType[]

    constructor(id: number) {
        this.id = id;
        this.users = []
        this.messages = []
    }

    addUser(user: User) {
        this.users.push(user)
    }

    removeUser(userId: number) {
        this.users = this.users.filter(u => u.id !== userId)
    }

    addMessage(message: MessageType) {
        this.messages.push(message)
    }
}