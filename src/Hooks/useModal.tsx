import { useRef } from "react";
import { ModalHookType } from "../Types";

export function useModal() {
    const modalRef = useRef<HTMLDialogElement | null>(null);

    function handleKeyDown(event : KeyboardEvent) {
        if (modalRef.current && event.key === 'Escape') {
            closeModal();
        }
    }

    function openModal() {
        modalRef.current?.showModal();
        document.body.style.overflow = 'hidden';
        document.addEventListener('keydown', handleKeyDown);
    }

    function closeModal() {
        modalRef.current?.close();
        document.body.style.overflow = '';
        document.removeEventListener('keydown', handleKeyDown);
    }

    return { modalRef, openModal, closeModal } as ModalHookType;
}
