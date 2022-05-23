import React, { useState } from "react";

const ShowOnHover = ({ children }) => {
    const [hover, setHover] = useState(false);

    return (
        <div onMouseOver={() => setHover(true)}
            onMouseOut={() => setHover(false)}>
            <div
                className={`${hover ? "block" : "hidden"}`}>
                {children}
            </div>
        </div>
    );
};

export default ShowOnHover;