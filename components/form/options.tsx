import { LayoutProps } from "@/layouts/base";
import { classNames } from "@/utils/classNames";

export default function Options(props: any) {

    var posibleOptions = props.availableOptions
    var baseClasses = 'rounded bg-gray-800 text-gray-50 hover:bg-blue-500 hover:cursor-pointer border-blue-500 border-2 p-2 text-center'
    var baseSelectedClass = 'rounded bg-blue-500 text-gray-50 hover:bg-blue-500 hover:cursor-pointer border-blue-500 border-2 p-2 text-center'

    function changeSelected(value: any) {

        posibleOptions.options.map((option: any) => {

            if (option.name === value.name) {
                option.classes = baseSelectedClass

                if (!option.zoom) {
                    props.changeSelected({ [props.stateVariable]: option.value })
                }

                else {
                    console.log(option.zoom.translation_x)
                    props.changeSelected({
                        zoom: {
                            translation_x: option.zoom.translation_x,
                            translation_y: option.zoom.translation_y,
                            zoom: option.zoom.zoom
                        }
                    })
                }
            } else {
                option.classes = baseClasses
            }

        })
    }

    return (
        <div>
            <div className="space-y-4 gap-8 columns-5 items-center pt-2">
                {posibleOptions.options.map((option: any, key: any) => (

                    <div key={key} className={option.classes} onClick={() => changeSelected(option)} >{option.name}</div>
                ))}
            </div>
        </div>
    );
}