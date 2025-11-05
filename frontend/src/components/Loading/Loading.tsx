import React from "react";
import * as s from "./Loading.css.ts";

type LoaderProps = {
    size?: number | string;
    title?: string;
    className?: string;
    style?: React.CSSProperties;
};

const Loader: React.FC<LoaderProps> = ({
                                           size = 120,
                                           title = "Loading",
                                           className,
                                           style,
                                       }) => {
    const numericSize = `${size}px`;

    return (
        <div
            role="status"
            aria-live="polite"
            aria-label={title}
            className={`${s.loaderContainer} ${className ?? ""}`}
            style={style}
        >
            <div
                className={s.loader}
                style={{
                    width: numericSize,
                    height: numericSize,
                }}
            />
            {title ? <span className={s.srOnly}>{title}</span> : null}
        </div>
    );
};

export default Loader;
