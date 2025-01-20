import { APILink, MediaAddress } from "../consts/consts";

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

export function GetMediaLink(name: String) {
    return APILink + MediaAddress + name
}


export function Symbolize(count: number) {
    let final = ''
    if (!count) {
        count = 0
    }
    if (count > 999999999) {
        final = (count / 1000000000).toFixed(1)
        return final + "B"
    } else
        if (count > 999999) {
            count = count / 1000000
            final = (count.toFixed(1))
            return final + "M"
        } else
            if (count > 999) {
                count = count / 1000
                final = (count.toFixed(1))
                return final + "K"
            } else {
                return count.toString()
            }

}


export function FindMentions(text: string): { mentions: string[], parts: string[], regex: RegExp } {
    const regex = /@\w+/g;
    const matches = text.match(regex);
    return { mentions: matches || [], parts: text.split(/(\s+)/), regex: regex };
}

export function formatPostsDate(date: Date | string): string {
    // Ensure the input is a Date object
    const parsedDate = typeof date === 'string' ? new Date(date) : date;

    if (isNaN(parsedDate.getTime())) {
        throw new Error('Invalid date input'); // Handle invalid date input
    }

    const now = new Date();
    const isCurrentYear = parsedDate.getFullYear() === now.getFullYear();

    const options: Intl.DateTimeFormatOptions = {
        month: 'long', // Full month name
        day: 'numeric', // Numeric day
    };

    let formattedDate = new Intl.DateTimeFormat('en-US', options).format(parsedDate);

    // Append the year if it's not the current year
    if (!isCurrentYear) {
        formattedDate += ` ${parsedDate.getFullYear()}`;
    }

    return formattedDate;
}



export function formatPostDateTime(date: Date): string {
    const timeFormatter = new Intl.DateTimeFormat('en-US', {
        hour: 'numeric',
        minute: 'numeric',
        hour12: true, // Ensures 12-hour format with am/pm
    });

    const dateFormatter = new Intl.DateTimeFormat('en-US', {
        month: 'short', // Short month name (e.g., "Oct")
        day: 'numeric', // Day of the month (e.g., "2")
        year: 'numeric', // Full year (e.g., "2024")
    });

    const time = timeFormatter.format(date); // Format time (e.g., "5:23 PM")
    const formattedDate = dateFormatter.format(date); // Format date (e.g., "Oct 2, 2024")

    return `${time.toLowerCase()} ${formattedDate}`; // Combine with lowercase AM/PM
}
