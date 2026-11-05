'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import type { SearchResult } from '@/lib/types';

export default function SearchPage() {
  const router = useRouter();
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [selected, setSelected] = useState(0);

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }
    fetch(`/api/search?q=${encodeURIComponent(query)}`)
      .then((res) => res.json())
      .then((data: { results: SearchResult[] }) => setResults(data.results));
  }, [query]);

  function openSelected() {
    const item = results[selected];
    router.push(`/products/${item.productId}`);
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelected((i) => Math.min(i + 1, results.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelected((i) => Math.max(i - 1, 0));
    } else if (e.key === 'Enter') {
      openSelected();
    }
  }

  return (
    <>
      <h1>Search</h1>
      <input
        autoFocus
        placeholder="Search products…"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <div className="card" style={{ marginTop: 16 }}>
        {results.length === 0 ? (
          <span className="muted">No results</span>
        ) : (
          <table>
            <tbody>
              {results.map((r, i) => (
                <tr key={r.productId} className={i === selected ? 'active' : undefined} onMouseEnter={() => setSelected(i)} onClick={openSelected}>
                  <td>{r.title}</td>
                  <td className="muted">score {r.score}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
}
