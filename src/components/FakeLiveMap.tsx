import { motion } from 'framer-motion';
import { Bike, MapPin, Navigation } from 'lucide-react';

/**
 * FakeLiveMap — developer preview map for delivery tracking.
 * Pure CSS/SVG, no external API keys required.
 */
const FakeLiveMap = () => {
  return (
    <div className="relative aspect-video w-full overflow-hidden rounded-xl border border-border/50 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Grid streets */}
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage:
            'linear-gradient(hsl(var(--primary) / 0.25) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--primary) / 0.25) 1px, transparent 1px)',
          backgroundSize: '32px 32px',
        }}
      />

      {/* Blocks / parks */}
      <div className="absolute left-[12%] top-[18%] h-14 w-20 rounded-md bg-emerald-500/20 border border-emerald-400/30" />
      <div className="absolute right-[14%] top-[10%] h-10 w-16 rounded-md bg-sky-500/15 border border-sky-400/25" />
      <div className="absolute left-[40%] bottom-[15%] h-12 w-24 rounded-md bg-amber-500/15 border border-amber-400/25" />

      {/* Route path */}
      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 400 225" preserveAspectRatio="none">
        <defs>
          <linearGradient id="routeGrad" x1="0" x2="1">
            <stop offset="0%" stopColor="hsl(var(--primary))" />
            <stop offset="100%" stopColor="hsl(var(--secondary))" />
          </linearGradient>
        </defs>
        <motion.path
          d="M 40 180 Q 120 160 140 110 T 260 80 Q 320 60 360 40"
          fill="none"
          stroke="url(#routeGrad)"
          strokeWidth="3"
          strokeLinecap="round"
          strokeDasharray="6 6"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2, ease: 'easeInOut' }}
        />
      </svg>

      {/* Restaurant pin */}
      <div className="absolute left-[8%] bottom-[15%] flex flex-col items-center">
        <div className="rounded-full bg-primary p-1.5 shadow-lg ring-4 ring-primary/30">
          <MapPin className="h-3.5 w-3.5 text-primary-foreground" />
        </div>
        <span className="mt-1 rounded bg-background/80 px-1.5 py-0.5 text-[10px] font-medium backdrop-blur">
          Restaurant
        </span>
      </div>

      {/* Destination pin */}
      <div className="absolute right-[6%] top-[12%] flex flex-col items-center">
        <div className="rounded-full bg-accent p-1.5 shadow-lg ring-4 ring-accent/30">
          <Navigation className="h-3.5 w-3.5 text-accent-foreground" />
        </div>
        <span className="mt-1 rounded bg-background/80 px-1.5 py-0.5 text-[10px] font-medium backdrop-blur">
          You
        </span>
      </div>

      {/* Delivery rider */}
      <motion.div
        className="absolute"
        initial={{ left: '10%', top: '75%' }}
        animate={{
          left: ['10%', '32%', '55%', '78%', '88%'],
          top: ['75%', '55%', '40%', '25%', '15%'],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut', repeatType: 'reverse' }}
      >
        <div className="relative -translate-x-1/2 -translate-y-1/2">
          <span className="absolute inset-0 -m-2 animate-ping rounded-full bg-primary/40" />
          <div className="relative rounded-full bg-gradient-to-br from-primary to-secondary p-2 shadow-xl">
            <Bike className="h-4 w-4 text-white" />
          </div>
        </div>
      </motion.div>

      {/* Live badge */}
      <div className="absolute left-3 top-3 flex items-center gap-1.5 rounded-full bg-background/80 px-2.5 py-1 text-[11px] font-semibold backdrop-blur-md">
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-75" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
        </span>
        LIVE
      </div>

      {/* Dev watermark */}
      <div className="absolute right-3 bottom-3 rounded bg-background/70 px-2 py-0.5 text-[10px] text-muted-foreground backdrop-blur">
        Dev preview map
      </div>
    </div>
  );
};

export default FakeLiveMap;
