# Nebula Notes 📓

> A calm, intelligent, and beautifully minimal note-taking experience inspired by Apple Notes.

Nebula Notes is a **distraction-free, premium note-taking app** designed for deep thinking, long writing, and structured ideas. Unlike quick-capture tools, this app focuses on elegant organization and a rich, quiet writing environment.

## ✨ Core Philosophy

*   **Content first, UI second**: Features appear only when needed.
*   **Invisible Power**: Functionality that helps without noise.
*   **Premium Feel**: Smooth animations, soft surfaces, and thoughtful typography.

## 🚀 Features

*   **Smart Editor**: A distraction-free canvas (currently V1).
*   **Folder Organization**: Nestable folders for Personal, Work, and Ideas.
*   **Instant Search**: Filter notes by title or content in real-time.
*   **Dynamic Theme**: Native-feeling Light and Dark modes.
*   **Local First**: Data is stored locally (Mock data currently for the prototype phase).

## compass User Experience Flow

Nebula Notes follows a calm, predictable interaction model inspired by Apple’s Human Interface Guidelines.

### App Launch
*   The app opens to the last active folder.
*   The most recently edited note is auto-selected.
*   The editor is immediately ready for typing without extra clicks.

### Creating a Note
1.  User clicks **“New Note”** or uses a keyboard shortcut.
2.  A blank note opens instantly in the editor.
3.  Cursor is placed in the title field by default.
4.  The note is auto-saved as the user types.

> There is no explicit save action. Persistence is silent and continuous.

### Navigating Notes
*   Selecting a note from the list updates the editor instantly.
*   No page reloads or transitions that break focus.
*   Active note state is visually subtle, not aggressive.

### Writing Experience
*   The editor behaves like a canvas, not a form.
*   Formatting controls are hidden by default.
*   Toolbar appears only when text is selected.

## ✍️ Editor Architecture & Behavior

The editor is the heart of Nebula Notes and is designed to disappear while writing.

### Core Principles
*   **Zero typing lag**
*   **No visible UI chrome while idle**
*   **Predictable cursor behavior**
*   **Consistent spacing and rhythm**

### Formatting Behavior
*   Inline formatting (bold, italic, underline)
*   Headings adjust spacing automatically
*   Lists continue intelligently on new lines
*   Pasting content normalizes styles to match the editor

**Formatting UI Rules:**
*   Hidden when editor is idle
*   Appears near selection
*   Dismisses automatically on blur or escape

## 🛠 Tech Stack

*   **Frontend**: React 19, TypeScript, Vite
*   **Styling**: Vanilla CSS Variables (No frameworks, for maximum control)
*   **State Management**: React Context + useReducer (Scalable, Redux-free)
*   **Design System**: Custom "Apple-inspired" tokens

## 📦 Project Structure

```bash
src/
├── components/
│   ├── layout/       # Sidebar, NoteList, Editor
│   └── ui/           # Reusable atoms
├── store/            # Global State (Context + Reducer)
├── styles/           # Global CSS variables
├── types/            # TypeScript interfaces (Note, Folder)
└── App.tsx           # Main application entry
```

## 🧠 State Management Strategy

Nebula Notes uses a centralized state model based on **React Context + useReducer** to ensure predictability and scalability.

### Why Context + Reducer?
*   Clear data flow
*   No external dependencies
*   Easy to reason about
*   Future-ready for persistence layers

### Global State Responsibilities
*   Active folder tracking
*   Active note selection
*   Notes CRUD operations
*   UI state (theme, focus mode)

### Example State Shape
```ts
interface AppState {
  folders: Folder[];
  notes: Note[];
  activeFolderId: string | null;
  activeNoteId: string | null;
  theme: "light" | "dark";
}
```
State updates are handled via explicit actions to avoid accidental mutations.

## 🎨 Design System & Styling Approach

Nebula Notes uses a **token-driven design system** inspired by Apple’s visual language.

### Design Tokens
All visual values are defined as CSS variables:
*   Colors
*   Typography
*   Spacing
*   Border radius
*   Shadows

**Example:**
```css
:root {
  --bg-app: #ffffff;
  --text-primary: #1c1c1e;
  --text-secondary: #8e8e93;
  --accent-color: #dfb236;
  --shadow-soft: 0 4px 6px rgba(0, 0, 0, 0.06);
}
```

### Theme Switching
*   Light and Dark themes share the same token names.
*   Only values change, not structure.
*   This ensures consistent UI across themes.

> No hardcoded colors are used in components.

## 💾 Data Persistence Strategy

Nebula Notes follows a **Local First** architecture.

### Phase 1 (Current)
*   In-memory state
*   Mock data for development
*   No persistence

### Phase 2
*   LocalStorage persistence
*   Auto-hydration on app load
*   Graceful fallback if storage fails

### Phase 3
*   Optional backend sync
*   Conflict-free updates
*   Offline-first behavior

Data ownership always remains with the user.

## 🧪 Non-Functional Requirements

*   **Editor input latency**: < 16ms
*   **Zero layout shift** during typing
*   Smooth **60fps scrolling**
*   Accessible **keyboard navigation**
*   **Screen reader friendly** structure

## ⚡️ Getting Started

1.  **Install dependencies**:
    ```bash
    npm install
    ```

2.  **Start the development server**:
    ```bash
    npm run dev
    ```

3.  **Build for production**:
    ```bash
    npm run build
    ```

## 🗺 Roadmap

- [x] **Phase 1**: Foundation & Design System (Apple-like Theme)
- [x] **Phase 2**: Core Layout (3-Pane View)
- [x] **Phase 3**: Data Model & State Management
- [ ] **Phase 4**: Advanced Rich Text Editor (Floating toolbar, formatting)
- [ ] **Phase 5**: Persistence (Local Storage / Backend)

---

*Designed for the thinkers.*
