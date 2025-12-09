import React, { useState } from 'react';
import { Header } from './components/layout/Header';
import { CampaignInput } from './features/generator/CampaignInput';
import { CreativeWorkspace } from './features/workspace/CreativeWorkspace';

function App() {
  const [view, setView] = useState('input'); // 'input' | 'workspace'
  const [currentPrompt, setCurrentPrompt] = useState('');

  const handleGenerate = (prompt) => {
    setCurrentPrompt(prompt);
    setView('workspace');
  };

  return (
    <div className="full-screen">
      <Header />
      <main className="container" style={{ flex: 1, padding: '32px 24px', position: 'relative' }}>
        {view === 'input' ? (
          <div style={{ paddingTop: '80px' }}>
            <CampaignInput onGenerate={handleGenerate} />
          </div>
        ) : (
          <CreativeWorkspace prompt={currentPrompt} onBack={() => setView('input')} />
        )}
      </main>
    </div>
  );
}

export default App;
