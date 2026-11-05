import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState, type FormEvent } from "react";
import {
  Flame, Menu as MenuIcon, X, UtensilsCrossed, ShoppingBag, Bike, Star, MapPin, Phone, Clock, MessageCircle, Navigation,
} from "lucide-react";

// Número do WhatsApp — troque aqui se necessário
const WHATSAPP_NUMBER = "244947303634";
const PHONE_DISPLAY = "+244 947 303 634";
const MAPS_QUERY = "CC84+6F Benguela";
const wa = (msg: string) => `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;
const mapsLink = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent("Tudo Na Brasa " + MAPS_QUERY)}`;
const directions = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(MAPS_QUERY)}`;

const u = (id: string, w = 1200) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=75`;
const IMG = {
  hero: u("photo-1555939594-58d7cb561ad1", 1920),
  leitao: u("photo-1544025162-d76694265947"),
  frango: u("photo-1598103442097-8b74394b95c6"),
  ambiente: u("photo-1517248135467-4c7edcad34c4"),
};
const GALLERY = [
  ["photo-1555939594-58d7cb561ad1", "Grelhados na brasa"],
  ["photo-1544025162-d76694265947", "Carne assada"],
  ["photo-1598103442097-8b74394b95c6", "Frango grelhado"],
  ["photo-1517248135467-4c7edcad34c4", "Ambiente do restaurante"],
  ["photo-1529193591184-b1d58069ecdd", "Espetadas na grelha"],
  ["photo-1414235077428-338989a2e8c0", "Mesa servida"],
  ["photo-1558030006-450675393462", "Carne grelhada"],
  ["photo-1466978913421-dad2ebd01d17", "Sala do restaurante"],
] as const;

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Tudo Na Brasa | Restaurante em Benguela" },
      { name: "description", content: "Restaurante português com grelhados em Benguela. Leitão Assado à Bairrada, Frango na Brasa, take away e entrega. Peça pelo WhatsApp." },
      { property: "og:title", content: "Tudo Na Brasa | Restaurante em Benguela" },
      { property: "og:description", content: "Leitão Assado à Bairrada, Frango na Brasa e grelhados em Benguela." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { property: "og:image", content: IMG.hero },
      { name: "twitter:image", content: IMG.hero },
    ],
  }),
  component: Index,
});

const NAV = [["Início", "#inicio"], ["Menu", "#menu"], ["Sobre", "#sobre"], ["Galeria", "#galeria"], ["Contacto", "#contacto"]];
const btn = "inline-flex min-h-12 items-center justify-center gap-2 rounded-full px-6 font-semibold transition hover:scale-[1.03] active:scale-95";
const btnPrimary = `${btn} bg-primary text-primary-foreground shadow-ember`;
const btnWa = `${btn} bg-whatsapp text-whatsapp-foreground`;
const btnOutline = `${btn} border border-foreground/30 text-foreground hover:bg-foreground/10`;

function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll(".reveal");
    const io = new IntersectionObserver((es) => es.forEach((e) => e.isIntersecting && e.target.classList.add("is-visible")), { threshold: 0.12 });
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

function H2({ kicker, children }: { kicker: string; children: React.ReactNode }) {
  return (
    <div className="reveal mb-10 text-center">
      <p className="text-sm font-semibold uppercase tracking-[0.25em] text-secondary">{kicker}</p>
      <h2 className="mt-2 font-display text-5xl md:text-6xl">{children}</h2>
    </div>
  );
}

function Index() {
  useReveal();
  return (
    <div className="font-sans">
      <div className="bg-muted px-4 py-2 text-center text-xs text-muted-foreground">
        Proposta de site, demonstração criada por Mário Quissambo. Não é o site oficial.
      </div>
      <Header />
      <main>
        <Hero />
        <Social />
        <MenuSection />
        <About />
        <Gallery />
        <Ways />
        <Reserve />
        <Location />
      </main>
      <Footer />
      <a href={wa("Olá, gostaria de fazer um pedido.")} target="_blank" rel="noreferrer" aria-label="Falar no WhatsApp"
        className="fixed bottom-5 right-5 z-50 grid h-16 w-16 place-items-center rounded-full bg-whatsapp text-whatsapp-foreground shadow-ember transition hover:scale-110">
        <MessageCircle className="h-8 w-8" />
      </a>
    </div>
  );
}

