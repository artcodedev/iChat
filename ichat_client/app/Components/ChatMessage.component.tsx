import { User, Bot } from 'lucide-react';
import { memo } from "react";
import { TypewriterMessage } from './TypewriterMessage.component';


interface ChatMessageProps {
  text: string;
  sender: 'user' | 'bot';
  isNew?: boolean;
}

const ChatMessage = memo(({ text, sender, isNew }: ChatMessageProps) => (
  <div className={`flex ${sender === 'user' ? 'justify-end' : 'justify-start'}`}>
    <div className={`flex items-end gap-2 max-w-[80%] ${sender === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
      <div className={`p-2 rounded-full ${sender === 'user' ? 'bg-blue-500' : 'bg-gray-600'}`}>
        {sender === 'user' ? <User size={16} /> : <Bot size={16} />}
      </div>
      <div className={`px-4 py-2 rounded-2xl shadow-sm ${
        sender === 'user' ? 'bg-[#2552b0] rounded-br-none' : 'bg-[#163a85] rounded-bl-none'
      }`}>
        {sender === 'bot' && isNew ? (
          <TypewriterMessage text={text} />
        ) : (
          text
        )}
      </div>
    </div>
  </div>
));

export default ChatMessage;