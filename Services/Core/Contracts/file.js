export default function(file,allowedTypes) {
    let valid = false;

    allowedTypes.forEach(type => {
        let regex = new RegExp(type,"i");
        if (regex.test(file.mimetype)) {
            valid = true;
        }
    });

    return valid
}