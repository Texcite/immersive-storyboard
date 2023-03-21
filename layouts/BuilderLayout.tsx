import {LayoutProps} from "@/layouts/base";
import {classNames} from "@/utils/classNames";

export default function BuilderLayout(){

function backHandler(){
    window.location.href = '/timeline';
}

return (
    <div>
        <button className='flex flex-col items-center justify-center rounded-3xl border-blue-400 h-10 w-16 border-2' onClick={backHandler}>
            Back
        </button>
    </div>
);
}


