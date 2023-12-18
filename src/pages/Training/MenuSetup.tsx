import { Accordion, AccordionItem, Button } from '@nextui-org/react';
import { InputLoadingNumber } from '../../components/InputUnit';
import {
    SelectMuscle,
    SelectNumber,
    SelectWorkOutItem,
} from '../../components/SelectionUnits';
import AddIcon from '../../icons/add.png';
import { MenuStore } from '../../stores/MenuStore';
export default function MenuSetup() {
    const itemGroup = MenuStore((state) => state.itemGroup);
    const itemName = MenuStore((state) => state.itemName);
    const runCount = MenuStore((state) => state.runCount);
    const loading = MenuStore((state) => state.loading);
    const setMenuList = MenuStore((state) => state.setMenuList);

    return (
        <div className="flex-shrink-0 min-w-[230px]">
            <Accordion className="bg-white px-2 w-full" variant="shadow">
                <AccordionItem
                    classNames={{
                        trigger: 'py-2',
                        title: 'text-center font-bold',
                    }}
                    key="1"
                    aria-label="Accordion 1"
                    title="建立新菜單"
                >
                    <div className=" flex flex-col items-start justify-between gap-y-3">
                        <div
                            className={` w-full border-l-5 px-2 ${
                                itemGroup === ''
                                    ? 'border-yellow-300'
                                    : 'border-gray-300'
                            }`}
                        >
                            <SelectMuscle />
                        </div>
                        <div
                            className={`w-full border-l-5 px-2 ${
                                itemGroup === '' && itemName === ''
                                    ? ' border-transparent'
                                    : itemName === ''
                                      ? 'border-yellow-300'
                                      : ' border-gray-300'
                            }`}
                        >
                            <SelectWorkOutItem />
                        </div>
                        <div
                            className={`w-full border-l-5 px-2 ${
                                runCount !== 'default'
                                    ? 'border-gray-300'
                                    : itemName !== ''
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
                            <InputLoadingNumber
                                id={'loading'}
                                type={'number'}
                                label={'設定目標重量'}
                            />
                        </div>
                        <div className="flex-end flex w-full justify-end pr-2 ">
                            <Button
                                className=" ml-2 w-full items-center justify-center rounded-full bg-gray-400 text-lg text-white hover:bg-black"
                                endContent={
                                    <img className=" h-5 w-5" src={AddIcon} />
                                }
                                onClick={setMenuList}
                            >
                                新增項目
                            </Button>
                        </div>
                    </div>
                </AccordionItem>
            </Accordion>
        </div>
    );
}
