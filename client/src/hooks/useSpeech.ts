import { useEffect, useState } from 'react';

interface UseSpeechProps {
  langCode?: string;
}

const useSpeech = ({ langCode = 'en-US' }: UseSpeechProps) => {
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);
  const [speechSynthesisUtterance, setSpeechSynthesisUtterance] =
    useState<SpeechSynthesisUtterance | null>(null);

  useEffect(() => {
    const utterance = new SpeechSynthesisUtterance();
    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    function setVoiceList() {
      const availableVoices = speechSynthesis.getVoices();
      setVoices(
        availableVoices.filter((voice) => voice.lang.startsWith(langCode))
      );
    }

    setVoiceList();
    speechSynthesis.onvoiceschanged = setVoiceList;

    if (voices.length > 0) {
      utterance.voice = voices[0];
    }

    setSpeechSynthesisUtterance(utterance);

    return () => {
      window.speechSynthesis.cancel();
      speechSynthesis.onvoiceschanged = null;
    };
  }, [langCode, voices.length]);

  const speak = (text: string) => {
    if (speechSynthesisUtterance && !window.speechSynthesis.speaking) {
      speechSynthesisUtterance.text = text;
      window.speechSynthesis.speak(speechSynthesisUtterance);
    }
  };

  return { speak, isSpeaking, voices };
};

export default useSpeech;
