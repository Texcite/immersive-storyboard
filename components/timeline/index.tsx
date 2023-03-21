import { FC, useState } from "react";
import { DndContext } from "@dnd-kit/core";
import { Panel, TimelinePanel } from "@/components/timeline/panel";
import { LockOpenIcon, LockClosedIcon } from '@heroicons/react/24/outline'
// import {SortableContext} from '@dnd-kit/sortable';

import VideoEditingTimeline from 'video-editing-timeline-react';

interface StoryBoardTimelineProps {
    panels: Panel[]
}

export const StoryBoardTimeline: FC<StoryBoardTimelineProps> = ({ panels }) => {

    const [locked, setLocked] = useState(true)
    const [items] = useState(['1', '2', '3']);

    const timeLineConfig = {
        canvasWidth: (200 * panels.length) + 100,
        canvasHeight: 56,
        minimumScale: 10,
        minimumScaleTime: 18,
    }

    return (
        <DndContext
        // collisionDetection={}
        >
            {/*<SortableContext items={items}>*/}
            <section className="h-full w-full bg-main rounded-lg flex flex-col">
                <div className="w-full h-full flex flex-row bg-[#1E1E1E] rounded-t-lg">
                    <div className="inner-wrapper h-1/2 flex p-2 items-center justify-center w-1/12 h-full border-r-amber-50 border-r-[1px]">
                        <h1 className="text-white font-semibold">Time</h1>
                    </div>
                    <div className="pl-4 w-full overflow-x-auto overflow-y-hidden no-scrollbar">
                        <VideoEditingTimeline config={timeLineConfig} />
                    </div>
                </div>
                <div className="h-full flex flex-row justify-center">
                    <div className="h-36 border-r-black border-t-[1px] border-r-2 w-1/12 flex justify-center items-center flex flex-col">
                        {!locked ? <LockOpenIcon className="w-6 h-6 text-[#23A6F0]" /> : <LockClosedIcon className="w-6 h-6 text-[#23A6F0]" text-white />}
                    </div>
                    <div className="panels-wrapper w-11/12 flex flex-row space-x-2 bg-black text-white rounded-b-lg p-4 ">
                        {
                            panels.map(panel => <TimelinePanel panel={panel} />)
                        }
                    </div>
                </div>
            </section>
            {/*</SortableContext>*/}
        </DndContext>
    )
}
export default StoryBoardTimeline