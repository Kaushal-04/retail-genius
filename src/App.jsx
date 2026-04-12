import React, { useState } from 'react';
import { Header } from './components/layout/Header';
import { CampaignInput } from './features/generator/CampaignInput';
import { CreativeWorkspace } from './features/workspace/CreativeWorkspace';
import { RegisterCompliance } from './features/compliance/RegisterCompliance';
import { EditCompliance } from './features/compliance/EditCompliance';

const DEFAULT_COMPANIES = [
    {
        id: 'tesco',
        name: 'Tesco',
        brandColors: ['#00539f', '#d6001c'],
        compliances: [
            { id: '1', type: 'min-font-size', value: 20 },
            { id: '2', type: 'disallowed-words', value: 'discount, offer, money-back, win, prize, t&cs, green, sustainable, charity' },
            { id: '3', type: 'required-tags', value: 'only at tesco, available at tesco, selected stores' },
            { id: '4', type: 'no-price', value: true }
        ]
    }
];

function App() {
  const [view, setView] = useState('input'); // 'input' | 'workspace' | 'register_compliance' | 'edit_compliance'
  const [currentPrompt, setCurrentPrompt] = useState('');
  const [companies, setCompanies] = useState(DEFAULT_COMPANIES);
  const [currentCompanyId, setCurrentCompanyId] = useState('tesco');

  const handleGenerate = (prompt, companyId) => {
    setCurrentPrompt(prompt);
    setCurrentCompanyId(companyId);
    setView('workspace');
  };

  const handleAddCompany = (newCompany) => {
      setCompanies([...companies, newCompany]);
  };

  const handleUpdateCompany = (updatedCompany) => {
      setCompanies(companies.map(c => c.id === updatedCompany.id ? updatedCompany : c));
  };

  const selectedCompany = companies.find(c => c.id === currentCompanyId) || companies[0];

  return (
    <div className="full-screen">
      <Header view={view} setView={setView} />
      <main className="container" style={{ flex: 1, padding: '32px 24px', position: 'relative' }}>
        {view === 'input' && (
          <div style={{ paddingTop: '80px' }}>
            <CampaignInput companies={companies} onGenerate={handleGenerate} />
          </div>
        )}
        {view === 'workspace' && (
          <CreativeWorkspace prompt={currentPrompt} company={selectedCompany} onBack={() => setView('input')} />
        )}
        {view === 'register_compliance' && (
          <RegisterCompliance onAdd={handleAddCompany} onBack={() => setView('input')} />
        )}
        {view === 'edit_compliance' && (
          <EditCompliance companies={companies} onUpdate={handleUpdateCompany} onBack={() => setView('input')} />
        )}
      </main>
    </div>
  );
}

export default App;
