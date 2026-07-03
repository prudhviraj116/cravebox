import { Card, CardContent } from '@/components/ui/card';

const shimmer =
  "relative overflow-hidden bg-muted/60 before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_1.6s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/15 before:to-transparent";

const FoodItemSkeleton = () => (
  <Card className="overflow-hidden rounded-2xl border-border/40 shadow-lg backdrop-blur-sm">
    {/* Image with floating chips */}
    <div className={`h-48 w-full ${shimmer}`}>
      <div className="absolute top-3 left-3 h-6 w-16 rounded-full bg-background/70 backdrop-blur-sm" />
      <div className="absolute top-3 right-3 h-6 w-10 rounded-full bg-background/70 backdrop-blur-sm" />
      <div className="absolute bottom-3 left-3 flex gap-1.5">
        <span className="h-2 w-2 rounded-full bg-primary/70 animate-pulse" />
        <span className="h-2 w-2 rounded-full bg-primary/40 animate-pulse [animation-delay:120ms]" />
        <span className="h-2 w-2 rounded-full bg-primary/20 animate-pulse [animation-delay:240ms]" />
      </div>
    </div>

    <CardContent className="p-4 space-y-3">
      <div className="flex justify-between items-center gap-3">
        <div className={`h-5 w-2/3 rounded-md ${shimmer}`} />
        <div className={`h-6 w-14 rounded-full ${shimmer}`} />
      </div>
      <div className="space-y-2">
        <div className={`h-3 w-full rounded ${shimmer}`} />
        <div className={`h-3 w-4/5 rounded ${shimmer}`} />
      </div>
      <div className="flex items-center justify-between pt-2">
        <div className="flex gap-1.5">
          <div className={`h-5 w-12 rounded-full ${shimmer}`} />
          <div className={`h-5 w-10 rounded-full ${shimmer}`} />
        </div>
        <div className={`h-10 w-28 rounded-xl ${shimmer}`} />
      </div>
    </CardContent>
  </Card>
);

export default FoodItemSkeleton;
