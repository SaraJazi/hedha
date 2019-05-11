import React, { Component } from "react";
import { Button, Form, FormGroup, ButtonGroup, Label, Input, InputGroupAddon, InputGroup, CustomInput, FormText } from "reactstrap";
import firebase from "../firebaseConfig";

class ContactPage extends Component {
  constructor(props) {
    super(props);
    this.myRef = React.createRef();
    this.onFormSubmit = this.onFormSubmit.bind(this);
    this.onInputChange = this.onInputChange.bind(this);
    this.state = {
      firstName: "",
      lastName: "",
      subject: ""
    };
  }

  generateId() {
    return btoa(Math.random()).substring(0, 12);
  }

  onFormSubmit(event) {
    event.preventDefault();

    const id = this.generateId();

    let newMessage = {
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      subject: this.state.subject
    };

    firebase
      .database()
      .ref("Messages/" + id)
      .set(newMessage);
  
    this.setState({
      firstName: "",
      lastName: "",
      subject: ""
    });
    // this.props.history.push("/Messages");
  }
  onInputChange(e) {

    const name = e.target.name;
    // if (name == "cover" || name == "book") {
    //   this.setState({ [name]: e.target.files[0] });
    //   console.log(e.target.files[0]);
    // } else {
    this.setState({ [name]: e.target.value });
    console.log(e.target.value);
    // }

  }

  render() {
    return (
      <center>
        <h2 style={{ marginTop: "50px", marginBottom: "50px" , color:"gray"}}>Nous Ècrire..</h2>
        {this.state.isLoading && (
          <div>
            <h3 style={{ marginTop: "50px", marginBottom: "20px" }}>Votre est en cours de transfert...</h3>
            <div className="lds-dual-ring" />
          </div>
        )}
        {!this.state.isLoading && (
          <div style={{ maxWidth: "800px", margin: "20px", textAlign: "left" }}>
            <Form onSubmit={this.onFormSubmit}>
              <FormGroup>
                <Label for="firstName">Votre prénom</Label>
                <Input
                  type="text"
                  value={this.state.firstName}
                  onChange={this.onInputChange}
                  name="firstName"
                  id="firstName"
                  placeholder="Entrez votre prénom.."
                  required
                />
              </FormGroup>
              <FormGroup>
                <Label for="lastName">Votre nom</Label>
                <Input
                  type="text"
                  value={this.state.lastName}
                  onChange={this.onInputChange}
                  name="lastName"
                  id="lastName"
                  placeholder="Entrez votre nom.."
                  required
                />
              </FormGroup>
              <FormGroup>
                <Label for="subject">Votre message</Label>
                <Input
                  type="textarea"
                  value={this.state.subject}
                  onChange={this.onInputChange}
                  name="subject"
                  id="subject"
                  placeholder="Entrez votre message.."
                />
              </FormGroup>
              <ButtonGroup>
                <Input type="submit" className="btn btn-info" value="Ajouter" name="Ajouter" />
                <Button className="btn btn-danger" name="Annuler" onClick={this.onReset}>Annuler</Button>
              </ButtonGroup>
            </Form>
          </div>
        )}
      </center>
    );
  }
}
export default ContactPage;