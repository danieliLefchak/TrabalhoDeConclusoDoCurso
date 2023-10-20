import { render } from '@testing-library/react'
import { ListaAnimaisPage } from './index'

test('returnSuccessIfTitleOneExists', () => {
    const { getByText } = render(<ListaAnimaisPage/>);

    expect(getByText('Animais para adoção')).toBeInTheDocument();
})