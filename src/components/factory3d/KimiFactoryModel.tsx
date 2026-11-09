"use client";

import { useState } from "react";

/**
 * Детальная 3D-модель цеха, сделанная в Kimi (Three.js + Vite): процедурное оборудование, PBR-ассеты
 * стеллажей, погрузчика и ленточного конвейера, анимированный поток насосов и экскурсия из 7 остановок.
 * Собрана статически в public/kimi-tour/ и показывается во фрейме того же сайта.
 * Метрики в ней — демонстрационные (базовый сценарий), с расчётами прогонов не связаны.
 */
export function KimiFactoryModel() {
  const [loaded, setLoaded] = useState(false);
  return (
    <section className="panel-surface mb-6 overflow-hidden rounded-[var(--radius-panel)] border border-line bg-surface">
      <header className="flex flex-wrap items-center justify-between gap-3 border-b border-line px-4 py-3">
        <div>
          <h2 className="text-[15px] font-semibold">3D-модель цеха</h2>
          <p className="text-xs text-muted">Детальная сцена: оборудование, поток изделий, экскурсия по участкам. Метрики в сцене демонстрационные.</p>
        </div>
        <a href="/kimi-tour/index.html" target="_blank" rel="noopener" className="rounded-[var(--radius-control)] border border-line px-3 py-1.5 text-sm font-medium text-accent-strong hover:border-accent">
          Открыть на весь экран
        </a>
      </header>
      <div className="relative h-[min(72vh,680px)] min-h-[420px] bg-[#0d1117]">
        {!loaded && <p className="absolute inset-0 grid place-items-center text-sm text-[#8b98a9]">Загрузка модели цеха…</p>}
        <iframe
          src="/kimi-tour/index.html"
          title="3D-модель цеха"
          className="absolute inset-0 h-full w-full border-0"
          allow="fullscreen"
          onLoad={() => setLoaded(true)}
        />
      </div>
    </section>
  );
}
