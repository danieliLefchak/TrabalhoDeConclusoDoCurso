import { render } from '@testing-library/react'
import { ListaLinksDenunciaPage } from './index'

test('returnSuccessIfTitleOneExists', () => {
    const { getByText } = render(<ListaLinksDenunciaPage/>);

    expect(getByText('Links para Denúncia')).toBeInTheDocument();
})