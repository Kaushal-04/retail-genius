import React, { useState } from 'react';
import { Sparkles, ArrowRight, Wand2 } from 'lucide-react';

const SUGGESTIONS = [
    "Tesco exclusive – new mango drink",
    "Christmas Sale for electronics",
    "Vegan burger launch"
];

export function CampaignInput({ onGenerate }) {
    const [prompt, setPrompt] = useState('');
    const [isGenerating, setIsGenerating] = useState(false);

    const handleGenerate = () => {
        if (!prompt.trim()) return;
        setIsGenerating(true);
        // Simulate API delay
        setTimeout(() => {
            setIsGenerating(false);
            onGenerate(prompt);
        }, 2500);
    };

    return (
        <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
            <h2 style={{ fontSize: '48px', marginBottom: '16px' }}>
                Create compliant ads <br />
                <span className="primary-gradient">in seconds</span>
            </h2>
            <p style={{ color: 'var(--color-text-muted)', fontSize: '18px', marginBottom: '40px' }}>
                Describe your campaign and let AI handle the guidelines.
            </p>

            <div className="glass-panel" style={{ padding: '24px', borderRadius: 'var(--radius-lg)', position: 'relative' }}>
                <textarea
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    placeholder="e.g. New summer collection launch at Tesco, 50% off..."
                    style={{
                        width: '100%',
                        minHeight: '120px',
                        background: 'transparent',
                        border: 'none',
                        fontSize: '18px',
                        resize: 'none',
                        outline: 'none',
                        boxShadow: 'none' // Override default input style for this clean look
                    }}
                />

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '16px', borderTop: '1px solid var(--glass-border)', paddingTop: '16px' }}>
                    <div style={{ display: 'flex', gap: '8px' }}>
                        {SUGGESTIONS.map(s => (
                            <button
                                key={s}
                                onClick={() => setPrompt(s)}
                                style={{
                                    fontSize: '12px',
                                    padding: '6px 12px',
                                    background: 'rgba(255,255,255,0.05)',
                                    borderRadius: '20px',
                                    color: 'var(--color-text-muted)',
                                    border: '1px solid transparent',
                                    transition: 'all 0.2s'
                                }}
                                onMouseEnter={(e) => e.currentTarget.style.borderColor = 'var(--color-primary)'}
                                onMouseLeave={(e) => e.currentTarget.style.borderColor = 'transparent'}
                            >
                                {s}
                            </button>
                        ))}
                    </div>

                    <button
                        className="glass-button"
                        onClick={handleGenerate}
                        disabled={isGenerating}
                        style={{
                            padding: '12px 32px',
                            borderRadius: '30px',
                            fontSize: '16px',
                            fontWeight: 600,
                            background: isGenerating ? 'var(--color-text-muted)' : 'var(--color-primary)',
                            border: 'none',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px',
                            opacity: isGenerating ? 0.7 : 1,
                            cursor: isGenerating ? 'not-allowed' : 'pointer'
                        }}
                    >
                        {isGenerating ? (
                            <>Generating...</>
                        ) : (
                            <>
                                <Wand2 size={18} /> Generate Creatives
                            </>
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
}
