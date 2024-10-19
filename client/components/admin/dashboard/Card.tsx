import { Card, CardTitle } from "@/components/ui/card";
import React from "react";

type Props = {
  title: string;
  info: string;
};

export default function InfoCard({ title = "Title", info = "Info" }: Props) {
  return (
    <Card className="w-max p-4 flex flex-col justify-center items-center gap-4 h-20">
      <CardTitle>{title}</CardTitle>
      <p className="font-bold">{info}</p>
    </Card>
  );
}
