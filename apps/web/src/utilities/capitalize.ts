export const capitalize = (value: string) => {
    let words = value.split(" ");

    words = words.map(w => w[0].toUpperCase() + w.slice(1));

    return words.join(" ");
}