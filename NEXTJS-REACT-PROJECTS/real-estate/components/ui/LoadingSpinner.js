'use client';

export default function LoadingSpinner({ size = 'default', light = false }) {
  const sizeClasses = {
    small: 'w-4 h-4 border-2',
    default: 'w-8 h-8 border-4',
    large: 'w-12 h-12 border-4'
  };

  return (
    <div className="flex justify-center items-center">
      <div
        className={`${sizeClasses[size]} border-t-blue-500 border-r-blue-500 border-b-blue-500 ${
          light ? 'border-l-white/20' : 'border-l-gray-200'
        } animate-spin rounded-full`}
      />
    </div>
  );
}
