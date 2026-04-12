import React from 'react';
import { Sparkles, Layout, Settings } from 'lucide-react';

export function Header({ view, setView }) {
    return (
        <header className="glass-panel" style={{
            position: 'sticky',
            top: 0,
            zIndex: 50,
            borderRadius: 0,
            borderLeft: 'none',
            borderRight: 'none',
            borderTop: 'none'
        }}>
            <div className="container" style={{ height: '70px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{
                        background: 'linear-gradient(135deg, var(--color-primary), var(--color-accent))',
                        padding: '8px',
                        borderRadius: '8px',
                        display: 'flex'
                    }}>
                        <Sparkles color="white" size={20} fill="white" fillOpacity={0.2} />
                    </div>
                    <h1 style={{ fontSize: '20px', margin: 0 }}>
                        Retail Campaign <span className="primary-gradient">Studio</span>
                    </h1>
                </div>

                <nav style={{ display: 'flex', gap: '24px' }}>
                    <button 
                        onClick={() => setView('input')} 
                        style={{ color: view === 'input' ? 'var(--color-primary)' : 'var(--color-text)', opacity: 1, fontWeight: view === 'input' ? 600 : 500 }}
                    >
                        Generate Poster
                    </button>
                    <button 
                        onClick={() => setView('register_compliance')} 
                        style={{ color: view === 'register_compliance' ? 'var(--color-primary)' : 'var(--color-text)', fontWeight: view === 'register_compliance' ? 600 : 500 }}
                    >
                        Register Compliances
                    </button>
                    <button 
                        onClick={() => setView('edit_compliance')} 
                        style={{ color: view === 'edit_compliance' ? 'var(--color-primary)' : 'var(--color-text)', fontWeight: view === 'edit_compliance' ? 600 : 500 }}
                    >
                        Edit Compliance
                    </button>
                </nav>

                <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                    <button className="glass-button" style={{ width: '36px', height: '36px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Settings size={18} />
                    </button>
                    <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'var(--color-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px', fontWeight: 600 }}>
                        KD
                    </div>
                </div>
            </div>
        </header>
    );
}
