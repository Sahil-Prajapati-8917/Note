# Nebula Notes 2.0 🌌

> A calm, intelligent, and beautifully minimal note-taking experience inspired by Apple Notes.
> **Production Ready Build (V1)**

Nebula Notes is a **distraction-free, premium note-taking app** designed for deep thinking. It replicates the best parts of the macOS "Notes" experience on the web: native feel, instant interactions, and zero clutter.

## ✨ Core Philosophy

*   **Content first, UI second**: Features appear only when needed.
*   **Invisible Power**: Functionality that helps without noise.
*   **Premium Feel**: Smooth animations, soft surfaces, and glassmorphism behaviors.

## 🚀 Production Features

*   **Smart Editor**: A native, lag-free writing canvas with a logical floating toolbar.
*   **Contextual Organization**: Notes are automatically grouped by time (**Today**, **Previous 7 Days**, etc.) with sticky headers.
*   **Theme System**: Full support for **Light**, **Dark**, and **System** modes. Toggles instantly.
*   **Local Persistence**: Data is safely stored in `localStorage` and persists across reloads.
*   **Keyboard Shortcuts**: Navigate and create at the speed of thought.

## ⌨️ Keyboard Shortcuts

| Shortcut | Action |
|All|All|
| `Cmd + N` | Create New Note |
| `Cmd + F` | Focus Search Bar |
| `Esc` | Blur / Exit Focus |

## 📐 Architecture & Design

### The "Smart Editor"
The editor is built on native `contentEditable` principles to ensure 0kb bloat and 60fps typing performance.
*   **Floating Toolbar**: Appears *only* when you select text.
*   **Format Support**: Bold, Italic, Strikethrough, Heading 1, Heading 2.
*   **Zero UI Chrome**: No always-on ribbons or buttons.

### Visual Polish (Apple Aesthetic)
We strictly adhere to a "MacOS" visual language:
*   **Vibrancy**: The Sidebar uses `backdrop-filter: blur(20px)` to pull colors from the background.
*   **Golden Accents**: Selection state uses the canonical Apple Notes Yellow (`#eebf46`).
*   **Typography**: System font stack for immediate familiarity.

## 🛠 Tech Stack

*   **Frontend**: React 19, TypeScript, Vite
*   **Styling**: Vanilla CSS Variables (No frameworks, pure control)
*   **State**: React Context + `useReducer` (Redux-free)
*   **Icons**: Custom SVG system (SF Symbols clones)

## 📦 Project Structure

```bash
src/
├── components/
│   ├── layout/       # Sidebar, NoteList, Editor
│   └── ui/           # Icons, FloatingToolbar
├── store/            # Global State & Persistence
├── styles/           # Global CSS variables & Reset
├── types/            # TypeScript interfaces
└── hooks/            # useShortcuts
```

## ⚡️ Getting Started

1.  **Install dependencies**:
    ```bash
    npm install
    ```

2.  **Start the app**:
    ```bash
    npm run dev
    ```

3.  **Build for production**:
    ```bash
    npm run build
    ```

## 🗺 Feature Roadmap (Status: Complete)

- [x] **Phase 1**: Foundation & Design System
- [x] **Phase 2**: Core Layout (3-Pane View)
- [x] **Phase 3**: Data Model & State Management
- [x] **Phase 4**: Smart Editor (Floating Toolbar)
- [x] **Phase 5**: Persistence (LocalStorage)
- [x] **Phase 6**: Design Polish (Glassmorphism, Icons)
- [x] **Phase 7**: Production Features (Shortcuts, Grouping)

---

*Designed for the thinkers.*
