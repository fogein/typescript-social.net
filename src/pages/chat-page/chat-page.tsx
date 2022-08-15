import { Button } from 'antd'
import React, { useEffect, useState } from 'react'


export type ChatMessageType = {
  message: string
  photo: string
  userId: number
  userName: string
}

export const ChatPage: React.FC = () => {
  return (
    <Chat />
  )
}







export const Chat: React.FC = () => {

  const [wsChanel, setWsChanel] = useState<WebSocket | null>(null)

  useEffect(() => {
    let ws: WebSocket;
    const removeHandler = () => {
      setTimeout(createChanel, 3000)
      console.log('CLOSE WS');
    }

    function createChanel() {

      ws?.removeEventListener('close', removeHandler)
      ws?.close()

      ws = new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx')
      setWsChanel(ws)
    }
    createChanel()

    return () => {
      ws.removeEventListener('close', removeHandler)
      ws.close()
    }

  }, [])


  return (
    <>
      <Messages wsChanel={wsChanel} />
      <AddMessageForm wsChanel={wsChanel} />
    </>
  )
}







export const Messages: React.FC<{ wsChanel: WebSocket | null }> = ({ wsChanel }) => {

  const [messages, setMessages] = useState<ChatMessageType[]>([])

  useEffect(() => {
    const setMessageHadler = (e:MessageEvent) => {
      setMessages((prevMessages) => [...prevMessages, ...JSON.parse(e.data)])
    }
    wsChanel?.addEventListener('message', setMessageHadler )

    return () => {
      wsChanel?.removeEventListener('message',setMessageHadler)
      wsChanel?.close()
    }
  }, [wsChanel])

  return (
    <div style={{ height: '400px', overflowY: 'auto', }}>
      {messages.map((message, index) => <Message key={index} message={message} />)}
    </div>
  )
}
export const Message: React.FC<{ message: ChatMessageType }> = ({ message }) => {

  return (
    <>
      <img style={{ width: '50px' }} src={message.photo} alt="" />
      <b>{message.userName}</b>
      <br />
      {message.message}
      <hr />
    </>
  )
}





export const AddMessageForm: React.FC<{ wsChanel: WebSocket | null }> = ({ wsChanel }) => {
  const [message, setMessage] = useState('')
  const [readyStatus, setReadyStatus] = useState<'pending' | 'ready'>('pending')

  useEffect(() => {
    const openHadler = () => {
      setReadyStatus('ready')
    }
    wsChanel?.addEventListener('open', openHadler)
    return () => {
      wsChanel?.removeEventListener('open', openHadler)
      wsChanel?.close()
    }
  }, [wsChanel])

  const sendMessage = () => {
    if (!message) {
      return
    } wsChanel?.send(message)
    setMessage('')
  }
  return (
    <>
      <div>
        <textarea style={{ width: '100%', marginTop: '10px' }} value={message} onChange={(e) => setMessage(e.currentTarget.value)}></textarea>
      </div>
      <div>
        <Button size='large' shape='round' danger={true} type={'primary'} loading={wsChanel === null || readyStatus !== 'ready'} onClick={sendMessage}>send</Button>
      </div>
    </>
  )
}
