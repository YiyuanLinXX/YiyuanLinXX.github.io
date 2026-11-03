"use client";

import { useEffect, useMemo, useRef, useState } from "react";

export type RobotDemo = {
  id: string;
  date: string;
  date_label: string;
  category: string;
  tag: string;
  title: string;
  organization: string;
  location: string;
  summary: string;
  image: string;
  image_alt: string;
  image_credit: string;
  robots: string[];
  sources: Array<{ label: string; url: string }>;
};

const autoplayDelay = 3000;

export function RobotDemoCarousel({ items }: { items: RobotDemo[] }) {
  const demos = useMemo(() => [...items].sort((a, b) => b.date.localeCompare(a.date)), [items]);
  const [index, setIndex] = useState(0);
  const [stopped, setStopped] = useState(false);
  const [temporarilyPaused, setTemporarilyPaused] = useState(false);
  const [documentHidden, setDocumentHidden] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updatePreference = () => setReducedMotion(media.matches);
    updatePreference();
    media.addEventListener("change", updatePreference);
    return () => media.removeEventListener("change", updatePreference);
  }, []);

  useEffect(() => {
    const updateVisibility = () => setDocumentHidden(document.hidden);
    document.addEventListener("visibilitychange", updateVisibility);
    return () => document.removeEventListener("visibilitychange", updateVisibility);
  }, []);

  useEffect(() => {
    if (demos.length < 2 || stopped || temporarilyPaused || documentHidden || reducedMotion) return;
    const timer = window.setInterval(() => setIndex((current) => (current + 1) % demos.length), autoplayDelay);
    return () => window.clearInterval(timer);
  }, [demos.length, documentHidden, reducedMotion, stopped, temporarilyPaused]);

  if (demos.length === 0) return null;

  const select = (next: number) => {
    setStopped(true);
    setIndex((next + demos.length) % demos.length);
  };

  const stopAutoplay = () => setStopped(true);

  return (
    <section
      className="demo-showcase"
      aria-labelledby="demo-showcase-title"
      onMouseEnter={() => setTemporarilyPaused(true)}
      onMouseLeave={() => setTemporarilyPaused(false)}
      onFocusCapture={() => setTemporarilyPaused(true)}
      onBlurCapture={(event) => {
        if (!rootRef.current?.contains(event.relatedTarget as Node | null)) setTemporarilyPaused(false);
      }}
      onPointerDown={stopAutoplay}
      ref={rootRef}
    >
      <div className="demo-showcase-heading">
        <div>
          <p className="section-kicker">Robotics in the Field</p>
          <h2 id="demo-showcase-title">Robot Demonstrations &amp; Visits</h2>
          <p>Field demonstrations, institutional visits, deployments, and selected media coverage.</p>
        </div>
        <div className="demo-carousel-controls" aria-label="Demonstration carousel controls">
          <button type="button" onClick={() => select(index - 1)} aria-label="Show previous demonstration">←</button>
          <span aria-live="polite">{index + 1} / {demos.length}</span>
          <button type="button" onClick={() => select(index + 1)} aria-label="Show next demonstration">→</button>
        </div>
      </div>

      <div className="demo-carousel-viewport">
        <div className="demo-carousel-track" style={{ transform: `translateX(-${index * 100}%)` }}>
          {demos.map((demo, demoIndex) => {
            const primarySources = demo.sources.slice(0, 3);
            const additionalSources = demo.sources.slice(3);

            return (
              <article className="demo-card" key={demo.id} aria-hidden={demoIndex !== index} inert={demoIndex !== index}>
                <div className="demo-card-media">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={demo.image} alt={demo.image_alt} loading={demoIndex === 0 ? "eager" : "lazy"} />
                  <div className="demo-card-badges">
                    <span>{demo.category}</span>
                    <span>{demo.date.slice(0, 4)}</span>
                  </div>
                  <small>Photo: {demo.image_credit}</small>
                </div>

                <div className="demo-card-body">
                  <p className="demo-card-meta">{demo.date_label} · {demo.tag}</p>
                  <h3>{demo.title}</h3>
                  <p className="demo-card-organization">{demo.organization}</p>
                  <p className="demo-card-location">{demo.location}</p>
                  <p className="demo-card-summary">{demo.summary}</p>
                  <div className="demo-card-robots" aria-label="Related robots and topics">
                    {demo.robots.map((robot) => <span key={robot}>{robot}</span>)}
                  </div>
                  <div className="demo-card-sources" aria-label="External sources">
                    {primarySources.map((source) => (
                      <a href={source.url} key={source.url} target="_blank" rel="noopener noreferrer">{source.label}<span aria-hidden="true">↗</span></a>
                    ))}
                    {additionalSources.length > 0 ? (
                      <details onToggle={stopAutoplay}>
                        <summary>More coverage ({additionalSources.length})</summary>
                        <div>
                          {additionalSources.map((source) => (
                            <a href={source.url} key={source.url} target="_blank" rel="noopener noreferrer">{source.label}<span aria-hidden="true">↗</span></a>
                          ))}
                        </div>
                      </details>
                    ) : null}
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>

      <div className="demo-carousel-progress" aria-label="Choose a demonstration">
        {demos.map((demo, demoIndex) => (
          <button
            type="button"
            className={demoIndex === index ? "is-active" : ""}
            key={demo.id}
            onClick={() => select(demoIndex)}
            aria-label={`Show item ${demoIndex + 1}`}
          />
        ))}
      </div>
      <p className="demo-carousel-status">{stopped || reducedMotion ? "Manual navigation" : "Advances every 3 seconds · interact to pause"}</p>
    </section>
  );
}
