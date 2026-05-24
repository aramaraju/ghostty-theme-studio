import { create } from 'zustand'

export interface ThemeState {
  name: string
  background: string
  foreground: string
  cursorColor: string
  selectionBackground: string
  selectionForeground: string
  palette: [
    string, string, string, string,
    string, string, string, string,
    string, string, string, string,
    string, string, string, string,
  ]
}

export interface ThemeStore extends ThemeState {
  setName: (name: string) => void
  setBackground: (color: string) => void
  setForeground: (color: string) => void
  setCursorColor: (color: string) => void
  setSelectionBackground: (color: string) => void
  setSelectionForeground: (color: string) => void
  setPaletteColor: (index: number, color: string) => void
  loadTheme: (state: ThemeState) => void
}

export const defaultTheme: ThemeState = {
  name: 'My Theme',
  background: '#1e1e2e',
  foreground: '#cdd6f4',
  cursorColor: '#f5e0dc',
  selectionBackground: '#585b70',
  selectionForeground: '#cdd6f4',
  palette: [
    '#45475a',
    '#f38ba8',
    '#a6e3a1',
    '#f9e2af',
    '#89b4fa',
    '#f5c2e7',
    '#94e2d5',
    '#bac2de',
    '#585b70',
    '#f38ba8',
    '#a6e3a1',
    '#f9e2af',
    '#89b4fa',
    '#f5c2e7',
    '#94e2d5',
    '#a6ef8b',
  ],
}

export const useThemeStore = create<ThemeStore>((set) => ({
  ...defaultTheme,
  setName: (name) => set({ name }),
  setBackground: (color) => set({ background: color }),
  setForeground: (color) => set({ foreground: color }),
  setCursorColor: (color) => set({ cursorColor: color }),
  setSelectionBackground: (color) => set({ selectionBackground: color }),
  setSelectionForeground: (color) => set({ selectionForeground: color }),
  setPaletteColor: (index, color) =>
    set((state) => {
      const palette = [...state.palette] as ThemeState['palette']
      palette[index] = color
      return { palette }
    }),
  loadTheme: (state) => set(state),
}))
