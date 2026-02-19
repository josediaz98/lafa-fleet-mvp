import { useState, type RefObject, useCallback } from 'react';
import { Upload } from 'lucide-react';
import { useActionContext } from '@/lib/action-context';
import DemoTemplateCards from './DemoTemplateCards';

interface UploadStepProps {
  fileRef: RefObject<HTMLInputElement | null>;
  onFileSelect: (file: File) => void;
}

export default function UploadStep({ fileRef, onFileSelect }: UploadStepProps) {
  const ctx = useActionContext();
  const [dragging, setDragging] = useState(false);

  // Callback ref bridges RefObject<HTMLInputElement | null> to the DOM ref prop
  const setInputRef = useCallback(
    (node: HTMLInputElement | null) => {
      (fileRef as React.MutableRefObject<HTMLInputElement | null>).current =
        node;
    },
    [fileRef],
  );

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    onFileSelect(file);
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files[0];
    if (file && file.name.endsWith('.csv')) {
      onFileSelect(file);
    } else {
      ctx.showToast('error', 'Solo se aceptan archivos .csv');
    }
  }

  return (
    <div className="flex flex-col items-center justify-center py-8">
      <div
        onClick={() => fileRef.current?.click()}
        onDragOver={(e) => {
          e.preventDefault();
          setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={handleDrop}
        className={`w-full max-w-lg border-2 border-dashed rounded-xl p-8 flex flex-col items-center gap-3 cursor-pointer transition-colors duration-150 ${
          dragging
            ? 'border-lafa-accent bg-lafa-accent/5'
            : 'border-lafa-border hover:border-lafa-accent/50'
        }`}
      >
        <div className="w-10 h-10 rounded-full bg-lafa-accent/10 flex items-center justify-center">
          <Upload size={20} className="text-lafa-accent" />
        </div>
        <div className="text-center">
          <p className="text-sm font-medium text-lafa-text-primary mb-1">
            Arrastra tu archivo CSV aqu{'i'}, o haz click para seleccionar
          </p>
          <p className="text-xs text-lafa-text-secondary">
            Formato DiDi: Driver ID, Date, Trip ID, Initial time, Final time,
            Cost, Tip · Max 20 MB
          </p>
        </div>
      </div>
      <input
        ref={setInputRef}
        type="file"
        accept=".csv"
        className="hidden"
        onChange={handleFileChange}
      />
      <DemoTemplateCards />
    </div>
  );
}
