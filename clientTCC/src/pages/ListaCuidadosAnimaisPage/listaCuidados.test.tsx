import { render } from '@testing-library/react'
import { ListaCuidadosAnimaisPage } from './index'

test('returnSuccessIfTitleOneExists', () => {
    const { getByText } = render(<ListaCuidadosAnimaisPage/>);

    expect(getByText('Cuidados com Animais')).toBeInTheDocument();
})