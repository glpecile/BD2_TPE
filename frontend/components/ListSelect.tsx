import {Listbox, Transition} from "@headlessui/react";
import {CheckIcon, SelectorIcon} from '@heroicons/react/solid'
import {FC, Fragment} from "react";

interface Props {
    selected: string,
    options: string[],
    setSelected: (value: string) => void,
}

export const ListSelect: FC<Props> = (props) => {
    return (
        <div className={"w-32 capitalize"}>
            <Listbox value={props.selected} onChange={props.setSelected}>
                <div className="relative mt-1">
                    <Listbox.Button
                        className="relative card-bg w-full cursor-default rounded-full py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
                        <span className="block truncate capitalize">{props.selected}</span>
                        <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
              <SelectorIcon
                  className="h-5 w-5 text-gray-400"
                  aria-hidden="true"
              />
            </span>
                    </Listbox.Button>
                    <Transition
                        as={Fragment}
                        leave="transition ease-in duration-100"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <Listbox.Options
                            className="absolute z-20 mt-1 max-h-60 w-full overflow-auto rounded-md card-bg py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                            {props.options.map((option, optionIdx) => (
                                <Listbox.Option
                                    key={optionIdx}
                                    className={({active}) =>
                                        `relative cursor-default select-none py-2 ${
                                            active ? 'bg-slate-500/25' : ''
                                        }`
                                    }
                                    value={option}
                                >
                                    {({selected}) => (
                                        <>
                      <span
                          className={`block truncate ${
                              selected ? 'font-medium' : 'font-normal'
                          }`}
                      >
                        {option}
                      </span>
                                            {selected ? (
                                                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-brand_primary dark:text-brand_secondary">
                          <CheckIcon className="h-5 w-5" aria-hidden="true"/>
                        </span>
                                            ) : null}
                                        </>
                                    )}
                                </Listbox.Option>
                            ))}
                        </Listbox.Options>
                    </Transition>
                </div>
            </Listbox>
        </div>);
}