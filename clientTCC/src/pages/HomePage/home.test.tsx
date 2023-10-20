import { render } from '@testing-library/react'
import { HomePage } from './index'
import { MemoryRouter } from 'react-router-dom';

test('returnSuccessIfTitleOneExists', () => {
    const { getByText } = render(<MemoryRouter><HomePage/></MemoryRouter>);

    expect(getByText('Animais para adoção')).toBeInTheDocument();
})

test('returnSuccessIfTitleTwoExists', () => {
    const { getByText } = render(<MemoryRouter><HomePage/></MemoryRouter>);

    expect(getByText('Informações Uteis')).toBeInTheDocument();
})