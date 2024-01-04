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

      type FieldType = {
        username: "",
        password: "",
      }

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
          })
          .catch((errorResponse) => {
            toast.error("Erro ao realizar login.");
            console.log("Erro ao realizar login. ", errorResponse);
          });
      };

      const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
      };

    return(
        <div className="container-fluid d-flex justify-content-center align-items-center">
          <ToastContainer/>
            <Card id="cardCadLogin">
                <h2 id="cadText" className="text-center mb-4 mt-1">Login</h2>
                <Form layout="vertical" onFinishFailed={onFinishFailed}>

                    <h6 id="cadText" className="text-center mb-4 fw-bolder">Informações para login</h6>
                    <div className="row justify-content-center">
                        <Form.Item<FieldType>
                                  label="Nome de usuário"
                                  name="username"
                                  rules={[{ required: true, message: 'O campo nome de usuário é obrigatório!' }]} 
                                  className="col-6">
                            <Input onChange={onChange} value={form.username} name="username"/>
                        </Form.Item>
                    </div>
                    <div className="row justify-content-center">
                        <Form.Item<FieldType>
                                  label="Senha"
                                  name="password"
                                  rules={[{ required: true, message: 'O campo nome de senha é obrigatório!' }]} 
                                  className="col-6">
                            <Input.Password type="password" onChange={onChange} value={form.password} name="password"/>
                        </Form.Item>
                    </div>
                                    
                    <div className="row justify-content-center mt-2">
                        <Form.Item  className="col-1">
                            <button type="submit" 
                                    className="btn btn-success"
                                    onClick={onClickLogin}>
                                
                                Entrar
                            </button>
                        </Form.Item>
                    </div>               
                </Form>
                <div className="d-flex justify-content-center mt-3">
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