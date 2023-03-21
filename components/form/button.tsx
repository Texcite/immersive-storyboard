import { LayoutProps } from "@/layouts/base";
import { classNames } from "@/utils/classNames";

export default function Button(props: any) {

    function defineButtonFunction(){
        switch(props.buttonType) {

            case "returnToTimeline":
                return backHandler();

            case "sendApiCall":
                return sendAPICall();

            default: test();

        }


    }


    return (
        <div>
            <button className='flex flex-col items-center justify-center rounded-3xl border-blue-400 h-10 w-16 border-2' onClick={defineButtonFunction}>
                {props.buttonText}
            </button>
        </div>
    );
}



function backHandler() {
    window.location.href = '/timeline';
}

function sendAPICall (){
    console.log('API call test')
}

function test(){
    console.log('test')
}