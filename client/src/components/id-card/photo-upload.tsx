import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { Camera } from "lucide-react";

interface PhotoUploadProps {
  value: string;
  onChange: (url: string) => void;
}

export default function PhotoUpload({ value, onChange }: PhotoUploadProps) {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    // In a real app, we would upload to a server here
    // For demo, we'll create an object URL
    const url = URL.createObjectURL(file);
    onChange(url);
  }, [onChange]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png']
    },
    maxFiles: 1
  });

  return (
    <div
      {...getRootProps()}
      className={`
        border-2 border-dashed rounded-lg p-6 text-center cursor-pointer
        transition-colors
        ${isDragActive ? 'border-primary bg-primary/5' : 'border-gray-300'}
      `}
    >
      <input {...getInputProps()} />
      
      {value ? (
        <img 
          src={value} 
          alt="Preview" 
          className="mx-auto h-32 w-32 object-cover rounded-lg"
        />
      ) : (
        <div className="space-y-2">
          <Camera className="mx-auto h-12 w-12 text-gray-400" />
          <p className="text-sm text-gray-600">
            Drag & drop a photo here, or click to select one
          </p>
        </div>
      )}
    </div>
  );
}
