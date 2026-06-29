import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

const FoodItemSkeleton = () => (
  <Card className="overflow-hidden rounded-2xl border-border/40">
    <Skeleton className="h-48 w-full rounded-none" />
    <CardContent className="p-4 space-y-3">
      <div className="flex justify-between items-center gap-3">
        <Skeleton className="h-5 w-2/3" />
        <Skeleton className="h-5 w-12" />
      </div>
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-4/5" />
    </CardContent>
  </Card>
);

export default FoodItemSkeleton;
