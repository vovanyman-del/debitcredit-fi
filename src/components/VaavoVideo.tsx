import { useRef, useState } from 'react';
import { useI18n } from '../i18n/context';
import { vaavoVideo, type VaavoVideoTopic } from '../data/vaavoVideos';

/**
 * Native player for one Vaavo film in the page language. Nothing but the poster
 * downloads until the visitor presses play. Subtitles are burned into the films,
 * so there is no <track>. Desktop Chrome draws no big play button of its own,
 * hence the round one in the middle; it disappears once the film has started.
 * The key remounts the element on a language switch — changing a <source>
 * alone does not reload a video.
 */
export default function VaavoVideo({ topic, title, className = '' }: { topic: VaavoVideoTopic; title: string; className?: string }) {
  const { t, locale } = useI18n();
  const video = vaavoVideo(locale, topic);
  const ref = useRef<HTMLVideoElement>(null);
  const [startedSrc, setStartedSrc] = useState<string | null>(null);
  const size = topic === 'main' ? 'w-16 h-16 sm:w-20 sm:h-20' : 'w-14 h-14';

  return (
    <div className={`relative overflow-hidden bg-ink-900 ${className}`}>
      <video
        key={video.src}
        ref={ref}
        className="block w-full aspect-video"
        controls
        preload="none"
        playsInline
        poster={video.poster}
        aria-label={title}
        onPlay={() => setStartedSrc(video.src)}
      >
        <source src={video.src} type="video/mp4" />
      </video>
      {startedSrc !== video.src && (
        <button
          type="button"
          onClick={() => void ref.current?.play()}
          aria-label={`${t.vaavo.video.play}: ${title}`}
          className={`absolute inset-0 m-auto ${size} rounded-full bg-white/90 text-brand-700 shadow-lg ring-1 ring-ink-900/10 flex items-center justify-center transition-transform hover:scale-105 hover:bg-white`}
        >
          <svg aria-hidden="true" className="w-1/3 h-1/3 translate-x-[8%]" viewBox="0 0 24 24" fill="currentColor"><path d="M7 4.5v15a1 1 0 0 0 1.5.86l12-7.5a1 1 0 0 0 0-1.72l-12-7.5A1 1 0 0 0 7 4.5z" /></svg>
        </button>
      )}
    </div>
  );
}
