"use client";

import { useEffect, useState } from "react";
import * as THREE from "three";

/**
 * Библиотечные PBR-модели (стеллаж, погрузчик, ленточный конвейер) из пакета Kimi Design Asset Library.
 * Лежат в public/assets/library/<id>/ как самостоятельные ES-модули Three.js; грузятся по требованию,
 * не попадают в бандл. Если загрузка не удалась (старый браузер без DecompressionStream, сеть),
 * вызывающий компонент показывает процедурную замену — сцена не пустеет.
 */
type AssetId = "shelf" | "forklift" | "conveyor";

interface AssetModule {
  createAsset: (three: typeof THREE, options: Record<string, unknown>) => Promise<THREE.Group & { dispose?: () => Promise<void> }>;
}

interface PlaceOptions {
  /** Целевой горизонтальный габарит, м (вдоль axis). */
  targetLen?: number;
  /** Целевая высота, м (если не задан targetLen). */
  targetH?: number;
  axis?: "x" | "z";
  params?: Record<string, number>;
  state?: string;
}

const moduleCache = new Map<AssetId, Promise<AssetModule>>();

function importAsset(id: AssetId): Promise<AssetModule> {
  let p = moduleCache.get(id);
  if (!p) {
    const url = new URL(`/assets/library/${id}/asset.mjs`, window.location.origin).href;
    p = import(/* webpackIgnore: true */ /* turbopackIgnore: true */ url) as Promise<AssetModule>;
    p.catch(() => moduleCache.delete(id));
    moduleCache.set(id, p);
  }
  return p;
}

/** Загружает ассет и оборачивает в группу размещения: низ на y = 0, центр по XZ, заданный габарит. */
async function loadPlaced(id: AssetId, opts: PlaceOptions) {
  const mod = await importAsset(id);
  const root = await mod.createAsset(THREE, {
    states: "lazy",
    sharedResources: true,
    ...(opts.params ? { params: opts.params } : {}),
    ...(opts.state ? { state: opts.state } : {}),
  });
  const placement = new THREE.Group();
  placement.add(root);
  const size = new THREE.Box3().setFromObject(root).getSize(new THREE.Vector3());
  const horiz = opts.axis === "z" ? size.z : size.x;
  let k = 1;
  if (opts.targetLen && horiz > 1e-4) k = opts.targetLen / horiz;
  else if (opts.targetH && size.y > 1e-4) k = opts.targetH / size.y;
  placement.scale.setScalar(k);
  const bb = new THREE.Box3().setFromObject(placement);
  const c = bb.getCenter(new THREE.Vector3());
  root.position.x -= c.x / k;
  root.position.z -= c.z / k;
  root.position.y -= bb.min.y / k;
  placement.traverse((o) => {
    if ((o as THREE.Mesh).isMesh) {
      o.castShadow = true;
      o.receiveShadow = true;
    }
  });
  const footprint = new THREE.Box3().setFromObject(placement).getSize(new THREE.Vector3());
  return { placement, root, footprint };
}

export type LibraryState = "loading" | "ready" | "failed";

/** Хук загрузки одного библиотечного ассета; при размонтировании ресурсы освобождаются. */
export function useLibraryAsset(id: AssetId, opts: PlaceOptions) {
  const [state, setState] = useState<{ status: LibraryState; object?: THREE.Group; footprint?: THREE.Vector3 }>({ status: "loading" });
  const key = JSON.stringify(opts);
  useEffect(() => {
    let alive = true;
    let loaded: Awaited<ReturnType<typeof loadPlaced>> | null = null;
    if (typeof window === "undefined" || typeof DecompressionStream === "undefined") {
      setState({ status: "failed" });
      return;
    }
    loadPlaced(id, JSON.parse(key) as PlaceOptions)
      .then((r) => {
        loaded = r;
        if (alive) setState({ status: "ready", object: r.placement, footprint: r.footprint });
        else void r.root.dispose?.();
      })
      .catch((e: unknown) => {
        console.warn(`Библиотечная модель «${id}» не загрузилась, показана процедурная замена.`, e);
        if (alive) setState({ status: "failed" });
      });
    return () => {
      alive = false;
      if (loaded) void loaded.root.dispose?.();
    };
  }, [id, key]);
  return state;
}

const SHELF_OPTS: PlaceOptions = { targetH: 3.9, axis: "x", params: { width: 1.3, depth: 0.55, height: 2.05, shelf_lip: 0.03 } };
const BELT_OPTS: PlaceOptions = { targetLen: 3.4, axis: "x" };

/** Клон с общими геометриями и материалами (ресурсы освобождает исходный ассет). */
function Clone({ object, position, rotationY = 0 }: { object: THREE.Group; position: [number, number, number]; rotationY?: number }) {
  const [clone] = useState(() => object.clone(true));
  return <primitive object={clone} position={position} rotation={[0, rotationY, 0]} />;
}

/**
 * Склад запаса у задней стены за зоной приёмки A1 (z ≈ −15,5) и подающая лента отгрузки за зоной E1.
 * Это декорация: в модели склад и отгрузка описаны мощностью участков, а не числом стеллажей.
 */
export function LibraryScenery() {
  const shelf = useLibraryAsset("shelf", SHELF_OPTS);
  const belt = useLibraryAsset("conveyor", BELT_OPTS);
  const shelfStep = shelf.footprint ? shelf.footprint.x + 0.15 : 0;
  const shelfCount = shelfStep > 0 ? Math.min(8, Math.floor(10.5 / shelfStep)) : 0;
  return (
    <group dispose={null}>
      {shelf.status === "ready" && shelf.object &&
        Array.from({ length: shelfCount }, (_, i) => (
          <Clone key={`shelf-${i}`} object={shelf.object!} position={[-31 + shelfStep / 2 + i * shelfStep, 0, -15.6]} />
        ))}
      {belt.status === "ready" && belt.object &&
        [0, 1, 2].map((i) => <Clone key={`belt-${i}`} object={belt.object!} position={[25.6 + i * 3.45, 0, -13.6]} />)}
    </group>
  );
}
