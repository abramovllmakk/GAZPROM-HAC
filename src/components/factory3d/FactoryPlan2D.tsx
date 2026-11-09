"use client";

import type { StationId } from "@/domain/model/demoData";
import { selectStation, useSelection } from "@/store/selection";
import { CONVEYORS, HALL, SCENE_STATUS_COLOR, STATION_LAYOUT } from "./sceneContract";
import type { StationSceneData } from "./StationAnchor";

/**
 * Упрощённый план цеха (вид сверху) по тем же координатам сцены.
 * Используется как резервный режим без WebGL и как облегчённый режим на слабых устройствах.
 */
export function FactoryPlan2D({ stations }: { stations: StationSceneData[] }) {
  const selected = useSelection((s) => s.selectedStationId);
  const pad = 1;
  const vb = `${-HALL.width / 2 - pad} ${-HALL.depth / 2 - pad} ${HALL.width + 2 * pad} ${HALL.depth + 2 * pad}`;
  return (
    <svg viewBox={vb} className="h-full w-full" role="group" aria-label="План цеха, вид сверху" data-testid="factory-plan-2d">
      <rect x={-HALL.width / 2} y={-HALL.depth / 2} width={HALL.width} height={HALL.depth} fill="#f7fbfd" stroke="#b8c9da" strokeWidth={0.3} />
      {CONVEYORS.map((c) => (
        <line key={c.id} x1={c.from[0]} y1={c.from[2]} x2={c.to[0]} y2={c.to[2]} stroke="#9bb5ca" strokeWidth={1} strokeLinecap="round" />
      ))}
      {stations.map((s) => {
        const l = STATION_LAYOUT[s.stationId];
        const [w, d] = l.footprint;
        const color = SCENE_STATUS_COLOR[s.status ?? "none"];
        const isSel = selected === s.stationId;
        const q = Math.min(14, Math.round(s.queue));
        const x = l.position[0] - w / 2 + 0.8;
        const y = l.position[2] - d / 2;
        return (
          <g
            key={s.stationId}
            role="button"
            tabIndex={0}
            aria-pressed={isSel}
            data-station-id={s.stationId}
            aria-label={`${s.code} ${s.shortName}`}
            onClick={() => selectStation(s.stationId as StationId)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                selectStation(s.stationId as StationId);
              }
            }}
            className="cursor-pointer outline-none"
          >
            <rect
              x={l.position[0] - w / 2}
              y={l.position[2] - d / 2}
              width={w}
              height={d}
              rx={0.6}
              fill={isSel ? "#e2f2fb" : "#ffffff"}
              stroke={isSel ? "#0876bd" : color}
              strokeWidth={isSel ? 0.55 : 0.3}
            />
            <text x={x} y={y + 2.2} fill="#0876bd" fontSize={1.35} fontWeight={700}>
              {s.code}
            </text>
            <text x={x} y={y + 4.2} fill="#10263d" fontSize={1.05} fontWeight={600}>
              {s.shortName}
            </text>
            <text x={x} y={y + 6.1} fill="#526b84" fontSize={0.98}>
              Загрузка {s.utilization !== null ? `${(s.utilization * 100).toFixed(0)}%` : "—"}
            </text>
            <text x={x} y={y + 7.4} fill="#526b84" fontSize={0.86}>
              Очередь {Math.round(s.queue)} · ресурс {s.capacity}
            </text>
            <circle cx={l.position[0] + w / 2 - 1.2} cy={l.position[2] - d / 2 + 1.4} r={0.6} fill={color} />
            {Array.from({ length: q }).map((_, i) => (
              <rect
                key={i}
                x={l.position[0] + l.queueOffset[0] + l.queueDirection[0] * (i % 7) * 1.05 - 0.4}
                y={l.position[2] + l.queueOffset[2] + Math.floor(i / 7) * 1.1 - 0.4}
                width={0.8}
                height={0.8}
                rx={0.15}
                fill="#8a98a8"
              />
            ))}
          </g>
        );
      })}
    </svg>
  );
}
