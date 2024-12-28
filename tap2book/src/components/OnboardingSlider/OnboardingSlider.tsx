'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, A11y } from 'swiper/modules';
import { useTranslations } from 'next-intl';
import { Button } from '@telegram-apps/telegram-ui';

import { Modal } from '../Modal/Modal';
import { useOnboarding } from './useOnboarding';

import './styles.css';
import 'swiper/css';
import 'swiper/css/pagination';

export function OnboardingSlider() {
    const t = useTranslations('onboarding');
    const { isOpen, closeOnboarding } = useOnboarding();

    return (
        <Modal isOpen={isOpen} className="onboarding-slider">
            <Swiper
                modules={[Pagination, A11y]}
                spaceBetween={30}
                slidesPerView={1}
                pagination={{ clickable: true }}
                className="h-full"
            >
                <SwiperSlide>
                    <div className="onboarding-slide">
                        <div className="onboarding-slide__content">
                            <h2 className="onboarding-slide__title">{t('slide1.title')}</h2>
                            <p className="onboarding-slide__text">{t('slide1.description')}</p>
                        </div>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className="onboarding-slide">
                        <div className="onboarding-slide__content">
                            <h2 className="onboarding-slide__title">{t('slide2.title')}</h2>
                            <p className="onboarding-slide__text">{t('slide2.description')}</p>
                        </div>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className="onboarding-slide">
                        <div className="onboarding-slide__content">
                            <h2 className="onboarding-slide__title">{t('slide3.title')}</h2>
                            <p className="onboarding-slide__text">{t('slide3.description')}</p>
                            <Button onClick={closeOnboarding} className="onboarding-slide__button">
                                {t('getStarted')}
                            </Button>
                        </div>
                    </div>
                </SwiperSlide>
            </Swiper>
        </Modal>
    );
}