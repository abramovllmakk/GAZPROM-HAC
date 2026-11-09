/**
 * Категориальная палитра графиков для светлой поверхности (#fff).
 * Проверена валидатором палитр (dataviz): яркость, насыщенность, различимость соседних пар
 * при дальтонизме (ΔE ≥ 13) и контраст ≥ 3:1. Порядок фиксирован: базовый, альтернатива 1, 2, 3.
 */
export const SERIES_COLORS = ["#0876bd", "#c2577f", "#7c6bd6", "#5f6f82"] as const;

export const CHART = {
  grid: "#e0e9f1",
  axis: "#b6c8d7",
  text: "#526b84",
  ink: "#10263d",
  surface: "#ffffff",
  accent: "#0876bd",
} as const;

export const tooltipStyle = {
  contentStyle: {
    background: "#ffffff",
    border: "1px solid #d7e1eb",
    borderRadius: 8,
    color: "#10263d",
    fontSize: 13,
    boxShadow: "0 6px 20px #10263d1a",
  },
  labelStyle: { color: "#526b84", marginBottom: 4 },
  itemStyle: { color: "#10263d" },
  cursor: { fill: "#0876bd10", stroke: "#0876bd", strokeWidth: 1 },
} as const;
