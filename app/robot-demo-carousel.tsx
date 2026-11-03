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
  sources: Array<{ label: string; url: string }>;
};

const autoplayDelay = 3000;

export function RobotDemoCarousel({ items }: { items: RobotDemo[] }) {
  const demos = useMemo(() => [...items].sort((a, b) => b.date.localeCompare(a.date)), [items]);
  const [index, setIndex] = useState(0);
  const [trackIndex, setTrackIndex] = useState(items.length > 1 ? 1 : 0);
  const [transitionEnabled, setTransitionEnabled] = useState(true);
  const [stopped, setStopped] = useState(false);
  const [temporarilyPaused, setTemporarilyPaused] = useState(false);
  const [documentHidden, setDocumentHidden] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const rootRef = useRef<HTMLElement>(null);
  const movingRef = useRef(false);

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
    const timer = window.setInterval(() => {
      if (movingRef.current) return;
      movingRef.current = true;
      setIndex((current) => (current + 1) % demos.length);
      setTrackIndex((current) => current + 1);
    }, autoplayDelay);
    return () => window.clearInterval(timer);
  }, [demos.length, documentHidden, reducedMotion, stopped, temporarilyPaused]);

  if (demos.length === 0) return null;

  const move = (direction: -1 | 1) => {
    setStopped(true);
    if (movingRef.current) return;

    const next = (index + direction + demos.length) % demos.length;
    setIndex(next);
    if (reducedMotion || demos.length < 2) {
      setTrackIndex(demos.length > 1 ? next + 1 : next);
      return;
    }

    movingRef.current = true;
    setTrackIndex((current) => current + direction);
  };

  const select = (next: number) => {
    setStopped(true);
    if (next === index || movingRef.current) return;
    setIndex(next);
    setTrackIndex(demos.length > 1 ? next + 1 : next);
    if (!reducedMotion) movingRef.current = true;
  };

  const stopAutoplay = () => setStopped(true);
  const loopedDemos = demos.length > 1 ? [demos[demos.length - 1], ...demos, demos[0]] : demos;

  const finishTransition = () => {
    if (demos.length < 2) return;
    if (trackIndex === 0 || trackIndex === demos.length + 1) {
      setTransitionEnabled(false);
      setTrackIndex(trackIndex === 0 ? demos.length : 1);
      window.requestAnimationFrame(() => {
        window.requestAnimationFrame(() => {
          setTransitionEnabled(true);
          movingRef.current = false;
        });
      });
      return;
    }
    movingRef.current = false;
  };

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
          <h2 id="demo-showcase-title">Outreach, Extension &amp; Robot Demos</h2>
          <p>Field demonstrations, extension activities, institutional visits, and selected media coverage.</p>
        </div>
        <div className="demo-carousel-controls" aria-label="Demonstration carousel controls">
          <button type="button" onClick={() => move(-1)} aria-label="Show previous demonstration">←</button>
          <span aria-live="polite">{index + 1} / {demos.length}</span>
          <button type="button" onClick={() => move(1)} aria-label="Show next demonstration">→</button>
        </div>
      </div>

      <div className="demo-carousel-viewport">
        <div
          className="demo-carousel-track"
          style={{ transform: `translateX(-${trackIndex * 100}%)`, transition: transitionEnabled ? undefined : "none" }}
          onTransitionEnd={(event) => {
            if (event.target === event.currentTarget && event.propertyName === "transform") finishTransition();
          }}
        >
          {loopedDemos.map((demo, slideIndex) => (
              <article className="demo-card" key={`${demo.id}-${slideIndex}`} aria-hidden={slideIndex !== trackIndex} inert={slideIndex !== trackIndex}>
                <div className="demo-card-media">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={demo.image} alt={demo.image_alt} loading={slideIndex === 1 ? "eager" : "lazy"} />
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
                  <div className="demo-card-coverage">
                    <h4>News, Media &amp; Related Posts</h4>
                    <div className="demo-card-sources" aria-label="External sources">
                      {demo.sources.map((source) => (
                        <a href={source.url} key={source.url} target="_blank" rel="noopener noreferrer">{source.label}<span aria-hidden="true">↗</span></a>
                      ))}
                    </div>
                  </div>
                </div>
              </article>
          ))}
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
