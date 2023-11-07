import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { CadAnimaisPage } from './index';
import { localStorageMock } from '../../test/setup';
import AnimaisService from '../../services/AnimaisService';

declare global {
  interface Window {
    matchMedia(query: string): {
      matches: boolean;
      addListener: () => void;
      removeListener: () => void;
    };
  }
}

global.matchMedia = (query: string) => ({
  media: query,
  matches: false,
  onchange: null,
  addListener: jest.fn(),
  removeListener: jest.fn(),
  addEventListener: jest.fn(),
  removeEventListener: jest.fn(),
  dispatchEvent: jest.fn(),
});

//----------- RETORNO DE COMPONENTES -----------
test('renders "Cadastro de Animais" text', () => {
  // Simula o localStorage, definindo um valor válido para testes
  localStorageMock.setItem('user', '{"user": "mockedUser"}');

  render(
    <MemoryRouter>
      <CadAnimaisPage />
    </MemoryRouter>
  );

  const cadTextElement = screen.getByText('Cadastro de Animais');
  expect(cadTextElement).toBeInTheDocument();
});

//----------- INTERAÇÕES COM COMPONENTES -----------
test("Usuário pode preencher o campo Nome", () => {
  const { getByPlaceholderText } = render(
    <MemoryRouter>
      <CadAnimaisPage />
    </MemoryRouter>
  );
  
  const nomeInput = getByPlaceholderText("Digite o nome");
  
  fireEvent.change(nomeInput, { target: { value: "Fido" } });
  
  expect(nomeInput).toHaveValue("Fido");
});

//----------- RETORNO DE FUNÇÕES -----------
jest.mock("../../services/AnimaisService");

test('Ao clicar em "Salvar", a função onClickCadastraAnimais é chamada corretamente', async () => {
  const saveMock = AnimaisService.save as jest.Mock;

  // Definir o retorno da função mock para simular uma resposta de sucesso.
  saveMock.mockResolvedValue({ data: 'Animal cadastrado com sucesso!' });

  // Renderize a página.
  render(
    <MemoryRouter>
      <CadAnimaisPage />
    </MemoryRouter>
  );
  
  // Pega o botão criado no de cadastro de animais. 
  const saveButton = screen.getByText('Salvar');

  // Simula um clique no botão de salvar.
  fireEvent.click(saveButton);

  // Aguarde que a função AnimaisService.save seja chamada.
  await waitFor(() => {
    expect(saveMock).toHaveBeenCalled();
  });

  // Verifique se a notificação de sucesso é exibida.
  const successNotification = await screen.findByText('Animal cadastrado com sucesso!');
  expect(successNotification).toBeInTheDocument();
});