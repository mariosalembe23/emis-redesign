import type { CSSProperties, ReactNode } from "react";
import { DOTS, GRID, PROVINCES } from "../angolaDots";
import logoLight from "../assets/emis-logo-light.png";
import express from "../assets/brands/express.jpg";
import kwik from "../assets/brands/kwik.jpg";
import multicaixa from "../assets/brands/multicaixa.png";
import pci3ds from "../assets/certs/pci-3ds.png";
import pciDss from "../assets/certs/pci-dss.png";
import pciPin from "../assets/certs/pci-pin.png";
import t1ccd from "../assets/certs/tier3-cis1-ccd-2022.png";
import t1ccf from "../assets/certs/tier3-cis1-ccf-2024.png";
import t2ccf from "../assets/certs/tier3-cis2-ccf-2025.png";
import t2cdd from "../assets/certs/tier3-cis2-cdd-2022.png";
import { DashboardStage } from "./Dashboard";
import bank_access from "../assets/banks/access.png";
import bank_atlantico from "../assets/banks/atlantico.png";
import bank_bai from "../assets/banks/bai.png";
import bank_bca from "../assets/banks/bca.png";
import bank_bch from "../assets/banks/bch.png";
import bank_bci from "../assets/banks/bci.png";
import bank_bcs from "../assets/banks/bcs.png";
import bank_bfa from "../assets/banks/bfa.png";
import bank_bic from "../assets/banks/bic.png";
import bank_bir from "../assets/banks/bir.png";
import bank_bni from "../assets/banks/bni.png";
import bank_bpc from "../assets/banks/bpc.png";
import bank_caixaangola from "../assets/banks/caixaangola.png";
import bank_economico from "../assets/banks/economico.png";
import bank_keve from "../assets/banks/keve.png";
import bank_sol from "../assets/banks/sol.png";
import bank_standardbank from "../assets/banks/standardbank.png";
import bank_valor from "../assets/banks/valor.png";
import bank_yetu from "../assets/banks/yetu.png";
import { GlassIcon } from "./GlassIcon";
import { Container, Counter, d, Reveal } from "./ui";

const BANK_LOGOS = [bank_access, bank_atlantico, bank_bai, bank_bca, bank_bch, bank_bci, bank_bcs, bank_bfa, bank_bic, bank_bir, bank_bni, bank_bpc, bank_caixaangola, bank_economico, bank_keve, bank_sol, bank_standardbank, bank_valor, bank_yetu];

const Title = ({ children, className = "" }: { children: ReactNode; className?: string }) => (
  <h2 className={`text-[40px] font-medium leading-[1.06] tracking-[-0.035em] @bmd:text-[58px] ${className}`}>{children}</h2>
);

export const Partners = () => (
  <Reveal className="bg-white py-7">
    <div className="r overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_8%,#000_92%,transparent)]">
      <div className="marquee flex w-max items-center gap-20">
        {[...BANK_LOGOS, ...BANK_LOGOS].map((src, k) => (
          <img key={k} src={src} alt="" className="h-24 w-auto max-w-[220px] object-contain opacity-80 grayscale transition duration-300 hover:opacity-100 hover:grayscale-0" />
        ))}
      </div>
    </div>
  </Reveal>
);

export const About = () => (
  <Reveal id="Soluções" className="overflow-hidden bg-paper pt-28 pb-16">
    <Container>
      <div className="grid gap-6 @blg:grid-cols-[1fr_380px] @blg:items-end">
        <div>
          <Title className="r">Conheça a EMIS de perto</Title>
        </div>
        <p className="r text-[17px] leading-relaxed text-muted" style={d(120)}>
          A parceira do seu dia-a-dia: gerimos a rede de pagamentos que liga bancos,
          comerciantes, empresas e o Estado.
        </p>
      </div>

      <DashboardStage />
    </Container>
  </Reveal>
);

const STEPS = [
  { icon: "enviar", t: "Sistema de Transferências a Crédito", d: "Transferência electrónica de fundos entre instituições financeiras, com segurança, rapidez e duas sessões de compensação diárias." },
  { icon: "cartao", t: "Rede partilhada MULTICAIXA", d: "Caixas automáticos, TPA, MCX Express, pagamentos online e Host to Host, geridos segundo as normas internacionais." },
  { icon: "recibo", t: "Serviço RUPE", d: "A Referência Única de Pagamentos ao Estado, em todos os canais. A maioria dos impostos já é liquidada por esta via." },
];

