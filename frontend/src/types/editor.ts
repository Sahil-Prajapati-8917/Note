export interface EditorState {
    isFocused: boolean;
    selection: Selection | null;
}

export type FormatType = 'bold' | 'italic' | 'strikethrough' | 'h1' | 'h2';
