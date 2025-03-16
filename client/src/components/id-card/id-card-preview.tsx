import { useRef } from "react";
import type { InsertIdCard } from "@shared/schema";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import html2canvas from "html2canvas";

interface IdCardPreviewProps {
  data: InsertIdCard | null;
}

export default function IdCardPreview({ data }: IdCardPreviewProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleDownload = async () => {
    if (!cardRef.current || !data) return;
    
    const canvas = await html2canvas(cardRef.current);
    const link = document.createElement("a");
    link.download = `id-card-${data.studentName}.png`;
    link.href = canvas.toDataURL("image/png");
    link.click();
  };

  if (!data) {
    return (
      <div className="h-full flex items-center justify-center text-gray-500">
        Fill out the form to preview the ID card
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div
        ref={cardRef}
        className="bg-white p-6 rounded-lg shadow-lg w-[400px] mx-auto"
      >
        <div className="flex items-center justify-between mb-4">
          <img
            src={data.institutionLogo}
            alt="Institution Logo"
            className="h-16 w-16 object-contain"
          />
          <div className="text-right">
            <h2 className="font-bold text-lg">{data.institutionName}</h2>
            <p className="text-sm text-gray-600">{data.institutionAddress}</p>
          </div>
        </div>

        <div className="flex gap-4 mb-4">
          <img
            src={data.photoUrl}
            alt={data.studentName}
            className="h-32 w-32 object-cover rounded-lg"
          />
          <div className="space-y-2">
            <h3 className="font-bold text-xl">{data.studentName}</h3>
            <p className="text-sm text-gray-600">Department: {data.department}</p>
            <p className="text-sm text-gray-600">Level: {data.level}</p>
            <p className="text-sm text-gray-600">
              Matric No: {data.matricNumber}
            </p>
            <p className="text-sm text-gray-600">
              Reg No: {data.registrationNumber}
            </p>
          </div>
        </div>
      </div>

      <Button
        onClick={handleDownload}
        className="w-full"
        variant="outline"
      >
        <Download className="mr-2 h-4 w-4" />
        Download ID Card
      </Button>
    </div>
  );
}
