import { createContext, useState } from "react";
import main from "../config/gemini";

export const Context = createContext();

const ContextProvider = ({ children }) => {
  const [input, setInput] = useState("");
  const [recentPrompt, setRecentPrompt] = useState("");
  const [prevPrompts, setPrevPrompts] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const [loading, setLoading] = useState(false);
  const [resultData, setResultData] = useState("");
  
  const delayPara = (index, nextWord) => {
    setTimeout(function () {
      setResultData(prev => prev + nextWord);
    }, 75 * index)
  }

  const newChat = () => {
    setLoading(false)
    setShowResult(false)
  }

  const onSent = async (passedPrompt = null) => {

    setResultData("");
    setLoading(true);
    setShowResult(true);
    let answer = "";

    if (passedPrompt) {
      answer = await main(passedPrompt);
      setRecentPrompt(passedPrompt);
    } else {
      setPrevPrompts(prev => [...prev, input]);
      setRecentPrompt(input);
      answer = await main(input);
    }

    let responsearray = answer.split("**");
    let response = "";
    for (let i = 0; i < responsearray.length; i++) {
      if (i === 0 || i % 2 !== 1) {
        response += responsearray[i];
      } else {
        response += "<b>" + responsearray[i] + "</b>";
      }
    }

    let response2 = response.split("*").join("<br>");
    let responsearray2 = response2.split(" ");
    for (let i = 0; i < responsearray2.length; i++) {
      const nextWord = responsearray2[i];
      delayPara(i, nextWord + " ");
    }

    setLoading(false);
    setInput("");
  };


  const resetChat = () => {
    setShowResult(false);
    setResultData("");
  };


  const contextValue = {
    prevPrompts,
    setPrevPrompts,
    onSent,
    setRecentPrompt,
    recentPrompt,
    showResult,
    loading,
    resultData,
    input,
    setInput,
    resetChat,
    newChat
  };

  return (
    <Context.Provider value={contextValue}>
      {children}
    </Context.Provider>
  );
};

export default ContextProvider;
