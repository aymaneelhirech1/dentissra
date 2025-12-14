import React, { useState } from "react";

export default function DoctorRadiology({ patient }: any) {
  const [files, setFiles] = useState<any[]>([]);

  const onFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
    const list = e.target.files; if (!list) return;
    const arr = Array.from(list).map((f) => ({ name: f.name, url: URL.createObjectURL(f), file: f }));
    setFiles((s) => [...arr, ...s]);
  };

  const uploadAll = async () => {
    // Placeholder: implement actual upload to backend
    alert(`Uploading ${files.length} files (demo)`);
  };

  return (
    <div className="p-4 card">
      <h3 className="font-semibold mb-3 accent-text">Radiologie / Médias</h3>
      <div className="mb-3">
        <input type="file" multiple accept="image/*,application/pdf" onChange={onFiles} />
      </div>
      <div className="grid grid-cols-2 gap-2 max-h-48 overflow-auto">
        {files.map((f, i) => (
          <div key={i} className="p-2 border rounded bg-white">
            <div className="text-sm font-medium">{f.name}</div>
            <div className="mt-2">
              {f.url && (f.name.endsWith('.pdf') ? (
                <a href={f.url} target="_blank" rel="noreferrer" className="text-indigo-600">Voir PDF</a>
              ) : (
                <img src={f.url} className="w-full h-24 object-cover" />
              ))}
            </div>
          </div>
        ))}
      </div>
      {files.length > 0 && (
        <div className="mt-3">
          <button onClick={uploadAll} className="py-2 px-4 rounded accent-btn text-white">Uploader</button>
        </div>
      )}
    </div>
  );
}
