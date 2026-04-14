import React, { useState } from "react";

export default function DoctorAIAssistant({ patient }: any) {
  const [busy, setBusy] = useState(false);
  const [result, setResult] = useState<string | null>(null);

  const run = async (type: 'diagnostic' | 'plan' | 'notes') => {
    setBusy(true);
    setResult(null);
    // Placeholder: call AI endpoint if available
    setTimeout(() => {
      setBusy(false);
      setResult(`Demo ${type} suggestion for patient ${patient?.prenom || '—'}`);
    }, 900);
  };

  return (
    <div className="p-4 card">
      <h3 className="font-semibold mb-3 accent-text">AI Assistant (demo)</h3>
      <div className="flex flex-col gap-2">
        <button onClick={() => run('diagnostic')} disabled={busy} className="py-2 px-3 rounded accent-btn text-white">Proposer diagnostic</button>
        <button onClick={() => run('plan')} disabled={busy} className="py-2 px-3 rounded border">Proposer plan de traitement</button>
        <button onClick={() => run('notes')} disabled={busy} className="py-2 px-3 rounded border">Générer notes</button>
      </div>
      {busy && <div className="mt-3 text-sm text-gray-500">Génération en cours…</div>}
      {result && <div className="mt-3 p-3 bg-white rounded text-sm text-gray-800">{result}</div>}
    </div>
  );
}
