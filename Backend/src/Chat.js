export class Chat {
    constructor(id) {
        this.id = id;
        this.users = []
    }

    addUser(user) {
        this.users.push(user)
    }

    removeUser(userId) {
        this.users = this.users.filter(u => u.id !== userId)
    }
}