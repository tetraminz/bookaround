'use client';

import {Swiper, SwiperRef, SwiperSlide} from 'swiper/react';
import { Pagination, A11y } from 'swiper/modules';
import { useTranslations } from 'next-intl';
import { Button } from '@telegram-apps/telegram-ui';

import 'swiper/css';
import 'swiper/css/pagination';
import { useOnboarding } from "@/components/OnboardingSlider/useOnboarding";
import { useState, useRef } from "react";

export function OnboardingSlider() {
    const t = useTranslations('onboarding');
    const { isOpen, closeOnboarding } = useOnboarding();
    const [activeIndex, setActiveIndex] = useState(0);
    const swiperRef = useRef<SwiperRef | null>(null);

    return (
        <div className={`fixed inset-0 bg-[var(--tg-theme-bg-color)] z-50 ${isOpen ? 'flex' : 'hidden'} flex-col justify-between`}>
            {/* Контейнер слайдов */}
            <div className="flex-grow flex items-center justify-center relative">
                <Swiper
                    ref={swiperRef} // Используем реф для доступа к Swiper
                    modules={[Pagination, A11y]}
                    spaceBetween={30}
                    slidesPerView={1}
                    pagination={{
                        clickable: true,
                        el: '.swiper-pagination',
                    }}
                    className="w-full max-w-lg h-full"
                    onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
                >
                    {/* Slide 1 */}
                    <SwiperSlide>
                        <div className="flex flex-col items-center justify-center h-full px-8 text-center">
                            <h2 className="text-xl font-bold mb-4 text-[var(--tg-theme-text-color)]">
                                {t('slide1.title')}
                            </h2>
                            <p className="text-base leading-6 text-[var(--tg-theme-hint-color)]">
                                {t('slide1.description')}
                            </p>
                        </div>
                    </SwiperSlide>

                    {/* Slide 2 */}
                    <SwiperSlide>
                        <div className="flex flex-col items-center justify-center h-full px-8 text-center">
                            <h2 className="text-xl font-bold mb-4 text-[var(--tg-theme-text-color)]">
                                {t('slide2.title')}
                            </h2>
                            <p className="text-base leading-6 text-[var(--tg-theme-hint-color)]">
                                {t('slide2.description')}
                            </p>
                        </div>
                    </SwiperSlide>

                    {/* Slide 3 (Последний) */}
                    <SwiperSlide>
                        <div className="flex flex-col items-center justify-center h-full px-8 text-center">
                            <h2 className="text-xl font-bold mb-4 text-[var(--tg-theme-text-color)]">
                                {t('slide3.title')}
                            </h2>
                            <p className="text-base leading-6 text-[var(--tg-theme-hint-color)]">
                                {t('slide3.description')}
                            </p>
                        </div>
                    </SwiperSlide>
                </Swiper>

                {/* Кнопка */}
                <div className="absolute bottom-16 left-1/2 transform -translate-x-1/2 z-10">
                    <Button
                        onClick={() => {
                            if (activeIndex === 2) {
                                closeOnboarding(); // Закрыть онбординг на последнем слайде
                            } else {
                                swiperRef.current?.swiper.slideNext(); // Переключить на следующий слайд
                            }
                        }}
                        className="px-6 py-3"
                    >
                        {activeIndex === 2 ? t('getStarted') : t('next')}
                    </Button>
                </div>
            </div>

            {/* Пагинация */}
            <div className="swiper-pagination w-full flex justify-center mb-6"></div>
        </div>
    );
}