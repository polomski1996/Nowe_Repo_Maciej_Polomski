import React, { useEffect, useState } from "react";
import { dict } from "./i18n";
import CanvasBg from "./CanvasBg";

function useLang() {
  const [lang, setLang] = useState(() => localStorage.getItem("lang") || "pl");
  useEffect(() => {
    localStorage.setItem("lang", lang);
    document.documentElement.lang = lang;
  }, [lang]);
  return [lang, setLang];
}

function Topbar({ lang, setLang, t }) {
  return (
    <header className="fixed top-0 inset-x-0 z-30">
      <div className="mx-auto max-w-[1200px] px-6 md:px-10 pt-5">
        <div className="flex items-center justify-between">
          <a href="#top" className="font-mono text-xs text-cream tracking-widest">M.POLOMSKI</a>
          <nav className="hidden md:flex items-center gap-7 font-mono text-xs uppercase tracking-[0.18em] text-cream/60">
            <a href="#about" className="hover:text-cream transition">{t.nav.about}</a>
            <a href="#work" className="hover:text-cream transition">{t.nav.work}</a>
            <a href="#contact" className="hover:text-cream transition">{t.nav.contact}</a>
          </nav>
          <div className="flex items-center gap-1 font-mono text-xs">
            <button
              onClick={() => setLang("pl")}
              className={`px-2 py-1 ${lang === "pl" ? "text-ember" : "text-cream/50 hover:text-cream"}`}
            >PL</button>
            <span className="text-cream/30">/</span>
            <button
              onClick={() => setLang("en")}
              className={`px-2 py-1 ${lang === "en" ? "text-ember" : "text-cream/50 hover:text-cream"}`}
            >EN</button>
          </div>
        </div>
      </div>
    </header>
  );
}