export const Steps = () => (
  <Reveal className="bg-white py-28">
    <Container>
      <div className="grid gap-6 @blg:grid-cols-[1fr_380px] @blg:items-end">
        <div>
          <Title className="r">
            Três sistemas que movem
            <br />o dinheiro do país
          </Title>
        </div>
        <p className="r text-[17px] leading-relaxed text-muted" style={d(120)}>
          Infra-estruturas interbancárias desenhadas para serem seguras, eficientes e
          disponíveis a toda a hora.
        </p>
      </div>
      <div className="mt-14 grid gap-2 @blg:grid-cols-3">
        {STEPS.map((s, k) => (
          <div key={s.t} data-focus={`step-${k}`} className="r flex min-h-[400px] flex-col justify-between bg-paper p-8" style={d(150 + k * 120)}>
            <span className="a-float block w-fit drop-shadow-[0_20px_26px_rgba(0,24,98,0.22)]" style={{ "--f": `${-k * 1.4}s` } as CSSProperties}>
              <GlassIcon name={s.icon} size={96} tone="duo" />
            </span>
            <div>
              <p className="text-[24px] font-semibold leading-tight tracking-tight">{s.t}</p>
              <p className="mt-3 text-[16px] leading-relaxed text-muted">{s.d}</p>
            </div>
          </div>
        ))}
      </div>
    </Container>
  </Reveal>
);

export const Impact = () => (
  <Reveal className="bg-white">
    <div className="@bmd:px-6">
      <div className="grid @bmd:grid-cols-2 @blg:grid-cols-5">
        <div className="r shine flex min-h-[240px] flex-col justify-between bg-navy p-10 text-white">
          <span className="text-[13px] font-semibold uppercase tracking-[0.16em] text-white/60">EMIS</span>
          <p className="text-[26px] font-semibold leading-tight">
            Impacto
            <br />
            da EMIS
          </p>
        </div>
        {[
          { v: 69, s: " biliões", l: "De kwanzas movimentados em 2025" },
          { v: 36, s: "%", l: "Receitas do Estado via RUPE" },
          { v: 50000, s: "+", l: "Levantamentos em TPA num dia" },
          { v: 25, s: " anos", l: "A digitalizar pagamentos" },
        ].map((f, k) => (
          <div key={f.l} data-focus={`impact-${k}`} className="r flex min-h-[240px] flex-col justify-between border-t border-line p-10 @bmd:border-l @blg:border-t-0" style={d(100 + k * 90)}>
            <p className="whitespace-nowrap text-[38px] font-medium leading-none tracking-tight text-ink">
              <Counter to={f.v} suffix={f.s} />
            </p>
            <p className="text-[15px] leading-snug text-muted">{f.l}</p>
          </div>
        ))}
      </div>
    </div>
  </Reveal>
);

const SHADE: Record<string, number> = {
  Luanda: 1, Benguela: 0.85, "Huíla": 0.75, Huambo: 0.7, Cabinda: 0.65, "Cuanza Sul": 0.55,
  Bengo: 0.5, Malanje: 0.45, "Uíge": 0.42, Namibe: 0.4, "Bié": 0.35, "Cuanza Norte": 0.33,
  Zaire: 0.3, "Lunda Norte": 0.25, "Lunda Sul": 0.22, Cunene: 0.2, Moxico: 0.15, "Cuando Cubango": 0.1,
};
const LOW = [34, 52, 118];
const HIGH = [0, 204, 211];
const shade = (t: number) => `rgb(${LOW.map((l, i) => Math.round(l + (HIGH[i] - l) * t)).join(",")})`;

