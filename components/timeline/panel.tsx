import React, {FC, PropsWithChildren, useEffect} from 'react';
import {useDraggable} from '@dnd-kit/core';
import Image from "next/image";
import {classNames} from '@/utils/classNames';
import {useSortable} from "@dnd-kit/sortable";


export interface Panel {
    id: string
    title: string
    thumbnail: string
    video: string
    comments?: string
}

interface TimelinePanelProps extends PropsWithChildren {
    panel: Panel,
    current: boolean
}

export const TimelinePanel: FC<TimelinePanelProps> = ({panel, current, children}) => {
    const {attributes, listeners, setNodeRef, transform} = useSortable({
        id: panel.id
    });
    const style = transform ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
    } : undefined;
    const activeDragging = (!!transform)
    useEffect(()=> {},[current])
    return (
        <div ref={setNodeRef} style={style} {...listeners} {...attributes}
             className={classNames(
                 "w-64  rounded-xl overflow-hidden",
                 activeDragging ?
                     "transition-all" : "",
             )}>
            <div className='panel-inner-wrapper overflow-hidden '>
                <div
                    className={classNames("h-2/3 mx-4 overflow-hidden bg-main rounded-xl", activeDragging ? " border-yellow-300 border-2" : "",
                        current ? "border-2 border-[#23A6F0]" : "")}>
                    <Image
                        className="rounded-lg"
                        src={panel.thumbnail}
                        draggable="false"
                        alt={panel.title + " thumbnail"}
                        width={255}
                        height={355}
                    />
                </div>
                <div className="h-1/3 flex items-center justify-center">
                    <h3 className="text-xl">{panel.title}</h3>
                </div>
            </div>
            {children}
        </div>
    );
}