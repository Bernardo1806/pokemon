import { useEffect } from "react";
import './css/Loading.css';

function Loading({ onFinish }) {
    useEffect(() => {
        const timer = setTimeout(() => {
            onFinish();
        }, 0);
        return () => clearTimeout(timer);
    }, [onFinish]);

    return (
        <div className='loading-screen' />
    );
}

export default Loading;