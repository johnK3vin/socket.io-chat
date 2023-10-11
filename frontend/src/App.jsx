import io from 'socket.io-client';
import { useState, useEffect } from 'react';
const socket = io("/")

const App = () => {
  const [message, setMessage] = useState('')
  const [messages, setMessages] = useState([])

  const handleSubmit = (e) =>{
    e.preventDefault()
    const newMessage = {
      body: message,
      from: 'me'
    }
    setMessages([...messages, newMessage])
    socket.emit("message", message)
  }

  useEffect(() =>{
    socket.on("message", recivirMessage)

    return () =>{
      socket.off("message", recivirMessage)
    }
  }, [])

  const recivirMessage = (message) => {setMessages(state => [...state, message])}

  return (
    <div className='h-screen bg-zinc-800 text-white flex items-center justify-center'>
      <form onSubmit={handleSubmit} className='bg-zinc-900 p-10'>
        <h1 className='text-2xl font-bold my-2'>chat react</h1>
        <input  className="border-2 border-zinc-500 p-2 w-full text-black" type="text" placeholder='mensaje..' onChange={(e) => setMessage(e.target.value)}/>
        <ul>
        {
        messages.map((message, i)=>(
          <li key={i} 
            className={`my-2 p-2 table rounded-md ${message.from === 'me' ? 'bg-sky-700 ml-auto' : 'bg-black mr-auto'}`}>
            <span className={`text-xs block ${message.from === 'me' ? "text-slate-200" : "text-slate-500"}`}>{message.from}</span>{message.body}
          </li>
        ))
        }
      </ul>
      </form>
    </div>
  )
}

export default App