export const Kwik = () => (
  <Reveal id="Marcas" className="relative overflow-hidden bg-navy text-white">
    <div aria-hidden className="pointer-events-none absolute inset-0 mx-auto flex max-w-[1240px] justify-between px-5 @bmd:px-10">
      {[0, 1, 2, 3].map((k) => (
        <span key={k} className="w-px bg-white/[0.08]" />
      ))}
    </div>

    <Container className="relative grid min-h-[760px] gap-10 py-20 @blg:grid-cols-[1fr_1.5fr_220px]">
      <div className="flex flex-col justify-center @blg:order-1 @blg:pb-16">
        <span className="r shine mb-8 self-start rounded-lg"><img src={kwik} alt="KWiK" className="block h-12 w-auto rounded-lg" /></span>
        <h2 className="r text-[56px] font-semibold uppercase leading-none tracking-[-0.02em] @bmd:text-[72px]">Angola</h2>
        <p className="r mt-6 max-w-[340px] text-[15px] leading-relaxed text-white/70" style={d(120)}>
          Com o KWiK, o dinheiro chega na hora a qualquer banco, de Cabinda ao Cunene. Conta-a-conta,
          instantâneo e disponível a qualquer hora.
        </p>
      </div>

      <div className="relative flex items-center justify-center @blg:order-2">
        <svg viewBox={`-2 -2 ${GRID.w + 4} ${GRID.h + 4}`} className="w-full max-w-[600px]" aria-label="Mapa de Angola por província">
          {DOTS.map(([x, y, p], i) => (
            <circle key={i} cx={x} cy={y} r={0.44} fill={shade(SHADE[PROVINCES[p]] ?? 0.2)} className="r-dot" style={d(300 + y * 14 + x * 4)} />
          ))}
        </svg>
      </div>

      <div className="flex flex-col justify-center gap-12 @blg:order-3">
        {[
          { v: "16,6 M", l: "Operações KWiK processadas" },
          { v: "18", l: "Províncias com acesso a transferências instantâneas" },
          { v: "24/7", l: "Disponível todos os dias, a qualquer hora" },
        ].map((f, k) => (
          <div key={f.l} className="r" style={d(200 + k * 100)}>
            <p className="font-mono text-[34px] font-medium text-cyan">{f.v}</p>
            <p className="mt-1 text-[14px] leading-snug text-white/65">{f.l}</p>
          </div>
        ))}
      </div>
    </Container>
  </Reveal>
);

const N_BARS = 120;
const BAR_H = Array.from({ length: N_BARS }, (_, i) => {
  const trend = 0.25 + 0.6 * (i / N_BARS);
  const wave = 0.12 * Math.sin(i * 0.37) + 0.08 * Math.sin(i * 1.7) + 0.06 * Math.cos(i * 2.9);
  return Math.max(0.12, Math.min(1, trend + wave));
});

const SPLIT = 0.42;

const StatsChart = () => {
  const split = SPLIT;
  return (
    <div className="relative mt-16 h-[360px]">
      {[0, 1, 2, 3, 4, 5, 6, 7].map((k) => (
        <span key={k} className="absolute inset-y-0 w-px bg-line" style={{ left: `${(k / 7) * 100}%` }} />
      ))}
      <div className="absolute inset-0 flex items-end gap-[2px]">
        {BAR_H.map((h, i) => {
          const on = i / N_BARS >= split;
          return (
            <span
              key={i}
              className={`r-bar flex-1 ${on ? "bg-[#1b3fa8]" : "bg-[#dfe4ef]"}`}
              style={{ height: `${(on ? h : h * 0.55) * 100}%`, ...d(500 + i * 16) }}
            />
          );
        })}
      </div>
      <div className="absolute inset-y-0" style={{ left: `${split * 100}%` }}>
        <span className="absolute inset-y-0 -left-px w-[2px] bg-navy" />
        <div className="absolute top-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center gap-2 font-mono text-[11px] uppercase">
          <span className="whitespace-nowrap border border-line bg-white px-2 py-1 text-muted">Antes do KWiK ‹</span>
          <span className="grid h-10 w-8 place-items-center bg-navy">
            <span className="h-4 w-1 bg-white" />
          </span>
          <span className="whitespace-nowrap border border-line bg-white px-2 py-1 text-navy">› Com KWiK</span>
        </div>
      </div>
      <div className="absolute -bottom-7 inset-x-0 flex justify-between font-mono text-[11px] text-dim">
        {["2001", "2005", "2010", "2015", "2020", "2023", "2025"].map((y) => (
          <span key={y}>{y}</span>
        ))}
      </div>
    </div>
  );
};

