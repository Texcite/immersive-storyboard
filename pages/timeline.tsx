import {NextPageWithLayout} from "@/pages/_app";
import BaseLayout from "@/layouts/base";
import {ReactElement, useState} from "react";
import {StoryBoardTimeline} from "@/components/timeline";
import {VideoPlayer} from "@/components/timeline/videoPlayer";
import BuilderLayout from "@/layouts/BuilderLayout";
import {useGlobalContext} from "@/providers/GlobalContextProvider";
import {PageOverlay} from "@/components/dialogue/pageOverlay";
import SceneBuilder from "@/pages/scene-builder";
import {PlusIcon} from '@heroicons/react/24/outline'
import Link from "next/link";

const Timeline: NextPageWithLayout = ({}) => {
    // @ts-ignore
    const {panels, setPanels, openSceneBuilder, setOpenSceneBuilder} = useGlobalContext()

    // Create a panels array
    const [current, setCurrent] = useState(0)
    return (
        <section className="space-y-3 w-full">
            <VideoPlayer panels={panels} setCurrent={setCurrent}/>
            <h1 className="text-white font-bold text-xl tracking-wide">Timeline</h1>
            <Link
                href="/storyboard-export"
                className="absolute top-0 m-6 right-0 rounded-full  bg-brandAccent py-3 text-white px-8 border border-brandAccent font-semibold">
                Export project
            </Link>
            <StoryBoardTimeline panels={panels} current={current}/>
            <PageOverlay isOpen={openSceneBuilder} setIsOpen={setOpenSceneBuilder}>
                <SceneBuilder/>
            </PageOverlay>
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