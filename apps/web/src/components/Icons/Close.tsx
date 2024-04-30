import * as React from "react";

function Close(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg width="1em" height="1em" viewBox="0 0 18 18" fill="none" {...props}>
            <g clipPath="url(#prefix__clip0_27_2929)">
                <path
                    d="M19.125 19.125l-20.25-20.25m20.25 0l-20.25 20.25"
                    stroke={props.stroke || "#000"}
                    strokeWidth={2}
                    strokeLinecap="round"
                />
            </g>
            <defs>
                <clipPath id="prefix__clip0_27_2929">
                    <path fill="#fff" d="M0 0h18v18H0z" />
                </clipPath>
            </defs>
        </svg>
    );
}

const CloseIcon = React.memo(Close);
export default CloseIcon;
