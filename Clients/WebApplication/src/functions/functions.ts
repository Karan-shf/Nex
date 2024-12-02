//remember you gotta give the dialogref.current
export const closeModal = (dialog: HTMLDialogElement | null) => {
    if (dialog) {
        dialog.close();
    }
};