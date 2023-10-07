import { Card, Form, Input } from "antd";
import {  } from "react-router-dom";

export function LoginPage(){
    return(
        <div className="container altura-rem d-flex justify-content-center align-items-center">
            <Card id="cardCadLogin">
                <h2 id="cadText" className="text-center mb-5 mt-2">Login</h2>
                <Form layout="horizontal">

                    <h6 id="cadText" className="text-center mb-5 fw-bolder">Informações para login</h6>
                    <div className="row justify-content-center">
                        <Form.Item className="col-6">
                            <label id="cadText" className="form-label">Nome de usuário</label>
                            <Input />
                        </Form.Item>
                    </div>
                    <div className="row justify-content-center">
                        <Form.Item className="col-6">
                            <label id="cadText" className="form-label">Senha</label>
                            <Input />
                        </Form.Item>
                    </div>               
                </Form>
            </Card>
        </div>
    )
}