import { Link } from 'react-router-dom';
import { useState } from 'react';
import '../App.css';

type TipoPergunta = 'Escolha Única' | 'Múltipla Escolha';

interface Alternativa {
  id: number;
  texto: string;
  correta: boolean;
}

interface Pergunta {
  id: number;
  titulo: string;
  tipo: TipoPergunta;
  alternativas: Alternativa[];
}

export function CriarQuiz() {
  const [tituloQuiz, setTituloQuiz] = useState('');
  const [descricao, setDescricao] = useState('');
  const [categoria, setCategoria] = useState('');

  const [perguntas, setPerguntas] = useState<Pergunta[]>([
    {
      id: 1,
      titulo: '',
      tipo: 'Escolha Única',
      alternativas: [
        { id: 1, texto: '', correta: true },
        { id: 2, texto: '', correta: false },
        { id: 3, texto: '', correta: false },
        { id: 4, texto: '', correta: false },
      ],
    },
  ]);

  const [perguntaSelecionada, setPerguntaSelecionada] = useState(1);

  const perguntaAtual =
    perguntas.find((pergunta) => pergunta.id === perguntaSelecionada) ??
    perguntas[0];

  /* =========================================================
     ALTERAR TÍTULO DA PERGUNTA
     ========================================================= */

  const alterarTituloPergunta = (valor: string) => {
    setPerguntas((perguntasAtuais) =>
      perguntasAtuais.map((pergunta) =>
        pergunta.id === perguntaSelecionada
          ? {
              ...pergunta,
              titulo: valor,
            }
          : pergunta,
      ),
    );
  };

  /* =========================================================
     ALTERAR TIPO DA PERGUNTA
     ========================================================= */

  const alterarTipoPergunta = (valor: TipoPergunta) => {
    setPerguntas((perguntasAtuais) =>
      perguntasAtuais.map((pergunta) =>
        pergunta.id === perguntaSelecionada
          ? {
              ...pergunta,
              tipo: valor,
              alternativas: pergunta.alternativas.map(
                (alternativa, index) => ({
                  ...alternativa,
                  correta:
                    valor === 'Escolha Única'
                      ? index === 0
                      : alternativa.correta,
                }),
              ),
            }
          : pergunta,
      ),
    );
  };

  /* =========================================================
     ALTERAR ALTERNATIVA
     ========================================================= */

  const alterarAlternativa = (id: number, valor: string) => {
    setPerguntas((perguntasAtuais) =>
      perguntasAtuais.map((pergunta) =>
        pergunta.id === perguntaSelecionada
          ? {
              ...pergunta,
              alternativas: pergunta.alternativas.map((alternativa) =>
                alternativa.id === id
                  ? {
                      ...alternativa,
                      texto: valor,
                    }
                  : alternativa,
              ),
            }
          : pergunta,
      ),
    );
  };

  /* =========================================================
     MARCAR ALTERNATIVA CORRETA
     ========================================================= */

  const marcarCorreta = (id: number) => {
    setPerguntas((perguntasAtuais) =>
      perguntasAtuais.map((pergunta) => {
        if (pergunta.id !== perguntaSelecionada) {
          return pergunta;
        }

        if (pergunta.tipo === 'Escolha Única') {
          return {
            ...pergunta,
            alternativas: pergunta.alternativas.map((alternativa) => ({
              ...alternativa,
              correta: alternativa.id === id,
            })),
          };
        }

        return {
          ...pergunta,
          alternativas: pergunta.alternativas.map((alternativa) =>
            alternativa.id === id
              ? {
                  ...alternativa,
                  correta: !alternativa.correta,
                }
              : alternativa,
          ),
        };
      }),
    );
  };

  /* =========================================================
     ADICIONAR ALTERNATIVA
     ========================================================= */

  const adicionarAlternativa = () => {
    setPerguntas((perguntasAtuais) =>
      perguntasAtuais.map((pergunta) => {
        if (pergunta.id !== perguntaSelecionada) {
          return pergunta;
        }

        const novoId =
          pergunta.alternativas.length > 0
            ? Math.max(
                ...pergunta.alternativas.map((alternativa) => alternativa.id),
              ) + 1
            : 1;

        return {
          ...pergunta,
          alternativas: [
            ...pergunta.alternativas,
            {
              id: novoId,
              texto: '',
              correta: false,
            },
          ],
        };
      }),
    );
  };

  /* =========================================================
     REMOVER ALTERNATIVA
     ========================================================= */

  const removerAlternativa = (id: number) => {
    setPerguntas((perguntasAtuais) =>
      perguntasAtuais.map((pergunta) => {
        if (pergunta.id !== perguntaSelecionada) {
          return pergunta;
        }

        if (pergunta.alternativas.length <= 2) {
          return pergunta;
        }

        const alternativasRestantes = pergunta.alternativas.filter(
          (alternativa) => alternativa.id !== id,
        );

        // Garante que exista uma alternativa correta
        if (
          !alternativasRestantes.some(
            (alternativa) => alternativa.correta,
          )
        ) {
          alternativasRestantes[0].correta = true;
        }

        return {
          ...pergunta,
          alternativas: alternativasRestantes,
        };
      }),
    );
  };

  /* =========================================================
     ADICIONAR PERGUNTA
     ========================================================= */

  const adicionarPergunta = () => {
    const novoId =
      perguntas.length > 0
        ? Math.max(...perguntas.map((pergunta) => pergunta.id)) + 1
        : 1;

    const novaPergunta: Pergunta = {
      id: novoId,
      titulo: '',
      tipo: 'Escolha Única',
      alternativas: [
        {
          id: 1,
          texto: '',
          correta: true,
        },
        {
          id: 2,
          texto: '',
          correta: false,
        },
        {
          id: 3,
          texto: '',
          correta: false,
        },
        {
          id: 4,
          texto: '',
          correta: false,
        },
      ],
    };

    setPerguntas((perguntasAtuais) => [
      ...perguntasAtuais,
      novaPergunta,
    ]);

    setPerguntaSelecionada(novoId);
  };

  /* =========================================================
     RENDER
     ========================================================= */

  return (
    <main className="criar-quiz-page">

      {/* =====================================================
          MENU SUPERIOR
          ===================================================== */}

      <header className="top-menu criar-quiz-menu">

        <Link to="/" className="menu-button home-button">
          HOME
        </Link>

        <Link to="/criar" className="menu-button criar-menu-button">
          CRIAR
        </Link>

      </header>


      {/* =====================================================
          CÉREBRO
          ===================================================== */}

      <div className="criar-quiz-brain-container">
        <div className="criar-quiz-brain-glow" />

        <img
          className="criar-quiz-brain-image"
          src="/megabrain.png"
          alt="Mega Brain"
        />
      </div>


      {/* =====================================================
          CONTEÚDO
          ===================================================== */}

      <section className="criar-quiz-content">

        {/* ===================================================
            COLUNA ESQUERDA
            =================================================== */}

        <section className="quiz-information">

          <h1 className="criar-quiz-title">
            CRIAR QUIZ
          </h1>


          {/* TÍTULO */}

          <label htmlFor="titulo-quiz">
            Título do Quiz
          </label>

          <input
            id="titulo-quiz"
            className="quiz-input"
            type="text"
            value={tituloQuiz}
            onChange={(event) =>
              setTituloQuiz(event.target.value)
            }
          />


          {/* DESCRIÇÃO */}

          <label htmlFor="descricao-quiz">
            Descrição (OPCIONAL)
          </label>

          <textarea
            id="descricao-quiz"
            className="quiz-textarea"
            value={descricao}
            onChange={(event) =>
              setDescricao(event.target.value)
            }
          />


          {/* CATEGORIA */}

          <label htmlFor="categoria-quiz">
            Categoria
          </label>

          <select
            id="categoria-quiz"
            className="quiz-select"
            value={categoria}
            onChange={(event) =>
              setCategoria(event.target.value)
            }
          >
            <option value="">
              Selecione uma Categoria
            </option>

            <option value="ciencia">
              Ciência
            </option>

            <option value="historia">
              História
            </option>

            <option value="geografia">
              Geografia
            </option>

            <option value="matematica">
              Matemática
            </option>

            <option value="tecnologia">
              Tecnologia
            </option>

            <option value="esportes">
              Esportes
            </option>

            <option value="entretenimento">
              Entretenimento
            </option>
          </select>


          {/* PERGUNTA */}

          <label htmlFor="selecionar-pergunta">
            Pergunta
          </label>

          <select
            id="selecionar-pergunta"
            className="quiz-select"
            value={perguntaSelecionada}
            onChange={(event) =>
              setPerguntaSelecionada(
                Number(event.target.value),
              )
            }
          >
            {perguntas.map((pergunta, index) => (
              <option
                key={pergunta.id}
                value={pergunta.id}
              >
                Pergunta {index + 1}
              </option>
            ))}
          </select>


          {/* ADICIONAR PERGUNTA */}

          <button
            className="adicionar-pergunta-button"
            type="button"
            onClick={adicionarPergunta}
          >
            <span>＋</span>
            Adicionar Pergunta
          </button>

        </section>


        {/* ===================================================
            COLUNA DIREITA
            =================================================== */}

        <section className="pergunta-editor">

          <h2>
            Pergunta {perguntas.findIndex(
              (pergunta) =>
                pergunta.id === perguntaSelecionada,
            ) + 1}
          </h2>


          {/* TÍTULO DA PERGUNTA */}

          <label htmlFor="titulo-pergunta">
            Título da Pergunta
          </label>

          <input
            id="titulo-pergunta"
            className="quiz-input"
            type="text"
            value={perguntaAtual?.titulo ?? ''}
            onChange={(event) =>
              alterarTituloPergunta(event.target.value)
            }
          />


          {/* TIPO */}

          <label htmlFor="tipo-pergunta">
            Tipo de Pergunta
          </label>

          <select
            id="tipo-pergunta"
            className="quiz-select"
            value={perguntaAtual?.tipo}
            onChange={(event) =>
              alterarTipoPergunta(
                event.target.value as TipoPergunta,
              )
            }
          >
            <option value="Escolha Única">
              Escolha Única
            </option>

            <option value="Múltipla Escolha">
              Múltipla Escolha
            </option>
          </select>


          {/* ALTERNATIVAS */}

          <label className="alternativas-label">
            Alternativas
          </label>

          <div className="alternativas-lista">

            {perguntaAtual?.alternativas.map(
              (alternativa) => (
                <div
                  className="alternativa-row"
                  key={alternativa.id}
                >

                  <span className="alternativa-bullet">
                    •
                  </span>

                  <input
                    className="alternativa-input"
                    type="text"
                    value={alternativa.texto}
                    onChange={(event) =>
                      alterarAlternativa(
                        alternativa.id,
                        event.target.value,
                      )
                    }
                  />


                  {/* CORRETA */}

                  <button
                    className={`correta-button ${
                      alternativa.correta
                        ? 'correta-ativa'
                        : ''
                    }`}
                    type="button"
                    onClick={() =>
                      marcarCorreta(alternativa.id)
                    }
                  >
                    Correta
                  </button>


                  {/* REMOVER */}

                  <button
                    className="remover-alternativa-button"
                    type="button"
                    aria-label="Remover alternativa"
                    onClick={() =>
                      removerAlternativa(alternativa.id)
                    }
                  >
                    ♜
                  </button>

                </div>
              ),
            )}

          </div>


          {/* ADICIONAR ALTERNATIVA */}

          <button
            className="adicionar-alternativa-button"
            type="button"
            onClick={adicionarAlternativa}
          >
            ＋ Adicionar Alternativas
          </button>

        </section>

      </section>


      {/* =====================================================
          SALVAR
          ===================================================== */}

      <button
        className="salvar-quiz-button"
        type="button"
      >
        <span className="salvar-icon">▣</span>
        Salvar Quiz
      </button>

    </main>
  );
}