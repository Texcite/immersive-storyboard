import {LayoutProps} from "@/layouts/base";

const BuilderLayout = ({children}: LayoutProps) => {
    return (
            <div className="w-full min-h-full bg-[#101010] h-screen flex items-center justify-center">
                <div className="w-full px-6">
                    <div className=" w-full flex items-center justify-center">{children}</div>
                </div>
            </div>
    )
}
export default BuilderLayout