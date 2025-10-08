import { useEffect } from "react";
import './css/Loading.css';

function Loading({ onFinish }) {
    useEffect(() => {
        const timer = setTimeout(() => {
            onFinish();
        }, 2000);
        return () => clearTimeout(timer);
    }, [onFinish]);

    return (
        <div className='loading-screen' />
    );
}

export default Loading;