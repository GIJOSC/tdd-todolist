import { fireEvent, getByTestId, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Todo from '../components/Todo'

describe('<Todo />', () => {
  it('should be able to add new todo ', () => {
    const { container } = render(<Todo />)

    const input = screen.getByPlaceholderText(/compras/i)
    const form = screen.getByRole('form')

    userEvent.type(input, 'Fazer Minhas Tarefas de casa')
    fireEvent.submit(form)

    screen.debug(container)

    expect(
      screen.getByTestId('Fazer minhas tarefas de casa')
    ).toBeInTheDocument()
  })

  it('should be able to list three todo', () => {
    render(<Todo />)

    const input = screen.getByPlaceholderText(/compras/i)
    const form = screen.getByRole('form')

    fireEvent.change(input, { target: { value: 'Café' } })
    fireEvent.submit(form)
    fireEvent.change(input, { target: { value: 'Leite' } })
    fireEvent.submit(form)
    fireEvent.change(input, { target: { value: 'Nescau' } })
    fireEvent.submit(form)

    const todoList = screen.getByTestId('ul-todos')

    const listaItems = screen.getAllByRole('listitem')

    expect(todoList.children.length).toBe(3)

    expect(listaItems.length).toBe(3)
  })

  it('should be able to delete one todo', () => {
    render(<Todo />)

    const input = screen.getByPlaceholderText(/compas/i)
    const form = screen.getByRole('form')

    userEvent.type(input, 'Nescau')
    fireEvent.submit(form)

    expect(screen.getByTestId('Nescau')).toBeTruthy()

    const buttonDelete = screen.getByTestId('Nescau-btn-delete')
    userEvent.click(buttonDelete)

    expect(screen.queryByTestId('Nescau')).toBeNull()
  })
})
