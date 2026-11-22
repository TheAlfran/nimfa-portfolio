import { useEffect, useLayoutEffect, useRef, useState, type MouseEvent } from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence, motion } from 'motion/react';
import { X, ZoomIn, ZoomOut } from 'lucide-react';

interface ImageViewerProps {
  /** The image to show; null = closed */
  image: { src: string; alt: string; width: number; height: number } | null;
  onClose: () => void;
}

/**
 * Full-screen view of a single image (used for the resume).
 * - Opens fitted to the screen; click/tap the image or the Zoom button to zoom in, then scroll to move around.
 * - Esc, the ✕ button, or clicking the dark background closes it (without closing the popup underneath).
 */
export function ImageViewer({ image, onClose }: ImageViewerProps) {
  return createPortal(
    <AnimatePresence>{image && <ViewerFrame key={image.src} image={image} onClose={onClose} />}</AnimatePresence>,
    document.body,
  );
}

function ViewerFrame({
  image,
  onClose,
}: {
  image: NonNullable<ImageViewerProps['image']>;
  onClose: () => void;
}) {
  const [zoomed, setZoomed] = useState(false);
  // Where on the image the visitor clicked (0–1), so we can scroll that spot into the middle after zooming
  const focusPoint = useRef<{ x: number; y: number } | null>(null);
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const closeRef = useRef<HTMLButtonElement | null>(null);
  const onCloseRef = useRef(onClose);
  useEffect(() => {
    onCloseRef.current = onClose;
  });

  // Esc closes only this viewer (captured before the popup underneath sees it)
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.stopPropagation();
        onCloseRef.current();
      }
    };
    window.addEventListener('keydown', handleKey, true);
    return () => window.removeEventListener('keydown', handleKey, true);
  }, []);

  // Focus the close button on open; give focus back on close
  useEffect(() => {
    const previouslyFocused = document.activeElement as HTMLElement | null;
    closeRef.current?.focus({ preventScroll: true });
    return () => previouslyFocused?.focus?.({ preventScroll: true });
  }, []);

  // Zoom in around the point that was clicked (or the top-centre when using the Zoom button)
  const toggleZoom = (e?: MouseEvent<HTMLImageElement>) => {
    if (zoomed) {
      setZoomed(false);
      return;
    }
    if (e) {
      const rect = e.currentTarget.getBoundingClientRect();
      focusPoint.current = {
        x: (e.clientX - rect.left) / rect.width,
        y: (e.clientY - rect.top) / rect.height,
      };
    } else {
      focusPoint.current = { x: 0.5, y: 0 };
    }
    setZoomed(true);
  };

  // After the zoomed image is laid out, scroll so the clicked spot is in the middle of the screen
  useLayoutEffect(() => {
    const box = scrollRef.current;
    const img = box?.querySelector('img');
    const point = focusPoint.current;
    if (!zoomed || !box || !img || !point) return;
    const boxRect = box.getBoundingClientRect();
    const imgRect = img.getBoundingClientRect();
    box.scrollTo({
      left: imgRect.left - boxRect.left + box.scrollLeft + point.x * imgRect.width - box.clientWidth / 2,
      top: imgRect.top - boxRect.top + box.scrollTop + point.y * imgRect.height - box.clientHeight / 2,
    });
    focusPoint.current = null;
  }, [zoomed]);

  return (
    <motion.div
      role="dialog"
      aria-modal="true"
      aria-label={image.alt}
      className="fixed inset-0 z-[60] flex flex-col bg-[#0F172A]/95"
      // Don't let clicks inside reach the popup underneath (which would close it)
      onClick={(e) => {
        e.stopPropagation();
        if (e.target === e.currentTarget || e.target === scrollRef.current) onClose();
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
      {/* Controls */}
      <div className="flex shrink-0 items-center justify-end gap-2 px-3 sm:px-5 pt-[max(0.75rem,env(safe-area-inset-top))] pb-3">
        <button
          type="button"
          onClick={() => toggleZoom()}
          className="inline-flex items-center gap-2 h-11 px-4 text-sm font-medium text-white bg-white/10 hover:bg-white/20 rounded-lg transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-white"
        >
          {zoomed ? <ZoomOut className="w-5 h-5" /> : <ZoomIn className="w-5 h-5" />}
          {zoomed ? 'Fit to screen' : 'Zoom in'}
        </button>
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          aria-label="Close full-screen view"
          className="inline-flex items-center justify-center w-11 h-11 text-white bg-white/10 hover:bg-white/20 rounded-lg transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-white"
        >
          <X className="w-6 h-6" />
        </button>
      </div>

      {/* Image */}
      <div
        ref={scrollRef}
        className={`flex-1 min-h-0 overflow-auto overscroll-contain px-3 sm:px-6 pb-[max(1rem,env(safe-area-inset-bottom))] ${
          zoomed ? '' : 'flex items-start justify-center'
        }`}
      >
        <motion.img
          src={image.src}
          alt={image.alt}
          width={image.width}
          height={image.height}
          onClick={(e) => toggleZoom(e)}
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.25 }}
          className={`block rounded-sm bg-white shadow-2xl ${
            zoomed
              ? 'mx-auto max-w-none w-[max(100%,min(1488px,200%))] h-auto cursor-zoom-out'
              : 'max-w-full max-h-full w-auto h-auto object-contain cursor-zoom-in'
          }`}
        />
      </div>
    </motion.div>
  );
}