export const Stats = () => (
  <Reveal id="Estatísticas" className="bg-white py-24">
    <Container>
      <div className="grid gap-10 @blg:grid-cols-[1fr_520px] @blg:items-start">
        <div>
          <Title className="r">
            Pagamentos em tempo real.
            <br />
            Em todo o país.
          </Title>
          <a href="#" className="r shine btn btn--primary mt-10" style={d(150)}>
            Saiba mais
          </a>
        </div>
        <div className="r grid grid-cols-2 border border-line" style={d(100)}>
          {[
            { v: 398431150, l: "Operações com cartão · MULTICAIXA" },
            { v: 4413110, l: "Transferências a crédito · STC" },
            { v: 16582800, l: "Operações · KWiK" },
            { v: 20, l: "Bancos accionistas" },
          ].map((f, k) => (
            <div key={f.l} className={`p-6 ${k % 2 ? "border-l border-line" : ""} ${k > 1 ? "border-t border-line" : ""}`}>
              <p className="font-mono text-[26px] font-medium tracking-tight">
                <span className="text-cyan">+</span> <Counter to={f.v} />
              </p>
              <p className="mt-2 text-[13px] text-muted">{f.l}</p>
            </div>
          ))}
        </div>
      </div>
      <StatsChart />
      <p className="mt-12 text-right font-mono text-[11px] text-dim">Evolução ilustrativa · totais publicados em emis.ao</p>
    </Container>
  </Reveal>
);

const BRANDS = [
  { src: multicaixa, t: "MULTICAIXA", d: "A marca do sistema nacional de cartões de pagamento emitidos pelos bancos angolanos." },
  { src: express, t: "MULTICAIXA Express", d: "O canal mobile interbancário que associa os cartões MULTICAIXA à aplicação MCX Express." },
  { src: kwik, t: "KWiK", d: "O ecossistema integrado de pagamentos, conta-a-conta e instantâneo." },
];

