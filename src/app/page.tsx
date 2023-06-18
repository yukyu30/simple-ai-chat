'use client';
import Image from 'next/image';
import MessageForm from '@/components/MessageForm';
import { useState } from 'react';
import { Message } from '@/types';

export default function Home() {
  const [messages, setMessages] = useState<Message[]>([]);
  const addMessage = (message: Message) => {
    setMessages((prevMessages: Message[]) => [...prevMessages, message]);
    console.log('Added message:', message);
    console.log(messages);
  };

  return (
    <main className="flex-center flex-col min-h-screen bg-gray-800 text-white">
      <div className="p-2">
        {messages.map((message, index) => (
          <ul key={index}>
            <p>{message.content}</p>
          </ul>
        ))}
      </div>
      <div className="fixed bottom-0 w-full max-w-full p-4">
        <MessageForm addMessage={addMessage} />
      </div>
    </main>
  );
}
