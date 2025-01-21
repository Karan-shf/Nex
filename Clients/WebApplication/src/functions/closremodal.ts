//remember you gotta give the dialogref.current
export const closeModal = (dialog: HTMLDialogElement | null) => {
    if (dialog) {
        dialog.close();
    }
};

export function closeModalWithId(dialogId: string) {
    // Select the dialog element by ID
    const dialog = document.getElementById(dialogId) as HTMLDialogElement;

    // Check if the element exists and is a dialog
    if (dialog && dialog.tagName.toLowerCase() === 'dialog') {
        dialog.close(); // Close the dialog
    } else {
        console.error(`Element with ID "${dialogId}" is not a dialog or does not exist.`);
    }
}