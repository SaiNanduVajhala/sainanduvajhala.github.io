import React, { useState, useEffect, useRef, useCallback } from 'react';
import { DownloadIcon, ExternalLinkIcon, XIcon } from './Icons';

interface ResumeViewerProps {
  onClose: () => void;
}

export const ResumeViewer: React.FC<ResumeViewerProps> = ({ onClose }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isPdfReady, setIsPdfReady] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const overlayRef = useRef<HTMLDivElement>(null);

  // Trigger GPU slide-up animation after mount
  useEffect(() => {
    const animationFrame = requestAnimationFrame(() => {
      setIsVisible(true);
    });

    // Delay PDF stream render until opening animation completes (220ms)
    const pdfTimer = setTimeout(() => {
      setIsPdfReady(true);
    }, 220);

    return () => {
      cancelAnimationFrame(animationFrame);
      clearTimeout(pdfTimer);
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
            <a
              href="/resume.pdf"
              download="Sai_Nandu_Vajhala_Resume.pdf"
              className="resume-action-btn"
              title="Download PDF"
            >
              <DownloadIcon size={15} />
              <span className="resume-btn-text">Download</span>
            </a>

            <a
              href="/resume.pdf"
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

        {/* PDF Frame / Skeleton Viewport */}
        <div className="resume-pdf-viewport">
          {(!isPdfReady || isLoading) && (
            <div className="resume-skeleton">
              <div className="resume-skeleton-spinner" />
              <p className="resume-skeleton-text">Loading Resume PDF...</p>
            </div>
          )}

          {isPdfReady && (
            <object
              data="/resume.pdf#toolbar=1&navpanes=0"
              type="application/pdf"
              className={`resume-pdf-frame ${isLoading ? 'is-loading' : 'is-loaded'}`}
              onLoad={() => setIsLoading(false)}
            >
              <div className="resume-fallback">
                <p>Unable to embed PDF directly in browser frame.</p>
                <a
                  href="/resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="resume-action-btn"
                >
                  <ExternalLinkIcon size={16} /> Open PDF Directly
                </a>
              </div>
            </object>
          )}
        </div>
      </div>
    </div>
  );
};

export default ResumeViewer;
