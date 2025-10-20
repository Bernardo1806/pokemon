import { Container, Card, OverlayTrigger, Tooltip } from "react-bootstrap";
import './css/Home.css'
import Loading from './Loading'
import { useState } from "react";

const Home = (() => {
    const [copied, setCopied] = useState(false);
    const textToCopy = 'november-receptor.gl.joinmc.link';

    const handleCopy = () => {
        if (navigator && navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText(textToCopy)
                .then(() => {
                    setCopied(true)
                    setTimeout(() => setCopied(false), 2000)
                })
                .catch(err => {
                    console.error("Erro ao copiar: ", err)
                })
        } else {
            console.log('Clipboard API não suportada')
        }
    }

    const renderTooltip = (props) => (
        <Tooltip id="copy-tooltip" {...props}>
            {copied ? "Copiado!" : "Clique para copiar"}
        </Tooltip>
    )

    return (
        <>
            <Container className="container-home my-5">
                <h4 className="mt-5 mb-3 text-center title">Bem-Vindo a Liga Monke</h4>

                <OverlayTrigger
                    placement="top"
                    overlay={renderTooltip}
                    trigger={['hover', 'focus']}
                >
                    <Card
                        className="copy-card mb-2"
                        onClick={handleCopy}
                    >
                        <Card.Body>
                            <Card.Text className="copy-text px-2 py-1">
                                {textToCopy}
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </OverlayTrigger>

                <div className="embed-responsive embed-responsive-21y9 video-container mb-5">
                    <iframe className="embed-responsive-item youtube-video" title="Video Liga Monke" src="https://www.youtube.com/embed/_OkHx0XZlQE?autoplay=1&mute=1&loop=1&rel=0" allowFullScreen></iframe>
                </div>

            </Container>
        </>
    )
})

export default Home