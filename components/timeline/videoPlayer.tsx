import {Dispatch, FC, useState, useEffect} from "react";
import {PauseIcon, PlayIcon} from "@heroicons/react/20/solid";
import { Panel } from "./panel";
import dynamic from "next/dynamic"
const ReactPlayer = dynamic(() => import("react-player"), { ssr: false });

interface VideoPlayerProps {
    panels: Array<Panel>
    setCurrent: Dispatch<number>
}

export const VideoPlayer:FC<VideoPlayerProps> = ({panels, setCurrent}) => {
    const [video, setVideo] = useState<Panel>(panels[0]);
    const [playing, setPlaying] = useState<boolean>(true);
    const [duration, setDuration] = useState<number>(0);
    const [totalProgress, setTotalProgress] = useState<number>(0);
    const [progress, setProgress] = useState<number>(0);
    const seconds = `${Math.floor(progress / 60)}:${Math.floor(progress % 60) < 10 ? "0" : ""}${Math.floor(progress % 60)}`
    const totalSeconds = `${Math.floor(duration / 60)}:${Math.floor(duration % 60) < 10 ? "0" : ""}${Math.floor(duration % 60)}`

    const handleEnd = () => {
        const currentPanelIndex = panels.findIndex((panel) => panel === video);
        const nextPanelIndex = currentPanelIndex + 1;
        setCurrent(currentPanelIndex)
        console.log(currentPanelIndex)
        const nextPanel = nextPanelIndex < panels.length ? panels[nextPanelIndex] : panels[0];

        if (nextPanelIndex === panels.length) {
            setTotalProgress(0);
        }

        setVideo(nextPanel);
        setTotalProgress(totalProgress + duration);
    };

    // loop through the urls and create a new video player for each one and add the total time to the duration
    useEffect(() => {
        let totalDuration = 0;
        for (let panel of panels) {
            const video = document.createElement('video');
            video.src = panel.video;
            video.load();
            video.addEventListener('loadeddata', () => {
                totalDuration += video.duration;
                setDuration(totalDuration);
            });
        }
    }, [panels]);



    return <section className="w-full bg-black flex flex-col items-center justify-center rounded-xl">
        <ReactPlayer
            muted
            playing={playing}
            url={video.video}
            width="75%"
            height={360}
            onProgress={
                (played) => {
                    setProgress(totalProgress + played.playedSeconds)
                }
            }
            onEnded={() => handleEnd()}
        />
        <div className=" py-2 w-full bg-[#1e1e1e] flex items-center justify-center relative rounded-b-xl">
            <p className="text-white absolute left-8">
                <span className='font-semibold'>{seconds}</span>
                <span className="font-light"> / {totalSeconds}</span>
            </p>
            <button
                className="bg-[#23A6F0] text-white font-bold rounded-full  h-10 w-10  flex items-center justify-center "
                onClick={() => {
                    setPlaying(!playing)
                }}
            >
                {playing ?
                    <PauseIcon className="w-4 h-4" />
                    :
                    <PlayIcon className="w-4 h-4" />
                }
            </button>
        </div>
    </section>

}