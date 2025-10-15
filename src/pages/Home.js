import { Container } from "react-bootstrap";
import './css/Home.css'

const Home = (() => {
    return (
        <>
            <Container className="container-home my-5">
                <h5 className="my-5 text-center title">Bem-Vindo a Liga Cobblemon</h5>
                <div className="video-container mt-1 mb-5">
                    <iframe
                        src="https://www.youtube.com/embed/HUD1ltMD2AM?autoplay=1&mute=1&loop=1"
                        title="Trailer Liga Cobblemon"
                        frameBorder="0"
                        allow="autoplay; fullscreen; loop"
                        className="youtube-video"
                    ></iframe>
                </div>
            </Container>
        </>
    )
})

export default Home