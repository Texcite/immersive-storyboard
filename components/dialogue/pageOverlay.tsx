import {Dispatch, FC, Fragment, PropsWithChildren, useState} from 'react'
import { Dialog, Transition } from '@headlessui/react'
import {XMarkIcon} from "@heroicons/react/24/outline";

interface PageOverlayProps extends PropsWithChildren{
    isOpen: boolean
    setIsOpen: Dispatch<boolean>
}

export const PageOverlay: FC<PageOverlayProps> = ({children, isOpen, setIsOpen}) => {

    return (
        <Transition.Root show={isOpen} as={Fragment}>
            <Dialog as="div" className="relative z-10" onClose={setIsOpen}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                </Transition.Child>

                <div className="fixed inset-0 z-10 overflow-y-auto">
                    <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            enterTo="opacity-100 translate-y-0 sm:scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        >
                            <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white w-full  text-left shadow-xl transition-all sm:my-4 sm:mx-4  sm:w-full">
                                <button
                                    className="bg-[#23A6F0] shadow-xl  transition-all text-white absolute right-0 top-0 m-8 font-bold rounded-full  h-10 w-10  flex items-center justify-center "
                                    onClick={()=>setIsOpen(false)}>
                                    <XMarkIcon className="w-4 h-4"/>
                                </button>
                                {children}
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition.Root>
    )
}