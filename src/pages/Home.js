import { Container, Card, OverlayTrigger, Tooltip } from "react-bootstrap";
import './css/Home.css'
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
                <h4 className="my-5 text-center title">Bem-Vindo a Liga Monke</h4>
                <div className="embed-responsive embed-responsive-21y9 video-container mt-1 mb-5">
                    <iframe className="embed-responsive-item youtube-video" title="Video Liga Monke" src="https://www.youtube.com/embed/_OkHx0XZlQE?autoplay=1&mute=1&loop=1&rel=0" allowFullScreen></iframe>
                </div>

                <OverlayTrigger
                    placement="top"
                    overlay={renderTooltip}
                    trigger={['hover', 'focus']}
                >
                    <Card
                        className="copy-card mb-5"
                        onClick={handleCopy}
                    >
                        <Card.Body>
                            <Card.Text className="copy-text px-2 py-1">
                                {textToCopy}
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </OverlayTrigger>

            </Container>
        </>
    )
})

export default Home