import NewsletterListing from "@/components/dashboard/newsletter/NewsletterListing";
import CampaignForm from "@/components/dashboard/newsletter/CampaignForm";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import React from "react";

export default function NewsletterPage() {
  return (
    <Tabs defaultValue="subscribers">
      <TabsList className="mb-6">
        <TabsTrigger value="subscribers">Subscribers</TabsTrigger>
        <TabsTrigger value="campaign">Campaign</TabsTrigger>
      </TabsList>
      <TabsContent value="subscribers">
        <NewsletterListing />
      </TabsContent>
      <TabsContent value="campaign">
        <CampaignForm />
      </TabsContent>
    </Tabs>
  );
}
