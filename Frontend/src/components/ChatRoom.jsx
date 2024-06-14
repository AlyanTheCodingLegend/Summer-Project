import { useEffect, useState } from 'react'

function ChatRoom() {
    const [text, setText] = useState('')
    const [socket, setSocket] = useState(null)
    const [chatId, setChatId] = useState(444)
    const [userId, setUserId] = useState(123)
    const [messages, setMessages] = useState([])

    const handleText = (e) => {
        setText(e.target.value)
    }

    const sendText = () => {
        socket.send(JSON.stringify({ type: 'messagesent', userId: userId, chatId: chatId, text: text }))
        setText('')
    }

    useEffect(() => {
        if (socket) {
            socket.onopen = () => {
                console.log('Connected to server')
                socket.send(JSON.stringify({ type: 'join', userId: userId, chatId: chatId }))
            }
            socket.onmessage = (message) => {
                handleReceivedText(message.data)
            }
            socket.onclose = () => {
                console.log('Disconnected from server')
                setSocket(null)
            }
        }    
    }, [socket])

    useEffect(() => {
        setUserId(Math.floor(Math.random() * 90000) + 10000)
    }, [])    

    const joinChat = () => {
        const ws = new WebSocket('ws://localhost:3000')
        setSocket(ws)
    }

    const leaveChat = () => {
        socket.send(JSON.stringify({ type: 'leave', userId: userId, chatId: chatId }))
    }

    const handleReceivedText = (data) => {
        const message = JSON.parse(data)
        switch(message.type) {
            case 'joinsuccess':
                console.log('Joined chat')
                setChatId(message.chatId)
                break
            case 'leavesuccess':
                console.log('Left chat')
                socket.close()
                break
            case 'leavefailure':
                console.log('Failed to leave chat')
                break
            case 'messagereceived':
                setMessages(prevMessages => [...prevMessages, message])
                break        
            default:
                console.error(`Unknown message type: ${message.type}`)
                break        
        }
    }

    return (
        <div className="bg-gray-900 h-screen w-screen flex flex-col justify-between items-center p-4">
            <div className="bg-white h-5/6 w-full max-w-2xl overflow-auto p-4 rounded shadow-md">
                {messages.map((msg, index) => (
                    <div key={index} className="p-2 mb-2 border-b border-gray-300 text-black">
                        <strong>{msg.from}:</strong> {msg.text}
                    </div>
                ))}
            </div>
            <div className="bg-white w-full max-w-2xl flex items-center p-4 rounded shadow-md mt-4">
                <input 
                    value={text} 
                    type="text" 
                    onChange={handleText} 
                    className="bg-gray-200 text-black w-full rounded-full p-2 mr-2" 
                    placeholder="Type your message here..."
                />
                <button 
                    className="bg-blue-500 text-white rounded-full p-2 w-20" 
                    onClick={sendText}
                >
                    Send
                </button>
            </div>
            <div className="absolute bottom-20 left-4 flex space-x-2">
                <button 
                    className="bg-green-500 hover:bg-green-700 text-white p-2 rounded" 
                    onClick={joinChat} 
                    disabled={socket !== null}
                >
                    Join
                </button>
                <button 
                    className="bg-red-500 hover:bg-red-700 text-white p-2 rounded" 
                    onClick={leaveChat} 
                    disabled={socket === null}
                >
                    Leave
                </button>
            </div>
        </div>
    );
}

export default ChatRoom