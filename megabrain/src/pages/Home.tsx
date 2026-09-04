import { Link } from 'react-router-dom';
import '../App.css';

export function Home() {
  return (
    <main className="game-page">
      <header className="top-menu">
        <Link to="/" className="menu-button home-button">
          HOME
        </Link>

        <Link to="/sobre" className="menu-button about-button">
          SOBRE
        </Link>
      </header>

      <section className="game-content">
        <button className="play-button" type="button">
          JOGAR
        </button>

        <div className="brain-container" aria-label="Cérebro">
          <div className="brain-glow" />
          <img
            className="brain-image"
            src="/megabrain.png"
            alt="Mega Brain"
          />
        </div>
      </section>

      <button className="create-button" type="button">
        CRIAR
      </button>
    </main>
  );
}