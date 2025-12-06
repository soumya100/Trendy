import { useState, useEffect } from 'react';

const Drawer = ({
  isOpen,
  onClose,
  position = 'right',
  size = 'md',
  backdrop = true,
  closeOnBackdrop = true,
  closeOnEsc = true,
  showCloseButton = true,
  overlay = true,
  overlayOpacity = 50,
  animation = 'slide',
  header = null,
  children
}) => {
  const [isMounted, setIsMounted] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  // Handle mounting and animation
  useEffect(() => {
    if (isOpen) {
      setIsMounted(true);
      setTimeout(() => setIsAnimating(true), 10);
    } else {
      setIsAnimating(false);
      const timer = setTimeout(() => setIsMounted(false), 300);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  // Close on escape key
  useEffect(() => {
    const handleEsc = (e) => {
      if (closeOnEsc && e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    if (isOpen) {
      document.addEventListener('keydown', handleEsc);
      document.body.style.overflow = 'hidden';
      return () => {
        document.removeEventListener('keydown', handleEsc);
        document.body.style.overflow = 'unset';
      };
    }
  }, [isOpen, closeOnEsc, onClose]);

  if (!isMounted) return null;

  // Size configurations
  const sizeClasses = {
    sm: position === 'top' || position === 'bottom' ? 'h-1/4' : 'w-64',
    md: position === 'top' || position === 'bottom' ? 'h-1/3' : 'w-96',
    lg: position === 'top' || position === 'bottom' ? 'h-1/2' : 'w-[32rem]',
    xl: position === 'top' || position === 'bottom' ? 'h-2/3' : 'w-[48rem]',
    full: position === 'top' || position === 'bottom' ? 'h-full' : 'w-full'
  };

  // Position configurations
  const positionClasses = {
    left: 'left-0 top-0 h-full',
    right: 'right-0 top-0 h-full',
    top: 'top-0 left-0 w-full',
    bottom: 'bottom-0 left-0 w-full'
  };

  // Animation configurations
  const getTransformClass = () => {
    if (animation === 'slide') {
      if (!isAnimating) {
        switch (position) {
          case 'left': return '-translate-x-full';
          case 'right': return 'translate-x-full';
          case 'top': return '-translate-y-full';
          case 'bottom': return 'translate-y-full';
          default: return '';
        }
      }
      return 'translate-x-0 translate-y-0';
    }
    return '';
  };

  const getOpacityClass = () => {
    if (animation === 'fade') {
      return isAnimating ? 'opacity-100' : 'opacity-0';
    }
    return 'opacity-100';
  };

  return (
    <>
      {/* Backdrop */}
      {backdrop && overlay && (
        <div
          className={`fixed inset-0 bg-black z-40 transition-opacity duration-300`}
          style={{ opacity: isAnimating ? overlayOpacity / 100 : 0 }}
          onClick={closeOnBackdrop ? onClose : undefined}
        />
      )}

      {/* Drawer */}
      <div
        className={`fixed ${positionClasses[position]} ${sizeClasses[size]} bg-white shadow-2xl z-50 transition-all duration-300 ease-in-out transform ${getTransformClass()} ${getOpacityClass()} flex flex-col w-full sm:w-1/2 h-screen!`}
      >
        {/* Header Section */}
        {(header || showCloseButton) && (
          <div className="flex items-center justify-between p-4 border-b border-gray-200 shrink-0">
            {/* Header Content */}
            <div className="flex-1">
              {header}
            </div>
            
            {/* Close button */}
            {showCloseButton && (
              <button
                onClick={onClose}
                className="p-2 rounded-lg hover:bg-gray-100 transition-colors shrink-0 cursor-pointer"
                aria-label="Close drawer"
              >
                <svg
                  className="w-6 h-6 text-gray-600"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>
        )}

        {/* Content */}
        <div className="flex-1 overflow-y-auto">
          {children}
        </div>
      </div>
    </>
  );
};

export default Drawer;