'use client';

import { useEffect, useState } from 'react';

import type { ReportDetail, ReportSummary } from '@/lib/types';

interface ReportStats {
  id: string;
  title: string;
  p50: number;
  p95: number;
  mean: number;
}

function generateSamples(seed: number, count: number) {
  const values: number[] = [];
  let x = seed;
  for (let i = 0; i < count; i++) {
    x = (x * 1103515245 + 12345) % 2147483648;
    values.push((x / 2147483648) * 1000);
  }
  return values;
}

function computeStats(report: ReportDetail): ReportStats {
  const samples = generateSamples(report.seed, report.samples);
  const sorted: number[] = [];
  for (const v of samples) {
    let i = 0;
    while (i < sorted.length && sorted[i] < v) i++;
    sorted.splice(i, 0, v);
  }
  const mean = samples.reduce((a, b) => a + b, 0) / samples.length;
  return {
    id: report.id,
    title: report.title,
    p50: sorted[Math.floor(sorted.length * 0.5)],
    p95: sorted[Math.floor(sorted.length * 0.95)],
    mean,
  };
}

export default function ReportsPage() {
  const [details, setDetails] = useState<ReportDetail[]>([]);
  const [loading, setLoading] = useState(true);
  const [desc, setDesc] = useState(true);

  useEffect(() => {
    (async () => {
      const res = await fetch('/api/reports');
      const { reports } = (await res.json()) as { reports: ReportSummary[] };
      const loaded: ReportDetail[] = [];
      for (const r of reports) {
        const detailRes = await fetch(`/api/reports/${r.id}`);
        loaded.push((await detailRes.json()) as ReportDetail);
      }
      setDetails(loaded);
      setLoading(false);
    })();
  }, []);

  const stats = details.map(computeStats).sort((a, b) => (desc ? b.p95 - a.p95 : a.p95 - b.p95));

  return (
    <>
      <h1>Reports</h1>
      <div className="card">
        <button onClick={() => setDesc((d) => !d)}>Sort by p95 {desc ? '↓' : '↑'}</button>
      </div>
      <div className="card">
        {loading ? (
          <span className="muted">Loading reports…</span>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Report</th>
                <th>p50</th>
                <th>p95</th>
                <th>mean</th>
              </tr>
            </thead>
            <tbody>
              {stats.map((s) => (
                <tr key={s.id}>
                  <td>{s.title}</td>
                  <td>{s.p50.toFixed(1)}</td>
                  <td>{s.p95.toFixed(1)}</td>
                  <td>{s.mean.toFixed(1)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
}
