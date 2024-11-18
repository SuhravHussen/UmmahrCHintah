"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Dashboard from "@/components/admin/dashboard/Dashboard";
import Articles from "@/components/admin/articles/Articles";
import AddArticle from "@/components/admin/addArticle/AddArticle";
import Authors from "@/components/admin/auhtors/Authors";
import Users from "@/components/admin/users/Users";

export default function Page() {
  return (
    <div className="mt-16 mb-6">
      <Tabs defaultValue="Dashboard">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="Dashboard">Dashboard</TabsTrigger>
          <TabsTrigger value="Articles">Articles</TabsTrigger>
          <TabsTrigger value="addArticle">Add Article</TabsTrigger>
          <TabsTrigger value="users">Users</TabsTrigger>
        </TabsList>
        <TabsContent value="Dashboard">
          <Dashboard />
        </TabsContent>
        <TabsContent value="Articles">
          <Articles />
        </TabsContent>
        <TabsContent value="addArticle">
          <AddArticle />
        </TabsContent>
        <TabsContent value="authors">
          <Authors />
        </TabsContent>
        <TabsContent value="users">
          <Users />
        </TabsContent>
      </Tabs>
    </div>
  );
}
