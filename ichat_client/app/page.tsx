"use client";

import { useState, useRef, useEffect, useMemo, useCallback } from "react";
import toast, { Toaster } from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";
import ChatMessage from "./Components/ChatMessage.component";
import ChatInput from "./Components/ChatInput.component";
import MainHeader from "./Components/MainHeader.component";
import ThinkMessage from "./Components/ThinkMessage.component";


// поменять на проде или на тот порт пр разработке
const ip: string = "http://localhost:3001";

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'bot';
  isNew?: boolean;
}

interface AnswersResponse {
  status: number;
  message?: string;
  data?: {
    answer: string;
    [key: string]: any; 
  };
}

export default function VoiceChat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isThinking, setIsThinking] = useState<boolean>(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const isLanding: boolean = useMemo(() => messages.length === 0, [messages.length]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isThinking]);

  const showErrorMessage = useCallback((message: string): void => {
    toast.error(message, {
      style: {
        borderRadius: "10px",
        background: "#1a3675",
        color: "#fff",
        border: "1px solid rgba(255,255,255,0.1)",
      },
      duration: 4000,
    });
  }, []);

  const handleNewMessage = useCallback(async (text: string) => {
    if (!text.trim()) return;

    setMessages((prev) => [
      ...prev,
      { id: Date.now(), text, sender: "user" as const },
    ]);

    setIsThinking(true);

    try {
      const response = await fetch(`${ip}/api/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: text })
      });

      const data: AnswersResponse = await response.json();

      const botAnswer: string | undefined = data.data?.answer;

      if (data.status === 200 && botAnswer) {

        setMessages(prev => [...prev, {
          id: Date.now() + 1,
          text: botAnswer,
          sender: 'bot' as const,
          isNew: true
        }]);

      } else {
        // Как вариант ответа если добавить проверку на сервере что именно ответи OpenRouter что бы не отвечать длинным сообщением
        // showErrorMessage(data.message || 'Error from server');

        showErrorMessage('Error from server');
      }
    } catch (e: unknown) {
      showErrorMessage('Failed to connect to the server.');
    } finally {
      setIsThinking(false);
    }
  }, [showErrorMessage]); 

  return (
    <div className="h-screen bg-[#0a2661] text-white flex flex-col overflow-hidden">
      <Toaster position="top-center" reverseOrder={false} />

      <main className="relative flex-1 flex flex-col min-h-0 w-full">
        <AnimatePresence>{isLanding && <MainHeader />}</AnimatePresence>

        <div className="flex-1 overflow-y-auto px-6 pt-10 pb-30 scrollbar-thin scrollbar-thumb-blue-500">
          <div className="max-w-2xl mx-auto w-full flex flex-col space-y-6">
            <AnimatePresence>
              {!isLanding && (
                <>
                  {messages.map((msg) => (
                    <motion.div
                      key={msg.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                    >
                      <ChatMessage {...msg} />
                    </motion.div>
                  ))}
                  {isThinking && <ThinkMessage />}
                  <div ref={messagesEndRef} className="h-10" />
                </>
              )}
            </AnimatePresence>
          </div>
        </div>
      </main>

      <div
        className={`w-full px-5 md:px-20 lg:px-32 ${isLanding ? "pb-18" : "absolute bottom-[0px]"} z-20 flex`}
      >
        <motion.div
          layout
          transition={{ type: "spring", stiffness: 150, damping: 20 }}
          className={`w-full max-w-2xl ${!isLanding ? "mx-auto" : ""}`}
        >
          <ChatInput disabled={isThinking} onSendMessage={handleNewMessage} />
        </motion.div>
      </div>
    </div>
  );
}
