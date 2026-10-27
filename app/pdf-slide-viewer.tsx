"use client";

import { useEffect, useRef, useState } from "react";
import type { PDFDocumentProxy, RenderTask } from "pdfjs-dist";
import pdfWorkerUrl from "pdfjs-dist/build/pdf.worker.min.mjs?url";

export function PdfSlideViewer({ src, title }: { src: string; title: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const [document, setDocument] = useState<PDFDocumentProxy | null>(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [pageCount, setPageCount] = useState(0);
  const [stageWidth, setStageWidth] = useState(0);
  const [zoom, setZoom] = useState(1);
  const [status, setStatus] = useState("Loading slides…");

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;

    const observer = new ResizeObserver(([entry]) => setStageWidth(entry.contentRect.width));
    observer.observe(stage);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    let active = true;
    let loadedDocument: PDFDocumentProxy | null = null;

    async function loadDocument() {
      try {
        const pdfjs = await import("pdfjs-dist");
        pdfjs.GlobalWorkerOptions.workerSrc = pdfWorkerUrl;
        loadedDocument = await pdfjs.getDocument(src).promise;
        if (!active) return;
        setDocument(loadedDocument);
        setPageCount(loadedDocument.numPages);
        setStatus("");
      } catch {
        if (active) setStatus("The slide preview could not be loaded. Please open the PDF full screen instead.");
      }
    }

    void loadDocument();
    return () => {
      active = false;
      void loadedDocument?.destroy();
    };
  }, [src]);

  useEffect(() => {
    if (!document || !canvasRef.current || stageWidth === 0) return;

    let renderTask: RenderTask | null = null;
    let active = true;

    async function renderPage() {
      const page = await document!.getPage(pageNumber);
      if (!active || !canvasRef.current) return;

      const baseViewport = page.getViewport({ scale: 1 });
      const availableWidth = Math.max(stageWidth - 32, 280);
      const cssScale = (availableWidth / baseViewport.width) * zoom;
      const pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
      const renderViewport = page.getViewport({ scale: cssScale * pixelRatio });
      const canvas = canvasRef.current;

      canvas.width = Math.floor(renderViewport.width);
      canvas.height = Math.floor(renderViewport.height);
      canvas.style.width = `${Math.floor(renderViewport.width / pixelRatio)}px`;
      canvas.style.height = `${Math.floor(renderViewport.height / pixelRatio)}px`;
      renderTask = page.render({ canvas, viewport: renderViewport });
      await renderTask.promise;
    }

    void renderPage().catch((error: unknown) => {
      if (active && !(error instanceof Error && error.name === "RenderingCancelledException")) {
        setStatus("This page could not be rendered. Please open the PDF full screen instead.");
      }
    });

    return () => {
      active = false;
      renderTask?.cancel();
    };
  }, [document, pageNumber, stageWidth, zoom]);

  return (
    <div className="pdf-slide-viewer">
      <div className="pdf-slide-toolbar" aria-label="Slide controls">
        <div className="pdf-slide-pagination">
          <button type="button" onClick={() => setPageNumber((page) => Math.max(1, page - 1))} disabled={pageNumber <= 1} aria-label="Previous slide">←</button>
          <span aria-live="polite">Page {pageNumber}{pageCount ? ` of ${pageCount}` : ""}</span>
          <button type="button" onClick={() => setPageNumber((page) => Math.min(pageCount, page + 1))} disabled={!pageCount || pageNumber >= pageCount} aria-label="Next slide">→</button>
        </div>
        <div className="pdf-slide-zoom">
          <button type="button" onClick={() => setZoom((value) => Math.max(.75, value - .25))} disabled={zoom <= .75} aria-label="Zoom out">−</button>
          <span>{Math.round(zoom * 100)}%</span>
          <button type="button" onClick={() => setZoom((value) => Math.min(2, value + .25))} disabled={zoom >= 2} aria-label="Zoom in">+</button>
        </div>
      </div>
      <div className="pdf-slide-stage" ref={stageRef}>
        {status ? <p className="pdf-slide-status">{status}</p> : null}
        <canvas ref={canvasRef} aria-label={`${title}, page ${pageNumber} of ${pageCount || "unknown"}`} />
      </div>
    </div>
  );
}
