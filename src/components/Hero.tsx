import { useState, type CSSProperties } from "react";
import logo from "../assets/emis-logo.png";
import logoLight from "../assets/emis-logo-light.png";
import { GlassIcon } from "./GlassIcon";
import { Chevron, Container, d } from "./ui";

const NAV: [string, boolean][] = [
  ["Soluções", true],
  ["Marcas", true],
  ["Estatísticas", false],
  ["Notícias", false],
  ["Contactos", false],
];

const LangSwitch = () => {
  const [lang, setLang] = useState<"EN" | "PT">("PT");
  return (
    <div className="flex h-[52px] items-center rounded-full border border-line bg-white p-1 text-[14px] font-semibold">
      {(["EN", "PT"] as const).map((l) => (
        <button
          key={l}
          onClick={() => setLang(l)}
          className={`h-full rounded-full px-4 transition-colors ${lang === l ? "bg-navy text-white" : "text-muted hover:text-ink"}`}
        >
          {l}
        </button>
      ))}
    </div>
  );
};

const W = 1160;
const H = 380;
const HUB = { x: 580, y: 190, s: 92 };
const PORT_GAP = 10;

type Node = { x: number; y: number; w: number; h: number; title: string; text?: string; icon: string };
const LEFT: Node[] = [
  { x: 30, y: 6, w: 280, h: 116, title: "Rede MULTICAIXA", text: "Caixas automáticos e TPA em todo o país", icon: "cartao" },
  { x: 74, y: 134, w: 280, h: 116, title: "MULTICAIXA Express", text: "Os cartões MULTICAIXA numa só app", icon: "telefone" },
  { x: 30, y: 262, w: 280, h: 116, title: "Pagamentos online", text: "Comércio electrónico e Host to Host", icon: "carrinho" },
];
const RIGHT: Node[] = [
  { x: 852, y: 40, w: 268, h: 88, title: "Transferências instantâneas KWiK", icon: "raio" },
  { x: 876, y: 146, w: 268, h: 88, title: "Transferências a crédito (STC)", icon: "enviar" },
  { x: 900, y: 252, w: 252, h: 88, title: "Pagamentos ao Estado (RUPE)", icon: "recibo" },
];

const port = (side: -1 | 1, i: number) => ({
  x: HUB.x + side * (HUB.s / 2 + 12),
  y: HUB.y + (i - 1) * PORT_GAP,
});

type Pt = { x: number; y: number };
type Curve = [Pt, Pt, Pt, Pt];

const curveLeft = (n: Node, i: number): Curve => {
  const a = { x: n.x + n.w, y: n.y + n.h / 2 };
  const b = port(-1, i);
  const mx = (a.x + b.x) / 2;
  return [a, { x: mx + 10, y: a.y }, { x: mx - 10, y: b.y }, b];
};
const curveRight = (n: Node, i: number): Curve => {
  const a = port(1, i);
  const b = { x: n.x, y: n.y + n.h / 2 };
  const mx = (a.x + b.x) / 2;
  return [a, { x: mx - 10, y: a.y }, { x: mx + 10, y: b.y }, b];
};
const toPath = ([a, c1, c2, b]: Curve) => `M${a.x} ${a.y} C ${c1.x} ${c1.y}, ${c2.x} ${c2.y}, ${b.x} ${b.y}`;
const CURVES: Curve[] = [...LEFT.map(curveLeft), ...RIGHT.map(curveRight)];

const pct = (v: number, of: number) => `${(v / of) * 100}%`;
const box = (n: Node): CSSProperties => ({ left: pct(n.x, W), top: pct(n.y, H), width: pct(n.w, W), height: pct(n.h, H) });

const IconTile = ({ name }: { name: string }) => (
  <span className="grid size-[52px] shrink-0 place-items-center rounded-[10px] border border-line bg-white">
    <GlassIcon name={name} size={30} />
  </span>
);

