import React, { useState , useContext } from 'react';
import { assets } from '../../assets/assets';
import {Context } from '../../Context/Context';

const Sidebar = () => {
  const [extended, setExtended] = useState(true);
  const {onSent,prevPrompts,setRecentPrompt,newChat}=useContext(Context);
  const loadPrompt = async (prompt)=>{
    setRecentPrompt(prompt)
    await onSent(prompt)
  }

  return (
    <div className={`bg-[#f0f4f9] ${extended ? 'w-72' : 'w-16'} h-screen flex flex-col justify-between p-4 transition-all duration-300`}>
      <div className="space-y-6">
        <div className="flex justify-start">
          <img
            onClick={() => setExtended(prev => !prev)}
            src={assets.menu_icon}
            alt="Menu"
            className="w-6 h-6 cursor-pointer"
          />
        </div>

        <div onClick={(e)=>newChat()} className={`flex items-center ${extended ? 'gap-3 p-3' : 'p-2 justify-center'} bg-white rounded-lg shadow hover:bg-gray-100 cursor-pointer transition-all duration-300`}>
          <img src={assets.plus_icon} alt="New Chat" className="w-5 h-5" />
          {extended && <p  className="font-medium text-gray-800">New Chat</p>}
        </div>

        {extended && (
          <div>
            <p className="text-gray-500 text-sm font-semibold mb-2">Recent</p>
            {prevPrompts.map((item,index)=>{
              return(
                <div key={index} onClick={()=>loadPrompt(item)} className="flex items-center gap-2 px-2 py-2 rounded-md hover:bg-gray-200 cursor-pointer">
              <img src={assets.message_icon} alt="Message" className="w-5 h-5" />
              <p className="text-sm text-gray-700">{item.slice(0,18)}...</p>
            </div>
              )
            })}
            
          </div>
        )}
      </div>

      <div className="space-y-3">
        <div className="flex items-center gap-2 px-2 py-2 rounded-md hover:bg-gray-200 cursor-pointer">
          <img src={assets.question_icon} alt="Help" className="w-5 h-5" />
          {extended && <p className="text-sm text-gray-700">Help</p>}
        </div>
        <div className="flex items-center gap-2 px-2 py-2 rounded-md hover:bg-gray-200 cursor-pointer">
          <img src={assets.history_icon} alt="Activity" className="w-5 h-5" />
          {extended && <p className="text-sm text-gray-700">Activity</p>}
        </div>
        <div className="flex items-center gap-2 px-2 py-2 rounded-md hover:bg-gray-200 cursor-pointer">
          <img src={assets.setting_icon} alt="Setting" className="w-5 h-5" />
          {extended && <p className="text-sm text-gray-700">Setting</p>}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
