import React from 'react'
import './SubportBtn.css'
// import { MdChat } from "react-icons/md";
// import { BsChatTextFill } from "react-icons/bs";
import ChatIcon from '@mui/icons-material/Chat';
import { Link } from 'react-router-dom';

export default function SubportBtn() {
    return (
        <Link to='/Subport' className='icon-box'>
            <ChatIcon className='subport-float-icon'/>
        </Link>
    )
}