function Logo() {
  return (
    <a href="#inicio" className="flex items-center gap-2 font-display text-3xl tracking-wide">
      <Flame className="h-7 w-7 text-primary" /> Tudo <span className="text-ember">Na Brasa</span>
    </a>
  );
}

function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/85 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Logo />
        <nav className="hidden items-center gap-7 md:flex">
          {NAV.map(([l, h]) => <a key={h} href={h} className="text-sm font-medium hover:text-primary">{l}</a>)}
          <a href={wa("Olá, quero fazer um pedido.")} target="_blank" rel="noreferrer" className={btnPrimary}>Fazer pedido</a>
        </nav>
        <button className="grid h-12 w-12 place-items-center md:hidden" onClick={() => setOpen(!open)} aria-label="Abrir menu">
          {open ? <X /> : <MenuIcon />}
        </button>
      </div>
      {open && (
        <nav className="flex flex-col gap-1 border-t border-border px-4 pb-4 md:hidden">
          {NAV.map(([l, h]) => <a key={h} href={h} onClick={() => setOpen(false)} className="py-3 text-lg">{l}</a>)}
          <a href={wa("Olá, quero fazer um pedido.")} target="_blank" rel="noreferrer" className={btnPrimary}>Fazer pedido</a>
        </nav>
      )}
    </header>
  );
}

