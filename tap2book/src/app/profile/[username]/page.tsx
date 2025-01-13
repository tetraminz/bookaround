"use client";

import { useSignal, initData } from "@telegram-apps/sdk-react";
import { Page } from "@/components/Page";
import { ShareProfile } from "@/components/ShareProfile/ShareProfile";
import { AppointmentCards } from "@/components/AppointmentCards/AppointmentCards";
import UserProfile from "@/components/UserProfile/UserProfile";
import { useEffect, useState, useCallback } from "react";
import { useParams } from "next/navigation";
import { booking } from "@/core/backend/client";
import { useUserService } from "@/hooks/useUserService";
import { useAppointmentService } from "@/hooks/useAppointmentService";
import {EditAppointmentModal} from "@/components/EditAppointmentModal/EditAppointmentModal";

export default function UserProfilePage() {
    const params = useParams();
    const username = params.username as string;

    const { getUserByUsername} = useUserService();
    const {
        updateAppointment,
        getAppointment,
        createAppointment,
        deleteAppointment,
        listAppointments,
        listAppointmentsByUser,
    } = useAppointmentService();

    const userByInitData = useSignal(initData.user);

    // Состояния
    const [userByPathParam, setUser] = useState<booking.User>();
    const [userAppointments, setAppointments] = useState<booking.Appointment[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    // Состояния для модального окна
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedAppointment, setSelectedAppointment] = useState<booking.Appointment>();

    useEffect(() => {
        async function fetchUserData() {
            setIsLoading(true);

            try {
                const user = await getUserByUsername(username);

                const appointments = await listAppointmentsByUser(username);

                if (user) {
                    setUser(user);
                }

                if (appointments) {
                    setAppointments(appointments);
                }
            } catch (error) {
                console.error("[API] Ошибка загрузки данных:", error);
            } finally {
                setIsLoading(false);
            }
        }

        fetchUserData();
    }, [username, getUserByUsername, listAppointmentsByUser]);


    async function handleCreateAppointment() {
        setSelectedAppointment(undefined); // Сбрасываем выбранный appointment
        setIsModalOpen(true);

        // console.log('i am here');
        // try {
        //     const newAppt = await createAppointment({
        //         title: "Массаж",
        //         description: "Оздоровительный массаж для спины",
        //         image_url: "https://placehold.co/600x400",
        //         price: "1500",
        //     });
        //     if (newAppt) {
        //         setAppointments((prev) => [...prev, newAppt]);
        //     }
        // } catch (error) {
        //     console.error("[API] Ошибка при создании Appointment:", error);
        // }
    }

    async function handleEditAppointment(id: number) {
        try {
            const appointment = await getAppointment(id);
            if (appointment) {
                setSelectedAppointment(appointment);
                setIsModalOpen(true);
            }
        } catch (error) {
            console.error("[API] Ошибка при получении данных услуги:", error);
        }
    }

    const handleSaveAppointment = async (data: booking.Appointment) => {
        try {
            if (selectedAppointment) {
                // Обновление существующей услуги
                await updateAppointment(selectedAppointment.id, {
                    title: data.title,
                    description: data.description,
                    image_url: data.image_url,
                    price: data.price,
                    telegram_id: userByInitData?.id || 0,
                });

                // Обновляем список услуг
                const updatedAppointments = userAppointments.map(app =>
                    app.id === selectedAppointment.id ? { ...app, ...data } : app
                );
                setAppointments(updatedAppointments);
            } else {
                // Создание новой услуги
                const newAppointment = await createAppointment({
                    title: data.title,
                    description: data.description,
                    image_url: data.image_url,
                    price: data.price,
                });

                if (newAppointment) {
                    setAppointments(prev => [...prev, newAppointment]);
                }
            }

            setIsModalOpen(false);
        } catch (error) {
            console.error("[API] Ошибка при сохранении услуги:", error);
        }
    };

    const isOwnProfile = userByInitData?.username === username;

    // TODO loading component
    if (isLoading || !userByPathParam) {
        return (
            <Page>
                <div className="flex items-center justify-center min-h-screen">
                    <p className="text-[var(--tg-theme-text-color)]">Loading...</p>
                </div>
            </Page>
        );
    }


    return (
        <Page >
            <UserProfile user={userByPathParam} isOwnProfile={isOwnProfile} />

            <div className="flex flex-col min-h-screen bg-[var(--tg-theme-bg-color)] text-center items-center">
                <AppointmentCards
                    appointments={userAppointments}
                    isOwnProfile={isOwnProfile}
                    onEditCard={handleEditAppointment}
                    onAddCard={handleCreateAppointment}
                />
            </div>

            <EditAppointmentModal
                isOpen={isModalOpen}
                appointment={selectedAppointment}
                onSave={handleSaveAppointment}
                onClose={() => setIsModalOpen(false)}
            />

            <div>
                <ShareProfile username={username} />
            </div>
        </Page>
    );
}
