
import {Dispatch, FC, useState} from "react";
import {
    closestCenter,
    DndContext,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors
} from "@dnd-kit/core";
import {Panel, TimelinePanel} from "@/components/timeline/panel";
import {LockOpenIcon, LockClosedIcon} from '@heroicons/react/24/outline'
import {
    SortableContext,
    sortableKeyboardCoordinates,
    verticalListSortingStrategy,
    arrayMove,
} from "@dnd-kit/sortable";
import VideoEditingTimeline from 'video-editing-timeline-react';

interface StoryBoardTimelineProps {
    panels: Array<Panel>
    current: number
}

export const StoryBoardTimeline: FC<StoryBoardTimelineProps> = ({ panels, current }) => {


 const timeLineConfig = {
        canvasWidth: (200 * panels.length) + 100,
        canvasHeight: 24,
        minimumScale: 10,
        minimumScaleTime: 18,
    }
    const [isLocked, setLocked] = useState(true)
    const [items, setItems] = useState(panels.map(p => p.id))
    const [activeId, setActiveId] = useState(null);
    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );

    return (
        <DndContext
            collisionDetection={closestCenter}
            sensors={sensors}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
        >
            <SortableContext
                items={items}
                disabled={isLocked}
                strategy={verticalListSortingStrategy}
            >
                <section
                    className="w-full bg-main rounded-lg flex flex-row overflow-hidden overflow-x-scroll scroll-pl-8 items-end  items-end relative">
                    <div className="w-1/12 h-full flex flex-col bg-[#1E1E1E] rounded-l-lg absolute">
                        <div
                            className="h-11/12inner-wrapper  flex p-2 items-center justify-center w-full  border-r-black border-r-[1px]">
                            <h1 className="text-white font-semibold">Time</h1>
                        </div>
                        <div
                            className="h-full border-r-black border-t-[1px] border-black border-r-2 flex justify-center items-center flex flex-col">
                            {!isLocked ?
                                <LockOpenIcon className="w-6 h-6 text-[#23A6F0]" onClick={() => setLocked(true)}/> :
                                <LockClosedIcon className="w-6 h-6 text-[#23A6F0]" onClick={() => setLocked(false)}/>}
                        </div>
                    </div>

                    <div className="w-full pl-16  flex flex-col items-start justify-start">
                        <div className="inner-wrapper p-2 flex w-full">
                            {
                                // @ts-ignore
                                <VideoEditingTimeline config={timeLineConfig}/>
                            }
                        </div>
                        <div className="panels-wrapper w-full flex flex-row space-x-2 bg-black text-white p-4">
                            <div className=" overflow-hidden overflow-x-scroll space-x-3 flex">
                                {
                                    items.map((item,index) => <TimelinePanel key={index} current={current === index} panel={panels.find(p => p.id === item) ?? panels[index]}/>)
                                }
                            </div>
                        </div>
                    </div>
                </section>
            </SortableContext>
        </DndContext>
    )

    function handleDragStart(event: any) {
        const {active} = event;
        setActiveId(active.id);
    }

    function handleDragEnd(event: any) {
        const {active, over} = event;
        if (active.id !== over.id) {
            setItems((items) => {
                const oldIndex = items.indexOf(active.id);
                const newIndex = items.indexOf(over.id);
                return arrayMove(items, oldIndex, newIndex);
            });
        }
        setActiveId(null);
    }
}
export default StoryBoardTimeline