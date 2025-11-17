import ChatIcon from '@mui/icons-material/Chat';
import React from 'react';

export default function SupportBtn() {
    return (
        <div className="bg-gradient-to-bl from-indigo-600 to-indigo-900 text-white w-12 h-12  rounded-full fixed flex justify-center items-center bottom-4 left-4 z-30">
            <ChatIcon className="w-full h-full" />
        </div>
    )
}
