import {NextPageWithLayout} from "@/pages/_app";
import Storyboard from "@/components/storyboard";
import {useGlobalContext} from "@/providers/GlobalContextProvider";
import Link from "next/link";

const StoryboardExport: NextPageWithLayout = ({}) => {

    // @ts-ignore
    const {panels, title} = useGlobalContext()
    // const panels = [
    //     {
    //         title: 'Panel 1',
    //         thumbnail: 'https://ple1.nigelritfeld.nl/concept/signing-contract.jpeg',
    //         video: 'https://replicate.delivery/mgxm/1d008c25-09f7-40bc-b26a-489e223a8aef/out.mp4',
    //         comments: "Student feels overwhelmed. voiceover: “Ive never done this!” Camera pans slowly to make space.",
    //     },
    //     {
    //         title: 'Panel 2',
    //         thumbnail: 'https://ple1.nigelritfeld.nl/concept/signing-contract.jpeg',
    //         video: 'https://replicate.delivery/mgxm/1d008c25-09f7-40bc-b26a-489e223a8aef/out.mp4',
    //         comments: "Moment of clarity. “Aha” Ding or chimes; lightbulb moment.",
    //     },
    //     {
    //         title: 'Panel 3',
    //         thumbnail: 'https://ple1.nigelritfeld.nl/concept/signing-contract.jpeg',
    //         video: 'https://replicate.delivery/mgxm/1d008c25-09f7-40bc-b26a-489e223a8aef/out.mp4',
    //         comments: "Working in a dark room: Sounds of clock ticking and pencil scratching on paper.",
    //     },
    //     {
    //         title: 'Panel 4',
    //         thumbnail: 'https://ple1.nigelritfeld.nl/concept/signing-contract.jpeg',
    //         video: 'https://replicate.delivery/mgxm/1d008c25-09f7-40bc-b26a-489e223a8aef/out.mp4',
    //         comments: "Submitting via coursework. Fade out as if ending.",
    //     },
    //     {
    //         title: 'Panel 5',
    //         thumbnail: 'https://ple1.nigelritfeld.nl/concept/signing-contract.jpeg',
    //         video: 'https://replicate.delivery/mgxm/1d008c25-09f7-40bc-b26a-489e223a8aef/out.mp4',
    //         comments: "Student feels overwhelmed. voiceover: “Ive never done this!” Camera pans slowly to make space.",
    //     },
    //     {
    //         title: 'Panel 6',
    //         thumbnail: 'https://ple1.nigelritfeld.nl/concept/signing-contract.jpeg',
    //         video: 'https://replicate.delivery/mgxm/1d008c25-09f7-40bc-b26a-489e223a8aef/out.mp4',
    //         comments: "Moment of clarity. “Aha” Ding or chimes; lightbulb moment.",
    //     },
    //     {
    //         title: 'Panel 7',
    //         thumbnail: 'https://ple1.nigelritfeld.nl/concept/signing-contract.jpeg',
    //         video: 'https://replicate.delivery/mgxm/1d008c25-09f7-40bc-b26a-489e223a8aef/out.mp4',
    //         comments: "Working in a dark room: Sounds of clock ticking and pencil scratching on paper.",
    //     },
    // ]


    function exportPage() {
        var html = document.documentElement.outerHTML;

        // Zoek het element op basis van de id en haal de HTML van het element op
        var element = document.getElementById("navbar");
        var elementHtml = element!.outerHTML;

        // Vervang de HTML van het element in de HTML-code door een lege string
        html = html.replace(elementHtml, "");
        var blob = new Blob([html], {type: 'text/html'});
        var link = document.createElement('a');
        link.download = 'storyboard.html';
        link.href = window.URL.createObjectURL(blob);
        link.click();
    }

    return (
        <>
            <div className="bg-[#101010] px-8 space-y-6">
                <div id="navbar" className="flex justify-between items-center  pt-10">
                    <Link
                        href="/"
                        className="rounded-full bg-transparent text-brandAccent px-8 py-3 border border-brandAccent">
                        Back
                    </Link>
                    <div className="text-center w-1/3 text-white">
                        <h1 className="text-xl font-semibold">Export preview</h1>
                        <p className="text-sm py-2">This is the preview of your storyboard. When you have pressed the
                            download button you can open the index.html file to see the storyboard.</p>
                    </div>
                    <button
                        className="rounded-full p-3 px-6 bg-brandAccent text-white hover:bg-brandAccent"
                        onClick={exportPage}>
                        Download
                    </button>
                </div>
                <Storyboard panels={panels} title={title}></Storyboard>
            </div>
        </>
    )
}

export default StoryboardExport