import React from 'react';
import { useLocation } from "react-router-dom";

const Error404 = () => {
    let location = useLocation();
    return (
        <div>
            <span>
                Nenhum resultado para <code>{location.pathname}</code>
            </span>
        </div>
    );
}

export default Error404;