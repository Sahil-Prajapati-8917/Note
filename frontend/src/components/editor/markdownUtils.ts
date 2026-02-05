type MarkdownTrigger = {
    pattern: RegExp;
    command: string;
    value?: string;
    offset: number; // how many chars to remove (e.g. '## ' is 3)
};

const triggers: MarkdownTrigger[] = [
    { pattern: /^#\s$/, command: 'formatBlock', value: 'H1', offset: 2 },
    { pattern: /^##\s$/, command: 'formatBlock', value: 'H2', offset: 3 },
    { pattern: /^###\s$/, command: 'formatBlock', value: 'H3', offset: 4 },
    { pattern: /^-\s$/, command: 'insertUnorderedList', offset: 2 },
    { pattern: /^\*\s$/, command: 'insertUnorderedList', offset: 2 },
    { pattern: /^1\.\s$/, command: 'insertOrderedList', offset: 3 },
    { pattern: /^>\s$/, command: 'formatBlock', value: 'BLOCKQUOTE', offset: 2 },
];

export const checkMarkdownTrigger = (text: string): MarkdownTrigger | null => {
    for (const trigger of triggers) {
        if (trigger.pattern.test(text)) {
            return trigger;
        }
    }
    return null;
};

export const checkLinkTrigger = (text: string): { query: string; offset: number } | null => {
    const match = text.match(/\[\[([^[\]]*)$/);
    if (match) {
        return {
            query: match[1],
            offset: match[0].length
        };
    }
    return null;
};
