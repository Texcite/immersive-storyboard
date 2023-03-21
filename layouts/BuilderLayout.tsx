import { LayoutProps } from "@/layouts/base";
import { classNames } from "@/utils/classNames";
import Button from "@/components/form/button";
import TextInput from "@/components/form/inputField";
import Options from "@/components/form/options";

export default function BuilderLayout() {

    function backHandler() {
        window.location.href = '/timeline';
    }

    return (
        <div>
            <Button buttonType="returnToTimeline" buttonText="back" />

            <h1>The scene:</h1>

            <Options label="label" availableOptions={['option1', 'option2', 'option3']} stateVariable="perspective" />

        </div>
    );
}


