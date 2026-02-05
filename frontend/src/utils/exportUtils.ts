export const downloadFile = (filename: string, content: string, type: string) => {
    const blob = new Blob([content], { type });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
};

 
export const htmlToMarkdown = (html: string): string => {
    let md = html;

    // Headers
    md = md.replace(/<h1>(.*?)<\/h1>/gi, '# $1\n\n');
    md = md.replace(/<h2>(.*?)<\/h2>/gi, '## $1\n\n');
    md = md.replace(/<h3>(.*?)<\/h3>/gi, '### $1\n\n');

    // Bold/Italic
    md = md.replace(/<b>(.*?)<\/b>/gi, '**$1**');
    md = md.replace(/<strong>(.*?)<\/strong>/gi, '**$1**');
    md = md.replace(/<i>(.*?)<\/i>/gi, '*$1*');
    md = md.replace(/<em>(.*?)<\/em>/gi, '*$1*');

    // Links
    md = md.replace(/<a href="(.*?)".*?>(.*?)<\/a>/gi, '[$2]($1)');

    // Lists (Basic support)
    md = md.replace(/<li>(.*?)<\/li>/gi, '- $1\n');
    md = md.replace(/<ul>/gi, '\n');
    md = md.replace(/<\/ul>/gi, '\n');

    // Divs and paragraphs
    md = md.replace(/<div.*?>(.*?)<\/div>/gi, '\n$1');
    md = md.replace(/<p.*?>(.*?)<\/p>/gi, '\n$1\n');
    md = md.replace(/<br\s*\/?>/gi, '\n');

    // HTML Entities match
    md = md.replace(/&nbsp;/g, ' ');
    md = md.replace(/&lt;/g, '<');
    md = md.replace(/&gt;/g, '>');
    md = md.replace(/&amp;/g, '&');

    // Remove remaining tags
    md = md.replace(/<[^>]+>/g, '');

    // Trim multiple newlines
    md = md.replace(/\n\n\n+/g, '\n\n');

    return md.trim();
};
