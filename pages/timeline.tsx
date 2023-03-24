import { NextPageWithLayout } from "@/pages/_app";
import BaseLayout from "@/layouts/base";
import DashboardLayout from "@/layouts/DashboardLayout";
import { ReactElement, useState } from "react";

import ReactPlayer from 'react-player'

// TODO Delete before merge
// Create a panel type for the panels array
type Panel = {
    title: string,
    thumbnail: string,
    video: string,
    comments: string
}
// Create a panels array
const panels: Array<Panel> = [
    {
        title: 'Panel 1',
        thumbnail: 'https://ple1.nigelritfeld.nl/concept/signing-contract.jpeg',
        video: 'https://replicate.delivery/mgxm/b2491cb9-5863-4b47-b0f0-40e9af1c2565/out.mp4',
        comments: "Comments",
    },
    {
        title: 'Panel 2',
        thumbnail: 'https://ple1.nigelritfeld.nl/concept/signing-contract.jpeg',
        video: 'https://replicate.delivery/mgxm/08e3a2d5-4594-4934-a34a-6e249744ee52/out.mp4',
        comments: "Comments",
    }
]

const Timeline: NextPageWithLayout = ({ }) => {

    const [video, setVideo] = useState<Panel>(panels[0]);
    const [playing, setPlaying] = useState<boolean>(true);
    const [duration, setDuration] = useState<number>(0);
    const [totalProgress, setTotalProgress] = useState<number>(0);
    const [progress, setProgress] = useState<number>(0);

    const handleEnd = () => {
        const currentPanelIndex = panels.findIndex((panel) => panel === video);
        const nextPanelIndex = currentPanelIndex + 1;
        const nextPanel =
            nextPanelIndex < panels.length ? panels[nextPanelIndex] : panels[0];

        setVideo(nextPanel);
        setTotalProgress(totalProgress + duration);
    };

    return (
        <>
            <h1>content</h1>
            <h1>Video player</h1>
            <h1>Timeline</h1>
            <div className="w-full bg-black flex flex-col items-center justify-center rounded-xl" >
                <ReactPlayer muted
                    playing={playing}
                    url={video.video}
                    width="75%"
                    height={360}
                    onProgress={(played) => {
                        setProgress(totalProgress + played.playedSeconds)
                    }}
                    onEnded={handleEnd}
                />
                <div className="h-8 w-full bg-[#1e1e1e] flex items-center justify-center pl-4 relative rounded-b-xl">
                    <p className="text-white absolute left-8">
                        {`${Math.floor(progress / 60)}:${Math.floor(progress % 60) < 10 ? "0" : ""}${Math.floor(progress % 60)}/${Math.floor(duration / 60)}:${Math.floor(duration % 60) < 10 ? "0" : ""}${Math.floor(duration % 60)}`}
                    </p>
                    <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-4 rounded-full "
                        onClick={() => { setPlaying(!playing) }}
                    >
                        {playing ?
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"> <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 5.25v13.5m-7.5-13.5v13.5" /> </svg>
                            :
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"> <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347a1.125 1.125 0 01-1.667-.985V5.653z" /></svg>
                        }
                    </button>
                </div>
            </div>
        </>
    )
}


Timeline.getLayout = function (page: ReactElement) {
    return <BaseLayout>
        <DashboardLayout>
            {page}
        </DashboardLayout>
    </BaseLayout>
}

export default Timeline