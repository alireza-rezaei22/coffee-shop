import React from 'react'

export default function SectionHeader({title}) {
    return (
        <div className="flex justify-between items-center mb-5">
            <span className="w-[33%] border-[1px] border-zinc-400"></span>
            <div className="bg-gradient-to-l from-indigo-600 to-indigo-900 flex items-center rounded-full text-lg text-nowrap text-white py-2 px-5 space-x-2 space-x-reverse">
                <span className="bg-zinc-300 inline-block size-2 rounded-full"></span>
                <span>{title}</span>
                <span className="bg-zinc-300 inline-block size-2 rounded-full"></span>
            </div>
            <span className="w-[33%] border-[1px] border-zinc-400"></span>
        </div>
    )
}