"use client";

import { useMemo, useState } from "react";

type Idea = {
  id: number;
  title: string;
  niche: string;
  score: number;
  trend: string;
  hook: string;
  source: string;
  format: "Short" | "Video";
};

const initialIdeas: Idea[] = [
  { id: 1, title: "The AI feature nobody noticed", niche: "AI & Tech", score: 94, trend: "AI tools are rapidly adding agent-style features.", hook: "Everyone is talking about AI agents—but almost nobody noticed this feature.", source: "Tech news & community discussions", format: "Short" },
  { id: 2, title: "Why your phone may change dramatically next year", niche: "Tech", score: 91, trend: "Foldables, on-device AI and new battery technology are converging.", hook: "Your next phone could look completely different for one surprising reason.", source: "Technology publications", format: "Short" },
  { id: 3, title: "The strange business behind viral apps", niche: "Business", score: 87, trend: "Creator-focused apps are competing for attention with unusual monetization models.", hook: "This app looks free—but here's how it actually makes money.", source: "Business & startup coverage", format: "Video" },
  { id: 4, title: "A space discovery that sounds impossible", niche: "Science", score: 85, trend: "New telescope observations continue to produce surprising findings.", hook: "Scientists found something in space that sounds like science fiction.", source: "Science news", format: "Short" },
  { id: 5, title: "The gaming update players didn't expect", niche: "Gaming", score: 90, trend: "Major games are increasingly using live updates to reshape player experiences.", hook: "Gamers thought this update was going to be boring. They were wrong.", source: "Gaming communities", format: "Short" },
  { id: 6, title: "The forgotten story behind a famous invention", niche: "History", score: 82, trend: "Evergreen history stories with a surprising twist perform well as explainers.", hook: "You know the invention—but probably not the bizarre story behind it.", source: "Historical archives", format: "Video" }
];

const niches = ["All", "AI & Tech", "Tech", "Business", "Science", "Gaming", "History"];

export default function Home() {
  const [niche, setNiche] = useState("All");
  const [query, setQuery] = useState("");
  const [saved, setSaved] = useState<number[]>([]);
  const [selected, setSelected] = useState<Idea | null>(null);

  const ideas = useMemo(() => {
    return initialIdeas.filter(i =>
      (niche === "All" || i.niche === niche) &&
      (i.title.toLowerCase().includes(query.toLowerCase()) || i.trend.toLowerCase().includes(query.toLowerCase()))
    );
  }, [niche, query]);

  function toggleSave(id: number) {
    setSaved(s => s.includes(id) ? s.filter(x => x !== id) : [...s, id]);
  }

  return (
    <main>
      <aside className="sidebar">
        <div className="brand"><span className="brandMark">✦</span><span>TrendSpark</span></div>
        <nav>
          <a className="active">🔥 Discover</a>
          <a>💡 My Ideas</a>
          <a>⭐ Saved <span className="navCount">{saved.length}</span></a>
          <a>📊 Analytics</a>
        </nav>
        <div className="sideCard">
          <div className="sideCardIcon">⚡</div>
          <strong>Build your content engine</strong>
          <p>This prototype is ready for real trend sources and AI.</p>
        </div>
        <div className="profile"><div className="avatar">Y</div><div><strong>Your Creator</strong><small>Free workspace</small></div></div>
      </aside>

      <section className="content">
        <header className="topbar">
          <div>
            <div className="eyebrow">CREATOR INTELLIGENCE</div>
            <h1>Find your next <span>viral idea.</span></h1>
            <p className="subtitle">Discover interesting topics and turn them into Shorts or long-form videos.</p>
          </div>
          <button className="primary" onClick={() => alert("AI generation will be connected in the next build.")}>＋ Generate ideas</button>
        </header>

        <div className="searchRow">
          <div className="search"><span>⌕</span><input value={query} onChange={e => setQuery(e.target.value)} placeholder="Search topics, trends, keywords..." /></div>
          <button className="filter">⚙ Filters</button>
        </div>

        <div className="chips">
          {niches.map(n => <button key={n} className={niche === n ? "chip selected" : "chip"} onClick={() => setNiche(n)}>{n}</button>)}
        </div>

        <div className="sectionHead">
          <div><h2>🔥 Trending opportunities</h2><p>Ranked by potential, freshness and creator appeal.</p></div>
          <span className="live"><i /> Prototype data</span>
        </div>

        <div className="grid">
          {ideas.map((idea) => (
            <article className="card" key={idea.id} onClick={() => setSelected(idea)}>
              <div className="cardTop">
                <span className="tag">{idea.format === "Short" ? "⚡ SHORT" : "🎬 VIDEO"}</span>
                <button className={saved.includes(idea.id) ? "save saved" : "save"} onClick={(e) => { e.stopPropagation(); toggleSave(idea.id); }}>{saved.includes(idea.id) ? "★" : "☆"}</button>
              </div>
              <h3>{idea.title}</h3>
              <p>{idea.trend}</p>
              <div className="score"><div className="scoreRing">{idea.score}</div><div><strong>Potential score</strong><small>Strong opportunity</small></div></div>
              <div className="cardBottom"><span>#{idea.niche.replaceAll(" ", "")}</span><span>View idea →</span></div>
            </article>
          ))}
        </div>

        {ideas.length === 0 && <div className="empty">No ideas match that search yet. Try another topic.</div>}

        <footer>TrendSpark prototype · Next step: connect live sources + AI generation</footer>
      </section>

      {selected && (
        <div className="modalBackdrop" onClick={() => setSelected(null)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <button className="close" onClick={() => setSelected(null)}>×</button>
            <span className="tag">{selected.format === "Short" ? "⚡ SHORT" : "🎬 VIDEO"}</span>
            <h2>{selected.title}</h2>
            <div className="bigScore">{selected.score}<small>/100 potential</small></div>
            <h4>Why it's interesting</h4><p>{selected.trend}</p>
            <h4>Hook</h4><div className="quote">“{selected.hook}”</div>
            <h4>Source area</h4><p>{selected.source}</p>
            <button className="primary full" onClick={() => alert("Script generation will be connected next.")}>✨ Generate script</button>
          </div>
        </div>
      )}
    </main>
  );
}