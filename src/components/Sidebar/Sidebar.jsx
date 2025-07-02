import React, { useState, useEffect, useContext } from 'react';
import { assets } from '../../assets/assets';
import { Context } from '../../Context/Context';

const Sidebar = () => {
  const [extended, setExtended] = useState(true);
  const { onSent, prevPrompts, setRecentPrompt, newChat, isDark, setIsDark } = useContext(Context);

  // Automatically collapse sidebar on small screens initially
  useEffect(() => {
    if (window.innerWidth <= 640) {
      setExtended(false);
    }
  }, []);

  const loadPrompt = async (prompt) => {
    setRecentPrompt(prompt);
    await onSent(prompt);
  };

  return (
    <div
      className={`${extended ? 'w-64 sm:w-72' : 'w-14 sm:w-16'
        } h-screen flex flex-col justify-between p-2 sm:p-4 transition-all duration-300 
      ${isDark ? 'bg-gray-800' : 'bg-[#e2e8f0]'}`}
    >
      <div className="space-y-4 sm:space-y-6">
        <div className="flex justify-start">
          <img
            onClick={() => setExtended((prev) => !prev)}
            src={assets.menu_icon}
            alt="Menu"
            className="w-5 h-5 sm:w-6 sm:h-6 cursor-pointer dark:bg-white dark:p-1 dark:rounded-full"
          />
        </div>

        <div
          onClick={newChat}
          className={`flex items-center ${extended ? 'gap-3 p-2 sm:p-3' : 'p-2 justify-center'} bg-white dark:bg-gray-700 rounded-lg shadow hover:bg-gray-100 dark:hover:bg-gray-600 cursor-pointer`}
        >
          <img src={assets.plus_icon} alt="New Chat" className="w-4 h-4 sm:w-5 sm:h-5 dark:bg-white dark:p-1 dark:rounded-full" />
          {extended && <p className="text-xs sm:text-sm font-medium dark:text-white">New Chat</p>}
        </div>

        {extended && (
          <div>
            <p className="text-gray-500 text-xs sm:text-sm font-semibold mb-2 dark:text-gray-300">Recent</p>
            <div className="space-y-1 max-h-48 overflow-y-auto scrollbar-hide pr-1">
              {prevPrompts.map((item, index) => (
                <div
                  key={index}
                  onClick={() => loadPrompt(item)}
                  className="flex items-center gap-2 px-2 py-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-600 cursor-pointer"
                >
                  <img src={assets.message_icon} alt="Message" className="w-4 h-4 sm:w-5 sm:h-5 dark:bg-white dark:p-1 dark:rounded-full" />
                  <p className="text-xs sm:text-sm text-gray-700 dark:text-white truncate w-full">{item.slice(0, 20)}...</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="space-y-3 mt-4">
        <button
          onClick={() => setIsDark(!isDark)}
          className="w-full text-sm px-3 py-2 rounded-md border border-gray-400 dark:border-gray-500 text-gray-700 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
        >
          {isDark ? '🌞' : '🌙'}
        </button>


        <div className="flex items-center gap-2 px-2 py-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-600 cursor-pointer">
          <img src={assets.question_icon} alt="Help" className="w-4 h-4 sm:w-5 sm:h-5 dark:bg-white dark:p-1 dark:rounded-full" />
          {extended && <p className="text-xs sm:text-sm text-gray-700 dark:text-white">Help</p>}
        </div>
        <div className="flex items-center gap-2 px-2 py-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-600 cursor-pointer">
          <img src={assets.history_icon} alt="Activity" className="w-4 h-4 sm:w-5 sm:h-5 dark:bg-white dark:p-1 dark:rounded-full" />
          {extended && <p className="text-xs sm:text-sm text-gray-700 dark:text-white">Activity</p>}
        </div>
        <div className="flex items-center gap-2 px-2 py-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-600 cursor-pointer">
          <img src={assets.setting_icon} alt="Setting" className="w-4 h-4 sm:w-5 sm:h-5 dark:bg-white dark:p-1 dark:rounded-full" />
          {extended && <p className="text-xs sm:text-sm text-gray-700 dark:text-white">Setting</p>}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
