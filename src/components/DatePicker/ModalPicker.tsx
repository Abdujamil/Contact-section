import { Fragment, useCallback, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import Picker, { PickerValue } from 'react-mobile-picker'
import styles from '@/app/page.module.scss';


interface ModalPickerProps {
    initialValue?: PickerValue
    onClose: () => void
    onDateSelect: (value: PickerValue) => void
}

function getDayArray(year: number, month: number) {
    const dayCount = new Date(year, month, 0).getDate()
    return Array.from({ length: dayCount }, (_, i) => String(i + 1).padStart(2, '0'))
}

export default function ModalPicker({ initialValue, onClose, onDateSelect }: ModalPickerProps) {
    const [pickerValue, setPickerValue] = useState<PickerValue>(
        initialValue ?? {
            year: '2000',
            month: '01',
            day: '01',
        }
    )

    const handlePickerChange = useCallback((newValue: PickerValue, key: string) => {
        if (key === 'day') {
            setPickerValue(newValue)
            return
        }

        const { year, month } = newValue
        const newDayArray = getDayArray(Number(year), Number(month))
        const newDay = newDayArray.includes(newValue.day as string)
            ? newValue.day
            : newDayArray[newDayArray.length - 1]

        setPickerValue({ ...newValue, day: newDay })
    }, [])

    return (
        <>
            <Transition appear show as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={onClose}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-opacity-25" />
                    </Transition.Child>

                    <div className="fixed inset-0 overflow-y-auto font-[Rubik]">
                        <div className="flex min-h-full items-center justify-center text-center">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <Dialog.Panel className={`${styles.datePicker} w-full max-w-[320px] transform overflow-hidden rounded-2xl border border-[#232324]  py-[6.5px] px-[38px] text-left align-middle shadow-xl transition-all`}>
                                    <div className="mt-2">
                                        <Picker
                                            value={pickerValue}
                                            onChange={handlePickerChange}
                                            wheelMode="natural"
                                        >
                                            <Picker.Column name="year">
                                                { Array.from({ length: 100 }, (_, i) => `${1923 + i}`).map((year) => (
                                                    <Picker.Item key={year} value={year}>
                                                        {({ selected }) => (
                                                            <div className={selected ? 'text-[#3D9ED6]' : 'text-[#ccc]'}>{year}</div>
                                                        )}
                                                    </Picker.Item>
                                                ))}
                                            </Picker.Column>
                                            <Picker.Column name="month">
                                                { Array.from({ length: 12 }, (_, i) => String(i + 1).padStart(2, '0')).map((month) => (
                                                    <Picker.Item key={month} value={month}>
                                                        {({ selected }) => (
                                                            <div className={selected ? 'text-[#3D9ED6]' : 'text-[#ccc]'}>{month}</div>
                                                        )}
                                                    </Picker.Item>
                                                ))}
                                            </Picker.Column>
                                            <Picker.Column name="day">
                                                { getDayArray(Number(pickerValue.year), Number(pickerValue.month)).map((day) => (
                                                    <Picker.Item key={day} value={day}>
                                                        {({ selected }) => (
                                                            <div className={selected ? 'text-[#3D9ED6]' : 'text-[#ccc]'}>{day}</div>
                                                        )}
                                                    </Picker.Item>
                                                ))}
                                            </Picker.Column>
                                        </Picker>
                                    </div>
                                    <div className="mt-2">
                                        <button
                                            type="button"
                                            className="inline-flex justify-center rounded-md border border-transparent px-4 py-2 text-sm font-medium text-[#ccc] cursor-pointer  focus:outline-none focus-visible:ring-2  focus-visible:ring-offset-2"
                                            onClick={() => {
                                                onDateSelect(pickerValue)
                                            }}
                                        >
                                            OK
                                        </button>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </>
    )
}