import s from "../red.module.css";

const corta = (iso: string) => new Date(`${iso}T12:00:00`).toLocaleDateString("es-CO", { day: "numeric", month: "short" });

/** Personas nuevas por día (últimos 30 días): barras de una sola serie, con detalle al pasar el cursor. */
export function Crecimiento({ datos }: { datos: { dia: string; n: number }[] }) {
  const W = 640, H = 220, izq = 30, abajo = 26, arriba = 12;
  const max = Math.max(1, ...datos.map((d) => d.n));
  const tope = Math.max(2, Math.ceil(max / 2) * 2);
  const ancho = (W - izq) / datos.length;
  const y = (v: number) => arriba + (H - arriba - abajo) * (1 - v / tope);
  const marcas = [0, tope / 2, tope];
  return (
    <svg className={s.grafica} viewBox={`0 0 ${W} ${H}`} role="img" aria-label={`Personas nuevas por día en los últimos ${datos.length} días`}>
      {marcas.map((m) => (
        <g key={m}>
          <line className={m === 0 ? s.eje : s.guia} x1={izq} x2={W} y1={y(m)} y2={y(m)} />
          <text x={izq - 6} y={y(m) + 4} textAnchor="end">{m}</text>
        </g>
      ))}
      {datos.map((d, i) => {
        const x = izq + i * ancho + 1;
        const alto = (H - arriba - abajo) * (d.n / tope);
        const etiqueta = `${corta(d.dia)}: ${d.n} ${d.n === 1 ? "persona nueva" : "personas nuevas"}`;
        return (
          <g key={d.dia} tabIndex={0} aria-label={etiqueta}>
            <title>{etiqueta}</title>
            {/* Zona de cursor más grande que la barra */}
            <rect x={x - 1} y={arriba} width={ancho} height={H - arriba - abajo} fill="transparent" />
            {d.n > 0 && (
              <path className={s.barra2}
                d={`M${x},${y(0)} V${y(0) - alto + 4} q0,-4 4,-4 h${Math.max(0, ancho - 10)} q4,0 4,4 V${y(0)} Z`} />
            )}
          </g>
        );
      })}
      {[0, Math.floor(datos.length / 2), datos.length - 1].map((i, k) => (
        <text key={i} x={k === 0 ? izq : k === 2 ? W : izq + i * ancho + ancho / 2} y={H - 8} textAnchor={k === 0 ? "start" : k === 2 ? "end" : "middle"}>{corta(datos[i].dia)}</text>
      ))}
    </svg>
  );
}

// Ubicación aproximada de cada municipio (centro urbano), solo para el mapa esquemático.
const COORD: Record<string, [number, number]> = {
  Bucaramanga: [7.1254, -73.1198],
  Floridablanca: [7.0622, -73.0864],
  Girón: [7.0731, -73.1681],
  Piedecuesta: [6.9879, -73.0503],
};

/** Mapa aproximado: un círculo por municipio, del tamaño de su número de personas. */
export function Mapa({ datos }: { datos: { municipio: string; n: number }[] }) {
  const W = 420, H = 300, pad = 60;
  const lats = Object.values(COORD).map((c) => c[0]), lngs = Object.values(COORD).map((c) => c[1]);
  const [minLat, maxLat, minLng, maxLng] = [Math.min(...lats), Math.max(...lats), Math.min(...lngs), Math.max(...lngs)];
  const px = (lng: number) => pad + ((lng - minLng) / (maxLng - minLng)) * (W - 2 * pad);
  const py = (lat: number) => pad + ((maxLat - lat) / (maxLat - minLat)) * (H - 2 * pad);
  const max = Math.max(1, ...datos.map((d) => d.n));
  const enMapa = datos.filter((d) => COORD[d.municipio]);
  const otros = datos.filter((d) => !COORD[d.municipio]);
  return (
    <>
      <svg className={s.grafica} viewBox={`0 0 ${W} ${H}`} role="img" aria-label="Mapa aproximado de personas por municipio">
        {Object.entries(COORD).map(([m, [la, ln]]) => {
          const d = enMapa.find((x) => x.municipio === m);
          const r = d ? 10 + 34 * Math.sqrt(d.n / max) : 4;
          return (
            <g key={m} tabIndex={d ? 0 : undefined} aria-label={`${m}: ${d?.n ?? 0} personas`}>
              <title>{`${m}: ${d?.n ?? 0} personas`}</title>
              <circle className={s.burbuja} cx={px(ln)} cy={py(la)} r={r} opacity={d ? 1 : 0.35} />
              <text className={s.ciudad} x={px(ln)} y={py(la) - r - 6} textAnchor="middle">{m}</text>
              {d && <text x={px(ln)} y={py(la) + 4} textAnchor="middle" style={{ fill: "var(--text)", fontWeight: 800, fontSize: 14 }}>{d.n}</text>}
            </g>
          );
        })}
      </svg>
      {otros.length > 0 && <p className={s.ayuda}>Otros municipios: {otros.map((o) => `${o.municipio} (${o.n})`).join(", ")}.</p>}
    </>
  );
}
