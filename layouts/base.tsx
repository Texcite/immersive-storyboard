import {ReactNode} from "react";

export type LayoutProps = {
    children: ReactNode,
};

const BaseLayout = ({children}: LayoutProps) => {
    return (
        <main>
            {children}
        </main>
    )
}

export default BaseLayout