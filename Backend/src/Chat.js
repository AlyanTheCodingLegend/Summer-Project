export class Chat {
    constructor(id) {
        this.id = id;
        this.users = []
    }

    addUser(user) {
        this.users.push(user)
    }

    removeUser(user) {
        this.users = this.users.filter(u => u.id !== user.id)
    }
}