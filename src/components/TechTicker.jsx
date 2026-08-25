import React from "react";
import { techLogos } from "../data/techLogos";
import TiltIcon from "./TiltIcon";

function TechTicker() {
  const row = [...techLogos, ...techLogos];

  return (
    <div
      aria-hidden="true"
      className="relative overflow-hidden border-y border-white/[0.06] bg-white/[0.015] py-5 [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]"
    >
      <div className="flex w-max ticker-track">
        {row.map((logo, i) => (
          <span key={`${logo.name}-${i}`} className="flex items-center gap-4 pr-12 shrink-0">
            <TiltIcon logo={logo} size={44} iconSize={22} />
            <span className="font-display text-xs font-semibold uppercase tracking-[0.2em] text-slate-500 whitespace-nowrap">
              {logo.name}
            </span>
            <span className="h-1.5 w-1.5 rotate-45 bg-gradient-to-br from-cyan-400/50 to-violet-500/50 shrink-0 ml-6" />
          </span>
        ))}
      </div>
    </div>
  );
}

export default TechTicker;
