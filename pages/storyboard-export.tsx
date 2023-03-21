import {NextPageWithLayout} from "@/pages/_app";
import BaseLayout from "@/layouts/base";
import DashboardLayout from "@/layouts/DashboardLayout";
import {ReactElement} from "react";
import Storyboard from "@/components/storyboard";

const StoryboardExport:NextPageWithLayout = ({}) => {
    const panels = [
        {
            title: 'Panel 1',
            thumbnail: 'https://ple1.nigelritfeld.nl/concept/signing-contract.jpeg',
            video: 'https://replicate.delivery/mgxm/1d008c25-09f7-40bc-b26a-489e223a8aef/out.mp4',
            comments: "Student feels overwhelmed. voiceover: “Ive never done this!” Camera pans slowly to make space.",
        },
        {
            title: 'Panel 2',
            thumbnail: 'https://ple1.nigelritfeld.nl/concept/signing-contract.jpeg',
            video: 'https://replicate.delivery/mgxm/1d008c25-09f7-40bc-b26a-489e223a8aef/out.mp4',
            comments: "Moment of clarity. “Aha” Ding or chimes; lightbulb moment.",
        },
        {
            title: 'Panel 3',
            thumbnail: 'https://ple1.nigelritfeld.nl/concept/signing-contract.jpeg',
            video: 'https://replicate.delivery/mgxm/1d008c25-09f7-40bc-b26a-489e223a8aef/out.mp4',
            comments: "Working in a dark room: Sounds of clock ticking and pencil scratching on paper.",
        }, 
        {
            title: 'Panel 4',
            thumbnail: 'https://ple1.nigelritfeld.nl/concept/signing-contract.jpeg',
            video: 'https://replicate.delivery/mgxm/1d008c25-09f7-40bc-b26a-489e223a8aef/out.mp4',
            comments: "Submitting via coursework. Fade out as if ending.",
        },
        {
            title: 'Panel 5',
            thumbnail: 'https://ple1.nigelritfeld.nl/concept/signing-contract.jpeg',
            video: 'https://replicate.delivery/mgxm/1d008c25-09f7-40bc-b26a-489e223a8aef/out.mp4',
            comments: "Student feels overwhelmed. voiceover: “Ive never done this!” Camera pans slowly to make space.",
        },
        {
            title: 'Panel 6',
            thumbnail: 'https://ple1.nigelritfeld.nl/concept/signing-contract.jpeg',
            video: 'https://replicate.delivery/mgxm/1d008c25-09f7-40bc-b26a-489e223a8aef/out.mp4',
            comments: "Moment of clarity. “Aha” Ding or chimes; lightbulb moment.",
        },
        {
            title: 'Panel 7',
            thumbnail: 'https://ple1.nigelritfeld.nl/concept/signing-contract.jpeg',
            video: 'https://replicate.delivery/mgxm/1d008c25-09f7-40bc-b26a-489e223a8aef/out.mp4',
            comments: "Working in a dark room: Sounds of clock ticking and pencil scratching on paper.",
        }, 
    ]

    const title = "Komt een man bij de dokter"

    return (
        <>
            <div className="bg-white-300">
                <div id="navbar" className="flex justify-between items-center pr-20 pl-20 pt-10">
                    <button className="rounded-full bg-transparent text-customBlue px-8 py-3 border border-customBlue">
                        Edit
                    </button>
                    <div className="text-center w-1/3">
                        <h1 className="text-2xl">Export preview</h1>
                        <p>This is the preview of your storyboard. When you have pressed the download button you can open the index.html file to see the storyboard.</p>
                    </div>
                    <button className="rounded-full p-3 px-6 bg-customBlue text-white hover:bg-customBlue"
                        
                    >
                        Download
                    </button>
                </div>
                <Storyboard panels={panels} title={title}></Storyboard>
            </div>
        </>
    )
}

export default StoryboardExport