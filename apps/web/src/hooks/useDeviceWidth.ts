import { useEffect, useState } from "react";


// returns boolean indicating if the display width of the website is atleast 768px
const useDeviceWidth = () => {

    const [deviceWidth, setDeviceWidth] = useState(window.innerWidth);

    useEffect(() => {

        const handleResize = () => setDeviceWidth(window.innerWidth)

        window.addEventListener("resize", handleResize)

        return () => {
            window.removeEventListener("resize", handleResize)
        }
    }, [])

    const isDesktop = deviceWidth >= 768

    return { isDesktop };
}

export default useDeviceWidth;