import {NextPageWithLayout} from "@/pages/_app";
import BaseLayout from "@/layouts/base";
import {ReactElement, useState} from "react";
import {StoryBoardTimeline} from "@/components/timeline";
import {Panel} from "@/components/timeline/panel";
import {VideoPlayer} from "@/components/timeline/videoPlayer";
import BuilderLayout from "@/layouts/BuilderLayout";



const Timeline: NextPageWithLayout = ({}) => {
    // Create a panels array
    const [panels, setPanels] = useState<Array<Panel>>([
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
    ])
    return (
        <section className="space-y-3 w-full">
            <VideoPlayer panels={panels}/>
            <h1 className="text-white font-bold text-xl">Timeline</h1>
            <StoryBoardTimeline panels={panels}/>
        </section>
    )
}

Timeline.getLayout = function (page: ReactElement) {
    return <BaseLayout classes={"h-screen w-screen  flex items-center justify-center"}>
        <BuilderLayout>
            {page}
        </BuilderLayout>
    </BaseLayout>
}

export default Timeline