//remember you gotta give the dialogref.current
export const closeModal = (dialog: HTMLDialogElement | null) => {
    if (dialog) {
        dialog.close();
    }
};


export function Symbolize(count: number) {
    let final = ''
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