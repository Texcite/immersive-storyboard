import {NextPageWithLayout} from "@/pages/_app";
import BaseLayout from "@/layouts/base";
import DashboardLayout from "@/layouts/DashboardLayout";
import {ReactElement} from "react";

const Timeline: NextPageWithLayout = ({}) => {
    return (
        <>
            <h1>content</h1>
            <h1>Video player</h1>
            <h1>Timeline</h1>
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