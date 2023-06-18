'use client';

import { useState } from 'react';
import styles from './MessageForm.module.scss';
import { Message } from '@/types';

interface MessageFormProps {
  addMessage: (message: Message) => void;
}

const MessageForm = (props: MessageFormProps) => {
  const [value, setValue] = useState('');

  const endpoint: string =
    process.env.NEXT_PUBLIC_API_ENDPOINT || 'http://localhost:3000/api';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!value.trim()) return;
    console.log('Sending message:', value);
    // 送信したメッセージを表示
    props.addMessage({ role: 'user', content: value });
    setValue('');
    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ content: value }),
      });
      const data = await response.json();
      props.addMessage(data.message);
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  return (
    <form className="flex gap-x-4" onSubmit={handleSubmit}>
      <input
        type="text"
        className="flex-auto rounded-md border-0 bg-white/5 px-3.5 py-2 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="メッセージを入力してください"
      />
      <button
        type="submit"
        className="flex-none rounded-md bg-indigo-500 shadow-lg shadow-indigo-500/50 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
      >
        つくる
      </button>
    </form>
  );
};

export default MessageForm;
