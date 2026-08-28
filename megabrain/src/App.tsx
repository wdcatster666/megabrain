import './App.css';

function App() {
  return (
    <main className="game-page">

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

        {/* Botão JOGAR */}
        <button className="play-button" type="button">
          JOGAR
        </button>

        {/* Cérebro */}
        <div className="brain-container" aria-label="Cérebro">
          <div className="brain-glow" />

          <img
            className="brain-image"
            src="/megabrain.png"
            alt="Mega Brain"
          />
        </div>

      </section>

      {/* Botão CRIAR */}
      <button className="create-button" type="button">
        CRIAR
      </button>

    </main>
  );
}

export default App;