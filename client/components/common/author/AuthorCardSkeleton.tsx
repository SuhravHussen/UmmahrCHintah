import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function AuthorCardSkeleton() {
  return (
    <Card className="flex flex-col items-center p-4 border rounded-lg shadow-md w-40 h-[250px] gap-6">
      <Skeleton className="w-24 h-24 rounded-full mb-4" />{" "}
      {/* For author's image */}
      <Skeleton className="w-full h-6 rounded" /> {/* For author's name */}
    </Card>
  );
}