function Hero({ t }) {
  return (
    <section id="top" className="relative pt-40 md:pt-48 pb-24 md:pb-32">
      <div className="mx-auto max-w-[1200px] px-6 md:px-10">
        <div className="flex items-center gap-2 font-mono text-[11px] tracking-[0.2em] uppercase text-cream/50 mb-10">
          <span className="w-1.5 h-1.5 rounded-full bg-ember" />
          {t.hero.tag}
        </div>

        <div className="grid grid-cols-12 gap-8 md:gap-10 items-center">
          <div className="col-span-12 md:col-span-6">
            <h1 className="font-display text-[9vw] md:text-[5.5vw] lg:text-[4.2vw] leading-[0.92] tracking-tight">
              <span className="block text-cream">{t.hero.title1}</span>
              <span className="block text-ember">{t.hero.title2}<span className="text-cream">.</span></span>
            </h1>

            <p className="mt-10 max-w-xl text-cream/75 text-lg leading-relaxed text-pretty">{t.hero.lead}</p>

            <div className="mt-8 flex flex-wrap gap-3">
              <a href="#work" className="group inline-flex items-center gap-3 bg-ember text-ink px-5 py-3 font-mono text-xs uppercase tracking-[0.2em]">
                {t.hero.cta1}
                <span className="transition group-hover:translate-x-1">→</span>
              </a>
              <a href="#contact" className="inline-flex items-center gap-3 border border-cream/30 px-5 py-3 font-mono text-xs uppercase tracking-[0.2em] text-cream hover:bg-cream hover:text-ink transition">
                {t.hero.cta2}
              </a>
            </div>
          </div>

          <div className="col-span-12 md:col-span-6">
            <div className="relative max-w-[340px] md:max-w-[85%] mx-auto">
              <div className="relative aspect-[3/4] overflow-hidden border border-cream/15">
                <img
                  src="/maciej.png"
                  alt="Maciej Polomski"
                  className="absolute inset-0 w-full h-full object-cover object-top"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function About({ t }) {
  return (
    <section id="about" className="relative py-24 md:py-32 border-t border-cream/10">
      <div className="mx-auto max-w-[1200px] px-6 md:px-10">
        <div className="grid grid-cols-12 gap-8 md:gap-12">
          <div className="col-span-12 md:col-span-4">
            <div className="font-mono text-[11px] tracking-[0.2em] uppercase text-ember">{t.about.kicker}</div>
          </div>
          <div className="col-span-12 md:col-span-8">
            <h2 className="font-display text-3xl md:text-5xl leading-[1] tracking-tight text-cream max-w-2xl">{t.about.title}</h2>
            <p className="mt-6 text-cream text-lg leading-relaxed text-pretty font-medium">{t.about.intro}</p>
            <p className="mt-4 text-cream/70 text-base leading-relaxed text-pretty">{t.about.body}</p>

            <p className="mt-10 font-mono text-[11px] tracking-[0.2em] uppercase text-ember">{t.about.pointsLabel}</p>
            <div className="mt-6 flex flex-col gap-6">
              {t.about.points.map((p) => (
                <div key={p.label} className="flex gap-4">
                  <span className="mt-1 w-1.5 h-1.5 rounded-full bg-ember shrink-0" />
                  <div>
                    <span className="text-cream font-semibold">{p.label}: </span>
                    <span className="text-cream/70 leading-relaxed">{p.text}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Work({ t }) {
  return (
    <section id="work" className="relative py-24 md:py-32 border-t border-cream/10">
      <div className="mx-auto max-w-[1200px] px-6 md:px-10">
        <div className="grid grid-cols-12 gap-8 md:gap-12 mb-10 md:mb-14">
          <div className="col-span-12 md:col-span-4">
            <div className="font-mono text-[11px] tracking-[0.2em] uppercase text-ember">{t.work.kicker}</div>
          </div>
          <div className="col-span-12 md:col-span-8">
            <h2 className="font-display text-3xl md:text-5xl leading-[1] tracking-tight text-cream max-w-2xl">{t.work.title}</h2>
            <p className="mt-4 text-cream/55 text-sm leading-relaxed">{t.work.subtitle}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {t.work.items.map((p) => (
            <a
              key={p.name}
              href={p.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group block border border-cream/10 hover:border-cream/25 transition-all duration-300 hover:-translate-y-1"
            >
              <div className="aspect-[16/10] overflow-hidden bg-cream/5">
                <img
                  src={p.img}
                  alt={p.name}
                  className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-6">
                <div className="font-mono text-[10px] tracking-[0.2em] uppercase text-ember mb-2">{p.type}</div>
                <h3 className="font-display text-2xl text-cream mb-3 group-hover:text-ember transition-colors duration-200">{p.name}</h3>
                <p className="text-cream/60 text-sm leading-relaxed mb-5">{p.desc}</p>
                <div className="flex flex-wrap gap-2">
                  {p.tags.map((tag) => (
                    <span key={tag} className="font-mono text-[10px] uppercase tracking-[0.15em] text-cream/50 border border-cream/20 px-2 py-1">{tag}</span>
                  ))}
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

function Contact({ t }) {
  return (
    <section id="contact" className="relative py-24 md:py-36 border-t border-cream/10">
      <div className="mx-auto max-w-[1200px] px-6 md:px-10">
        <div className="grid grid-cols-12 gap-8 md:gap-12">
          <div className="col-span-12 md:col-span-4">
            <div className="font-mono text-[11px] tracking-[0.2em] uppercase text-ember">{t.contact.kicker}</div>
          </div>
          <div className="col-span-12 md:col-span-8">
            <h2 className="font-display text-4xl md:text-6xl leading-[0.95] tracking-tight text-cream max-w-2xl">{t.contact.title}</h2>
            <div className="mt-10 flex flex-col gap-4 items-start">
              <a
                href={`mailto:${t.contact.email}`}
                className="font-display text-xl md:text-4xl text-cream hover:text-ember transition break-all"
              >
                {t.contact.email}
              </a>
              <a
                href={`mailto:${t.contact.email}`}
                className="group inline-flex items-center gap-3 bg-ember text-ink px-5 py-3 font-mono text-xs uppercase tracking-[0.2em] mt-2"
              >
                {t.contact.cta}
                <span className="transition group-hover:translate-x-1">→</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer({ t }) {
  return (
    <footer className="relative border-t border-cream/10 py-8">
      <div className="mx-auto max-w-[1200px] px-6 md:px-10 flex flex-col md:flex-row items-center justify-between gap-3 font-mono text-[11px] uppercase tracking-[0.2em] text-cream/45">
        <div>© 2026 Maciej Polomski</div>
        <div>{t.footer.rights}</div>
      </div>
    </footer>
  );
}

export default function App() {
  const [lang, setLang] = useLang();
  const t = dict[lang];

  return (
    <div className="relative min-h-screen overflow-x-hidden">
      <CanvasBg />
      <div className="relative" style={{ zIndex: 2 }}>
        <Topbar lang={lang} setLang={setLang} t={t} />
        <Hero t={t} />
        <About t={t} />
        <Work t={t} />
        <Contact t={t} />
        <Footer t={t} />
      </div>
    </div>
  );
}
