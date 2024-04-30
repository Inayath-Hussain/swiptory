import * as React from "react";

function Like(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg width="1em" height="1em" viewBox="0 0 36 34" fill="none" {...props}>
            <path
                d="M18.014 33.25l-2.563-2.334C6.35 22.664.341 17.203.341 10.541c0-5.461 4.277-9.72 9.72-9.72 3.075 0 6.026 1.431 7.953 3.676C19.94 2.252 22.89.82 25.966.82c5.443 0 9.72 4.259 9.72 9.72 0 6.662-6.009 12.123-15.11 20.375l-2.562 2.333z"
                fill={props.fill || "#fff"}
            />
        </svg>
    );
}

const LikeIcon = React.memo(Like);
export default LikeIcon;
