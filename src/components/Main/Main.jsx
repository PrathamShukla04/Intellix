import React from 'react';
import { assets } from '../../assets/assets';
import { useContext } from 'react';
import { Context } from '../../Context/Context';

const Main = () => {

    const { onSent, recentPrompt, resetChat, showResult, loading, resultData, setInput, input } = useContext(Context)


    return (
        <div className="flex-1 h-screen p-6 overflow-y-auto bg-gray-50 flex flex-col justify-between">
            <div>
                {/* Gemini + Image */}
                <div className="flex justify-between items-center mb-8">
                    <p className="text-lg font-semibold text-gray-800">Intellix</p>
                    <img
                        src={assets.user_icon}
                        alt="User"
                        className="w-10 h-10 rounded-full object-cover"
                    />
                </div>

                {!showResult
                    ?
                    <>
                        {/* Greeting */}
                        <div className="mb-8">
                            <p className="text-2xl font-semibold text-gray-800">
                                <span className="text-blue-600">Hello, Dev...</span>
                            </p>
                            <p className="text-lg text-gray-600 mt-1">How can I help you today?</p>
                        </div>

                        {/* Cards */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
                            {/* Card 1 */}
                            <div className="flex items-center justify-between bg-white rounded-xl shadow-md p-4 hover:shadow-lg transition cursor-pointer">
                                <p className="text-gray-700 font-medium">What is the difference between a station and a junction?</p>
                                <img src={assets.compass_icon} alt="Compass" className="w-8 h-8 ml-4" />
                            </div>

                            {/* Card 2 */}
                            <div className="flex items-center justify-between bg-white rounded-xl shadow-md p-4 hover:shadow-lg transition cursor-pointer">
                                <p className="text-gray-700 font-medium">Summarize the term: Urbanization</p>
                                <img src={assets.bulb_icon} alt="Bulb" className="w-8 h-8 ml-4" />
                            </div>

                            {/* Card 3 */}
                            <div className="flex items-center justify-between bg-white rounded-xl shadow-md p-4 hover:shadow-lg transition cursor-pointer">
                                <p className="text-gray-700 font-medium">Tell me how to sound cool...</p>
                                <img src={assets.message_icon} alt="Message" className="w-8 h-8 ml-4" />
                            </div>

                            {/* Card 4 */}
                            <div className="flex items-center justify-between bg-white rounded-xl shadow-md p-4 hover:shadow-lg transition cursor-pointer">
                                <p className="text-gray-700 font-medium">What is source code?</p>
                                <img src={assets.code_icon} alt="Code" className="w-8 h-8 ml-4" />
                            </div>
                        </div>
                    </>
                    :
                    <div className="result max-h-[60vh] overflow-y-auto scrollbar-hide space-y-6 px-4">
                        {/* User Prompt */}
                        <div className="flex items-center gap-4">
                            <img
                                src={assets.user_icon}
                                alt="User"
                                className="w-10 h-10 rounded-full object-cover"
                            />
                            <p className="text-gray-800 text-base font-medium">{recentPrompt}</p>
                        </div>

                        {/* Gemini Response */}
                        <div className="flex items-start gap-4">
                            <img
                                src={assets.gemini_icon}
                                alt="Gemini"
                                className="w-8 h-8 mt-1"
                            />
                            {loading ? (
                                <div className="flex-1 flex items-center justify-center">
                                    <div className="flex gap-2">
                                        <span className="w-3 h-3 bg-blue-500 rounded-full animate-bounce delay-0"></span>
                                        <span className="w-3 h-3 bg-blue-500 rounded-full animate-bounce delay-150"></span>
                                        <span className="w-3 h-3 bg-blue-500 rounded-full animate-bounce delay-300"></span>
                                    </div>

                                </div>
                            ) : (
                                <p
                                    className="text-gray-700 text-sm leading-relaxed max-w-4xl"
                                    dangerouslySetInnerHTML={{ __html: resultData }}
                                ></p>
                            )}




                        </div>
                    </div>

                }


            </div>

            {/* Bottom Search Box */}
            <div className="mt-10">
                <div className="flex items-center bg-white rounded-full px-4 py-2 shadow-md">
                    <input
                        type="text"
                        onChange={(e) => setInput(e.target.value)}
                        value={input}
                        placeholder="Enter a prompt here"
                        className="flex-grow px-3 py-2 outline-none text-sm bg-transparent placeholder-gray-500"
                    />
                    <div className="flex items-center gap-3">
                        <img src={assets.gallery_icon} alt="Gallery" className="w-5 h-5 cursor-pointer" />
                        <img src={assets.mic_icon} alt="Mic" className="w-5 h-5 cursor-pointer" />
                        <img onClick={() => onSent()} src={assets.send_icon} alt="Send" className="w-5 h-5 cursor-pointer" />
                    </div>
                </div>
                <p className="text-xs text-gray-500 mt-3 text-center">
                    Gemini may display inaccurate info sometimes!
                </p>
            </div>
        </div>
    );
};

export default Main;
