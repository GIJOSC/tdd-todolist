import { render, screen } from '@testing-library/react'
import App from './App'

describe('<App />', () => {
  it('shoul be able to shw the h1 element', () => {
    render(<App />)
    const element = screen.getByText(/Bem Vindo a Lista de Tarefas/i)

    expect(element).toBeInTheDocument()
  })
})
