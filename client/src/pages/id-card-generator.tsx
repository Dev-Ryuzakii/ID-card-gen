import { Card, CardContent } from "@/components/ui/card";
import IdCardForm from "@/components/id-card/id-card-form";
import IdCardPreview from "@/components/id-card/id-card-preview";
import { useState } from "react";
import type { InsertIdCard } from "@shared/schema";

export default function IdCardGenerator() {
  const [previewData, setPreviewData] = useState<InsertIdCard | null>(null);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-8 bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
           Edtech COE ID Card Generator
        </h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card className="p-6">
            <CardContent className="p-0">
              <IdCardForm onPreview={setPreviewData} />
            </CardContent>
          </Card>

          <Card className="p-6">
            <CardContent className="p-0">
              <IdCardPreview data={previewData} />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
