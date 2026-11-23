import { useState } from 'react';
import { Briefcase } from 'lucide-react';

interface ResilientImageProps {
  src: string;
  alt: string;
  className?: string;
  fallbackLabel?: string;
}

export function ResilientImage({
  src,
  alt,
  className = '',
  fallbackLabel,
}: ResilientImageProps) {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return (
      <div
        role="img"
        aria-label={alt}
        className={`flex flex-col items-center justify-center bg-linear-to-br from-[#F1F5F9] to-[#E2E8F0] text-[#475569] p-6 text-center ${className}`}
      >
        <Briefcase className="w-8 h-8 text-[#64748B] mb-3" strokeWidth={1.5} />
        <span className="text-sm font-medium text-[#334155] max-w-[24ch]">
          {fallbackLabel || alt}
        </span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      referrerPolicy="no-referrer"
      onError={() => setHasError(true)}
      className={className}
    />
  );
}
