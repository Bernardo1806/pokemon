import { FaArrowUp } from "react-icons/fa";
import { Button, Navbar, Container, Nav } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from 'react';
import './css/Menu.css'

const Menu = ({ children }) => {
    const [showButton, setShowButton] = useState(false);
    const location = useLocation();

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

                <Navbar expand="lg" className="Navbar-background" >
                    <Container fluid className="justify-content-center">
                        <Nav className="w-70 justify-content-center">

                            <Nav.Item>
                                <Nav.Link as={Link} to="/" className={`btn custom-btn home-btn ${location.pathname === '/' ? 'active' : ''}`}>
                                    <div className="btn-content">
                                        <img src="https://i.imgur.com/tsJNdSE.png" alt="" className="btn-image" />
                                        <span className="btn-text">Home</span>
                                    </div>
                                </Nav.Link>
                            </Nav.Item>

                            <Nav.Item>
                                <Nav.Link as={Link} to="/pokedex" className={`btn custom-btn pokedex-btn ${location.pathname === '/pokedex' ? 'active' : ''}`}>
                                    <div className="btn-content">
                                        <img src="https://i.imgur.com/t4EtWZA.png" alt="" className="btn-image" />
                                        <span className="btn-text">Pokédex</span>
                                    </div>
                                </Nav.Link>
                            </Nav.Item>

                            <Nav.Item>
                                <Nav.Link as={Link} to="/" className={`btn custom-btn trainer-btn ${location.pathname === '/treinadores' ? 'active' : ''}`}>
                                    <div className="btn-content">
                                        <img src="https://i.imgur.com/sSFz6Nj.png" alt="" className="btn-image" />
                                        <span className="btn-text">Treinadores</span>
                                    </div>
                                </Nav.Link>
                            </Nav.Item>

                            <Nav.Item>
                                <Nav.Link as={Link} to="/" className={`btn custom-btn map-btn ${location.pathname === '/mapa' ? 'active' : ''}`}>
                                    <div className="btn-content">
                                        <img src="https://i.imgur.com/Gm8BkV0.png" alt="" className="btn-image" />
                                        <span className="btn-text">Mapa</span>
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