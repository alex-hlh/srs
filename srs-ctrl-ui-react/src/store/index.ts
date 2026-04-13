import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import type { User, MenuItem } from '@/types'

interface AppState {
  sidebarCollapsed: boolean
  setSidebarCollapsed: (collapsed: boolean) => void
  toggleSidebar: () => void
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      sidebarCollapsed: false,
      setSidebarCollapsed: (collapsed) => set({ sidebarCollapsed: collapsed }),
      toggleSidebar: () => set((state) => ({ sidebarCollapsed: !state.sidebarCollapsed })),
    }),
    { name: 'app-storage', storage: createJSONStorage(() => localStorage) }
  )
)

interface UserState {
  token: string | null
  userInfo: User | null
  menus: MenuItem[]
  setToken: (token: string | null) => void
  setUserInfo: (user: User | null) => void
  setMenus: (menus: MenuItem[]) => void
  logout: () => void
}

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      token: null,
      userInfo: null,
      menus: [],
      setToken: (token) => set({ token }),
      setUserInfo: (userInfo) => set({ userInfo }),
      setMenus: (menus) => set({ menus }),
      logout: () => set({ token: null, userInfo: null, menus: [] }),
    }),
    { name: 'user-storage', storage: createJSONStorage(() => localStorage) }
  )
)
