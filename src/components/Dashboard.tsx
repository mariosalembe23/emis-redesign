import { useLayoutEffect, useRef, useState } from "react";
import logo from "../assets/emis-logo.png";
import { GlassIcon } from "./GlassIcon";
import { Counter, d } from "./ui";

const MENU: [string, string][] = [
  ["Visão geral", "painel"],
  ["Cartões", "cartao"],
  ["KWiK", "raio"],
  ["STC", "enviar"],
  ["RUPE", "recibo"],
  ["Bancos", "banco"],
  ["Relatórios", "grafico"],
];

const Sidebar = () => (
  <aside className="flex w-[230px] shrink-0 flex-col border-r border-line bg-white p-5">
    <img src={logo} alt="" className="h-6 w-auto self-start" />
    <p className="mt-8 text-[11px] font-semibold uppercase tracking-wider text-dim">Menu</p>
    <nav className="mt-2 space-y-1">
      {MENU.map(([label, icon], i) => (
        <span
          key={label}
          style={d(350 + i * 60)}
          className={`r flex items-center gap-3 rounded-xl px-3 py-2.5 text-[14px] font-medium ${i === 0 ? "bg-navy/[0.06] text-navy" : "text-muted"}`}
        >
          <GlassIcon name={icon} size={22} tone={i === 0 ? "duo" : "navy"} />
          {label}
          {i === 0 && <span className="ml-auto text-[12px]">›</span>}
        </span>
      ))}
    </nav>
  </aside>
);

const BARS = [22, 30, 26, 38, 34, 46, 58, 100, 64, 52, 44, 36];
const MONTHS = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"];

const TOTALS = { cards: 398431150, kwik: 16582800, stc: 4413110 };
const SUM = TOTALS.cards + TOTALS.kwik + TOTALS.stc;
const SHARE = {
  cards: (TOTALS.cards / SUM) * 100,
  kwik: (TOTALS.kwik / SUM) * 100,
  stc: (TOTALS.stc / SUM) * 100,
};

const spark = (v: number[], w = 120, h = 34) =>
  v.map((y, i) => `${i ? "L" : "M"}${(i / (v.length - 1)) * w} ${h - (y / Math.max(...v)) * h}`).join(" ");

const KPIS = [
  { l: "Operações com cartão", v: "398,4M", t: "+12,4%", s: [8, 10, 9, 13, 12, 15, 18, 17, 21] },
  { l: "Transferências KWiK", v: "16,6M", t: "+38,1%", s: [2, 3, 3, 5, 6, 8, 9, 12, 15] },
  { l: "Transferências STC", v: "4,4M", t: "+4,2%", s: [9, 9, 10, 9, 11, 10, 11, 12, 12] },
  { l: "Receita do Estado (RUPE)", v: "36%", t: "+3,0 pp", s: [20, 22, 23, 26, 27, 30, 31, 33, 36] },
];

const CHANNELS: [string, number, string][] = [
  ["TPA", 46, "#001862"],
  ["MCX Express", 28, "#00ccd3"],
  ["Caixas automáticos", 18, "#5b78d6"],
  ["Online e H2H", 8, "#c9d1e6"],
];

const Donut = () => {
  let acc = 0;
  const R = 15.9;
  return (
    <svg viewBox="0 0 42 42" className="size-[150px] -rotate-90">
      <circle cx="21" cy="21" r={R} fill="none" stroke="#eef1f7" strokeWidth="6" />
      {CHANNELS.map(([n, v, c], i) => {
        const el = (
          <circle key={n} cx="21" cy="21" r={R} fill="none" stroke={c} strokeWidth="6" pathLength={100}
            strokeDasharray={`${v - 1} ${101 - v}`} strokeDashoffset={-acc} className="r" style={d(500 + i * 120)} />
        );
        acc += v;
        return el;
      })}
    </svg>
  );
};

const VOLUME = [32, 36, 34, 41, 39, 47, 52, 49, 58, 61, 66, 69];

