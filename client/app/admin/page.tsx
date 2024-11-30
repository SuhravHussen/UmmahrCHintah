"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Dashboard from "@/components/admin/dashboard/Dashboard";
import Articles from "@/components/admin/articles/Articles";

import Authors from "@/components/admin/auhtors/Authors";
import Users from "@/components/admin/users/Users";
import ArticleManagement from "@/components/admin/articles";

export default function Page() {
  return (
    <div className="mt-16 mb-6">
      <Tabs defaultValue="Dashboard">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="Dashboard">Dashboard</TabsTrigger>
          <TabsTrigger value="Articles">Articles</TabsTrigger>

          <TabsTrigger value="authors">Authors</TabsTrigger>
          <TabsTrigger value="users">Users</TabsTrigger>
        </TabsList>
        <TabsContent value="Dashboard">
          <Dashboard />
        </TabsContent>
        <TabsContent value="Articles">
          <ArticleManagement />
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