export const Brands = () => (
  <Reveal className="bg-white pt-28">
    <Container>
      <Title className="r">
        Marcas que fazem parte
        <br />
        do seu dia-a-dia
      </Title>
    </Container>
    <div className="mt-12 @bmd:px-6">
      <div className="r h-px w-full bg-line" style={d(80)} />
      <div className="grid gap-2 pt-2 @blg:grid-cols-3">
        {BRANDS.map((b, k) => (
          <div key={b.t} data-focus={`brand-${k}`} className="r flex min-h-[380px] flex-col justify-between bg-[#F7F9FD] p-10" style={d(100 + k * 120)}>
            <span className="shine size-24 rounded-2xl" style={d(200 + k * 250)}><img src={b.src} alt={b.t} className="size-24 rounded-2xl object-cover" /></span>
            <div>
              <p className="text-[28px] font-semibold tracking-tight">{b.t}</p>
              <p className="mt-3 text-[17px] leading-relaxed text-muted">{b.d}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </Reveal>
);

const CERTS = [
  { src: pciDss, t: "PCI DSS" },
  { src: pciPin, t: "PCI PIN" },
  { src: pci3ds, t: "PCI 3DS" },
  { src: t2ccf, t: "Tier III Instalação Construída · CIS II" },
  { src: t2cdd, t: "Tier III Documentos de Design · CIS II" },
  { src: t1ccf, t: "Tier III Instalação Construída · CIS I" },
  { src: t1ccd, t: "Tier III Documentos de Design · CIS I" },
];

export const Certs = () => (
  <Reveal className="bg-white py-24">
    <Container className="grid gap-6 @blg:grid-cols-[1fr_420px] @blg:items-end">
      <div>
        <Title className="r">As nossas certificações internacionais</Title>
      </div>
      <p className="r text-[17px] leading-relaxed text-muted" style={d(120)}>
        Comprovam o nosso compromisso com padrões globais de qualidade, segurança e
        excelência, garantindo confiança em todos os nossos serviços.
      </p>
    </Container>
    <div className="mt-14 overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_8%,#000_92%,transparent)]">
      <div className="marquee flex w-max gap-4 [animation-duration:45s]">
        {[...CERTS, ...CERTS].map((c, k) => (
          <div key={k} className="r flex w-[180px] shrink-0 flex-col items-center gap-3 px-4 py-4" style={d(150 + (k % 7) * 80)}>
            <img src={c.src} alt={c.t} className="h-20 w-auto object-contain" />
            <p className="text-center text-[13px] font-semibold leading-snug">{c.t}</p>
          </div>
        ))}
      </div>
    </div>
  </Reveal>
);

const TILE = 72;

const Tiles = () => (
  <svg aria-hidden className="pointer-events-none absolute inset-0 h-full w-full">
    <defs>
      <pattern id="emis-tiles" width={TILE} height={TILE} patternUnits="userSpaceOnUse" x="50%">
        <rect x="4" y="4" width={TILE - 8} height={TILE - 8} rx="14" fill="#ffffff" fillOpacity="0.07" stroke="#ffffff" strokeOpacity="0.22" />
      </pattern>
      <linearGradient id="emis-tiles-fade" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#fff" stopOpacity="0" />
        <stop offset="0.25" stopColor="#fff" stopOpacity="1" />
        <stop offset="1" stopColor="#fff" stopOpacity="0.1" />
      </linearGradient>
      <mask id="emis-tiles-mask">
        <rect width="100%" height="100%" fill="url(#emis-tiles-fade)" />
      </mask>
    </defs>
    <rect width="100%" height="100%" fill="url(#emis-tiles)" mask="url(#emis-tiles-mask)" />
  </svg>
);

const COLS = [
  { t: "Empresa", l: ["Sobre Nós", "Parceiros", "Carreiras", "Responsabilidade Social"] },
  { t: "Soluções", l: ["Rede MULTICAIXA", "MULTICAIXA Express", "KWiK", "Serviço RUPE"] },
  { t: "Recursos", l: ["Estatísticas", "Notícias & Eventos", "Podcast", "Glossário"] },
];

export const Closing = () => (
  <div className="relative overflow-hidden bg-[linear-gradient(180deg,#f7f9fd_0%,#eef8fc_30%,#b4e6f3_50%,#4fb2e2_60%,#0a2a86_66%,#001455_74%,#010a2c_86%,#01061a_100%)]">
    <Tiles />

    <Reveal id="Contactos" className="relative">
      <Container className="flex flex-col items-center pb-40 pt-32 text-center">
        <span className="r flex items-center gap-2 rounded-full border border-line bg-white py-1.5 pl-1.5 pr-4 text-[14px] font-medium shadow-[0_1px_2px_rgba(10,19,48,0.06)]">
          <span className="rounded-full bg-navy px-2.5 py-0.5 text-[12px] font-semibold text-white">Novo</span>
          KWiK: transferências instantâneas entre todos os bancos
        </span>
        <h2 className="r mt-8 max-w-[1040px] text-[52px] font-bold leading-[1.02] tracking-[-0.04em] @bmd:text-[84px]" style={d(100)}>
          Pagamentos digitais em apenas alguns toques.
        </h2>
        <p className="r mt-8 max-w-[640px] text-[19px] leading-relaxed text-muted @bmd:text-[21px]" style={d(200)}>
          Cartões, transferências e pagamentos ao Estado numa só rede, com{" "}
          <span className="font-semibold text-ink">segurança certificada</span> e{" "}
          <span className="font-semibold text-ink">disponibilidade todos os dias</span>.
        </p>
        <a href="#Soluções" className="r shine btn btn--primary mt-12 h-[64px] px-10 text-[17px]" style={d(300)}>
          Aderir à Rede MULTICAIXA
        </a>
      </Container>
    </Reveal>

    <footer className="relative text-white [text-shadow:0_1px_2px_rgba(0,0,0,0.25)]">
      <Container className="grid gap-12 py-16 @blg:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div>
          <img src={logoLight} alt="EMIS" className="h-9 w-auto" />
          <p className="mt-5 max-w-[320px] text-[16px] leading-relaxed text-white/70">
            Empresa líder em sistemas tecnológicos de pagamento em Angola.
          </p>
        </div>
        {COLS.map((c, k) => (
          <div key={c.t} className="r" style={d(150 + k * 100)}>
            <p className="text-[14px] text-white/55">{c.t}</p>
            <ul className="mt-4 space-y-3 text-[16px] font-medium">
              {c.l.map((l) => (
                <li key={l}>
                  <a href="#" className="hover:text-cyan">
                    {l}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </Container>
      <Container className="flex flex-col gap-3 border-t border-white/15 py-7 text-[14px] text-white/60 @bmd:flex-row @bmd:justify-between">
        <p>© 2026 EMIS — Empresa Interbancária de Serviços, S.A.</p>
        <p>Termos e Condições · Protecção de Dados</p>
      </Container>
    </footer>
  </div>
);