const Main = () => (
  <div className="flex min-w-0 flex-1 flex-col bg-[#f7f8fb]">
    <div className="flex items-center justify-between border-b border-line bg-white px-7 py-4">
      <div>
        <p className="text-[13px] text-muted">Olá, Equipa de Operações</p>
        <p className="text-[24px] font-semibold tracking-tight">Bom dia!</p>
      </div>
      <div className="flex items-center gap-3">
        <span className="grid size-10 place-items-center rounded-full border border-line"><GlassIcon name="busca" size={22} /></span>
        <span className="grid size-10 place-items-center rounded-full border border-line"><GlassIcon name="sino" size={22} /></span>
        <span className="flex items-center gap-2.5 rounded-full border border-line py-1 pl-1 pr-4">
          <span className="grid size-8 place-items-center rounded-full bg-navy text-[11px] font-bold text-cyan">EO</span>
          <span className="text-[13px] font-semibold">EMIS Operações</span>
        </span>
        <span className="rounded-full bg-navy px-5 py-2.5 text-[13px] font-semibold text-white">Exportar relatório</span>
      </div>
    </div>

    <div className="px-7 pt-4 text-[13px] text-muted">
      Tem <b className="text-ink">3 relatórios</b> novos para rever esta semana
    </div>

    <div className="grid grid-cols-4 gap-4 px-7 pt-4">
      {KPIS.map((k, i) => (
        <div key={k.l} className="r rounded-2xl border border-line bg-white p-4" style={d(450 + i * 110)}>
          <p className="text-[12px] text-muted">{k.l}</p>
          <div className="mt-2 flex items-end justify-between gap-2">
            <div>
              <p className="text-[22px] font-semibold tracking-tight">{k.v}</p>
              <span className="mt-1 inline-block rounded-md bg-cyan-soft px-1.5 py-0.5 text-[10px] font-semibold text-[#08838a]">{k.t}</span>
            </div>
            <svg viewBox="0 0 120 34" className="h-9 w-[110px] overflow-visible">
              <path d={spark(k.s)} pathLength={1} fill="none" stroke={i === 1 ? "#00ccd3" : "#1b3fa8"} strokeWidth="2" className="r-draw" style={d(300 + i * 100)} />
            </svg>
          </div>
        </div>
      ))}
    </div>

    <div className="grid flex-1 grid-cols-[1fr_290px_270px] gap-4 p-7 pt-4">
      <div className="r rounded-2xl border border-line bg-white p-5" style={d(800)}>
        <div className="flex items-center justify-between">
          <p className="flex items-center gap-2 text-[16px] font-semibold">
            <GlassIcon name="grafico" size={24} /> Análise das operações
          </p>
          <span className="rounded-lg border border-line px-3 py-1.5 text-[12px] text-muted">Jan – Dez 2025</span>
        </div>
        <div className="mt-4 flex flex-wrap gap-6 text-[12px] text-muted">
          <span>Cartões <b className="font-mono text-[13px] text-ink"><Counter to={TOTALS.cards} /></b></span>
          <span>KWiK <b className="font-mono text-[13px] text-ink"><Counter to={TOTALS.kwik} /></b></span>
          <span>STC <b className="font-mono text-[13px] text-ink"><Counter to={TOTALS.stc} /></b></span>
        </div>
        <div className="relative mt-6 flex h-[190px] items-end gap-3 border-b border-dashed border-line">
          {BARS.map((h, i) => (
            <div key={i} className="relative flex h-full flex-1 items-end">
              {i === 7 && (
                <span className="absolute -top-1 left-1/2 -translate-x-1/2 rounded-md bg-ink px-2 py-1 text-[10px] font-semibold text-white">
                  Recorde
                </span>
              )}
              <div
                className={`r-bar w-full rounded-t-lg ${i === 7 ? "bg-[linear-gradient(180deg,#2f5bd8,#001862)]" : "bg-[#e6e9f2]"}`}
                style={{ height: `${h * 0.82}%`, ...d(300 + i * 50) }}
              />
            </div>
          ))}
        </div>
        <div className="mt-2 flex gap-3 text-[10px] text-dim">
          {MONTHS.map((m) => (
            <span key={m} className="flex-1 text-center">{m}</span>
          ))}
        </div>
        <p className="mt-2 text-right text-[10px] text-dim">Evolução mensal ilustrativa</p>
      </div>

      <div className="r rounded-2xl border border-line bg-white p-5" style={d(900)}>
        <p className="text-[16px] font-semibold">Distribuição das operações</p>
        <p className="mt-3 text-[30px] font-medium tracking-tight">
          {SHARE.cards.toFixed(1).replace(".", ",")}%
          <span className="ml-2 text-[13px] font-normal text-muted">com cartão</span>
        </p>
        <div className="mt-4 grid grid-cols-10 gap-1.5">
          {Array.from({ length: 100 }, (_, k) => {
            const kwik = k >= 100 - Math.round(SHARE.kwik + SHARE.stc) && k < 100 - Math.round(SHARE.stc);
            const stc = k >= 100 - Math.round(SHARE.stc);
            return (
              <span
                key={k}
                className={`r aspect-square rounded-full ${stc ? "bg-dim" : kwik ? "bg-cyan" : "bg-navy"}`}
                style={d(400 + k * 6)}
              />
            );
          })}
        </div>
        <div className="mt-4 space-y-2 text-[12px]">
          {[
            ["bg-navy", "Cartões", SHARE.cards],
            ["bg-cyan", "KWiK", SHARE.kwik],
            ["bg-dim", "STC", SHARE.stc],
          ].map(([c, l, v]) => (
            <div key={l as string} className="flex items-center justify-between rounded-lg bg-[#f7f8fb] px-3 py-2">
              <span className="flex items-center gap-2"><i className={`size-2.5 rounded-full ${c}`} />{l}</span>
              <span className="font-mono font-medium">{(v as number).toFixed(1).replace(".", ",")}%</span>
            </div>
          ))}
        </div>
      </div>

      <div className="r rounded-2xl border border-line bg-white p-5" style={d(1000)}>
        <p className="text-[16px] font-semibold">Canais da Rede MULTICAIXA</p>
        <div className="relative mt-4 grid place-items-center">
          <Donut />
          <div className="absolute text-center">
            <p className="text-[22px] font-semibold">46%</p>
            <p className="text-[11px] text-muted">em TPA</p>
          </div>
        </div>
        <div className="mt-4 space-y-2 text-[12px]">
          {CHANNELS.map(([n, v, c]) => (
            <div key={n} className="flex items-center justify-between">
              <span className="flex items-center gap-2"><i className="size-2.5 rounded-full" style={{ background: c }} />{n}</span>
              <span className="font-mono font-medium">{v}%</span>
            </div>
          ))}
        </div>
        <p className="mt-3 text-[10px] text-dim">Ilustrativo</p>
      </div>

      <div className="col-span-3 rounded-2xl border border-line bg-white p-5">
        <div className="flex items-center justify-between">
          <p className="text-[16px] font-semibold">Volume transaccionado (biliões de Kz)</p>
          <span className="text-[12px] text-muted">2025 · total 69 biliões</span>
        </div>
        <svg viewBox="0 0 1000 160" className="mt-4 h-[160px] w-full" preserveAspectRatio="none">
          <defs>
            <linearGradient id="vol" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#1b3fa8" stopOpacity="0.22" />
              <stop offset="1" stopColor="#1b3fa8" stopOpacity="0" />
            </linearGradient>
          </defs>
          {[0, 1, 2, 3].map((k) => <line key={k} x1="0" x2="1000" y1={10 + k * 45} y2={10 + k * 45} stroke="#eef1f7" />)}
          <path d={`${spark(VOLUME, 1000, 150).replace(/^M/, "M")} L1000 160 L0 160 Z`} fill="url(#vol)" />
          <path d={spark(VOLUME, 1000, 150)} pathLength={1} fill="none" stroke="#1b3fa8" strokeWidth="2.5" className="r-draw" style={d(600)} />
        </svg>
      </div>
    </div>
  </div>
);

