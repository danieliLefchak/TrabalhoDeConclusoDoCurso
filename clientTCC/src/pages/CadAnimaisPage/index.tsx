import { Button, Card, Form, Input, InputNumber, Select, Upload } from "antd";
import { FileImageOutlined } from '@ant-design/icons';

export function CadAnimaisPage() {
    return(
        <div className="container d-flex justify-content-center">
            <Card id="cardCad" className="mb-3 mt-5">
                <h2 id="cadText" className="text-center mb-5 mt-2">Cadastro de Animais</h2>
                <Form layout="horizontal">
                    <h6 id="cadText" className="text-center mb-5 fw-bolder">Informações para cadastro</h6>
                    <div className="row justify-content-start ms-5"> 
                        <Form.Item className="col-md-5 col-sm-12">
                            <label id="cadText" className="form-label">Nome</label>
                            <Input />
                        </Form.Item>
                        <Form.Item className="col-md-3 col-sm-12">
                            <label id="cadText" className="form-label">Genero</label>
                            <Select>
                                <Select.Option value="fem">Fêmea</Select.Option>
                                <Select.Option value="mac">Macho</Select.Option>
                            </Select>
                        </Form.Item>
                        <Form.Item className="col-md-2 col-sm-12">
                            <label id="cadText" className="form-label me-2">Idade</label>
                            <InputNumber />
                        </Form.Item>
                        <Form.Item className="col-md-5 col-sm-12">
                            <label id="cadText" className="form-label">Doença</label>
                            <Input />
                        </Form.Item>
                        <Form.Item className="col-md-5 col-sm-12">
                            <label id="cadText" className="form-label">Medicações</label>
                            <Input />
                        </Form.Item>
                        <Form.Item className="col-md-5 col-sm-12">
                            <label id="cadText" className="form-label">Personalidade</label>
                            <Input />
                        </Form.Item>
                        <Form.Item className="col-md-5 col-sm-12">
                            <label id="cadText" className="form-label">Espécie</label>
                            <Input />
                        </Form.Item>
                        <Form.Item className="col-md-5 col-sm-12">
                            <label id="cadText" className="form-label">Raça</label>
                            <Input />
                        </Form.Item>
                        <Form.Item className="col-md-5 col-sm-12">
                            <label id="cadText" className="form-label">Porte</label>
                            <Select>
                                <Select.Option value="peq">Pequeno</Select.Option>
                                <Select.Option value="med">Médio</Select.Option>
                                <Select.Option value="gra">Grande</Select.Option>
                            </Select>
                        </Form.Item>
                        <Form.Item className="col-md-5 col-sm-12">
                            <label id="cadText" className="form-label me-2">Imagem</label>
                            <Upload>
                                <Button icon={<FileImageOutlined />}>Carregar Imagem</Button>
                            </Upload>
                        </Form.Item>
                    </div>
                                    
                    <div className="row justify-content-center mt-4">
                        <Form.Item  className="col-2">
                            <button type="submit" className="btn btn-success">Salvar</button>
                        </Form.Item>
                    </div>
                    
                </Form>
            </Card>
        </div>
    );
}