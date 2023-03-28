import {CircleStackIcon} from '@heroicons/react/24/outline'


export const LoadingScreen = () => {
    return (
        <section className="space-y-6 h-screen flex flex-col items-center justify-center bg-[#1e1e1e] text-white">
        <h2 className="text-8xl font-semibold">Loading</h2>
        <p className="text-lg">Generating video based on your input</p>
        <p className="text-sm">This could take up to <span className="font-semibold">8 minutes</span>...</p>
        <CircleStackIcon className="animate-spin w-16 h-16"/>
    </section>
    )
}