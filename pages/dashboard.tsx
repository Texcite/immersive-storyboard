import {NextPageWithLayout} from "@/pages/_app";
import {FC, ReactElement, useEffect} from "react";
import DashboardLayout from "@/layouts/DashboardLayout";
import BaseLayout from "@/layouts/base";
import Image from "next/image";

const Dashboard: NextPageWithLayout = () => {

    interface StepProps {
        number: number
        image: string
        title: string
        description: string
    }

    const Step: FC<StepProps> = ({number, image, title, description}) => {
        return (
            <div className="w-1/3 space-y-4 px-2 py-2">
                <Image
                    src={image}
                    className="rounded-xl shadow-2xl"
                    width={500}
                    height={400}
                    alt="iamge"
                />
                <div className="space-y-2">
                    <h2 className="text-xl font-bold">{number}. {title}</h2>
                    <p className="font-regular text-lg">
                        {description.substring(0, 200)}
                    </p>
                </div>
            </div>
        )
    }

    return (
        <div className='px-2'>
            <h2 className="font-bold text-3xl">Stappenplan</h2>
            <section className="flex flex-wrap px-6 py-6">
                <Step
                    number={1}
                    image={"https://app.kaiber.ai/images/02b0800c597be6f2ce1ceda1ab3aa29b-HIW-1.png"}
                    title={"Timeline"}
                    description={"Dit is het overzicht van jouw storyboard. Op deze pagina kan jij de van jouw storyboard bekijken, nieuwe panelen toevoegen en jouw verhaal afspelen."}
                />
                <Step
                    number={2}
                    image={"https://app.kaiber.ai/images/02b0800c597be6f2ce1ceda1ab3aa29b-HIW-1.png"}
                    title={"Nieuwe paneel maken\n"}
                    description={"Klik op de blauwe plus knop om een nieuwe paneel aan te maken."}
                />
                <Step
                    number={3}
                    image={"https://app.kaiber.ai/images/02b0800c597be6f2ce1ceda1ab3aa29b-HIW-1.png"}
                    title={"New board toevoegen"}
                    description={"Beschrijf de situatie van jouw scene en laat een paneel genereren voor jouw storyboard. "}
                />
                <Step
                    number={4}
                    image={"https://app.kaiber.ai/images/02b0800c597be6f2ce1ceda1ab3aa29b-HIW-1.png"}
                    title={"Genereren (laadscherm)"}
                    description={"Start with your own image or audio to bring existing content to life."}
                />
                <Step
                    number={5}
                    image={"https://app.kaiber.ai/images/02b0800c597be6f2ce1ceda1ab3aa29b-HIW-1.png"}
                    title={"Herorder je panelen voor de juiste volgorde"}
                    description={"Start with your own image or audio to bring existing content to life."}
                />  <Step
                    number={6}
                    image={"https://app.kaiber.ai/images/02b0800c597be6f2ce1ceda1ab3aa29b-HIW-1.png"}
                    title={"Exporteer je immersive storyboard"}
                    description={"Exporteer je project en deel jouw verhaal met de wereld"}
                />
            </section>
        </div>
    )
}

Dashboard.getLayout = function getLayout(page: ReactElement) {
    return (
        <BaseLayout>
            {page}
        </BaseLayout>
    )
}

export default Dashboard