const Device = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <div className={`rounded-[30px] bg-[#0c0e14] p-[10px] shadow-[0_40px_80px_-30px_rgba(10,19,48,0.45)] ${className}`}>
    <div className="shine flex h-full overflow-hidden rounded-[22px] bg-white">{children}</div>
  </div>
);

const TILT = "rotateX(22deg) rotateY(-10deg) rotateZ(-3deg)";

const BOARD_W = 1600;
const BOARD_H = 800;

export const DashboardStage = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [k, setK] = useState(1);
  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    setK(el.offsetWidth / BOARD_W);
    const ro = new ResizeObserver(([e]) => setK((e.target as HTMLElement).offsetWidth / BOARD_W));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);
  return (
    <div
      ref={ref}
      className="relative left-1/2 mt-10 w-[100cqw] -translate-x-1/2 overflow-hidden [mask-image:linear-gradient(to_bottom,#000_78%,transparent)]"
      style={{ height: BOARD_H * k }}
    >
      <div className="absolute left-0 top-0 origin-top-left" style={{ width: BOARD_W, height: BOARD_H, transform: `scale(${k})` }}>
        <div className="absolute inset-0 [perspective:2400px] [perspective-origin:30%_0%]">
          <div className="r absolute left-[70px] top-[230px] h-[900px] w-[640px]" style={d(1500)}>
            <div className="h-full" style={{ transform: TILT, transformOrigin: "50% 0%" }}>
              <Device className="h-full">
                <Sidebar />
                <div className="flex-1 bg-[#f7f8fb]" />
              </Device>
            </div>
          </div>
          <div className="r absolute left-[270px] top-[130px] h-[1000px] w-[1260px]" style={d(250)}>
            <div className="h-full" style={{ transform: TILT, transformOrigin: "50% 0%" }}>
              <Device className="h-full">
                <Sidebar />
                <Main />
              </Device>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
