export class Chat {
    constructor(id) {
        this.id = id;
        this.users = []
        this.messages = []
    }

    addUser(user) {
        this.users.push(user)
    }

    removeUser(userId) {
        this.users = this.users.filter(u => u.id !== userId)
    }

    addMessage(message) {
        this.messages.push(message)
    }
}