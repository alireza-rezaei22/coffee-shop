import React from 'react'
import PresentItem from '../presentItem/presentItem'
import SectionHeader from '../SectionHeader/SectionHeader'

export default function Present() {
    return (
        <div className="bg-[url(/src/assets/images/coffee-tea-drink-background.png)] bg-cover bg-opacity-0 py-10">
            <SectionHeader title={'معرفی'} />
            <div className="w-fit max-w-xl mx-auto flex flex-col justify-center items-center gap-8 text-sm p-3">
                <PresentItem
                    title='قهوه'
                    text='قهوه کره ای دالگونا نوشیدنی ای است که با هم زدن به نسبت مساوی پودر قهوه فوری، شکر و آب داغ تا زمانی که حالت خامه ای پیدا کند و سپس آن را به شیر سرد یا داغ اضافه می کنیم'
                    src='/src/assets/images/coffee.png'
                    isReverse={false}
                />
                <PresentItem
                    title='اسپرسو'
                    text='قهوه کره ای دالگونا نوشیدنی ای است که با هم زدن به نسبت مساوی پودر قهوه فوری، شکر و آب داغ تا زمانی که حالت خامه ای پیدا کند و سپس آن را به شیر سرد یا داغ اضافه می کنیم'
                    src='/src/assets/images/Espresso.png'
                    isReverse={true}
                />
                <PresentItem
                    text='قهوه کره ای دالگونا نوشیدنی ای است که با هم زدن به نسبت مساوی پودر قهوه فوری، شکر و آب داغ تا زمانی که حالت خامه ای پیدا کند و سپس آن را به شیر سرد یا داغ اضافه می کنیم'
                    src='/src/assets/images/shake.png'
                    title='شیک'
                    isReverse={false}
                />
                <PresentItem
                    text='قهوه کره ای دالگونا نوشیدنی ای است که با هم زدن به نسبت مساوی پودر قهوه فوری، شکر و آب داغ تا زمانی که حالت خامه ای پیدا کند و سپس آن را به شیر سرد یا داغ اضافه می کنیم'
                    src='/src/assets/images/Equipment.png'
                    title='تجهیزات'
                    isReverse={true}
                />
            </div>
        </div>
    )
}