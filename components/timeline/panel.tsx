import React, {FC, PropsWithChildren, useEffect} from 'react';
import {useDraggable, useDroppable} from '@dnd-kit/core';
import Image from "next/image";
import {classNames} from '@/utils/classNames';


export interface Panel {
    title: string
    thumbnail: string
    video: string
    comments?: string
}

interface TimelinePanelProps extends PropsWithChildren {
    panel: Panel
}

export const TimelinePanel: FC<TimelinePanelProps> = ({panel, children}) => {
    const {attributes, listeners, setNodeRef, transform} = useDraggable({
        id: "draggable" + panel.title,
    });
    const style = transform ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
    } : undefined;
    const activeDragging = (!!transform)

    return (
        <div ref={setNodeRef} style={style} {...listeners} {...attributes}
             className={classNames(
                 "w-32 h-full rounded-xl overflow-hidden",
                 activeDragging ?
                     "transition-all" : "")}>
            <div className='panel-inner-wrapper overflow-hidden w-full h-full'>
                <div
                    className={classNames("h-2/3 overflow-hidden bg-main rounded-xl", activeDragging ? " bg-yellow-300 p-1" : "")}>
                    <Image
                        className="rounded-lg"
                        src={panel.thumbnail}
                        draggable="false"
                        alt={panel.title + " thumbnail"}
                        width={250}
                        height={500}
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

function SortablePage({
                          id,
                          activeIndex,
                          ...props
                      }: PageProps & { activeIndex: number }) {
    const {
        attributes,
        listeners,
        index,
        isDragging,
        isSorting,
        over,
        setNodeRef,
        transform,
        transition,
    } = useSortable({
        id,
        animateLayoutChanges: always,
    });

    return (
        <Page
            ref={setNodeRef}
            id={id}
            active={isDragging}
            style={{
                transition,
                transform: isSorting ? undefined : CSS.Translate.toString(transform),
            }}
            insertPosition={
                over?.id === id
                    ? index > activeIndex
                        ? Position.After
                        : Position.Before
                    : undefined
            }
            {...props}
            {...attributes}
            {...listeners}
        />
    );
}