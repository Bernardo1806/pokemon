import { FaArrowUp } from "react-icons/fa";
import { Button, Navbar, Container, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
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

                <Navbar expand="lg" className="Navbar-background" fixed="top" >
                    <Container fluid className="justify-content-center">
                        <Nav className="w-70 justify-content-center">

                            <Nav.Item>
                                <Nav.Link as={Link} to="/" className="btn custom-btn home-btn">
                                    <div className="btn-content">
                                        <img src="https://i.imgur.com/dOzI39Y.png" alt="" className="btn-image" />
                                        <span className="btn-text">Home</span>
                                    </div>
                                </Nav.Link>
                            </Nav.Item>

                            <Nav.Item>
                                <Nav.Link as={Link} to="/" className="btn custom-btn pokedex-btn">
                                    <div className="btn-content">
                                        <img src="https://i.imgur.com/dOzI39Y.png" alt="" className="btn-image" />
                                        <span className="btn-text">Pokédex</span>
                                    </div>
                                </Nav.Link>
                            </Nav.Item>

                        </Nav>
                    </Container>
                </Navbar>

                <div style={{ flex: '1' }}>
                    {children}
                </div>

                {showButton && (
                    <Button
                        onClick={scrollToTop}
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