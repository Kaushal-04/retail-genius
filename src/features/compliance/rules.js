export const RULES = [
    // --- ACCESSIBILITY ---
    {
        id: 'font-size',
        category: 'Accessibility',
        label: 'Minimum Font Size ≥ 20px',
        validate: (layers) => {
            const smallText = layers
                .filter(l => l.type === 'text')
                .filter(l => l.fontSize < 20);

            return {
                valid: smallText.length === 0,
                message: smallText.length > 0 ? `Found ${smallText.length} text element(s) too small (<20px).` : null
            };
        }
    },
    {
        id: 'contrast',
        category: 'Accessibility',
        label: 'Contrast (WCAG AA)',
        validate: (layers) => {
            // Mock validation for prototype
            return { valid: true };
        }
    },

    // --- COPY RESTRICTIONS (Hard Fails) ---
    {
        id: 'prohibited-copy',
        category: 'Copy',
        label: 'Prohibited Claims',
        description: 'No "discount", "offer", money-back, "win", "T&Cs".',
        validate: (layers) => {
            const fullText = layers.filter(l => l.type === 'text').map(l => l.text.toLowerCase()).join(' ');

            const prohibited = [
                'discount', 'offer', 'money-back', 'money back', 'sale',
                'win', 'competition', 'prize', // Competitions
                't&cs', 'terms apply', '\\*', // Claims/T&Cs (escaping asterisk for regex if needed, here plain string check)
                'green', 'sustainable', 'eco-friendly', // Sustainability
                'charity', 'donate', 'cancer' // Charity
            ];

            const found = prohibited.filter(w => fullText.includes(w));
            return {
                valid: found.length === 0,
                message: found.length > 0 ? `Prohibited words found: ${found.join(', ')}` : null
            };
        }
    },
    {
        id: 'price-callouts',
        category: 'Copy',
        label: 'No Price Callouts',
        description: 'Do not refer to prices/deals.',
        validate: (layers) => {
            const fullText = layers.filter(l => l.type === 'text').map(l => l.text.toLowerCase()).join(' ');
            // Check for currency symbols or "price"
            const hasPrice = /[£$€]/.test(fullText) || fullText.includes('price') || fullText.includes('value');
            return {
                valid: !hasPrice,
                message: hasPrice ? 'Found price reference or currency symbol.' : null
            };
        }
    },

    // --- BRANDING ---
    {
        id: 'tesco-tags',
        category: 'Branding',
        label: 'Correct Tesco Tag',
        description: 'Must contain "Only at Tesco" or "Available at Tesco".',
        validate: (layers) => {
            const fullText = layers.filter(l => l.type === 'text').map(l => l.text.toLowerCase()).join(' ');
            const validTags = ['only at tesco', 'available at tesco', 'selected stores', 'while stocks last'];
            // Simple check: needs at least one valid tag phrase if it's a Tesco ad
            const found = validTags.some(t => fullText.includes(t));
            return {
                valid: found,
                message: !found ? 'Missing required tag like "Available at Tesco"' : null
            };
        }
    },

    // --- ALCOHOL SPECIFIC ---
    {
        id: 'alcohol-drinkaware',
        category: 'Strictness',
        label: 'Alcohol: Drinkaware',
        description: 'Alcohol ads must include "drinkaware.co.uk"',
        validate: (layers, prompt = '') => {
            const isAlcohol = /wine|beer|vodka|gin|whisky|alcohol|spirit|drink/i.test(prompt);
            if (!isAlcohol) return { valid: true }; // Not applicable

            const fullText = layers.filter(l => l.type === 'text').map(l => l.text.toLowerCase()).join(' ');
            const hasLockup = fullText.includes('drinkaware.co.uk') || fullText.includes('drinkaware');

            return {
                valid: hasLockup,
                message: !hasLockup ? 'Alcohol ads must include "drinkaware.co.uk"' : null
            };
        }
    },

    // --- FORMAT / SAFE ZONES ---
    {
        id: 'safe-zones',
        category: 'Format',
        label: 'Social Safe Zones',
        description: 'Stories: 200px top/250px bottom clear.',
        validate: (layers, prompt, format) => {
            if (format !== 'STORY') return { valid: true }; // Only applies to Stories 9:16

            // Canvas height for story is 533 in our scale (representing 1920)
            // Scale factor roughly: 1920 / 533 ≈ 3.6
            // Safe zone top: 200px / 3.6 ≈ 55px
            // Safe zone bottom: 250px / 3.6 ≈ 70px. Bottom Y limit = 533 - 70 = 463

            const TOP_LIMIT = 55;
            const BOTTOM_LIMIT = 463;

            const violations = layers.filter(l => {
                // Check if element overlaps safe zones
                // Simple point check for now (y coordinate)
                if (l.y < TOP_LIMIT) return true;
                // For bottom, need to account for height? Simplified: y > limit
                if (l.y > BOTTOM_LIMIT) return true;
                return false;
            });

            return {
                valid: violations.length === 0,
                message: violations.length > 0 ? 'Elements found in Safe Zones (Top/Bottom).' : null
            };
        }
    }
];

export function validateCreative(layers, prompt, format) {
    return RULES.map(rule => {
        const result = rule.validate(layers, prompt, format);
        return { ...rule, status: result.valid ? 'pass' : 'fail', message: result.message };
    });
}
