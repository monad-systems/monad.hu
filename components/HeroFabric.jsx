import dynamic from 'next/dynamic';
import { useState, useSyncExternalStore } from 'react';

import { useTranslation } from '../lib/i18n';

const HeroBackground = dynamic(() => import('./HeroBackground'), {
  ssr: false,
});

const REDUCED_MOTION_QUERY = '(prefers-reduced-motion: reduce)';

const subscribeReducedMotion = (onChange) => {
  const mq = window.matchMedia?.(REDUCED_MOTION_QUERY);
  mq?.addEventListener('change', onChange);
  return () => mq?.removeEventListener('change', onChange);
};

const getReducedMotion = () =>
  window.matchMedia?.(REDUCED_MOTION_QUERY).matches ?? false;

// The Global Fabric loops forever, so WCAG 2.2.2 wants a visible pause.
// It starts paused for prefers-reduced-motion; the toggle overrides that.
export default function HeroFabric() {
  const { t } = useTranslation();
  const prefersReducedMotion = useSyncExternalStore(
    subscribeReducedMotion,
    getReducedMotion,
    () => false,
  );
  const [pausedByUser, setPausedByUser] = useState(null);
  const paused = pausedByUser ?? prefersReducedMotion;

  return (
    <>
      <div className="hero-bg">
        <HeroBackground paused={paused} />
      </div>
      <button
        type="button"
        className="hero-motion-toggle"
        aria-pressed={paused}
        onClick={() => setPausedByUser(!paused)}
      >
        {paused
          ? t('layout.a11y.heroPlay', 'Play animation')
          : t('layout.a11y.heroPause', 'Pause animation')}
      </button>
    </>
  );
}
