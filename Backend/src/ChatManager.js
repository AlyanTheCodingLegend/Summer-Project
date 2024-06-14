import { User } from "./User"
import { Chat } from "./Chat"

export class ChatManager {
    constructor(chats) {
        this.chats = []
    }

    addUserToChat(userId, chatId, socket) {
        const user = new User(userId, socket)
        const chat = this.chats.find(c => c.id === chatId)
        if (!chat) {
            chat = new Chat(chatId)
        }
        chat.addUser(user)
        socket.send(JSON.stringify({ type: 'joinsuccess', chatId: chatId }))
    }

    removeUserFromChat(userId, chatId, socket) {
        const chat = this.chats.find(c => c.id === chatId)
        if (chat) {
            chat.removeUser(userId)
            socket.send(JSON.stringify({ type: 'leavesuccess' }))
        } else {
            console.error(`Chat with id ${chatId} not found`)
            socket.send(JSON.stringify({ type: 'leavefailure' }))
        }
    }

    addHandler(socket) {
        socket.on('message', (data) => {
            const message = JSON.parse(data.toString())
            switch(message.type) {
                case 'join':
                    this.addUserToChat(message.userId, message.chatId, socket)
                    break
                case 'leave':
                    this.removeUserFromChat(message.userId, message.chatId, socket)
                    break
                case 'messagesent':
                    this.broadcastMessage(socket, message.chatId, JSON.stringify({ type: 'messagereceived', from: message.userId, text: message.text}))
                    break
                default:
                    console.error(`Unknown message type: ${message.type}`)
                    break
            }
        })

        socket.on('close', () => {
            console.log("Client disconnected!")
        })
    }

    broadcastMessage(socket, chatId, message) {
        const chat = this.chats.find(c => c.id === chatId)
        if (chat) {
            chat.users.forEach(u => {
                if (u.socket !== socket) {
                    u.socket.send(JSON.stringify(message))
                }
            })
        } else {
            console.error(`Chat with id ${chatId} not found`)
        }
    }
}