function Hero() {
  return (
    <section id="inicio" className="relative isolate overflow-hidden">
      <img src={IMG.hero} alt="Grelhados na brasa" className="absolute inset-0 -z-20 h-full w-full object-cover" />
      <div className="hero-overlay absolute inset-0 -z-10" />
      <div className="mx-auto max-w-6xl px-4 pb-16 pt-28 md:pt-40">
        <h1 className="reveal max-w-3xl font-display text-6xl leading-[0.95] md:text-8xl">
          O sabor da <span className="text-ember">brasa</span> em Benguela
        </h1>
        <p className="reveal mt-6 max-w-xl text-lg text-foreground/85">
          Leitão Assado à Bairrada, Frango na Brasa e muito mais. Venha comer, leve para casa ou peça a entrega.
        </p>
        <div className="reveal mt-8 flex flex-col gap-3 sm:flex-row">
          <a href="#menu" className={btnPrimary}>Ver o menu</a>
          <a href={wa("Olá, quero fazer um pedido.")} target="_blank" rel="noreferrer" className={btnWa}><MessageCircle className="h-5 w-5" />Pedir no WhatsApp</a>
        </div>
        <div className="reveal mt-14 grid grid-cols-3 gap-3 md:max-w-2xl">
          {[[UtensilsCrossed, "Comer no local"], [ShoppingBag, "Take away"], [Bike, "Entrega"]].map(([I, t]) => {
            const Icon = I as typeof Flame;
            return (
              <div key={t as string} className="flex flex-col items-center gap-2 rounded-2xl border border-border bg-card/70 p-4 text-center text-sm font-medium backdrop-blur">
                <Icon className="h-6 w-6 text-secondary" />{t as string}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function Social() {
  return (
    <section className="px-4 py-20">
      <div className="reveal mx-auto max-w-3xl rounded-3xl border border-border bg-card p-8 text-center shadow-ember md:p-12">
        <p className="font-display text-8xl text-ember">4,2 ★</p>
        <p className="mt-2 text-lg">1.028 críticas no Google Maps</p>
        <p className="mt-6 text-sm text-muted-foreground">O que os clientes mais elogiam</p>
        <div className="mt-3 flex flex-wrap justify-center gap-2">
          {["Atendimento", "Leitão assado à bairrada", "Grelhados", "Simpatia"].map((t) => (
            <span key={t} className="rounded-full bg-muted px-4 py-2 text-sm"><Star className="mr-1 inline h-4 w-4 text-secondary" />{t}</span>
          ))}
        </div>
        <a href={mapsLink} target="_blank" rel="noreferrer" className={`${btnOutline} mt-8`}>Ver no Google Maps</a>
      </div>
    </section>
  );
}

type Dish = { name: string; desc: string; img?: string };
const MENU: Record<string, Dish[]> = {
  Destaques: [
    { name: "Leitão Assado à Bairrada", desc: "Pele estaladiça, carne suculenta e o sabor tradicional que faz a fama da casa.", img: IMG.leitao },
    { name: "Frango Na Brasa", desc: "Grelhado lentamente na brasa, dourado por fora e tenro por dentro.", img: IMG.frango },
  ],
  Grelhados: [1, 2, 3].map((i) => ({ name: `Grelhado ${i}`, desc: "A confirmar com o restaurante" })),
  Acompanhamentos: [1, 2, 3].map((i) => ({ name: `Acompanhamento ${i}`, desc: "A confirmar com o restaurante" })),
  Bebidas: [1, 2, 3].map((i) => ({ name: `Bebida ${i}`, desc: "A confirmar com o restaurante" })),
};

function MenuSection() {
  const [tab, setTab] = useState("Destaques");
  return (
    <section id="menu" className="mx-auto max-w-6xl px-4 py-20">
      <H2 kicker="Menu">O nosso menu</H2>
      <div className="mb-10 flex gap-2 overflow-x-auto pb-2 md:justify-center">
        {Object.keys(MENU).map((t) => (
          <button key={t} onClick={() => setTab(t)}
            className={`min-h-11 shrink-0 rounded-full px-5 text-sm font-semibold transition ${tab === t ? "bg-primary text-primary-foreground" : "bg-muted hover:bg-muted/70"}`}>
            {t}
          </button>
        ))}
      </div>
      <div className={`grid gap-6 ${tab === "Destaques" ? "md:grid-cols-2" : "sm:grid-cols-2 lg:grid-cols-3"}`}>
        {MENU[tab].map((d) => (
          <article key={d.name} className="flex flex-col overflow-hidden rounded-3xl border border-border bg-card">
            {d.img && <img src={d.img} alt={d.name} loading="lazy" className="aspect-[4/3] w-full object-cover" />}
            <div className="flex flex-1 flex-col p-6">
              <h3 className="font-display text-3xl">{d.name}</h3>
              <p className="mt-2 flex-1 text-muted-foreground">{d.desc}</p>
              <div className="mt-5 flex items-center justify-between gap-3">
                <span className="text-sm font-semibold text-secondary">Preço a confirmar</span>
                <a href={wa(`Olá, quero pedir: ${d.name}`)} target="_blank" rel="noreferrer" className={btnPrimary}>Pedir</a>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function About() {
  return (
    <section id="sobre" className="bg-card/50 px-4 py-20">
      <div className="mx-auto grid max-w-6xl items-center gap-10 md:grid-cols-2">
        <div className="reveal">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-secondary">Sobre nós</p>
          <h2 className="mt-2 font-display text-5xl md:text-6xl">Feito na brasa, servido com simpatia</h2>
          <p className="mt-6 text-lg text-foreground/85">
            No Tudo Na Brasa, a comida é preparada para ser partilhada. Venha provar o nosso leitão assado e os grelhados, num ambiente onde toda a família se sente bem.
          </p>
        </div>
        <img src={IMG.ambiente} alt="Ambiente do restaurante" loading="lazy" className="reveal aspect-[4/3] w-full rounded-3xl object-cover shadow-ember" />
      </div>
    </section>
  );
}

function Gallery() {
  const [zoom, setZoom] = useState<string | null>(null);
  return (
    <section id="galeria" className="mx-auto max-w-6xl px-4 py-20">
      <H2 kicker="Galeria">Direto da brasa</H2>
      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        {GALLERY.map(([id, alt]) => (
          <button key={id} onClick={() => setZoom(id)} className="group overflow-hidden rounded-2xl">
            <img src={u(id, 600)} alt={alt} loading="lazy" className="aspect-square w-full object-cover transition duration-500 group-hover:scale-110" />
          </button>
        ))}
      </div>
      {zoom && (
        <button onClick={() => setZoom(null)} aria-label="Fechar" className="fixed inset-0 z-[60] grid place-items-center bg-background/90 p-4">
          <img src={u(zoom, 1600)} alt="Foto ampliada" className="max-h-[85vh] rounded-2xl object-contain" />
        </button>
      )}
    </section>
  );
}

function Ways() {
  const items = [
    [UtensilsCrossed, "No restaurante", "Sente-se à mesa e aproveite o ambiente."],
    [ShoppingBag, "Take away", "Peça e leve para casa, quentinho."],
    [Bike, "Entrega", "Receba a sua refeição onde estiver."],
  ] as const;
  return (
    <section className="bg-card/50 px-4 py-20">
      <div className="mx-auto max-w-6xl">
        <H2 kicker="Serviços">Como pode comer connosco</H2>
        <div className="grid gap-6 md:grid-cols-3">
          {items.map(([Icon, t, d]) => (
            <div key={t} className="reveal rounded-3xl border border-border bg-card p-8 text-center">
              <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-ember text-primary-foreground"><Icon className="h-8 w-8" /></div>
              <h3 className="mt-5 font-display text-3xl">{t}</h3>
              <p className="mt-2 text-muted-foreground">{d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Reserve() {
  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const msg = `Olá, gostaria de fazer uma reserva/pedido.\nNome: ${f.get("nome")}\nTelefone: ${f.get("tel")}\nPessoas: ${f.get("pessoas")}\nData e hora: ${f.get("data")}\nObservações: ${f.get("obs") || "-"}`;
    window.open(wa(msg), "_blank");
  };
  const input = "min-h-12 w-full rounded-xl border border-input bg-background px-4 text-foreground outline-none focus:ring-2 focus:ring-ring";
  return (
    <section id="contacto" className="mx-auto max-w-3xl px-4 py-20">
      <H2 kicker="Reservas">Reserve a sua mesa ou faça o seu pedido</H2>
      <form onSubmit={submit} className="reveal grid gap-4 rounded-3xl border border-border bg-card p-6 md:grid-cols-2 md:p-8">
        <label className="grid gap-1 text-sm">Nome<input name="nome" required className={input} /></label>
        <label className="grid gap-1 text-sm">Telefone<input name="tel" type="tel" required className={input} /></label>
        <label className="grid gap-1 text-sm">Número de pessoas<input name="pessoas" type="number" min={1} required className={input} /></label>
        <label className="grid gap-1 text-sm">Data e hora<input name="data" type="datetime-local" required className={input} /></label>
        <label className="grid gap-1 text-sm md:col-span-2">Observações<textarea name="obs" rows={3} className={`${input} py-3`} /></label>
        <button type="submit" className={`${btnPrimary} md:col-span-2`}>Enviar pelo WhatsApp</button>
      </form>
      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
        <a href={wa("Olá, gostaria de falar convosco.")} target="_blank" rel="noreferrer" className={`${btnWa} text-lg`}><MessageCircle className="h-5 w-5" />Falar no WhatsApp</a>
        <a href={`tel:+${WHATSAPP_NUMBER}`} className={`${btnOutline} text-lg`}><Phone className="h-5 w-5" />Ligar agora</a>
      </div>
    </section>
  );
}

function Location() {
  return (
    <section className="bg-card/50 px-4 py-20">
      <div className="mx-auto grid max-w-6xl gap-8 md:grid-cols-2">
        <div className="reveal space-y-5">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-secondary">Visite-nos</p>
          <h2 className="font-display text-5xl md:text-6xl">Horário e localização</h2>
          <p className="flex gap-3"><Clock className="h-6 w-6 shrink-0 text-primary" />Aberto até às 23:00 (horário completo a confirmar)</p>
          <p className="flex gap-3"><MapPin className="h-6 w-6 shrink-0 text-primary" />R. Domingos do Ó, Benguela</p>
          <p className="flex gap-3"><Phone className="h-6 w-6 shrink-0 text-primary" /><a href={`tel:+${WHATSAPP_NUMBER}`} className="hover:text-primary">{PHONE_DISPLAY}</a></p>
          <a href={directions} target="_blank" rel="noreferrer" className={btnPrimary}><Navigation className="h-5 w-5" />Como chegar</a>
        </div>
        <iframe title="Mapa do Tudo Na Brasa" loading="lazy" className="reveal h-80 w-full rounded-3xl border-0 md:h-full md:min-h-96"
          src={`https://maps.google.com/maps?q=${encodeURIComponent(MAPS_QUERY)}&z=16&output=embed`} />
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-border px-4 pb-24 pt-12">
      <div className="mx-auto grid max-w-6xl gap-8 md:grid-cols-3">
        <div><Logo /><p className="mt-3 text-sm text-muted-foreground">Restaurante português com grelhados.</p></div>
        <nav className="flex flex-col gap-2 text-sm">{NAV.map(([l, h]) => <a key={h} href={h} className="hover:text-primary">{l}</a>)}</nav>
        <div className="space-y-2 text-sm text-muted-foreground"><p>R. Domingos do Ó, Benguela</p><p>{PHONE_DISPLAY}</p></div>
      </div>
      <p className="mt-10 text-center text-xs text-muted-foreground">Site de demonstração criado por Mário Quissambo, programador web.</p>
    </footer>
  );
}
