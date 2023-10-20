import { Card, Form, Input } from "antd";
import { ChangeEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserLogin } from "../../commons/interfaces";
import AuthService from "../../services/AuthService";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export function LoginPage(){
    const [form, setForm] = useState({
        username: "",
        password: "",
      });

      const navigate = useNavigate();
    
      const onChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { value, name } = event.target;
        setForm((previousForm) => {
          return {
            ...previousForm,
            [name]: value,
          };
        });
      };
    
      const onClickLogin = () => {
    
        const userLogin: UserLogin = {
          username: form.username,
          password: form.password,
        };

        AuthService.login(userLogin)
          .then((response) => {
            localStorage.setItem("token", JSON.stringify(response.data.token));
            localStorage.setItem("user", JSON.stringify(response.data.user));
            navigate('/home');
            window.location.reload();
            console.log(response);
            
          })
          .catch((errorResponse) => {
            toast("Erro ao realizar login.");
            console.log("Erro ao realizar login. ", errorResponse);
          });
      };

    return(
        <div className="container altura-rem d-flex justify-content-center align-items-center">
          <ToastContainer/>
            <Card id="cardCadLogin">
                <h2 id="cadText" className="text-center mb-4 mt-2">Login</h2>
                <Form layout="horizontal">

                    <h6 id="cadText" className="text-center mb-5 fw-bolder">Informações para login</h6>
                    <div className="row justify-content-center">
                        <Form.Item className="col-6">
                            <label id="cadText" className="form-label">Nome de usuário</label>
                            <Input onChange={onChange} value={form.username} name="username"/>
                        </Form.Item>
                    </div>
                    <div className="row justify-content-center">
                        <Form.Item className="col-6">
                            <label id="cadText" className="form-label">Senha</label>
                            <Input type="password" onChange={onChange} value={form.password} name="password"/>
                        </Form.Item>
                    </div>
                                    
                    <div className="row justify-content-center mt-3">
                        <Form.Item  className="col-1">
                            <button type="submit" 
                                    className="btn btn-success"
                                    onClick={onClickLogin}>
                                
                                
                                Salvar
                            </button>
                        </Form.Item>
                    </div>               
                </Form>
                <div className="d-flex justify-content-center mt-4">
                  <div className="me-1">
                    <p>Faça login como <Link to="/CadEntidadePage" className="text-decoration-none text-success fw-bold">
                      entidade
                    </Link> ou</p>
                  </div>
                  <div>
                    <p>Faça login como <Link to="/CadAdotantePage" className="text-decoration-none text-success fw-bold">
                      adotante
                    </Link></p>
                  </div>
                </div>
            </Card>
            
        </div>
        
    )
}