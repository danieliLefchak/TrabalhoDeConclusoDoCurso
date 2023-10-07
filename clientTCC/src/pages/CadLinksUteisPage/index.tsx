import { Card, Form, Input, Select } from "antd";

export function CadLinksUteisPage() {
    return(
        <div className="container altura-rem d-flex justify-content-center">
            <Card id="cardCad" className="mb-3 mt-5">
                <h2 id="cadText" className="text-center mb-5 mt-2">Cadastro de Links Uteis</h2>
                <Form layout="horizontal">
                    <h6 id="cadText" className="text-center mb-5 fw-bolder">Informações para cadastro</h6>
                    <div className="row justify-content-start ms-5"> 
                        <Form.Item className="col-md-5 col-sm-12">
                            <label id="cadText" className="form-label">Link</label>
                            <Input />
                        </Form.Item>
                        <Form.Item className="col-md-5 col-sm-12">
                            <label id="cadText" className="form-label">Título</label>
                            <Input />
                        </Form.Item>
                        <Form.Item className="col-md-5 col-sm-12">
                            <label id="cadText" className="form-label">Descrição</label>
                            <Input />
                        </Form.Item>
                        <Form.Item className="col-md-5 col-sm-12">
                            <label id="cadText" className="form-label">Categoria</label>
                            <Select>
                                <Select.Option value="primeiro_animal">Primeiro animal</Select.Option>
                                <Select.Option value="links_denuncia">Links para denuncia</Select.Option>
                                <Select.Option value="cuidados_animais">Cuidados com animais</Select.Option>
                            </Select>
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
    )
}