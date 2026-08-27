import './App.css';

function App() {
  return (
    <main className="game-page">
      {/* Fundo decorativo */}
      <div className="network-bg" aria-hidden="true">
        <span className="light light-1" />
        <span className="light light-2" />
        <span className="light light-3" />
        <span className="light light-4" />
        <span className="light light-5" />
      </div>

      {/* Menu superior */}
      <header className="top-menu">
        <button className="menu-button home-button" type="button">
          HOME
        </button>

        <button className="menu-button about-button" type="button">
          SOBRE
        </button>
      </header>

      {/* Conteúdo principal */}
      <section className="game-content">
        <button className="play-button" type="button">
          JOGAR
        </button>

        <div className="brain-container" aria-label="Cérebro">
          <div className="brain-glow" />
          <div className="brain">
            className="brain-image"
            src="/megabrain.png"
            alt="Mega Brain"
          </div>
        </div>
      </section>

      {/* Botão inferior */}
      <button className="create-button" type="button">
        CRIAR
      </button>
    </main>
  );
}

export default App;