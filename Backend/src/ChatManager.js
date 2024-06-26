import { User } from "./User.js"
import { Chat } from "./Chat.js"

export class ChatManager {
    constructor() {
        this.chats = []
    }

    addUserToChat(userId, chatId, socket) {
        const user = new User(userId, socket)
        let chat = this.chats.find(c => c.id === chatId)
        if (!chat) {
            chat = new Chat(chatId)
            this.chats.push(chat)
            console.log(`Created new chat with id: ${chatId}`)
        }
        chat.addUser(user)
        socket.send(JSON.stringify({ type: 'joinsuccess', chatId: chatId, messages: chat.messages }))
        console.log(`User ${userId} joined chat ${chatId}`)
    }

    removeUserFromChat(userId, chatId, socket) {
        const chat = this.chats.find(c => c.id === chatId)
        if (chat) {
            chat.removeUser(userId)
            console.log(`User ${userId} left chat ${chatId}`)
            socket.send(JSON.stringify({ type: 'leavesuccess' }))
        } else {
            console.error(`Chat with id ${chatId} not found`)
            socket.send(JSON.stringify({ type: 'leavefailure' }))
        }
    }

    addMessageToChat(chatId, message) {
        const chat = this.chats.find(c => c.id === chatId)
        if (chat) {
            chat.addMessage(message)
            this.broadcastMessageIncludingSender(chatId, JSON.stringify({ type: 'messagereceived', messages: chat.messages}))
        } else {
            console.error(`Chat with id ${chatId} not found`)
        }
    }

    addVoiceToChat(chatId, message) {
        const chat = this.chats.find(c => c.id === chatId)
        if (chat) {
            chat.addMessage(message)
            this.broadcastMessageIncludingSender(chatId, JSON.stringify({ type: 'voicereceived', messages: chat.messages}))
        } else {
            console.error(`Chat with id ${chatId} not found`)
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
                    this.addMessageToChat(message.chatId, { from: message.userId, text: message.text })
                    break
                case 'voicesent':
                    this.addVoiceToChat(message.chatId, { from: message.userId, audio: message.audio })
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

    broadcastMessageIncludingSender(chatId, message) {
        const chat = this.chats.find(c => c.id === chatId)
        if (chat) {
            chat.users.forEach(u => {
                u.socket.send(message)
            })
        } else {
            console.error(`Chat with id ${chatId} not found`)
        }
    }

    broadcastMessage(socket, chatId, message) {
        const chat = this.chats.find(c => c.id === chatId)
        if (chat) {
            chat.users.forEach(u => {
                if (u.socket!==socket) {
                    u.socket.send(message)
                }    
            })
        } else {
            console.error(`Chat with id ${chatId} not found`)
        }
    }
}