import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  isDark:
    localStorage.getItem('theme') === 'dark' ||
    (!localStorage.getItem('theme') &&
      window.matchMedia('(prefers-color-scheme: dark)').matches),
}

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.isDark = !state.isDark
      localStorage.setItem('theme', state.isDark ? 'dark' : 'light')
      document.documentElement.classList.toggle('dark', state.isDark)
    },
    setTheme: (state, action) => {
      state.isDark = action.payload
      localStorage.setItem('theme', state.isDark ? 'dark' : 'light')
      document.documentElement.classList.toggle('dark', state.isDark)
    },
  },
})

export const { toggleTheme, setTheme } = themeSlice.actions
export default themeSlice.reducer
