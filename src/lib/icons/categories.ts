export const CATEGORIES = [
  { id: "interface", label: "Interface" },
  { id: "setas", label: "Setas" },
  { id: "arquivos", label: "Arquivos" },
  { id: "comunicacao", label: "Comunicação" },
  { id: "midia", label: "Mídia" },
  { id: "financas", label: "Finanças" },
  { id: "lugares", label: "Lugares" },
  { id: "natureza", label: "Natureza" },
  { id: "pessoas", label: "Pessoas" },
  { id: "tecnologia", label: "Tecnologia" },
  { id: "saude", label: "Saúde" },
  { id: "editor", label: "Editor" },
  { id: "seguranca", label: "Segurança" },
  { id: "comida", label: "Comida" },
  { id: "esportes", label: "Esportes" },
  { id: "dev", label: "Desenvolvimento" },
  { id: "design", label: "Design" },
] as const;

export type CategoryId = (typeof CATEGORIES)[number]["id"];

const groups: Record<CategoryId, string[]> = {
  interface: [
    "alternar", "confirmar", "cadeado", "janelas", "calendario", "circulos", "busca", "favorito",
    "estrela", "ajustes", "escudo", "lixeira", "relogio", "salvar", "editar", "link", "filtro",
    "olho", "ideia", "chave", "apps", "menu", "mais", "menos", "fechar", "info", "ajuda", "alerta",
    "erro", "alfinete", "bandeira", "desbloqueado", "camadas", "painel", "tabela", "lista",
    "tarefas", "kanban",
  ],
  setas: [
    "download", "upload", "seta", "seta-esquerda", "seta-cima", "seta-baixo", "desfazer",
    "refazer", "atualizar", "expandir", "sair", "entrar",
  ],
  arquivos: ["pasta", "documento", "copiar", "colar", "anexo", "impressora", "disquete", "zip"],
  comunicacao: [
    "curtida", "chat", "sino", "email", "enviar", "compartilhar", "telefone", "videochamada",
    "megafone", "caixa-entrada", "sinal",
  ],
  midia: [
    "rolo", "play", "camera", "imagem", "microfone", "musica", "pausa", "fones", "volume", "tv",
    "radio", "livro", "gamepad", "dado", "paleta",
  ],
  financas: [
    "carteira", "desconto", "calculadora", "grafico", "sacola", "cartao", "dinheiro", "presente",
    "carrinho", "loja", "recibo", "banco", "moedas", "pizza", "tendencia", "pacote", "caminhao",
    "codigo-barras", "qrcode",
  ],
  lugares: [
    "local", "casa", "globo", "aviao", "carro", "bicicleta", "mapa", "bussola", "predio",
    "hospital", "formatura",
  ],
  natureza: [
    "clima", "sol", "lua", "chuva", "raio", "folha", "arvore", "flor", "gota", "fogo",
    "termometro", "vento",
  ],
  pessoas: [
    "usuarios", "trofeu", "usuario", "novo-usuario", "cracha", "sorriso", "medalha", "cafe",
  ],
  tecnologia: [
    "estojo", "smartwatch", "atalho", "bot", "dispositivos", "bateria", "wifi", "foguete",
    "terminal", "laptop", "monitor", "tablet", "servidor", "banco-dados", "chip", "mouse",
    "teclado", "bug", "tomada", "ima",
  ],
  saude: ["batimento", "pilula", "cruz-medica"],
  editor: [],
  seguranca: [],
  comida: [],
  esportes: [],
  dev: [],
  design: [],
};

export const CATEGORY_OF: Record<string, CategoryId> = Object.fromEntries(
  (Object.entries(groups) as [CategoryId, string[]][]).flatMap(([cat, names]) =>
    names.map((n) => [n, cat]),
  ),
);
