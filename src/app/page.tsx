'use client';
import Image from 'next/image';
import MessageForm from '@/components/MessageForm';
import { useState } from 'react';
import { Message } from '@/types';

export default function Home() {
  const [messages, setMessages] = useState<Message[]>([]);
  const addMessage = (message: Message) => {
    setMessages((prevMessages: Message[]) => [...prevMessages, message]);
  };

  return (
    <main className="flex-center flex-col min-h-screen bg-gray-800 text-white">
      <div className="fixed bottom-0 w-full max-w-full p-4">
        <MessageForm addMessage={addMessage} />
      </div>
    </main>
  );
}
