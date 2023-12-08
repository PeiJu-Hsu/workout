import { Accordion, AccordionItem, Button } from '@nextui-org/react';
import { InputLoadingNumber } from '../../components/InputUnit';
import { SelectMuscle, SelectNumber, SelectWorkOutItem } from '../../components/SelectionUnits';
import AddIcon from '../../icons/add.png';
import { MenuStore } from '../../stores/MenuStore';
export default function MenuSetup() {
    const itemGroup = MenuStore((state) => state.itemGroup);
    const itemName = MenuStore((state) => state.itemName);
    const runCount = MenuStore((state) => state.runCount);
    const loading = MenuStore((state) => state.loading);
    const setMenuList = MenuStore((state) => state.setMenuList);

    return (
        <div className=" my-2 ">
            <Accordion variant="splitted">
                <AccordionItem key="1" aria-label="Accordion 1" title="開始建立菜單">
                    <div className=" flex flex-col items-start justify-between gap-y-2">
                        <div
                            className={` w-full border-l-5 px-2 ${
                                itemGroup === 'default' ? 'border-yellow-300' : 'border-gray-300'
                            }`}
                        >
                            <SelectMuscle />
                        </div>
                        <div
                            className={`w-full border-l-5 px-2 ${
                                itemName !== 'default'
                                    ? 'border-gray-300'
                                    : itemGroup !== 'default'
                                      ? 'border-yellow-300'
                                      : ' border-transparent'
                            }`}
                        >
                            <SelectWorkOutItem />
                        </div>
                        <div
                            className={`w-full border-l-5 px-2 ${
                                runCount !== 'default'
                                    ? 'border-gray-300'
                                    : itemName !== 'default'
                                      ? 'border-yellow-300'
                                      : ' border-transparent'
                            }`}
                        >
                            <SelectNumber max={Number(5)} />
                        </div>
                        <div
                            className={`w-full border-l-5 px-2 ${
                                loading !== 'default'
                                    ? 'border-gray-300'
                                    : runCount !== 'default'
                                      ? 'border-yellow-300'
                                      : ' border-transparent'
                            }`}
                        >
                            <InputLoadingNumber id={'loading'} type={'number'} label={'target-load'} />
                        </div>
                        {/* <div className=" m-auto flex  items-center justify-center rounded-full bg-gray-400 hover:bg-yellow-400"> */}
                        <div className="flex-end flex w-full justify-end pr-2 ">
                            <Button
                                className=" items-center justify-center rounded-full bg-gray-400 text-lg text-white hover:bg-yellow-300"
                                endContent={<img className=" h-2/3 w-2/3" src={AddIcon} />}
                                onClick={setMenuList}
                            >
                                Add item
                            </Button>
                        </div>

                        {/* </div> */}
                    </div>
                </AccordionItem>
            </Accordion>
        </div>
    );
}
