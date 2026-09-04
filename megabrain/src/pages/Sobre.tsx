import { Link } from 'react-router-dom';
import '../App.css';

export function Sobre() {
  return (
    <main className="sobre-page">

      {/* =====================================================
          MENU SUPERIOR
          ===================================================== */}

      <header className="top-menu">
        <Link to="/" className="menu-button home-button">
          HOME
        </Link>

        <Link to="/sobre" className="menu-button about-button">
          SOBRE
        </Link>
      </header>


      {/* =====================================================
          CONTEÚDO DA PÁGINA
          ===================================================== */}

      <section className="sobre-content">

        {/* =================================================
            TEXTO
            ================================================= */}

        <div className="sobre-text">

          <h1 className="sobre-title">
            MEGA-BRAIN
          </h1>

          <h2 className="sobre-subtitle">
            Desafie sua mente. Teste seus conhecimentos.
            <br />
            Supere seus limites.
          </h2>

          <p>
            Bem-vindo ao <strong>MEGABRAIN</strong>, o lugar onde
            conhecimento e diversão se encontram!
          </p>

          <p>
            Aqui, você pode testar sua memória, raciocínio e
            conhecimentos em diferentes temas através de quizzes
            rápidos e desafiadores.
          </p>

          <p>
            Escolha seu tema favorito, responda às perguntas e
            descubra quantos pontos consegue conquistar.
          </p>

          <p>
            A cada desafio, você aprende algo novo e fica ainda
            mais preparado para o próximo nível.
          </p>

          <p className="sobre-final">
            Será que você consegue chegar ao topo?
          </p>

        </div>


        {/* =================================================
            CÉREBRO
            ================================================= */}

        <div className="sobre-brain-container">

          <div className="sobre-brain-glow" />

          <img
            className="sobre-brain-image"
            src="/megabrain.png"
            alt="Mega Brain"
          />

        </div>

      </section>


      {/* =====================================================
          BOTÃO CRIAR
          ===================================================== */}

      <button className="create-button" type="button">
        CRIAR
      </button>

    </main>
  );
}