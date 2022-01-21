import { Footer, Loader } from "rsuite";
import mainTanceAnimation from './assets/maintance-animation.json'
import "./LoginStyle.scss";
import img from './assets/brasao-original.png'

export default function WaitingPage() {

    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: mainTanceAnimation,
        rendererSettings: {
            preserveAspectRatio: "xMidYMid slice",
            progressiveLoad: true
        }
    };

    return (
      <div className="container-background">
      <div className="content">
        <header className="login-header">
          <div className="brasao-side">
            <img
              id="pcdf-brasao"
              src={img}
              alt="Brasão da Polícia Civil do Distrito Federal"
            />
          </div>

          <div className="description-side">
            <h1>DIVISÃO DE TECNOLOGIA</h1>
            <em>
              Polícia Civil do Distrito Federal
            </em>
          </div>
          </header>

        <div className="login-form">
            <p style={{
              fontSize: '30px',
              fontWeight: 400
            }}>Um novo SGA está em desenvolvimento...</p>
            <p
              style={{
              fontSize: '18px',
			        marginBottom: '30px'
            }}
            >Aguarde, você está sendo redirecionado para a nova página</p>
            <Loader
              size={'md'}
            /> 
            {/* <Lottie
              options={defaultOptions}
              height={400}
              width={400}
              isClickToPauseDisabled={true}
              speed={2}
            /> */}
        </div>
        <Footer />
        </div>
        </div>
    )
}