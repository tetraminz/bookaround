"use client";

import {useState, useEffect, ChangeEvent, useRef} from "react";
import {
    Button,
    Input,
    Section,
    List, Tappable, Textarea,
} from "@telegram-apps/telegram-ui";

import { X } from "lucide-react";
import {Icon24Close} from "@telegram-apps/telegram-ui/dist/icons/24/close";

export interface AppointmentData {
    id?: number;             // В booking.Appointment: id: number
    title: string;
    description: string;
    image_url: string;
    price: string;
    telegram_id?: number;    // В booking.Appointment: telegram_id: number
    created_at?: string;     // В booking.Appointment: string
    updated_at?: string;     // В booking.Appointment: string
}

interface EditAppointmentModalProps {
    isOpen: boolean;
    appointment?: AppointmentData;
    onSave: (data: AppointmentData) => Promise<void>;
    onClose: () => void;
}

interface ValidationErrors {
    title?: string;
    description?: string;
    image_url?: string;
    price?: string;
}

// TODO стили

// TODO валидация сразу

export function EditAppointmentModal({
                                         isOpen,
                                         appointment,
                                         onSave,
                                         onClose,
                                     }: EditAppointmentModalProps) {
    // Состояние формы
    const [formData, setFormData] = useState<AppointmentData>({
        title: "",
        description: "",
        image_url: "",
        price: "",
    });

    // Состояние для ошибок валидации
    const [errors, setErrors] = useState<ValidationErrors>({});

    // При изменении appointment сбрасываем/устанавливаем форму
    useEffect(() => {
        if (appointment) {
            setFormData(appointment);
        } else {
            setFormData({
                title: "",
                description: "",
                image_url: "",
                price: "",
            });
        }
        setErrors({});
    }, [appointment]);

    // Обработчик изменения полей формы
    const handleChange = (field: keyof AppointmentData, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }));
        // Очищаем ошибку поля при изменении
        setErrors(prev => ({ ...prev, [field]: undefined }));
    };

    // Валидация (уже была в коде)
    const validateForm = (): boolean => {
        const newErrors: ValidationErrors = {};

        // Название
        if (!formData.title || formData.title.length < 3) {
            newErrors.title = "Минимум 3 символа";
        } else if (formData.title.length > 50) {
            newErrors.title = "Максимум 50 символов";
        }

        // Описание
        if (formData.description && formData.description.length > 1500) {
            newErrors.description = "Максимум 1000 символов";
        }

        // URL изображения
        const urlPattern = /^https?:\/\/.+\.(jpg|jpeg|png|webp|gif)$/i;
        if (!formData.image_url.match(urlPattern)) {
            newErrors.image_url = "Некорректная ссылка на изображение";
        }

        // Цена
        const price = parseFloat(formData.price);
        if (isNaN(price) || price <= 0) {
            newErrors.price = "Введите положительное число";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    // Отправка формы
    const handleSubmit = () => {
        if (validateForm()) {
            onSave(formData);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="w-screen max-w-md bg-[var(--tg-theme-bg-color)] rounded-lg shadow-xl overflow-hidden">
                {/* Заголовок модалки */}
                <div className="flex items-center p-4 ">
                    <h3 className="text-lg font-semibold text-[var(--tg-theme-text-color)] flex-grow text-center">
                        {appointment ? "Редактирование услуги" : "Создание услуги"}
                    </h3>
                    <Button
                        onClick={onClose}
                        className="p-2 bg-[var(--tg-theme-secondary-bg-color)] rounded-full ml-auto"
                    >
                        <X className="w-5 h-5" />
                    </Button>
                </div>

                {/* Основное содержимое. Заменяем div на Section + List */}
                <Section className="p-5">
                    <List
                        style={{
                            width: 400,
                            maxWidth: '100%',
                            margin: 'auto',
                            background: 'var(--tg-theme-secondary-bg-color)'
                        }}
                    >
                        {/* Название услуги */}
                        <Input
                            header="Название"
                            placeholder="Введите название услуги"
                            status={errors.title ? 'error' : 'focused'}
                            value={formData.title}
                            onChange={(e) => handleChange("title", e.target.value)}
                            // Кнопка очистки
                            after={
                                <Tappable
                                    Component="div"
                                    style={{ display: "flex" }}
                                    onClick={() => handleChange("title", "")}
                                >
                                    <Icon24Close />
                                </Tappable>
                            }
                        />
                        {errors.title && (
                            <ul className="mt-1 text-sm text-[var(--tg-theme-destructive-text-color)] list-disc list-inside">
                                <li>{errors.title}</li>
                            </ul>
                        )}

                        {/* Описание */}
                        <Textarea
                            style={{
                                minHeight:200,
                                maxHeight:400,
                            }}
                            placeholder="Расскажите об услуге"
                            header='Описание'
                            status='default'
                            value={formData.description}
                            onChange={(e) => handleChange("description", e.target.value)}
                            //TODO что тут с after???
                            // after={
                            //     formData.description ? (
                            //         <Tappable
                            //             Component="div"
                            //             style={{ display: "flex" }}
                            //             onClick={() => handleChange("description", "")}
                            //         >
                            //             <Icon24Close />
                            //         </Tappable>
                            //     ) : undefined
                            // }
                        />
                        {errors.description && (
                            <ul className="mt-1 text-sm text-[var(--tg-theme-destructive-text-color)] list-disc list-inside">
                                <li>{errors.description}</li>
                            </ul>
                        )}

                        {/* URL изображения */}
                        <Input
                            header="Изображение"
                            placeholder="https://example.com/photo.jpg"
                            status={errors.image_url ? "error" : 'focused'}
                            value={formData.image_url}
                            onChange={(e) => handleChange("image_url", e.target.value)}
                            after={
                                formData.image_url ? (
                                    <Tappable
                                        Component="div"
                                        style={{ display: "flex" }}
                                        onClick={() => handleChange("image_url", "")}
                                    >
                                        <Icon24Close />
                                    </Tappable>
                                ) : undefined
                            }
                        />
                        {errors.image_url && (
                            <ul className="mt-1 text-sm text-[var(--tg-theme-destructive-text-color)] list-disc list-inside">
                                <li>{errors.image_url}</li>
                            </ul>
                        )}

                        {/* Цена */}
                        <Input
                            header="Цена"
                            placeholder="Введите стоимость"
                            type="number"
                            status={errors.price ? "error" : 'focused'}
                            value={formData.price}
                            onChange={(e) => handleChange("price", e.target.value)}
                            after={
                                formData.price ? (
                                    <Tappable
                                        Component="div"
                                        style={{ display: "flex" }}
                                        onClick={() => handleChange("price", "")}
                                    >
                                        <Icon24Close />
                                    </Tappable>
                                ) : undefined
                            }
                        />
                        {errors.price && (
                            <ul className="mt-1 text-sm text-[var(--tg-theme-destructive-text-color)] list-disc list-inside">
                                <li>{errors.price}</li>
                            </ul>
                        )}
                    </List>

                    {/* Кнопки действий */}
                    <div className="flex justify-end gap-3 mt-6">
                        <Button
                            onClick={onClose}
                            className="px-4 py-2 bg-[var(--tg-theme-secondary-bg-color)] text-[var(--tg-theme-text-color)]"
                        >
                            Отмена
                        </Button>
                        <Button
                            onClick={handleSubmit}
                            className="px-4 py-2 bg-[var(--tg-theme-button-color)] text-[var(--tg-theme-button-text-color)]"
                        >
                            {appointment ? "Сохранить" : "Создать"}
                        </Button>
                    </div>
                </Section>
            </div>
        </div>
    );
}
