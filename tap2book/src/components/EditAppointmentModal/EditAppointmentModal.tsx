import { useState, useEffect } from "react";
import { Button, Input, Section } from "@telegram-apps/telegram-ui";
import { X } from "lucide-react";

interface AppointmentData {
    id?: number;
    title: string;
    description: string;
    image_url: string;
    price: string;
    telegram_id?: number;
}

interface EditAppointmentModalProps {
    isOpen: boolean;
    appointment?: AppointmentData;
    onSave: (data: AppointmentData) => void;
    onClose: () => void;
}

interface ValidationErrors {
    title?: string;
    description?: string;
    image_url?: string;
    price?: string;
}

export function EditAppointmentModal({
                                         isOpen,
                                         appointment,
                                         onSave,
                                         onClose
                                     }: EditAppointmentModalProps) {
    // Инициализация состояния формы
    const [formData, setFormData] = useState<AppointmentData>({
        title: "",
        description: "",
        image_url: "",
        price: "",
    });

    // Состояние для ошибок валидации
    const [errors, setErrors] = useState<ValidationErrors>({});

    // Обновляем форму при изменении appointment
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
    }, [appointment]);

    // Обработчик изменения полей формы
    const handleChange = (field: keyof AppointmentData, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }));
        // Очищаем ошибку поля при изменении
        setErrors(prev => ({ ...prev, [field]: undefined }));
    };

    // Валидация формы
    const validateForm = (): boolean => {
        const newErrors: ValidationErrors = {};

        // Валидация заголовка
        if (!formData.title || formData.title.length < 3) {
            newErrors.title = "Минимум 3 символа";
        } else if (formData.title.length > 50) {
            newErrors.title = "Максимум 50 символов";
        }

        // Валидация описания
        if (formData.description && formData.description.length > 300) {
            newErrors.description = "Максимум 300 символов";
        }

        // Валидация URL изображения
        const urlPattern = /^https?:\/\/.+\.(jpg|jpeg|png|webp|gif)$/i;
        if (!formData.image_url.match(urlPattern)) {
            newErrors.image_url = "Некорректная ссылка на изображение";
        }

        // Валидация цены
        const price = parseFloat(formData.price);
        if (isNaN(price) || price <= 0) {
            newErrors.price = "Введите положительное число";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    // Обработчик отправки формы
    const handleSubmit = () => {
        if (validateForm()) {
            onSave(formData);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="w-full max-w-md bg-[var(--tg-theme-bg-color)] rounded-lg shadow-xl">
                {/* Заголовок */}
                <div className="flex items-center p-4 border-b border-[var(--tg-theme-hint-color)] border-opacity-20">
                    <h3 className="text-lg font-semibold text-[var(--tg-theme-text-color)] flex-grow text-center">
                        {appointment ? "Редактирование услуги" : "Создание услуги"}
                    </h3>
                    <Button
                        onClick={onClose}
                        className="p-2 bg-[var(--tg-theme-secondary-bg-color)] rounded-full ml-auto"
                    >
                        <X className="w-5 h-5"/>
                    </Button>
                </div>

                {/* Форма */}
                <Section className="p-4">
                    <div className="space-y-4">
                        {/* Название услуги */}
                        <div>
                            <Input
                                value={formData.title}
                                onChange={(e) => handleChange("title", e.target.value)}
                                placeholder="Название услуги"
                                className={`w-full p-2 ${errors.title ? 'border-red-500' : ''}`}
                            />
                            {errors.title && (
                                <p className="mt-1 text-sm text-[var(--tg-theme-destructive-text-color)]">
                                    {errors.title}
                                </p>
                            )}
                        </div>

                        {/* Описание */}
                        <div>
                            <Input
                                value={formData.description}
                                onChange={(e) => handleChange("description", e.target.value)}
                                placeholder="Описание"
                                className={`w-full p-2 ${errors.description ? 'border-red-500' : ''}`}
                            />
                            {errors.description && (
                                <p className="mt-1 text-sm text-[var(--tg-theme-destructive-text-color)]">
                                    {errors.description}
                                </p>
                            )}
                        </div>

                        {/* URL изображения */}
                        <div>
                            <Input
                                value={formData.image_url}
                                onChange={(e) => handleChange("image_url", e.target.value)}
                                placeholder="URL изображения"
                                className={`w-full p-2 ${errors.image_url ? 'border-red-500' : ''}`}
                            />
                            {errors.image_url && (
                                <p className="mt-1 text-sm text-[var(--tg-theme-destructive-text-color)]">
                                    {errors.image_url}
                                </p>
                            )}
                        </div>

                        {/* Цена */}
                        <div>
                            <Input
                                value={formData.price}
                                onChange={(e) => handleChange("price", e.target.value)}
                                placeholder="Цена"
                                type="number"
                                className={`w-full p-2 ${errors.price ? 'border-red-500' : ''}`}
                            />
                            {errors.price && (
                                <p className="mt-1 text-sm text-[var(--tg-theme-destructive-text-color)]">
                                    {errors.price}
                                </p>
                            )}
                        </div>
                    </div>

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