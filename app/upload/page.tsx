"use client";

import { useState } from "react";

export default function UploadPage() {
  const [file, setFile] = useState<File | null>(null);
  const [url, setUrl] = useState("");

  const handleUpload = async () => {
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    setUrl(data.url);
  };

  return (
    <div className="pt-20 text-gray-700">
      <h1>Upload Gambar</h1>

      <input
        type="file"
        className="border p-2"
        onChange={(e) => setFile(e.target.files?.[0] || null)}
      />

      <button className="bg-green-500" onClick={handleUpload}>Upload</button>

      {url && (
        <div>
          <p>Hasil:</p>
          <img src={url} width={200} height={200} />
        </div>
      )}
    </div>
  );
}