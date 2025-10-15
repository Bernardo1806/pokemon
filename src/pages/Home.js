import { Container } from "react-bootstrap";
import './css/Home.css'

const Home = (() => {
    return (
        <>
            <Container className="container-home my-5">
                <h4 className="my-5 text-center title">Bem-Vindo a Liga Monke</h4>
                <div className="embed-responsive embed-responsive-21y9 video-container mt-1 mb-5">
                    <iframe className="embed-responsive-item youtube-video" title="Video Liga Monke" src="https://www.youtube.com/embed/_OkHx0XZlQE?autoplay=1&mute=1&loop=1&rel=0" allowFullScreen></iframe>
                </div>
            </Container>
        </>
    )
})

export default Home