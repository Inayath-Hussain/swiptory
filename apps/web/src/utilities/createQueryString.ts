export const createQueryString = (options: Record<string, string>) => {
    const urlParams = new URLSearchParams();

    Object.keys(options).map(key => {
        const value = options[key as keyof typeof options]
        if (value) urlParams.append(key, value)
    })

    return urlParams.toString();
}