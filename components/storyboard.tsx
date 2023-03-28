import { type } from 'os'
import { FC, PropsWithChildren, useState } from 'react'

type Panel = {
    title: string
    thumbnail?: string
    video: string
    comments?: string
}

interface StoryboardProps {
    panels: Array<Panel>
    title: String
}

const Storyboard: FC<StoryboardProps> = ({ panels, title }) => {
    return (
    <div className="flex text-white justify-center items-start h-screen">
        <div className=" rounded-lg bg-[#1e1e1e] drop-shadow-2xl p-8 ">
            <h1 className="text-4xl font-bold mb-10"> {title} </h1>
            <div className="grid grid-cols-4 gap-20">
                    {panels.map((panel, index) => (
                    <div className="relative" key={index}>
                        <span className="absolute top-0 left-0 m-2 text-white bg-brandAccent rounded-full w-6 h-6 flex items-center justify-center">
                            {index + 1}
                        </span>
                        <video className="rounded" src={panel.video} autoPlay loop/>
                        <p className="mt-2">{panel.comments}</p>
                    </div>
                    ))}        
            </div>
        </div>
    </div>
    )
}

export default Storyboard;