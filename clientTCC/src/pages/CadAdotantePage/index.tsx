import { Card, DatePicker, Form, Input, InputNumber, Select } from "antd";

export function CadAdotantesPage() {

    return(
        <>
            <div className="container">
                <Card id="cardCad" className="mb-3 mt-3">
                    <h2 id="cadText" className="text-center mb-5 mt-2">Cadastro de adotantes</h2>
                    <Form layout="horizontal">

                        <h6 id="cadText" className="text-center mb-4 fw-bolder">Informações para login</h6>
                        <div className="row justify-content-center">
                            <Form.Item className="col-3">
                                <label id="cadText" className="form-label">Nome de usuário</label>
                                <Input />
                            </Form.Item>
                            <Form.Item className="col-3">
                                <label id="cadText" className="form-label">Senha</label>
                                <Input />
                            </Form.Item>
                        </div>

                        <h6 id="cadText" className="text-center mb-4 fw-bolder">Informações para cadastro</h6>
                        <div className="row justify-content-start ms-5"> 
                            <Form.Item className="col-4">
                                <label id="cadText" className="form-label">Nome completo</label>
                                <Input />
                            </Form.Item>
                            <Form.Item className="col-5">
                                <label id="cadText" className="form-label">E-mail</label>
                                <Input />
                            </Form.Item>
                            <Form.Item className="col-2">
                                <label id="cadText" className="form-label">Data de nascimento</label>
                                <DatePicker />
                            </Form.Item>
                            <Form.Item className="col-4">
                                <label id="cadText" className="form-label">Rua</label>
                                <Input />
                            </Form.Item>
                            <Form.Item className="col-3">
                                <label id="cadText" className="form-label">Bairro</label>
                                <Input />
                            </Form.Item>
                            <Form.Item className="col-3">
                                <label id="cadText" className="form-label">Cidade</label>
                                <Input />
                            </Form.Item>
                            <Form.Item className="col-1">
                                <label id="cadText" className="form-label">N°</label>
                                <InputNumber />
                            </Form.Item>
                            <Form.Item className="col-2">
                                <label id="cadText" className="form-label">Estado</label>
                                <Input />
                            </Form.Item>
                            <Form.Item className="col-3">
                                <label id="cadText" className="form-label">Profissão</label>
                                <Input />
                            </Form.Item>
                            <Form.Item className="col-2">
                                <label id="cadText" className="form-label">Possui animais</label>
                                <Select>
                                    <Select.Option value="sim">Sim</Select.Option>
                                    <Select.Option value="nao">Não</Select.Option>
                                </Select>
                            </Form.Item>
                            <Form.Item className="col-3">
                                <label id="cadText" className="form-label">Especie dos animais</label>
                                <Input />
                            </Form.Item>
                            <Form.Item className="col-2">
                                <label id="cadText" className="form-label">Quantos animais</label>
                                <InputNumber />
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
        </>
    )
}