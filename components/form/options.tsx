import { LayoutProps } from "@/layouts/base";
import { classNames } from "@/utils/classNames";

export default function Options(props: any) {

    var posibleOptions = props.availableOptions
    var baseClasses = 'rounded bg-gray-800 text-gray-50 hover:bg-sky-500 hover:cursor-pointer border-sky-500 border-2 p-2 text-center max-h-12 w-fit'
    var baseSelectedClass = 'rounded bg-sky-500 text-gray-50 hover:bg-sky-500 hover:cursor-pointer border-sky-500 border-2 p-2 text-center max-h-12 w-fit'

    function changeSelected(value: any) {

        posibleOptions.options.map((option: any) => {

            if (option.name === value.name) {
                option.classes = baseSelectedClass

                if (!option.zoom) {
                    props.changeSelected({ [props.stateVariable]: option.value })
                }

                else {
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
            <div className="flex flex-wrap gap-4  items-baseline pt-2">
                {posibleOptions.options.map((option: any, key: any) => (

                    <div key={key} className={option.classes} onClick={() => changeSelected(option)} >{option.name}</div>
                ))}
            </div>
        </div>
    );
}