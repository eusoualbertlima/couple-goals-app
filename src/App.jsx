import { ArrowRight, BookOpen, Compass, ShieldCheck, Sparkles } from 'lucide-react'

const pillars = [
  {
    title: 'Autoconhecimento guiado',
    text: 'Formacoes e praticas para desenvolver clareza, foco e inteligencia emocional aplicada ao dia a dia.',
  },
  {
    title: 'Escola com metodo',
    text: 'Conteudo estruturado em trilhas praticas para avancar com consistencia e acompanhamento.',
  },
  {
    title: 'Comunidade viva',
    text: 'Ambiente de estudo, eventos e conexao entre pessoas com o mesmo compromisso de evolucao.',
  },
]

const programs = [
  {
    icon: BookOpen,
    title: 'Formacao Base',
    text: 'Fundamentos da Gnosis com encontros semanais e praticas orientadas.',
  },
  {
    icon: Compass,
    title: 'Mentoria de Direcao',
    text: 'Rotina de acompanhamento para alinhar vida pessoal, espiritual e profissional.',
  },
  {
    icon: ShieldCheck,
    title: 'Imersoes Presenciais',
    text: 'Experiencias praticas para acelerar transformacao e disciplina interior.',
  },
]

export default function App() {
  return (
    <div className="site">
      <header className="hero">
        <nav className="topbar">
          <div className="brand">
            <img src="/gnosis-mark.svg" alt="Gnosis Brasil" />
            <span>GNOSIS BRASIL</span>
          </div>
          <a className="cta ghost" href="#contato">Falar com a equipe</a>
        </nav>

        <div className="hero-content">
          <p className="eyebrow">Escola de desenvolvimento interior</p>
          <h1>Conhecimento pratico para uma vida com direcao.</h1>
          <p>
            A Gnosis Brasil oferece uma jornada de estudo e pratica para pessoas que querem evoluir com metodo,
            comunidade e resultados reais na vida cotidiana.
          </p>
          <div className="hero-actions">
            <a className="cta" href="#programas">
              Ver programas <ArrowRight size={18} />
            </a>
            <a className="cta ghost" href="#sobre">Conhecer a escola</a>
          </div>
        </div>
      </header>

      <main>
        <section id="sobre" className="section">
          <div className="section-head">
            <Sparkles size={18} />
            <h2>Base da identidade Gnosis Brasil</h2>
          </div>
          <div className="pillars">
            {pillars.map((item) => (
              <article key={item.title} className="card">
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="programas" className="section programs-wrap">
          <div className="section-head">
            <h2>Programas em destaque</h2>
          </div>
          <div className="programs">
            {programs.map((item) => {
              const Icon = item.icon
              return (
                <article key={item.title} className="card program-card">
                  <Icon size={20} />
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </article>
              )
            })}
          </div>
        </section>

        <section id="contato" className="section contact">
          <h2>Pronto para comecar?</h2>
          <p>
            Entre em contato para conhecer turmas abertas, agenda de eventos e os proximos passos da sua jornada.
          </p>
          <a className="cta" href="https://wa.me/5500000000000" target="_blank" rel="noreferrer">
            Abrir WhatsApp
          </a>
        </section>
      </main>
    </div>
  )
}
