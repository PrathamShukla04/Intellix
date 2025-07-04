import React, { useRef, useState, useEffect, useContext } from 'react';
import { assets } from '../../assets/assets';
import { Context } from '../../Context/Context';

const isSpeechRecognitionSupported = 'webkitSpeechRecognition' in window;

const createSpeechRecognition = () => {
  const recognition = new window.webkitSpeechRecognition();
  recognition.lang = 'en-US';
  recognition.interimResults = false;
  recognition.maxAlternatives = 1;
  return recognition;
};

const Main = () => {
  const { onSent, recentPrompt, showResult, loading, resultData, setInput, input } = useContext(Context);
  const scrollRef = useRef(null);
  const [isListening, setIsListening] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [resultData]);

  const handleVoiceSearch = () => {
    if (!isSpeechRecognitionSupported) {
      alert('Voice recognition is not supported in this browser.');
      return;
    }

    const recognition = createSpeechRecognition();
    let voiceReceived = false;
    setIsListening(true);

    const timeoutId = setTimeout(() => {
      if (!voiceReceived) {
        recognition.stop();
        setIsListening(false);
      }
    }, 6000);

    recognition.onresult = (event) => {
      voiceReceived = true;
      clearTimeout(timeoutId);
      const transcript = event.results[0][0].transcript;
      setInput(transcript);
      setIsListening(false);
      onSent(transcript);
    };

    recognition.onerror = () => {
      clearTimeout(timeoutId);
      setIsListening(false);
    };

    recognition.onend = () => {
      clearTimeout(timeoutId);
      setIsListening(false);
    };

    recognition.start();
  };

  return (
    <div className="flex-1 h-screen px-4 py-6 overflow-y-auto bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-white flex flex-col justify-between">
      <div>
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl sm:text-3xl font-extrabold bg-gradient-to-r from-indigo-600 via-blue-500 to-purple-500 bg-clip-text text-transparent tracking-wide">
            Intellix
          </h1>
          <img src={assets.user_icon} alt="User" className="w-10 h-10 rounded-full object-cover dark:bg-white dark:p-1 dark:rounded-full" />
        </div>

        {!showResult ? (
          <>
            <div className="mb-6">
              <h1 className="text-2xl sm:text-3xl font-bold leading-snug">
                <span className="bg-gradient-to-r from-blue-600 to-purple-500 bg-clip-text text-transparent">
                  Welcome back, Dev...
                </span>
              </h1>
              <p className="text-base sm:text-lg mt-2 font-medium tracking-wide">
                What can I assist you with today?
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { text: 'What is the difference between a station and a junction?', icon: assets.compass_icon },
                { text: 'Summarize the term: Urbanization', icon: assets.bulb_icon },
                { text: 'Tell me how to sound cool...', icon: assets.message_icon },
                { text: 'What is source code?', icon: assets.code_icon },
              ].map((item, i) => (
                <div
                  key={i}
                  onClick={() => {
                    setInput(item.text);
                    onSent(item.text);
                  }}
                  className="flex items-center justify-between bg-white dark:bg-gray-800 rounded-xl shadow p-3 hover:shadow-lg transition cursor-pointer"
                >
                  <p className="text-sm sm:text-base font-medium">{item.text}</p>
                  <img src={item.icon} alt="icon" className="w-6 h-6 sm:w-8 sm:h-8 ml-2 dark:bg-white dark:p-1 dark:rounded-full" />
                </div>
              ))}
            </div>
          </>
        ) : (
          <div ref={scrollRef} className="result max-h-[60vh] overflow-y-auto scrollbar-hide space-y-6 px-2 sm:px-4">
            <div className="flex items-start gap-3">
              <img src={assets.user_icon} alt="User" className="w-9 h-9 rounded-full object-cover dark:bg-white dark:p-1 dark:rounded-full" />
              <p className="text-sm sm:text-base font-medium">{recentPrompt}</p>
            </div>

            <div className="flex items-start gap-3">
              <img src={assets.gemini_icon} alt="Gemini" className="w-6 h-6 mt-1 dark:bg-white dark:p-1 dark:rounded-full" />
              {loading ? (
                <div className="flex-1 flex items-center justify-center gap-2">
                  <span className="w-2.5 h-2.5 bg-blue-500 rounded-full animate-bounce delay-0"></span>
                  <span className="w-2.5 h-2.5 bg-blue-500 rounded-full animate-bounce delay-150"></span>
                  <span className="w-2.5 h-2.5 bg-blue-500 rounded-full animate-bounce delay-300"></span>
                </div>
              ) : (
                <div className="relative group w-full max-w-3xl">
                  <div
                    className="text-sm sm:text-base leading-relaxed whitespace-pre-wrap"
                    dangerouslySetInnerHTML={{ __html: resultData }}
                  ></div>
                  {copied && (
                    <span className="absolute bottom-2 right-24 text-green-500 text-xs font-semibold">✅ Copied!</span>
                  )}
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(resultData.replace(/<[^>]+>/g, ''));
                      setCopied(true);
                      setTimeout(() => setCopied(false), 1500);
                    }}
                    className="absolute bottom-2 right-2 bg-blue-100 hover:bg-blue-200 text-blue-800 text-xs font-medium px-3 py-1 rounded-lg transition-all shadow-sm"
                    title="Copy response"
                  >
                    📋 Copy
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      <div className="mt-6">
        <div className="relative flex items-center bg-white dark:bg-gray-800 rounded-full px-4 py-2 shadow-md">
          <input
            type="text"
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && onSent()}
            value={input}
            placeholder="Enter a prompt here"
            className={`flex-grow px-2 py-2 text-sm bg-transparent outline-none placeholder-gray-500 dark:placeholder-gray-400 dark:text-white 
              ${isListening ? 'ring-2 ring-blue-400 rounded-full' : ''}`}
          />
          {isListening && (
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="bg-white text-blue-600 text-sm font-semibold px-4 py-1 rounded-full shadow-md animate-pulse border border-blue-300">
                🎙️ Listening...
              </div>
            </div>
          )}
          <div className="flex items-center gap-3 ml-2">
            <img src={assets.gallery_icon} alt="Gallery" className="w-5 h-5 cursor-pointer dark:bg-white dark:p-1 dark:rounded-full" />
            <img
              src={assets.mic_icon}
              alt="Mic"
              onClick={handleVoiceSearch}
              title="Click to speak"
              className={`w-5 h-5 cursor-pointer transition-transform duration-300 
                ${isListening ? 'animate-pulse scale-110 text-red-500' : ''} dark:bg-white dark:p-1 dark:rounded-full`}
            />
            <img
              onClick={() => onSent()}
              src={assets.send_icon}
              alt="Send"
              className="w-5 h-5 cursor-pointer dark:bg-white dark:p-1 dark:rounded-full"
            />
          </div>
        </div>
        <p className="text-xs text-gray-500 mt-3 text-center dark:text-gray-400">
          Intellix may display inaccurate info sometimes!
        </p>
      </div>
    </div>
  );
};

export default Main;
