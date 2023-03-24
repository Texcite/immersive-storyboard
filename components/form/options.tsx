import { LayoutProps } from "@/layouts/base";
import { classNames } from "@/utils/classNames";

export default function Options(props: any) {

    var posibleOptions = props.availableOptions

    function changeSelected(value: any){

        posibleOptions.options.map((option: any ) => {

            if (option.name === value.name){
                option.classes = 'selected rounded bg-blue-500 inline-block'
                props.changeSelected({[props.stateVariable]: option.value})
            } else {
                option.classes = 'rounded bg-blue-500 inline-block'
            }

        })
    }

    return (
        <div>
            <h2>{props.label}</h2>
            <div className="space-x-4">
            {posibleOptions.options.map((option: any, key: any) => (
                
        <div key={key} className={option.classes} onClick={() => changeSelected(option)} >{option.name}</div>
      ))}
      </div>
        </div>
    );
}