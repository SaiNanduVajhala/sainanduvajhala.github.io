import React, { useState, useEffect, useRef, useCallback } from 'react';
import * as pdfjsLib from 'pdfjs-dist';
import { DownloadIcon, ExternalLinkIcon, XIcon } from './Icons';

// Set up PDF.js worker using CDN fallback to ensure 100% reliability on mobile devices
pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.mjs`;

interface ResumeViewerProps {
  onClose: () => void;
}

export const ResumeViewer: React.FC<ResumeViewerProps> = ({ onClose }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [zoomScale, setZoomScale] = useState<number>(1.0);
  const overlayRef = useRef<HTMLDivElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const canvasContainerRef = useRef<HTMLDivElement>(null);

  // Trigger GPU slide-up animation after mount
  useEffect(() => {
    const animationFrame = requestAnimationFrame(() => {
      setIsVisible(true);
    });

    return () => {
      cancelAnimationFrame(animationFrame);
    };
  }, []);

  const handleClose = useCallback(() => {
    setIsVisible(false);
    setTimeout(() => {
      onClose();
    }, 220);
  }, [onClose]);

  // Handle ESC key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleClose]);

  // Handle Desktop Backdrop Click
  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === overlayRef.current && window.innerWidth >= 768) {
      handleClose();
    }
  };

  // Render PDF pages cleanly onto HTML5 Canvases using PDF.js
  useEffect(() => {
    let isCancelled = false;

    const renderPDF = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const pdfPath = '/Vajhala_Sai_Nandu_AI_ML_Engineer_Resume.pdf';
        const loadingTask = pdfjsLib.getDocument({ url: pdfPath });
        const pdf = await loadingTask.promise;

        if (isCancelled || !canvasContainerRef.current) return;

        // Clear previous canvas renders
        canvasContainerRef.current.innerHTML = '';

        const containerWidth = viewportRef.current
          ? Math.min(viewportRef.current.clientWidth - 32, 900)
          : 800;

        for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
          if (isCancelled) break;

          const page = await pdf.getPage(pageNum);
          const unscaledViewport = page.getViewport({ scale: 1.0 });

          // Calculate responsive scale factor
          const baseScale = containerWidth / unscaledViewport.width;
          const scale = baseScale * zoomScale;
          const viewport = page.getViewport({ scale });

          // Support retina & high-DPI mobile screens
          const dpr = window.devicePixelRatio || 1;

          const canvas = document.createElement('canvas');
          const context = canvas.getContext('2d');
          if (!context) continue;

          canvas.width = viewport.width * dpr;
          canvas.height = viewport.height * dpr;
          canvas.style.width = `${viewport.width}px`;
          canvas.style.height = `${viewport.height}px`;
          canvas.style.display = 'block';
          canvas.style.margin = '0 auto 1.5rem auto';
          canvas.style.borderRadius = '8px';
          canvas.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.4)';

          context.scale(dpr, dpr);

          const renderContext = {
            canvasContext: context,
            viewport: viewport,
            canvas: canvas
          };

          await page.render(renderContext).promise;

          if (!isCancelled && canvasContainerRef.current) {
            canvasContainerRef.current.appendChild(canvas);
          }
        }

        if (!isCancelled) {
          setIsLoading(false);
        }
      } catch (err: any) {
        console.error('Failed to render PDF canvas:', err);
        if (!isCancelled) {
          setError('Unable to load PDF stream directly.');
          setIsLoading(false);
        }
      }
    };

    renderPDF();

    return () => {
      isCancelled = true;
    };
  }, [zoomScale]);

  return (
    <div
      ref={overlayRef}
      onClick={handleOverlayClick}
      className={`resume-viewer-overlay ${isVisible ? 'is-visible' : ''}`}
      role="dialog"
      aria-modal="true"
      aria-label="Resume Viewer"
    >
      <div className="resume-viewer-container">
        {/* Sticky Control Toolbar */}
        <header className="resume-toolbar">
          <div className="resume-toolbar-info">
            <h2 className="resume-toolbar-title">Sai Nandu Vajhala</h2>
            <span className="resume-toolbar-badge">Updated July 2026</span>
          </div>

          <div className="resume-toolbar-actions">
            {/* Zoom Controls */}
            <div className="resume-zoom-controls">
              <button
                onClick={() => setZoomScale(prev => Math.max(0.8, prev - 0.2))}
                className="resume-action-btn resume-zoom-btn"
                title="Zoom Out"
                type="button"
              >
                −
              </button>
              <span className="resume-zoom-label">{Math.round(zoomScale * 100)}%</span>
              <button
                onClick={() => setZoomScale(prev => Math.min(2.0, prev + 0.2))}
                className="resume-action-btn resume-zoom-btn"
                title="Zoom In"
                type="button"
              >
                +
              </button>
            </div>

            <a
              href="/Vajhala_Sai_Nandu_AI_ML_Engineer_Resume.pdf"
              download="Vajhala_Sai_Nandu_AI_ML_Engineer_Resume.pdf"
              className="resume-action-btn"
              title="Download PDF"
            >
              <DownloadIcon size={15} />
              <span className="resume-btn-text">Download</span>
            </a>

            <a
              href="/Vajhala_Sai_Nandu_AI_ML_Engineer_Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="resume-action-btn"
              title="Open in new tab"
            >
              <ExternalLinkIcon size={15} />
              <span className="resume-btn-text">New Tab</span>
            </a>

            <button
              onClick={handleClose}
              className="resume-action-btn resume-close-btn"
              aria-label="Close resume viewer"
              title="Close (ESC)"
              type="button"
            >
              <XIcon size={18} />
            </button>
          </div>
        </header>

        {/* PDF Viewport Container */}
        <div ref={viewportRef} className="resume-pdf-viewport">
          {isLoading && (
            <div className="resume-skeleton">
              <div className="resume-skeleton-spinner" />
              <p className="resume-skeleton-text">Rendering Resume PDF...</p>
            </div>
          )}

          {error && (
            <div className="resume-fallback">
              <p>{error}</p>
              <a
                href="/Vajhala_Sai_Nandu_AI_ML_Engineer_Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="resume-action-btn"
              >
                <ExternalLinkIcon size={16} /> Open PDF Directly
              </a>
            </div>
          )}

          {/* HTML5 Canvases generated via PDF.js */}
          <div
            ref={canvasContainerRef}
            className="resume-canvas-container"
            style={{
              padding: '1.25rem 0.5rem',
              overflowY: 'auto',
              maxHeight: '100%',
              WebkitOverflowScrolling: 'touch'
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default ResumeViewer;
