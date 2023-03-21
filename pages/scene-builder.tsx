import {NextPageWithLayout} from "@/pages/_app";
import BaseLayout from "@/layouts/base";
import BuilderLayout from "@/layouts/BuilderLayout";
import {ReactElement, useEffect} from "react";

const SceneBuilder: NextPageWithLayout = ({}) => {

    return (
        <>
            <h1>Preview Prompt</h1>
            <h1>Prompt Options</h1>
            <h1>Generator</h1>
        </>
    )
}


SceneBuilder.getLayout = function (page: ReactElement) {
    return <BaseLayout>
        <BuilderLayout>

        </BuilderLayout>
    </BaseLayout>
}

export default SceneBuilder