import * as React from "react";

function Bookmark(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg width="1em" height="1em" viewBox="0 0 20 25" fill="none" {...props}>
            <path
                d="M19.18 24.507l-9.59-7.192L0 24.507V0h19.18v24.507z"
                fill={props.fill || "#fff"}
            />
        </svg>
    );
}

const BookmarkIcon = React.memo(Bookmark);
export default BookmarkIcon;
