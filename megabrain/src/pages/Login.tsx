import { FormEvent, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import '../App.css';

interface Usuario {
  nome: string;
  email: string;
  senhaHash: string;
  criadoEm: string;
}

const CHAVE_USUARIOS = 'megabrain_usuarios';
const CHAVE_SESSAO = 'megabrain_sessao';

async function gerarHash(senha: string): Promise<string> {
  const dados = new TextEncoder().encode(senha);
  const hash = await crypto.subtle.digest('SHA-256', dados);
  return Array.from(new Uint8Array(hash))
    .map((byte) => byte.toString(16).padStart(2, '0'))
    .join('');
}

export function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const emailInicial = (location.state as { email?: string } | null)?.email ?? '';
  const [email, setEmail] = useState(emailInicial);
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');
  const [carregando, setCarregando] = useState(false);

  const entrar = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErro('');
    setCarregando(true);

    try {
      const dados = localStorage.getItem(CHAVE_USUARIOS);
      const usuarios: Usuario[] = dados ? JSON.parse(dados) : [];
      const emailNormalizado = email.trim().toLowerCase();
      const usuario = usuarios.find((item) => item.email === emailNormalizado);

      if (!usuario || usuario.senhaHash !== await gerarHash(senha)) {
        setErro('E-mail ou senha incorretos.');
        return;
      }

      localStorage.setItem(CHAVE_SESSAO, JSON.stringify({
        email: usuario.email,
        nome: usuario.nome,
        autenticadoEm: new Date().toISOString(),
      }));
      navigate('/', { replace: true });
    } catch {
      setErro('Não foi possível realizar o login. Tente novamente.');
    } finally {
      setCarregando(false);
    }
  };

  return (
    <main className="auth-page login-page">
      <div className="auth-overlay" />
      <header className="auth-header">
        <Link to="/" className="menu-button auth-home-button">HOME</Link>
      </header>

      <section className="login-layout">
        <div className="auth-card login-card">
          <h1>LOGIN</h1>
          <p className="auth-intro">Entre para continuar seus desafios.</p>
          <form onSubmit={entrar}>
            <label htmlFor="login-email">E-mail</label>
            <input id="login-email" type="email" autoComplete="email" value={email}
              onChange={(event) => setEmail(event.target.value)} placeholder="seu@email.com" required />

            <label htmlFor="login-senha">Senha</label>
            <input id="login-senha" type="password" autoComplete="current-password" value={senha}
              onChange={(event) => setSenha(event.target.value)} placeholder="Sua senha" required />

            {erro && <p className="auth-message auth-error" role="alert">{erro}</p>}
            <button className="auth-submit" type="submit" disabled={carregando}>
              {carregando ? 'ENTRANDO...' : 'ENTRAR'}
            </button>
          </form>
          <p className="auth-switch">Ainda não tem uma conta?<br />
            <Link to="/cadastro">Registre-se aqui</Link>
          </p>
        </div>

        <div className="login-brand" aria-label="Mega-Brain">
          <div className="login-brain-glow" />
          <img src="/megabrain.png" alt="Cérebro MegaBrain" />
          <strong>Mega-Brain</strong>
        </div>
      </section>
    </main>
  );
}
