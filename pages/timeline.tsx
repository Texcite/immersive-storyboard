import {NextPageWithLayout} from "@/pages/_app";
import BaseLayout from "@/layouts/base";
import DashboardLayout from "@/layouts/DashboardLayout";
import {ReactElement, useState} from "react";
import {StoryBoardTimeline} from "@/components/timeline";
import {Panel} from "@/components/timeline/panel";
import {horizontalListSortingStrategy} from "@dnd-kit/sortable";
import dynamic from 'next/dynamic'
import {PauseIcon, PlayIcon} from "@heroicons/react/20/solid";
const ReactPlayer = dynamic(() => import("react-player"), { ssr: false });


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
      id: "sd342ferg1231",
        title: 'Panel 1',
        thumbnail: 'https://ple1.nigelritfeld.nl/concept/signing-contract.jpeg',
        video: 'https://replicate.delivery/mgxm/b2491cb9-5863-4b47-b0f0-40e9af1c2565/out.mp4',
        comments: "Comments",
    },
    {
      id: "panelqq111",
        title: 'Panel 2',
        thumbnail: 'https://ple1.nigelritfeld.nl/concept/signing-contract.jpeg',
        video: 'https://replicate.delivery/mgxm/08e3a2d5-4594-4934-a34a-6e249744ee52/out.mp4',
        comments: "Comments",
    }
]

const Timeline: NextPageWithLayout = ({}) => {
    const [video, setVideo] = useState<Panel>(panels[0]);
    const [playing, setPlaying] = useState<boolean>(true);
    const [duration, setDuration] = useState<number>(0);
    const [totalProgress, setTotalProgress] = useState<number>(0);
    const [progress, setProgress] = useState<number>(0);
    const seconds = `${Math.floor(progress / 60)}:${Math.floor(progress % 60) < 10 ? "0" : ""}${Math.floor(progress % 60)}`
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
        <section className="w-full bg-black flex flex-col items-center justify-center rounded-xl">
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
                     <span className="font-light"> / {`${Math.floor(duration / 60)}:${Math.floor(duration % 60) < 10 ? "0" : ""}${Math.floor(duration % 60)}`}</span>
                </p>
                <button
                    className="bg-[#23A6F0] text-white font-bold rounded-full  h-10 w-10  flex items-center justify-center "
                    onClick={() => {
                        setPlaying(!playing)
                    }}
                >
                    {playing ?
                       <PauseIcon className="w-4 h-4"/>
                        :
                        <PlayIcon className="w-4 h-4"/>
                    }
                </button>
            </div>
        </section>
        <h1>Timeline</h1>
            <StoryBoardTimeline panels={panels}/>
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