import {ReactNode} from "react";

export type LayoutProps = {
    children: ReactNode,
};

const BaseLayout = ({children}: LayoutProps) => {
    return (
        <main className="">
            {children}
        </main>
    )
}

export default BaseLayout