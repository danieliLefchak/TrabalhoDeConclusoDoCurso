import { render } from '@testing-library/react'
import { ListaPrimeiroAnimalPage } from './index'

test('returnSuccessIfTitleOneExists', () => {
    const { getByText } = render(<ListaPrimeiroAnimalPage/>);

    expect(getByText('Primeiro Animal')).toBeInTheDocument();
})