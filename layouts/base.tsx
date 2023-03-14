import {ReactNode} from "react";

export type LayoutProps = {
    children: ReactNode,
};

const BaseLayout = ({children}: LayoutProps) => {
    return (
        <main className="bg-red-800">
            {children}
        </main>
    )
}

export default BaseLayout