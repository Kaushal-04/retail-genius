export function validateCreative(layers, prompt, format, company) {
    if (!company || !company.compliances) return [];

    const results = [];
    const fullText = layers.filter(l => l.type === 'text').map(l => l.text.toLowerCase()).join(' ');

    company.compliances.forEach(rule => {
        let valid = true;
        let message = null;

        switch (rule.type) {
            case 'min-font-size': {
                const minSize = parseInt(rule.value, 10);
                const smallText = layers
                    .filter(l => l.type === 'text')
                    .filter(l => l.fontSize < minSize);
                valid = smallText.length === 0;
                if (!valid) message = `Found ${smallText.length} text element(s) too small (<${minSize}px).`;
                results.push({ id: rule.id, label: `Minimum Font Size ≥ ${minSize}px`, description: `Ensure text is at least ${minSize}px`, valid, message });
                break;
            }
            case 'disallowed-words': {
                const words = (rule.value || '').split(',').map(w => w.trim().toLowerCase()).filter(w => w);
                const found = words.filter(w => fullText.includes(w));
                valid = found.length === 0;
                if (!valid) message = `Prohibited words found: ${found.join(', ')}`;
                results.push({ id: rule.id, label: 'Prohibited Claims', description: `No: ${words.join(', ')}`, valid, message });
                break;
            }
            case 'required-tags': {
                const tags = (rule.value || '').split(',').map(t => t.trim().toLowerCase()).filter(t => t);
                const found = tags.some(t => fullText.includes(t));
                valid = found || tags.length === 0; // if no tags specified, valid
                if (!valid) message = `Missing required tag like "${tags[0]}"`;
                results.push({ id: rule.id, label: 'Required Branding Tag', description: `Must contain one of: ${tags.join(', ')}`, valid, message });
                break;
            }
            case 'no-price': {
                if (rule.value) {
                    const hasPrice = /[£$€]/.test(fullText) || fullText.includes('price') || fullText.includes('value');
                    valid = !hasPrice;
                    if (!valid) message = 'Found price reference or currency symbol.';
                    results.push({ id: rule.id, label: 'No Price Callouts', description: 'Do not refer to prices/deals.', valid, message });
                }
                break;
            }
            default:
                break;
        }
    });

    // Add safe-zones manually since it's global for the format
    if (format === 'STORY') {
        const TOP_LIMIT = 55;
        const BOTTOM_LIMIT = 463;
        const violations = layers.filter(l => l.y < TOP_LIMIT || l.y > BOTTOM_LIMIT);
        results.push({
            id: 'safe-zones',
            label: 'Social Safe Zones',
            description: 'Stories: Elements must be within safe zones.',
            valid: violations.length === 0,
            message: violations.length > 0 ? 'Elements found in Safe Zones (Top/Bottom).' : null
        });
    }

    return results.map(r => ({ ...r, status: r.valid ? 'pass' : 'fail' }));
}

