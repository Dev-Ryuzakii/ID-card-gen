import { useRef } from "react";
import type { InsertIdCard } from "@shared/schema";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import html2canvas from "html2canvas";
import { QRCodeSVG } from "qrcode.react";

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

  // QR code data
  const qrData = JSON.stringify({
    id: data.registrationNumber,
    name: data.studentName,
    department: data.department,
    matricNumber: data.matricNumber
  });

  return (
    <div className="space-y-4">
      <div
        ref={cardRef}
        className="bg-gradient-to-br from-white to-gray-50 p-8 rounded-xl shadow-lg w-[500px] mx-auto border"
        style={{
          backgroundImage: 'linear-gradient(135deg, #ffffff 0%, #f0f4f8 100%)',
        }}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-6 border-b pb-4">
          <div className="flex items-center gap-4">
            <img
              src="/attached_assets/image_1742153522082.png"
              alt="EdTech COE Logo"
              className="h-16 w-16 object-contain"
            />
            <div>
              <h2 className="font-bold text-xl text-gray-800">EdTech COE</h2>
              <p className="text-sm text-gray-600">{data.institutionName}</p>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex gap-6">
          <div className="space-y-4">
            <img
              src={data.photoUrl}
              alt={data.studentName}
              className="h-40 w-40 object-cover rounded-lg border-4 border-white shadow-md"
            />
            <QRCodeSVG
              value={qrData}
              size={160}
              level="H"
              includeMargin={true}
            />
          </div>

          <div className="flex-1 space-y-3">
            <h3 className="font-bold text-2xl text-gray-800">{data.studentName}</h3>
            <div className="space-y-2 text-gray-600">
              <p className="flex justify-between">
                <span className="font-semibold">Department:</span>
                <span>{data.department}</span>
              </p>
              <p className="flex justify-between">
                <span className="font-semibold">Level:</span>
                <span>{data.level}</span>
              </p>
              <p className="flex justify-between">
                <span className="font-semibold">Matric No:</span>
                <span>{data.matricNumber}</span>
              </p>
              <p className="flex justify-between">
                <span className="font-semibold">Reg No:</span>
                <span>{data.registrationNumber}</span>
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-6 pt-4 border-t text-center text-sm text-gray-500">
          <p>{data.institutionAddress}</p>
          <p className="mt-1">Scan QR code to verify authenticity</p>
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