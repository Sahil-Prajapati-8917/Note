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
*   **Folder Organization**: Create and manage custom folders to organize your notes your way.
*   **Note Management**: Create, update, delete, and pin notes with automatic sorting.
*   **Theme System**: Full support for **Light**, **Dark**, and **System** modes. Toggles instantly.
*   **Local Persistence**: Data is safely stored in `localStorage` and persists across reloads.
*   **Search Functionality**: Quick search across all notes and folders.
*   **View Modes**: Toggle between list and grid views for notes.
*   **Keyboard Shortcuts**: Navigate and create at the speed of thought.
*   **Responsive Design**: Optimized for desktop and tablet experiences.

## ⌨️ Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| `Cmd + N` | Create New Note |
| `Cmd + F` | Focus Search Bar |
| `Esc` | Blur / Exit Focus |

## 📐 Architecture & Design

### The "Smart Editor"
The editor is built on native `contentEditable` principles to ensure 0kb bloat and 60fps typing performance.
*   **Floating Toolbar**: Appears *only* when you select text.
*   **Format Support**: Bold, Italic, Strikethrough, Heading 1, Heading 2.
*   **Zero UI Chrome**: No always-on ribbons or buttons.

### Data Model
*   **Notes**: Rich text content with metadata (title, content, folder, pin status, timestamps)
*   **Folders**: Hierarchical organization with system and user-created folders
*   **Sorting**: Flexible sorting by date (asc/desc) or title
*   **State Management**: Redux-free architecture using React Context + useReducer

### Visual Polish (Apple Aesthetic)
We strictly adhere to a "MacOS" visual language:
*   **Vibrancy**: The Sidebar uses `backdrop-filter: blur(20px)` to pull colors from the background.
*   **Golden Accents**: Selection state uses the canonical Apple Notes Yellow (`#eebf46`).
*   **Typography**: System font stack for immediate familiarity.
*   **Glassmorphism**: Modern translucent surfaces with depth and layering.

## 🛠 Tech Stack

*   **Frontend**: React 19.2.0, TypeScript 5.9.3, Vite (rolldown-vite)
*   **Styling**: Vanilla CSS Variables (No frameworks, pure control)
*   **State Management**: React Context + `useReducer` (Redux-free)
*   **Icons**: Lucide React + Custom SVG system
*   **Build Tools**: Vite with TypeScript compilation
*   **Linting**: ESLint with React hooks and refresh plugins

## 📦 Project Structure

```bash
frontend/
├── src/
│   ├── components/
│   │   ├── app/           # AppShell, AppLayout
│   │   ├── editor/        # Editor, FloatingToolbar
│   │   ├── sidebar/       # Sidebar, NoteList, SidebarHeader
│   │   ├── theme/         # ThemeToggle
│   │   ├── toolbar/       # Toolbar
│   │   └── ui/            # Button, Divider, Icons, Input
│   ├── lib/               # Custom hooks (useEditor, useShortcuts, useTheme)
│   ├── store/             # AppContext, actions, appReducer
│   ├── styles/            # Global CSS (layout, reset, variables)
│   ├── types/             # TypeScript interfaces (editor, note, theme)
│   ├── utils/             # Utility functions (dateGrouping)
│   ├── App.tsx            # Main app component
│   └── main.tsx           # Entry point
├── public/                # Static assets
├── index.html             # HTML template
└── package.json           # Dependencies and scripts
```

## ⚡️ Getting Started

### Prerequisites
*   Node.js (v16 or higher)
*   npm or yarn

### Installation & Development

1.  **Install dependencies**:
    ```bash
    npm install
    ```

2.  **Start the development server**:
    ```bash
    npm run dev
    ```
    The app will be available at `http://localhost:5173`

3.  **Build for production**:
    ```bash
    npm run build
    ```

4.  **Preview production build**:
    ```bash
    npm run preview
    ```

5.  **Run linting**:
    ```bash
    npm run lint
    ```

### Available Scripts
*   `npm run dev` - Start development server with hot reload
*   `npm run build` - Build for production (TypeScript compilation + Vite build)
*   `npm run preview` - Preview production build locally
*   `npm run lint` - Run ESLint for code quality checks

## 🔧 Key Components & Features

### Data Persistence
*   All data is stored in `localStorage` for immediate offline access
*   Automatic state hydration on app initialization
*   No backend required - fully client-side application

### Theme System
*   **Light Mode**: Clean, bright interface for daytime use
*   **Dark Mode**: Easy on the eyes for nighttime work
*   **System Mode**: Automatically follows OS preference

### Folder System
*   **System Folders**: All Notes, pinned notes (non-deletable)
*   **User Folders**: Custom folders for personal organization
*   **Smart Organization**: Notes automatically sorted and grouped

### Search & Navigation
*   Real-time search across note titles and content
*   Keyboard navigation support
*   Quick folder switching

## 🗺 Feature Roadmap (Status: Complete)

- [x] **Phase 1**: Foundation & Design System
- [x] **Phase 2**: Core Layout (3-Pane View)
- [x] **Phase 3**: Data Model & State Management
- [x] **Phase 4**: Smart Editor (Floating Toolbar)
- [x] **Phase 5**: Persistence (LocalStorage)
- [x] **Phase 6**: Design Polish (Glassmorphism, Icons)
- [x] **Phase 7**: Production Features (Shortcuts, Folders, Search)

## 🎯 Performance Optimizations

*   **0kb Editor Bloat**: Native contentEditable implementation
*   **60fps Typing**: Optimized rendering and state updates
*   **Lazy Loading**: Components load only when needed
*   **Efficient State Management**: Minimal re-renders with React Context

## 🌟 Browser Compatibility

*   Chrome/Edge 90+
*   Firefox 88+
*   Safari 14+
*   (Requires modern CSS features like backdrop-filter)

---

*Designed for the thinkers.*
