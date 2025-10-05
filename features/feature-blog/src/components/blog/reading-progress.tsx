'use client';
import { useReadingProgress } from '@/hooks';

export function ReadingProgress() {
  const progress = useReadingProgress();

  return (
    <div className="fixed top-0 left-0 w-full h-1 bg-gray-800 z-50">
      <div
        className="h-1 bg-purple-500 transition-all duration-150"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}
