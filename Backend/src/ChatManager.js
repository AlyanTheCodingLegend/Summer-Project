export class ChatManager {
    constructor(chats) {
        this.chats = []
    }

    addUserToChat(user, chatId) {
        const chat = this.chats.find(c => c.id === chatId)
        if (!chat) {
            chat = new Chat(chatId)
        }
        chat.addUser(user)
    }

    removeUserFromChat(user, chatId) {
        const chat = this.chats.find(c => c.id === chatId)
        if (chat) {
            chat.removeUser(user)
        } else {
            console.error(`Chat with id ${chatId} not found`)
        }
    }
}