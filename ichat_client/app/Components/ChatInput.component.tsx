import { Mic, Square, ChevronRight, Loader2 } from "lucide-react";
import { useState, memo } from "react";
import { useSpeechRecognition } from "../Hooks/useSpeechRecognition";
import { MicErrorModal } from "./MicErrorModal.component";

interface ChatInputProps {
  disabled: boolean;
  onSendMessage: (text: string) => void;
}

const ChatInput = memo(({ disabled, onSendMessage }: ChatInputProps) => {
  const [text, setText] = useState<string>("");
  const {
    isRecording,
    startRecording,
    stopRecording,
    errorSpeech,
    clearErrorSpeech,
  } = useSpeechRecognition(onSendMessage);

  const handleSend = () => {
    if (text.trim() && !disabled) {
      onSendMessage(text);
      setText("");
    }
  }

  return (
    <div className="w-full max-w-2xl relative mb-2 md:mb-10">

      <MicErrorModal
        isOpen={errorSpeech === "microphone-denied"}
        onClose={clearErrorSpeech}
      />

      <div className="relative flex items-center">
        <button
          onClick={isRecording ? stopRecording : startRecording}
          className={`absolute left-3 p-2 rounded-full transition-all ${
            isRecording
              ? "bg-red-500 animate-pulse text-white"
              : "text-blue-300 hover:bg-blue-800/20"
          }`}
        >
          {isRecording ? <Square size={20} fill="white" /> : <Mic size={24} />}
        </button>

        <input
          value={text}
          onChange={(e) => {
            if (!isRecording) setText(e.target.value);
          }}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
          placeholder={
            isRecording ? "I'm listening..." : "Ask whatever you want"
          }
          className="w-full bg-[#072e69] border-4 border-[#164288] py-5 pl-14 pr-20 rounded-2xl text-xl text-white focus:outline-none"
        />

        <button
          onClick={handleSend}
          className="absolute w-[70px] cursor-pointer h-[70px] right-[4px] flex justify-center items-center bg-[#2552b0] hover:bg-blue-600 p-3 rounded-xl transition-all"
        >
          {disabled ? (
            <Loader2 size={40} className="animate-spin text-blue-200" />
          ) : (
            <ChevronRight size={40} />
          )}
        </button>
      </div>
    </div>
  );
});

export default ChatInput;
