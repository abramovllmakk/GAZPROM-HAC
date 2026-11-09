import type { StationStatus } from "@/domain/analysis/bottleneck";

/** Цвета состояния участка — зарезервированы, не используются для серий графиков. */
export const STATUS_COLOR: Record<StationStatus, string> = {
  normal: "#168267",
  high: "#a76808",
  critical: "#bd3f35",
};

export const STATUS_TEXT_CLASS: Record<StationStatus, string> = {
  normal: "text-ok",
  high: "text-warn",
  critical: "text-crit",
};
