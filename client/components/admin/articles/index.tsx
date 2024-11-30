"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Articles from "./Articles";
import AddArticle from "./addArticle/AddArticle";

export default function ArticleManagement() {
  return (
    <div className="mt-16 mb-6">
      <Tabs defaultValue="list">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="list">Article List</TabsTrigger>
          <TabsTrigger value="add">Add Article</TabsTrigger>
        </TabsList>
        <TabsContent value="list">
          <Articles />
        </TabsContent>
        <TabsContent value="add">
          <AddArticle />
        </TabsContent>
      </Tabs>
    </div>
  );
}
