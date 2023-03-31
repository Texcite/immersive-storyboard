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
import {LockOpenIcon, LockClosedIcon, PlusIcon} from '@heroicons/react/24/outline'
import {
    SortableContext,
    sortableKeyboardCoordinates,
    verticalListSortingStrategy,
    arrayMove,
} from "@dnd-kit/sortable";
import VideoEditingTimeline from 'video-editing-timeline-react';
import {useGlobalContext} from "@/providers/GlobalContextProvider";

interface StoryBoardTimelineProps {
    panels: Array<Panel>
    current: number
}

export const StoryBoardTimeline: FC<StoryBoardTimelineProps> = ({panels, current}) => {
    // @ts-ignore
    const {openSceneBuilder, setOpenSceneBuilder} = useGlobalContext()

    const timeLineConfig = {
        canvasWidth: (200 * panels.length) + 100,
        canvasHeight: 40,
        minimumScale: 10,
        minimumScaleTime: 18,
    }
    const [isLocked, setLocked] = useState(false)
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
                    className="w-full bg-[#1E1E1E] bg-main rounded-lg flex flex-row overflow-hidden overflow-x-scroll scroll-pl-8 items-end  items-end relative">
                    <div className=" h-full flex flex-col bg-[#1E1E1E] w-24 rounded-l-lg absolute">
                        <div className="h-11/12 w-full inner-wrapper  flex p-2 items-center justify-center w-full  ">
                            <h1 className="text-white font-semibold">Time</h1>
                        </div>
                        <div className="h-2/3 w-full flex justify-center py-8 items-center flex flex-col">
                            {!isLocked ?
                                <LockOpenIcon className="w-6 h-6 text-[#23A6F0]" onClick={() => setLocked(true)}/> :
                                <LockClosedIcon className="w-6 h-6 text-[#23A6F0]" onClick={() => setLocked(false)}/>}
                        </div>
                        <div className="h-1/3 w-full flex items-center justify-center flex-col pb-3 ">
                            <button
                                className="bg-[#23A6F0] text-white font-bold rounded-full  h-10 w-10  flex items-center justify-center "
                                onClick={()=>setOpenSceneBuilder(true)}>

                                <PlusIcon className="w-4 h-4"/>
                            </button>
                            <p className="text-gray-400 text-xs">New panel</p>
                        </div>
                    </div>

                    <div className="w-full pl-24  flex flex-col items-start justify-start">
                        <div className="inner-wrapper flex w-full">
                            {
                                // @ts-ignore
                                <VideoEditingTimeline config={timeLineConfig}/>
                            }
                        </div>
                        <div className="panels-wrapper w-full flex flex-row space-x-2 bg-black text-white p-4 pb-0">
                            <div className=" overflow-hidden overflow-x-scroll  flex h-2/3">
                                {
                                    items.map((item, index) => <TimelinePanel key={index} current={current === index}
                                                                              panel={panels.find(p => p.id === item) ?? panels[index]}/>)
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