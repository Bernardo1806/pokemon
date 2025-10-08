import { FaArrowUp } from "react-icons/fa";
import { Button } from "react-bootstrap";
import { useEffect, useState } from 'react';
import './css/Menu.css'

const Menu = ({ children }) => {
    const [showButton, setShowButton] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 300) {
                setShowButton(true);
            } else {
                setShowButton(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }


    return (
        <>
            <div className='Menu'>
                


                <div style={{ flex: '1' }}>
                    {children}
                </div>

                {showButton && (
                    <Button
                        onclick={scrollToTop}
                        className="scroll-to-top"
                        variant="primary"
                        title="Voltar ao topo"
                    >
                        <FaArrowUp />
                    </Button>
                )}
            </div>
        </>
    )
}

export default Menu;