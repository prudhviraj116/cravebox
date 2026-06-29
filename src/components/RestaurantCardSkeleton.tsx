import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

const RestaurantCardSkeleton = () => (
  <Card className="overflow-hidden rounded-2xl border-border/40">
    <Skeleton className="h-52 w-full rounded-none" />
    <CardContent className="p-4 space-y-3">
      <div className="flex justify-between">
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-4 w-20" />
      </div>
      <div className="flex gap-2">
        <Skeleton className="h-5 w-14 rounded-full" />
        <Skeleton className="h-5 w-16 rounded-full" />
        <Skeleton className="h-5 w-12 rounded-full" />
      </div>
    </CardContent>
  </Card>
);

export default RestaurantCardSkeleton;
