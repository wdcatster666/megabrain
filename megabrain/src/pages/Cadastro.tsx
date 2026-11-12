import { FormEvent, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../App.css';

interface Usuario {
  nome: string;
  email: string;
  senhaHash: string;
  criadoEm: string;
}

const CHAVE_USUARIOS = 'megabrain_usuarios';

async function gerarHash(senha: string): Promise<string> {
  const dados = new TextEncoder().encode(senha);
  const hash = await crypto.subtle.digest('SHA-256', dados);
  return Array.from(new Uint8Array(hash))
    .map((byte) => byte.toString(16).padStart(2, '0'))
    .join('');
}

export function Cadastro() {
  const navigate = useNavigate();
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmacao, setConfirmacao] = useState('');
  const [erro, setErro] = useState('');
  const [sucesso, setSucesso] = useState('');
  const [carregando, setCarregando] = useState(false);

  const cadastrar = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErro('');
    setSucesso('');

    const emailNormalizado = email.trim().toLowerCase();
    if (nome.trim().length < 3) {
      setErro('Informe seu nome completo (pelo menos 3 caracteres).');
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailNormalizado)) {
      setErro('Informe um endereço de e-mail válido.');
      return;
    }
    if (senha.length < 8) {
      setErro('A senha deve ter pelo menos 8 caracteres.');
      return;
    }
    if (senha !== confirmacao) {
      setErro('As senhas não coincidem.');
      return;
    }

    setCarregando(true);
    try {
      const usuariosSalvos = localStorage.getItem(CHAVE_USUARIOS);
      const usuarios: Usuario[] = usuariosSalvos ? JSON.parse(usuariosSalvos) : [];

      if (usuarios.some((usuario) => usuario.email === emailNormalizado)) {
        setErro('Já existe uma conta cadastrada com este e-mail.');
        return;
      }

      const novoUsuario: Usuario = {
        nome: nome.trim(),
        email: emailNormalizado,
        senhaHash: await gerarHash(senha),
        criadoEm: new Date().toISOString(),
      };

      localStorage.setItem(CHAVE_USUARIOS, JSON.stringify([...usuarios, novoUsuario]));
      setSucesso('Conta criada com sucesso! Você será direcionado para o login.');
      window.setTimeout(() => navigate('/login', { state: { email: emailNormalizado } }), 900);
    } catch {
      setErro('Não foi possível salvar sua conta neste navegador. Verifique as configurações de armazenamento.');
    } finally {
      setCarregando(false);
    }
  };

  return (
    <main className="auth-page cadastro-page">
      <div className="auth-overlay" />
      <header className="auth-header">
        <Link to="/" className="menu-button auth-home-button">HOME</Link>
        <Link to="/login" className="menu-button auth-small-button">LOGIN</Link>
      </header>

      <section className="auth-card cadastro-card">
        <h1>Cadastro</h1>
        <p className="auth-intro">Crie sua conta e comece a desafiar sua mente!</p>

        <form onSubmit={cadastrar}>
          <label htmlFor="cadastro-nome">Nome completo</label>
          <input id="cadastro-nome" type="text" autoComplete="name" value={nome}
            onChange={(event) => setNome(event.target.value)} placeholder="Seu nome" required />

          <label htmlFor="cadastro-email">E-mail</label>
          <input id="cadastro-email" type="email" autoComplete="email" value={email}
            onChange={(event) => setEmail(event.target.value)} placeholder="seu@email.com" required />

          <label htmlFor="cadastro-senha">Senha</label>
          <input id="cadastro-senha" type="password" autoComplete="new-password" value={senha}
            onChange={(event) => setSenha(event.target.value)} placeholder="Mínimo de 8 caracteres" required />

          <label htmlFor="cadastro-confirmacao">Confirmar senha</label>
          <input id="cadastro-confirmacao" type="password" autoComplete="new-password" value={confirmacao}
            onChange={(event) => setConfirmacao(event.target.value)} placeholder="Digite a senha novamente" required />

          {erro && <p className="auth-message auth-error" role="alert">{erro}</p>}
          {sucesso && <p className="auth-message auth-success" role="status">{sucesso}</p>}

          <button className="auth-submit" type="submit" disabled={carregando}>
            {carregando ? 'CRIANDO CONTA...' : 'CADASTRAR'}
          </button>
        </form>

        <p className="auth-switch">Já possui uma conta? <Link to="/login">Faça login</Link></p>
      </section>
    </main>
  );
}
