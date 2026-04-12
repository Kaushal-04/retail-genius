import React, { useState, useEffect } from 'react';

export function EditCompliance({ companies, onUpdate, onBack }) {
    const [selectedId, setSelectedId] = useState(companies[0]?.id || '');
    
    // Form state
    const [name, setName] = useState('');
    const [minFont, setMinFont] = useState(20);
    const [disallowed, setDisallowed] = useState('');
    const [tags, setTags] = useState('');
    const [noPrice, setNoPrice] = useState(false);

    useEffect(() => {
        const company = companies.find(c => c.id === selectedId);
        if (company) {
            setName(company.name);
            
            const fontRule = company.compliances.find(r => r.type === 'min-font-size');
            setMinFont(fontRule ? fontRule.value : 0);
            
            const disRule = company.compliances.find(r => r.type === 'disallowed-words');
            setDisallowed(disRule ? disRule.value : '');
            
            const tagsRule = company.compliances.find(r => r.type === 'required-tags');
            setTags(tagsRule ? tagsRule.value : '');
            
            const priceRule = company.compliances.find(r => r.type === 'no-price');
            setNoPrice(priceRule ? priceRule.value : false);
        }
    }, [selectedId, companies]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const company = companies.find(c => c.id === selectedId);
        if (!company) return;

        const updatedCompany = { ...company, name: name.trim(), compliances: [] };

        if (minFont > 0) updatedCompany.compliances.push({ id: '1', type: 'min-font-size', value: minFont });
        if (disallowed.trim()) updatedCompany.compliances.push({ id: '2', type: 'disallowed-words', value: disallowed });
        if (tags.trim()) updatedCompany.compliances.push({ id: '3', type: 'required-tags', value: tags });
        if (noPrice) updatedCompany.compliances.push({ id: '4', type: 'no-price', value: true });

        onUpdate(updatedCompany);
        onBack();
    };

    return (
        <div style={{ maxWidth: '600px', margin: '0 auto' }}>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '24px' }}>
                <button onClick={onBack} style={{ background: 'none', border: 'none', color: 'var(--color-text-muted)', cursor: 'pointer', marginRight: '16px' }}>&larr; Back</button>
                <h2 style={{ fontSize: '24px' }}>Edit Company Compliance</h2>
            </div>
            
            <div className="glass-panel" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '20px', marginBottom: '24px' }}>
                <div>
                    <label style={{ display: 'block', marginBottom: '8px', color: 'var(--color-text-muted)' }}>Select Company to Edit</label>
                    <select 
                        value={selectedId}
                        onChange={e => setSelectedId(e.target.value)}
                        style={{ width: '100%', padding: '10px', background: 'rgba(0,0,0,0.2)', border: '1px solid var(--glass-border)', color: 'white', borderRadius: '4px' }}
                    >
                        {companies.map(c => (
                            <option key={c.id} value={c.id} style={{ color: 'black' }}>{c.name}</option>
                        ))}
                    </select>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="glass-panel" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <div>
                    <label style={{ display: 'block', marginBottom: '8px', color: 'var(--color-text-muted)' }}>Company Name</label>
                    <input 
                        type="text" 
                        value={name} 
                        onChange={e => setName(e.target.value)} 
                        style={{ width: '100%', padding: '10px', background: 'rgba(0,0,0,0.2)', border: '1px solid var(--glass-border)', color: 'white', borderRadius: '4px' }}
                        required
                    />
                </div>
                
                <div>
                    <label style={{ display: 'block', marginBottom: '8px', color: 'var(--color-text-muted)' }}>Minimum Font Size (px)</label>
                    <input 
                        type="number" 
                        value={minFont} 
                        onChange={e => setMinFont(parseInt(e.target.value) || 0)} 
                        style={{ width: '100%', padding: '10px', background: 'rgba(0,0,0,0.2)', border: '1px solid var(--glass-border)', color: 'white', borderRadius: '4px' }}
                    />
                </div>
                
                <div>
                    <label style={{ display: 'block', marginBottom: '8px', color: 'var(--color-text-muted)' }}>Disallowed Words (comma separated)</label>
                    <textarea 
                        value={disallowed} 
                        onChange={e => setDisallowed(e.target.value)} 
                        placeholder="discount, offer, sale"
                        style={{ width: '100%', padding: '10px', background: 'rgba(0,0,0,0.2)', border: '1px solid var(--glass-border)', color: 'white', borderRadius: '4px', minHeight: '60px' }}
                    />
                </div>
                
                <div>
                    <label style={{ display: 'block', marginBottom: '8px', color: 'var(--color-text-muted)' }}>Required Tags (comma separated, one must match)</label>
                    <textarea 
                        value={tags} 
                        onChange={e => setTags(e.target.value)} 
                        placeholder="only at target, available at target"
                        style={{ width: '100%', padding: '10px', background: 'rgba(0,0,0,0.2)', border: '1px solid var(--glass-border)', color: 'white', borderRadius: '4px', minHeight: '60px' }}
                    />
                </div>
                
                <div>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--color-text-muted)' }}>
                        <input 
                            type="checkbox" 
                            checked={noPrice} 
                            onChange={e => setNoPrice(e.target.checked)} 
                        />
                        Disallow Price Callouts (no $ or £ symbols, no 'price' words)
                    </label>
                </div>

                <div style={{ marginTop: '16px' }}>
                    <button type="submit" className="glass-button" style={{ padding: '10px 24px', background: 'var(--color-primary)', border: 'none', borderRadius: '4px', color: 'white', cursor: 'pointer', fontWeight: 'bold' }}>
                        Update Compliance
                    </button>
                </div>
            </form>
        </div>
    );
}
