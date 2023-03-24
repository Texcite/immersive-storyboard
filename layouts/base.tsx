import {ReactNode} from "react";
import {classNames} from "@/utils/classNames";

export type LayoutProps = {
    classes?: string,
    children: ReactNode,
};

const BaseLayout = ({children, classes}: LayoutProps) => {
    return (
        <main className={classNames("", classes ?? "")}>
            {children}
        </main>
    )
}

export default BaseLayout