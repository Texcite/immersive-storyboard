import {NextPageWithLayout} from "@/pages/_app";
import {ReactElement} from "react";
import DashboardLayout from "@/layouts/DashboardLayout";
import BaseLayout from "@/layouts/base";

const Home:NextPageWithLayout = () => {

    return (
        <h1>Dashboard content</h1>
    )
}

Home.getLayout = function getLayout(page: ReactElement) {
    return (
        <BaseLayout>
            <DashboardLayout>{page}</DashboardLayout>
        </BaseLayout>
    )
}

export default Home