import DemoTab from './components/demoTab'
import { BeakerIcon } from '@heroicons/react/24/solid'

export default function Home() {
  return (
    <>
      <h1 className="text-3xl font-bold underline">
        Hello world!
      </h1>
      <DemoTab></DemoTab>
      <BeakerIcon className="h-6 w-6 text-blue-500"/>
    </>
  )
}
