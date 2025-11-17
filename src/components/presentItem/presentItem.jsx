import React from 'react'

function PresentItem(props) {
    const { title, text, src, isReverse } = props
    return (
        <div className={`w-full text-xs mx-auto flex ${isReverse ? 'self-end flex-row-reverse' : 'self-start flex-row'}`}>
            <div className="relative w-1/4 aspect-square">
                <img className="absolute inset-0 w-full h-full object-contain p-2 z-10" src={src} alt="" />
                <span className="absolute size-full border-2 border-zinc-300 rounded-full start-1"></span>
                <span className="absolute size-full border-2 border-zinc-300 rounded-full"></span>
            </div>
            <div className={`w-3/4 mx-2 px-2 border-zinc-400 ${isReverse && 'border-l-2 border-r-0 text-left'} `}>
                <h1 className="text-zinc-600 text-xl font-bold">{title}</h1>
                <p className="text-zinc-500">{text}</p>
            </div>
        </div>
    )
}

export default PresentItem