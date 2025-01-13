"use client";
import { useBackend } from "@/core/backend/context";
import { booking } from "@/core/backend/client";
import { useCallback } from "react";

/**
 * Хук для работы с аппойнтментами:
 * - Создать, удалить, обновить аппойнтмент
 * - Получить один аппойнтмент, все аппойнтменты, аппойнтменты конкретного пользователя
 */
export function useAppointmentService() {
    const { client, isInitialized } = useBackend();

    /**
     * Создать новый аппойнтмент
     */
    const createAppointment = useCallback(
        async (params: booking.CreateAppointmentParams): Promise<booking.Appointment | undefined> => {
            if (!client || !isInitialized) return;
            try {
                return await client.booking.CreateAppointment(params);
            } catch (err) {
                console.error("Ошибка при создании аппойнтмента:", err);
                throw err;
            }
        },
        [client, isInitialized]
    );

    /**
     * Удалить аппойнтмент
     */
    const deleteAppointment = useCallback(
        async (id: number): Promise<void> => {
            if (!client || !isInitialized) return;
            try {
                await client.booking.DeleteAppointment(id);
            } catch (err) {
                console.error("Ошибка при удалении аппойнтмента:", err);
                throw err;
            }
        },
        [client, isInitialized]
    );

    /**
     * Обновить аппойнтмент
     */
    const updateAppointment = useCallback(
        async (id: number, params: booking.UpdateAppointmentParams): Promise<void> => {
            if (!client || !isInitialized) return;
            try {
                await client.booking.UpdateAppointment(id, params);
            } catch (err) {
                console.error("Ошибка при обновлении аппойнтмента:", err);
                throw err;
            }
        },
        [client, isInitialized]
    );

    /**
     * Получить конкретный аппойнтмент по ID
     */
    const getAppointment = useCallback(
        async (id: number): Promise<booking.Appointment | undefined> => {
            if (!client || !isInitialized) return;
            try {
                return await client.booking.GetAppointment(id);
            } catch (err) {
                console.error("Ошибка при получении аппойнтмента:", err);
                throw err;
            }
        },
        [client, isInitialized]
    );

    /**
     * Получить список всех аппойнтментов (без фильтра по юзеру)
     */
    const listAppointments = useCallback(
        async (): Promise<booking.Appointment[] | undefined> => {
            if (!client || !isInitialized) return;
            try {
                const res = await client.booking.ListAppointments();
                return res.appointments;
            } catch (err) {
                console.error("Ошибка при получении всех аппойнтментов:", err);
                throw err;
            }
        },
        [client, isInitialized]
    );

    /**
     * Получить список аппойнтментов для конкретного username
     */
    const listAppointmentsByUser = useCallback(
        async (username: string): Promise<booking.Appointment[] | undefined> => {
            if (!client || !isInitialized) return;
            try {
                const res = await client.booking.ListAppointmentsByUser(username);
                return res.appointments;
            } catch (err) {
                console.error("Ошибка при получении аппойнтментов пользователя:", err);
                throw err;
            }
        },
        [client, isInitialized]
    );

    return {
        createAppointment,
        deleteAppointment,
        updateAppointment,
        getAppointment,
        listAppointments,
        listAppointmentsByUser,
    };
}