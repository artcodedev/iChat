import { useState, useEffect, useRef, useCallback } from 'react';

export const useSpeechRecognition = (onResult: (text: string) => void) => {
  const [isRecording, setIsRecording] = useState(false);
  const [errorSpeech, setErrorSpeech] = useState<string | null>(null);
  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    
    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      // default ru-RU
      recognition.lang = 'ru-RU';

      recognition.onresult = (event: any) => {
        onResult(event.results[0][0].transcript);
      };

      recognition.onspeechend = () => {
        recognition.stop();
        setIsRecording(false);
      };

      recognition.onend = () => setIsRecording(false);
      
      recognition.onerror = (event: any) => {
        console.error('Speech error:', event.error);
        if (event.error === 'not-allowed') {
          setErrorSpeech('microphone-denied');
        }
        setIsRecording(false);
      };

      recognitionRef.current = recognition;
    }
  }, [onResult]);

  const startRecording = useCallback(() => {
    setErrorSpeech(null);
    if (recognitionRef.current) {
      try {
        recognitionRef.current.start();
        setIsRecording(true);
      } catch (e) {
        console.error(e);
      }
    }
  }, []);

  const stopRecording = () => {
    if (recognitionRef.current) {
      recognitionRef.current.abort();
      setIsRecording(false);
    }
  };

  return {
    isRecording,
    startRecording,
    stopRecording,
    errorSpeech,
    clearErrorSpeech: () => setErrorSpeech(null)
  };
};