const Beam = () => {
  const wires = CURVES.map(toPath);
  const ends = [
    ...LEFT.map((n) => ({ x: n.x + n.w, y: n.y + n.h / 2 })),
    ...RIGHT.map((n) => ({ x: n.x, y: n.y + n.h / 2 })),
  ];
  return (
    <div className="relative mx-auto mt-16 hidden aspect-[1160/380] w-full max-w-[1160px] @blg:block">
      <svg viewBox={`0 0 ${W} ${H}`} className="absolute inset-0 h-full w-full overflow-visible" aria-hidden>
        {wires.map((path, i) => (
          <g key={i}>
            <path d={path} pathLength={1} fill="none" stroke="#9aaad6" strokeWidth="1.3" className="a-draw" style={d(800 + i * 90)} />
            <circle r="2.6" fill="#1b3fa8">
                <animateMotion dur="3.2s" begin={`${2 + i * 0.45}s`} repeatCount="indefinite" path={path} keyPoints={i < 3 ? "0;1" : "1;0"} keyTimes="0;1" calcMode="linear" />
              </circle>
          </g>
        ))}
        {ends.map((e, i) => (
          <circle key={i} cx={e.x} cy={e.y} r="3.2" fill="#1b3fa8" className="a-pop" style={d(800 + i * 90)} />
        ))}
        {([-1, 1] as const).flatMap((side) =>
          [0, 1, 2].map((i) => {
            const p = port(side, i);
            return <circle key={`${side}${i}`} cx={p.x} cy={p.y} r="2.4" fill="#1b3fa8" className="a-pop" style={d(700)} />;
          }),
        )}
      </svg>

      <div className="absolute -translate-x-1/2 -translate-y-1/2" style={{ left: pct(HUB.x, W), top: pct(HUB.y, H) }}>
        <div
          className="a-pop shine relative grid place-items-center overflow-hidden rounded-[24px] bg-[linear-gradient(145deg,#2f5bd8_0%,#1b3fa8_45%,#001862_100%)] shadow-[0_18px_40px_-14px_rgba(27,63,168,0.65)]"
          style={{ width: HUB.s, height: HUB.s, ...d(600) }}
        >
          <span className="absolute inset-0 rounded-[24px] shadow-[inset_0_1px_0_rgba(255,255,255,0.35),inset_0_-8px_16px_rgba(0,0,0,0.18)]" />
          <img src={logoLight} alt="" className="relative w-[70%]" />
        </div>
      </div>

      {LEFT.map((n, i) => (
        <div key={n.title} data-focus={`node-l${i}`} className="a-rise absolute" style={{ ...box(n), ...d(1000 + i * 110) }}>
          <div className="flex h-full items-start justify-between gap-3 rounded-[12px] border border-line/70 bg-white p-5 text-left">
            <div className="min-w-0 pt-1">
              <p className="text-[18px] font-semibold leading-snug tracking-tight">{n.title}</p>
              <p className="mt-2 text-[13px] leading-snug text-dim">{n.text}</p>
            </div>
            <IconTile name={n.icon} />
          </div>
        </div>
      ))}

      {RIGHT.map((n, i) => (
        <div key={n.title} data-focus={`node-r${i}`} className="a-rise absolute" style={{ ...box(n), ...d(1100 + i * 110) }}>
          <div className="flex h-full items-center gap-4 rounded-[12px] border border-line/70 bg-white px-4 text-left">
            <IconTile name={n.icon} />
            <p className="text-[16px] font-semibold leading-snug tracking-tight">{n.title}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export const Hero = () => (
  <section className="relative overflow-hidden bg-paper">
    <Container>
      <nav className="a-rise flex h-28 items-center justify-between gap-6" style={d(0)}>
        <a href="#" aria-label="EMIS">
          <img src={logo} alt="EMIS" className="h-8 w-auto" />
        </a>
        <ul className="hidden items-center gap-9 text-[16px] font-medium text-ink/80 @blg:flex">
          {NAV.map(([n, menu]) => (
            <li key={n}>
              <a href={`#${n}`} className="flex items-center gap-1.5 transition-colors hover:text-navy">
                {n}
                {menu && <Chevron />}
              </a>
            </li>
          ))}
        </ul>
        <div className="flex items-center gap-3">
          <a href="#Estatísticas" className="shine btn btn--primary btn--sm">
            Ver estatísticas
          </a>
          <div className="hidden @bsm:block">
            <LangSwitch />
          </div>
        </div>
      </nav>
    </Container>

    <Container className="pb-24 pt-12 text-center @blg:pt-16">
      <h1 data-focus="title" className="mx-auto max-w-[920px] text-[46px] font-bold leading-[1.02] tracking-[-0.04em] text-ink @bmd:text-[76px]">
        <span className="a-rise inline-block" style={d(120)}>
          O futuro dos pagamentos
        </span>{" "}
        <span className="a-rise inline-block" style={d(220)}>
          em Angola passa pela <span className="text-navy">EMIS</span>
        </span>
      </h1>
      <p className="a-rise mx-auto mt-8 max-w-[760px] text-[20px] leading-relaxed text-muted @bmd:text-[23px]" style={d(360)}>
        Criada em 2001 pelo Banco Central e pelos Bancos Comerciais, a EMIS digitaliza os meios
        de pagamento em Angola, todos os dias, em todo o país.
      </p>
      <div className="a-rise mt-10" style={d(480)}>
        <a href="#Soluções" className="shine btn btn--primary">
          Conhecer as soluções
        </a>
      </div>

      <Beam />

      <div className="mt-12 grid gap-3 text-left @blg:hidden">
        {[...LEFT, ...RIGHT].map((n, i) => (
          <div key={n.title} className="a-rise flex items-center gap-4 rounded-[12px] border border-line bg-white p-4" style={d(600 + i * 70)}>
            <IconTile name={n.icon} />
            <div>
              <p className="text-[16px] font-semibold">{n.title}</p>
              {n.text && <p className="text-[14px] text-muted">{n.text}</p>}
            </div>
          </div>
        ))}
      </div>
    </Container>
  </section>
);
