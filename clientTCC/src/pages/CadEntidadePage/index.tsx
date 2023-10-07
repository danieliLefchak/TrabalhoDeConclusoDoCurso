import { Card, Form, Input, InputNumber, TimePicker } from "antd";
import dayjs from 'dayjs';

export function CadEntidadePage() {
    const format = 'HH:mm';
    return(
        <div className="container d-flex justify-content-center">
            <Card id="cardCad" className="mb-3 mt-5">
                <h2 id="cadText" className="text-center mb-5 mt-2">Cadastro de Entidades</h2>
                <Form layout="horizontal">

                    <h6 id="cadText" className="text-center mb-4 fw-bolder">Informações para login</h6>
                    <div className="row justify-content-center">
                        <Form.Item className="col-md-5 col-sm-12">
                            <label id="cadText" className="form-label">Nome de usuário</label>
                            <Input />
                        </Form.Item>
                        <Form.Item className="col-md-5 col-sm-12">
                            <label id="cadText" className="form-label">Senha</label>
                            <Input />
                        </Form.Item>
                    </div>

                    <h6 id="cadText" className="text-center mb-4 fw-bolder">Informações para cadastro</h6>
                    <div className="row justify-content-start ms-5"> 
                        <Form.Item className="col-md-6 col-sm-12">
                            <label id="cadText" className="form-label">Nome Fantasia</label>
                            <Input />
                        </Form.Item>
                        <Form.Item className="col-md-5 col-sm-12">
                            <label id="cadText" className="form-label">CNPJ</label>
                            <Input />
                        </Form.Item>
                        <Form.Item className="col-md-2 col-sm-12">
                            <label id="cadText" className="form-label">N° casa</label>
                            <InputNumber />
                        </Form.Item>
                        <Form.Item className="col-md-5 col-sm-12">
                            <label id="cadText" className="form-label">Endereço</label>
                            <Input />
                        </Form.Item>
                        <Form.Item className="col-md-4 col-sm-12">
                            <label id="cadText" className="form-label">Bairro</label>
                            <Input />
                        </Form.Item>
                        <Form.Item className="col-md-4 col-sm-12">
                            <label id="cadText" className="form-label">Cidade</label>
                            <Input />
                        </Form.Item>
                        <Form.Item className="col-md-3 col-sm-12">
                            <label id="cadText" className="form-label">Estado</label>
                            <Input />
                        </Form.Item>
                        <Form.Item className="col-md-4 col-sm-12">
                            <label id="cadText" className="form-label">Telefone</label>
                            <Input />
                        </Form.Item>
                        <Form.Item className="col-md-5 col-sm-12">
                            <label id="cadText" className="form-label">E-mail</label>
                            <Input />
                        </Form.Item>
                        <Form.Item className="col-md-6 col-sm-12">
                            <label id="cadText" className="form-label">Mensagem</label>
                            <Input />
                        </Form.Item>
                        <Form.Item className="col-md-3 col-sm-12">
                            <label id="cadText" className="form-label me-2">Hora inicio</label>
                            <TimePicker defaultValue={dayjs('12:08', format)} format={format} />
                        </Form.Item>
                        <Form.Item className="col-md-3 col-sm-12">
                            <label id="cadText" className="form-label me-2">Hora termino</label>
                            <TimePicker defaultValue={dayjs('12:08', format)} format={format} />
                        </Form.Item> 
                    </div>
                                    
                    <div className="row justify-content-center mt-4">
                        <Form.Item  className="col-1">
                            <button type="submit" className="btn btn-success">Salvar</button>
                        </Form.Item>
                    </div>
                    
                </Form>
            </Card>
        </div>
    );
}