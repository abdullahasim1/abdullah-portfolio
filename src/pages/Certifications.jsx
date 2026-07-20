import React, { useState } from "react";
import { useScrollReveal, useStaggerAnimation } from "../hooks";
import { certifications } from "../data/certifications";
import GlowCard from "../components/GlowCard";

function CertImage({ src, alt, badgeStyle = false, className = "" }) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div className={`flex items-center justify-center bg-gradient-to-br from-indigo-500/20 to-fuchsia-500/10 ${className}`}>
        <span className="text-4xl">🎓</span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      className={`${badgeStyle ? "object-contain p-4" : "object-cover"} ${className}`}
      loading="lazy"
      onError={() => setFailed(true)}
    />
  );
}

function Certifications() {
  useScrollReveal("#certifications .reveal");
  const staggerRef = useStaggerAnimation(0.08, 0.2);

  const featured = certifications.find((c) => c.featured);
  const others = certifications.filter((c) => !c.featured);

  return (
    <section id="certifications" className="py-24">
      <div className="max-w-6xl mx-auto">
        <div className="mb-12 text-center">
          <span className="inline-flex items-center gap-2 text-lg font-bold uppercase tracking-widest text-gray-600 dark:text-gray-400">
            <span className="h-[2px] w-6 bg-gradient-to-r from-indigo-500 to-fuchsia-500" />
            Certifications
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold mt-2">
            Credentials & Learning
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mt-4 max-w-2xl mx-auto">
            AWS Professional & AI credentials plus Anthropic and partner training — verified learning
            across cloud and generative AI.
          </p>
        </div>

        {featured && (
          <div className="reveal mb-12">
            <GlowCard>
              <div className="flex flex-col md:flex-row overflow-hidden rounded-2xl">
                <div className="md:w-2/5 relative min-h-[240px] md:min-h-[300px] bg-gradient-to-br from-sky-500/15 to-cyan-600/10 flex items-center justify-center">
                  <CertImage
                    src={featured.image}
                    alt={featured.title}
                    badgeStyle={featured.badgeStyle}
                    className="w-full h-full max-h-[300px] min-h-[240px]"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-sky-600 text-white shadow-lg">
                      AWS Professional
                    </span>
                  </div>
                </div>
                <div className="md:w-3/5 p-8 flex flex-col justify-center">
                  <p className="text-sm font-semibold text-sky-600 dark:text-sky-400 uppercase tracking-wider mb-2">
                    {featured.issuer}
                  </p>
                  <h3 className="text-2xl md:text-3xl font-extrabold text-gray-900 dark:text-white mb-3">
                    {featured.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-5">
                    {featured.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {featured.skills.map((skill) => (
                      <span
                        key={skill}
                        className="px-3 py-1 rounded-full text-xs font-medium bg-sky-50 text-sky-700 dark:bg-sky-900/30 dark:text-sky-300 border border-sky-200/50 dark:border-sky-800/50"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-sm text-gray-500">{featured.date}</span>
                    {featured.credentialUrl && featured.credentialUrl !== "#" && (
                      <a
                        href={featured.credentialUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-gradient-to-r from-sky-500 to-cyan-600 text-white text-sm font-medium hover:opacity-90 transition-opacity"
                      >
                        Verify Credential
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </GlowCard>
          </div>
        )}

        <div ref={staggerRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {others.map((cert) => (
            <div key={cert.id} data-stagger className="reveal h-full">
              <GlowCard className="h-full">
                <div className="h-full flex flex-col overflow-hidden rounded-2xl">
                  <div
                    className={`h-44 flex items-center justify-center ${
                      cert.badgeStyle
                        ? "bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-950"
                        : `bg-gradient-to-br ${cert.color}`
                    }`}
                  >
                    {cert.image ? (
                      <CertImage
                        src={cert.image}
                        alt={cert.title}
                        badgeStyle={cert.badgeStyle}
                        className="w-full h-44"
                      />
                    ) : (
                      <span className="text-4xl">🎓</span>
                    )}
                  </div>
                  <div className="p-5 flex flex-col flex-grow">
                    <h3 className="text-base font-bold text-gray-900 dark:text-white mb-1 leading-snug">
                      {cert.title}
                    </h3>
                    <p className="text-sm font-medium text-indigo-600 dark:text-indigo-400 mb-3">
                      {cert.issuer}
                    </p>
                    <div className="flex flex-wrap gap-1.5 mb-4 flex-grow">
                      {cert.skills.map((skill) => (
                        <span
                          key={skill}
                          className="px-2 py-0.5 rounded text-xs bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-300"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                    <div className="flex items-center justify-between pt-4 border-t border-gray-200/60 dark:border-gray-700/60 mt-auto">
                      <span className="text-xs text-gray-500 dark:text-gray-400">{cert.date}</span>
                      {cert.credentialUrl && cert.credentialUrl !== "#" ? (
                        <a
                          href={cert.credentialUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs font-medium text-indigo-600 dark:text-indigo-400 hover:underline"
                        >
                          View Credential
                        </a>
                      ) : (
                        <span className="text-xs text-gray-400">Completed</span>
                      )}
                    </div>
                  </div>
                </div>
              </GlowCard>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Certifications;
