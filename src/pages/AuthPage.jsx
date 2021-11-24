import React from 'react';
import axios from 'axios';
import { Button, Container, FormGroup, Input, InputGroup, InputGroupText, Label } from 'reactstrap';

const API_URL = "http://localhost:2000"

class AuthPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            logPassShow: "Show",
            logPassType: "password",
            regPassShow: "Show",
            regPassType: "password"
        }
    }

    handleInput = (value, propState) => {
        this.setState({ [propState]: value })
    }

    btLogin = () => {
        // alert(`${this.state.email}, ${this.passwordLogin.value}`)

        axios.get(`${API_URL}/users?email=${this.state.email}&password=${this.passwordLogin.value}`)
            .then((response) => {
                console.log(response.data)
            }).catch((err) => {
                console.log(err)
            })
    }

    btShowPassLogin = () => {
        if (this.state.logPassType == "password") {
            this.setState({
                logPassShow: "Hide",
                logPassType: "text"
            })
        } else {
            this.setState({
                logPassShow: "Show",
                logPassType: "password"
            })
        }
    }

    btShowPassRegis = () => {
        if (this.state.regPassType == "password") {
            this.setState({
                regPassShow: "Hide",
                regPassType: "text"
            })
        } else {
            this.setState({
                regPassShow: "Show",
                regPassType: "password"
            })
        }
    }

    render() {
        return (
            <Container className="p-5">
                <h2 style={{ fontWeight: "bold", textAlign: "center" }}>Pilihan Masuk</h2>
                <p className="text-center">Masuk dan selesaikan pesanan dengan data diri anda atau daftar untuk menikmati semua layanan</p>
                <div className="row">
                    <div className="col-6 p-5">
                        <h3 className="text-center py-3">Silahkan masuk ke akun anda</h3>
                        <FormGroup>
                            <Label for="textEmail">Email</Label>
                            <Input type="text" id="textEmail" placeholder="Masukkan Email Anda"
                                onChange={(event) => this.handleInput(event.target.value, "email")} />
                        </FormGroup>
                        <FormGroup>
                            <Label for="textPassword">Password</Label>
                            <InputGroup>
                                <Input type={this.state.logPassType} id="textPassword" placeholder="Masukkan Password Anda"
                                    innerRef={(element) => this.passwordLogin = element} />
                                <InputGroupText style={{ cursor: "pointer" }} onClick={this.btShowPassLogin}>
                                    {this.state.logPassShow}
                                </InputGroupText>
                            </InputGroup>
                        </FormGroup>
                        <Button color="primary" style={{ width: "100%" }} onClick={this.btLogin}>Masuk</Button>
                    </div>
                    <div className="col-6 p-5">
                        <h3 className="text-center py-3">Silahkan buat akun anda</h3>
                        <FormGroup>
                            <Label for="textUsername">Username</Label>
                            <Input type="text" id="textUsername" placeholder="Masukkan Username Anda"
                                innerRef={(element) => this.usernameRegis = element} />
                        </FormGroup>
                        <FormGroup>
                            <Label for="textEmail">Email</Label>
                            <Input type="text" id="textEmail" placeholder="Masukkan Email Anda"
                                innerRef={(element) => this.emailRegis = element} />
                        </FormGroup>
                        <FormGroup>
                            <Label for="textPassword">Password</Label>
                            <InputGroup>
                                <Input type={this.state.regPassType} id="textPassword" placeholder="Masukkan Password Anda"
                                    innerRef={(element) => this.passwordRegis = element} />
                                <InputGroupText style={{ cursor: "pointer" }} onClick={this.btShowPassRegis}>
                                    {this.state.regPassShow}
                                </InputGroupText>
                            </InputGroup>
                        </FormGroup>
                        <FormGroup>
                            <Label for="textPassword">Konfirmasi Password</Label>
                            <InputGroup>
                                <Input type={this.state.regPassType} id="textPassword" placeholder="Konfirmasi Password Anda"
                                    innerRef={(element) => this.passwordRegis = element} />
                                <InputGroupText style={{ cursor: "pointer" }} onClick={this.btShowPassRegis}>
                                    {this.state.regPassShow}
                                </InputGroupText>
                            </InputGroup>
                        </FormGroup>
                        <Button color="primary" style={{ width: "100%" }} onClick={this.btLogin}>Daftar</Button>
                    </div>
                </div>
            </Container>
        );
    }
}

export default AuthPage;