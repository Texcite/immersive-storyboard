import { LayoutProps } from "@/layouts/base";
import { classNames } from "@/utils/classNames";

export default function Options(props: any) {

    var posibleOptions = props.propOptions

    return (
        <div>
            <h2>{props.label}</h2>
            <p>{props.availableOptions}</p>
        </div>
    );
}