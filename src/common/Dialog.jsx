/*
 -- Highly cutomisable dialog box
 -- glossy effect on pressing escape button it closes
 -- have a premium look
*/

import React, { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

function useId(prefix = "hc-modal") {
  const ref = useRef();
  if (!ref.current)
    ref.current = `${prefix}-${Math.random().toString(36).slice(2, 9)}`;
  return ref.current;
}

export default function Dialog({
  isOpen = false,
  onClose = () => {},
  title = "",
  labelledBy,
  describedBy,
  children,
  size = "md",
  placement = "center",
  closeOnOverlayClick = true,
  closeOnEsc = true,
  showCloseButton = true,
  hideOverlay = false,
  overlayClassName = "",
  panelClassName = "",
  headerClassName = "",
  bodyClassName = "",
  footerClassName = "",
  footerActions = null,
  initialFocusRef = null,
  trapFocus = true,
  animated = true,
  rounded = "rounded-lg",
  backdrop = "backdrop-blur-sm",
}) {
  const id = useId();
  const titleId = labelledBy || `${id}-title`;
  const descId = describedBy || `${id}-desc`;

  const overlayRef = useRef(null);
  const panelRef = useRef(null);
  const previouslyFocused = useRef(null);
  const [isAnimatingOut, setIsAnimatingOut] = useState(false);

  // --- Exit animation ---
  const closeWithAnimation = () => {
    setIsAnimatingOut(true);
    setTimeout(() => {
      setIsAnimatingOut(false);
      onClose();
    }, 280); // must match exit animation duration
  };

  // --- Open modal lifecycle ---
  useEffect(() => {
    if (isOpen) {
      previouslyFocused.current = document.activeElement;
      const toFocus = initialFocusRef?.current || panelRef.current;
      setTimeout(() => toFocus?.focus?.(), 0);

      if (trapFocus)
        document.addEventListener("focus", handleDocumentFocus, true);
      if (closeOnEsc) document.addEventListener("keydown", handleKeyDown);

      const prevOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";

      return () => {
        document.body.style.overflow = prevOverflow;
        if (trapFocus)
          document.removeEventListener("focus", handleDocumentFocus, true);
        if (closeOnEsc) document.removeEventListener("keydown", handleKeyDown);
        previouslyFocused.current?.focus?.();
      };
    }
  }, [isOpen]); // eslint-disable-line

  function handleDocumentFocus(e) {
    if (!panelRef.current) return;
    if (panelRef.current.contains(e.target)) return;
    e.stopPropagation();
    panelRef.current.focus();
  }

  function handleKeyDown(e) {
    if (e.key === "Escape") {
      e.stopPropagation();
      closeWithAnimation();
    }
  }

  function handleOverlayClick(e) {
    if (!closeOnOverlayClick) return;
    if (e.target === overlayRef.current) closeWithAnimation();
  }

  if (!isOpen) return null;

  // --- Size Map ---
  const sizeMap = {
    sm: "max-w-lg w-full",
    md: "max-w-2xl w-full",
    lg: "max-w-4xl w-full",
    xl: "max-w-7xl w-full",
    full: "w-full h-full",
  };

  // --- Placement Map ---
  const placementMap = {
    center: "items-center justify-center",
    top: "items-start justify-center pt-12",
    bottom: "items-end justify-center pb-12",
    left: "items-center justify-start pl-6",
    right: "items-center justify-end pr-6",
  };

  // UPDATED: Highest z-index so modal floats above navbar
  const baseOverlay = `fixed inset-0 flex ${
    placementMap[placement] || placementMap.center
  } z-[9999]`;

  const overlayClasses = `${baseOverlay} ${
    hideOverlay ? "" : "bg-black/40"
  } ${backdrop} ${overlayClassName}`;

  const panelBase = `focus:outline-none ${rounded} shadow-2xl bg-white ${
    sizeMap[size] || sizeMap.md
  }`;

  const panelAnim = animated ? "transform transition ease-out duration-200" : "";

  const panelClasses = `${panelBase} ${panelAnim} ${panelClassName}`;

  const portalRoot = document.getElementById("modal-root") || document.body;

  return createPortal(
    <div
      ref={overlayRef}
      className={`${overlayClasses} animate-ultra-overlay ${
        isAnimatingOut ? "animate-ultra-overlay-out" : ""
      }`}
      onMouseDown={handleOverlayClick}
      aria-hidden={!isOpen}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? titleId : undefined}
        aria-describedby={descId}
        ref={panelRef}
        tabIndex={-1}
        className={`${panelClasses} animate-ultra-panel ${
          isAnimatingOut ? "animate-ultra-panel-out" : ""
        }`}
        onMouseDown={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div
          className={`flex items-center justify-between p-4 ${headerClassName}`}
        >
          <div className="flex-1 min-w-0">
            {title ? (
              <h3
                id={titleId}
                className="text-lg font-semibold leading-6 text-slate-900"
              >
                {title}
              </h3>
            ) : null}
          </div>

          {showCloseButton && (
            <button
              aria-label="Close dialog"
              onClick={closeWithAnimation}
              className="ml-3 p-2 rounded-md hover:bg-slate-100 transition"
            >
              ✕
            </button>
          )}
        </div>

        {/* Body */}
        <div id={descId} className={`p-4 ${bodyClassName}`}>
          {children}
        </div>

        {/* Footer */}
        <div
          className={`flex items-center justify-end gap-2 p-4 ${footerClassName}`}
        >
          {typeof footerActions === "function"
            ? footerActions({ close: closeWithAnimation })
            : null}
        </div>
      </div>
    </div>,
    portalRoot
  );
}
