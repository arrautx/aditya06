"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";

const TRACK_SRC = "/music/landing.mp3";
const MAX_VOLUME = 0.35;
const FADE_MS = 600;
const STORAGE_KEY = "landing.sound";

/**
 * Check whether the track file exists before wiring up audio.
 *
 * The probe runs inside a throwaway Blob worker because a worker's failed
 * fetch does not surface the browser's "Failed to load resource: 404"
 * console error — so a missing track fails completely silently. If workers
 * are unavailable, fall back to a direct fetch.
 */
async function probeTrack(): Promise<boolean> {
  // Workers resolve relative URLs against their own blob: script URL, so the
  // probe must use an absolute URL.
  const absoluteSrc = new URL(TRACK_SRC, document.baseURI).href;
  try {
    return await new Promise<boolean>((resolve) => {
      const src =
        'onmessage=async(e)=>{try{const r=await fetch(e.data,{method:"HEAD"});postMessage(r.ok)}catch{postMessage(false)}};';
      const url = URL.createObjectURL(new Blob([src], { type: "text/javascript" }));
      const worker = new Worker(url);
      let settled = false;
      const finish = (ok: boolean) => {
        if (settled) return;
        settled = true;
        worker.terminate();
        URL.revokeObjectURL(url);
        resolve(ok);
      };
      worker.onmessage = (ev) => finish(ev.data === true);
      worker.onerror = () => finish(false);
      worker.postMessage(absoluteSrc);
      // Safety net: never block audio setup on a hung worker.
      setTimeout(() => finish(false), 3000);
    });
  } catch {
    try {
      const res = await fetch(absoluteSrc, { method: "HEAD" });
      return res.ok;
    } catch {
      return false;
    }
  }
}

export default function LandingMusic() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const fadeRef = useRef<number | null>(null);
  const [soundOn, setSoundOn] = useState(false);

  /** Smoothly move the audio volume to `target` over FADE_MS. */
  const fadeTo = useCallback((target: number) => {
    const audio = audioRef.current;
    if (!audio) return;

    if (fadeRef.current !== null) cancelAnimationFrame(fadeRef.current);
    const from = audio.volume;
    if (from === target) return;

    const startedAt = performance.now();
    const step = (now: number) => {
      const el = audioRef.current;
      if (!el) return;
      // rAF timestamps can arrive slightly *before* performance.now() taken
      // just before scheduling (frame time vs. call time), which would make
      // progress negative and push volume below 0 — clamp to [0, 1].
      const progress = Math.min(1, Math.max(0, (now - startedAt) / FADE_MS));
      el.volume = from + (target - from) * progress;
      if (progress < 1) {
        fadeRef.current = requestAnimationFrame(step);
      } else {
        el.volume = target;
        fadeRef.current = null;
      }
    };
    fadeRef.current = requestAnimationFrame(step);
  }, []);

  useEffect(() => {
    let disposed = false;
    let audio: HTMLAudioElement | null = null;
    let pointerHandler: (() => void) | null = null;
    let pointerSeen = false;

    // Fade in (and unlock autoplay if the browser blocked the muted start)
    // only when the user has opted in via the stored preference.
    const applyStoredPref = () => {
      let enabled = false;
      try {
        enabled = window.localStorage.getItem(STORAGE_KEY) === "1";
      } catch {
        return;
      }
      if (!enabled) return;
      audio?.play().catch(() => {});
      fadeTo(MAX_VOLUME);
    };

    // First gesture after mount is what unlocks audible playback.
    pointerHandler = () => {
      pointerSeen = true;
      applyStoredPref();
    };
    window.addEventListener("pointerdown", pointerHandler, { once: true });

    (async () => {
      // A missing track must fail silently — no audio element is created.
      if (!(await probeTrack()) || disposed) return;

      audio = new Audio(TRACK_SRC);
      audio.loop = true;
      audio.volume = 0; // start muted — nothing is audible until a fade-in
      audioRef.current = audio;

      // Begin playback immediately. Browsers that block this (no gesture
      // yet) reject the promise; we silently retry on the first pointerdown.
      audio.play().catch(() => {});

      let enabled = false;
      try {
        enabled = window.localStorage.getItem(STORAGE_KEY) === "1";
      } catch {}
      setSoundOn(enabled);

      // If the user interacted before the audio was ready, honor it now.
      if (pointerSeen) applyStoredPref();
    })();

    return () => {
      disposed = true;
      if (pointerHandler) {
        window.removeEventListener("pointerdown", pointerHandler);
      }
      if (fadeRef.current !== null) {
        cancelAnimationFrame(fadeRef.current);
        fadeRef.current = null;
      }
      if (audio) {
        audio.pause();
        audio.removeAttribute("src");
        audio.load(); // abort any in-flight buffering and release the resource
        audioRef.current = null;
      }
    };
  }, [fadeTo]);

  const handleToggle = () => {
    const next = !soundOn;
    setSoundOn(next);
    try {
      window.localStorage.setItem(STORAGE_KEY, next ? "1" : "0");
    } catch {}

    const audio = audioRef.current;
    if (!audio) return;
    if (next) {
      audio.play().catch(() => {});
      fadeTo(MAX_VOLUME);
    } else {
      fadeTo(0);
    }
  };

  return (
    <button
      type="button"
      onClick={handleToggle}
      aria-label={soundOn ? "Mute background music" : "Unmute background music"}
      aria-pressed={soundOn}
      title={soundOn ? "Mute background music" : "Unmute background music"}
      className="fixed bottom-20 right-6 z-40 size-11 rounded-full border border-border bg-card/90 backdrop-blur-sm text-muted-foreground hover:text-foreground hover:border-border-strong transition-all duration-300 inline-flex items-center justify-center"
    >
      {soundOn ? (
        <Volume2 className="size-5" />
      ) : (
        <VolumeX className="size-5" />
      )}
    </button>
  );
}
