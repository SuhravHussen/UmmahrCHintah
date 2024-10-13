import { Card, CardFooter, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function ArticleCardSkeleton() {
  return (
    <Card className="cursor-pointer">
      <CardHeader>
        <Skeleton className="w-[150px] h-[20px] rounded" /> {/* For title */}
        <Skeleton className="w-full h-[60px] mt-2 rounded" />{" "}
        {/* For description */}
      </CardHeader>
      <CardFooter className="flex flex-col items-start">
        <div className="flex gap-4 items-center">
          <Skeleton className="w-[50px] h-[20px] rounded" />{" "}
          {/* For read time */}
          <Skeleton className="w-[30px] h-[20px] rounded" /> {/* For views */}
        </div>
        <Skeleton className="w-[80px] h-[20px] mt-3 rounded" />{" "}
        {/* For author */}
      </CardFooter>
    </Card>
  );
}
