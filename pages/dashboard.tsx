import {NextPageWithLayout} from "@/pages/_app";
import {ReactElement, useEffect} from "react";
import DashboardLayout from "@/layouts/DashboardLayout";
import BaseLayout from "@/layouts/base";

const Dashboard:NextPageWithLayout = () => {

    return (
        <h1>Dashboard content</h1>
    )
}

Dashboard.getLayout = function getLayout(page: ReactElement) {
    return (
        <BaseLayout>
            <DashboardLayout>{page}</DashboardLayout>
        </BaseLayout>
    )
}

export default Dashboard