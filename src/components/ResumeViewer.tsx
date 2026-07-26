import React, { useState, useEffect, useRef, useCallback } from 'react';
import { DownloadIcon, ExternalLinkIcon, XIcon } from './Icons';

interface ResumeViewerProps {
  onClose: () => void;
}

export const ResumeViewer: React.FC<ResumeViewerProps> = ({ onClose }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isPdfLoaded, setIsPdfLoaded] = useState(false);
  const overlayRef = useRef<HTMLDivElement>(null);

  // Trigger GPU slide-up animation after mount
  useEffect(() => {
    const animationFrame = requestAnimationFrame(() => {
      setIsVisible(true);
    });
    return () => cancelAnimationFrame(animationFrame);
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

  const pdfUrl = '/resume.pdf';
  // Use responsive PDF viewer frame for 100% cross-platform mobile & desktop rendering
  const embedUrl = `https://docs.google.com/gview?embedded=true&url=${encodeURIComponent('https://sainandu.is-a.dev/resume.pdf')}`;

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
            <span className="logo" style={{ textTransform: 'lowercase', fontSize: '1.1rem' }}>
              sn.dev<span className="logo-dot" />
            </span>
            <span className="resume-toolbar-badge">resume</span>
          </div>

          <div className="resume-toolbar-actions">
            <a
              href={pdfUrl}
              download="Sai_Nandu_Vajhala_Resume.pdf"
              className="resume-action-btn"
              title="Download PDF"
            >
              <DownloadIcon size={15} />
              <span className="resume-btn-text">Download</span>
            </a>

            <a
              href={pdfUrl}
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

        {/* Responsive PDF Viewport */}
        <div className="resume-pdf-viewport">
          {!isPdfLoaded && (
            <div className="resume-skeleton">
              <div className="resume-skeleton-spinner" />
              <p className="resume-skeleton-text">Loading Resume PDF...</p>
            </div>
          )}

          <iframe
            src={embedUrl}
            className={`resume-pdf-frame ${isPdfLoaded ? 'is-loaded' : ''}`}
            title="Sai Nandu Vajhala Resume"
            onLoad={() => setIsPdfLoaded(true)}
          />
        </div>
      </div>
    </div>
  );
};

export default ResumeViewer;
