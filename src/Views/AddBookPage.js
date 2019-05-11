import React, { Component } from "react";
import firebase from "../firebaseConfig";
import { Button, Form, FormGroup, ButtonGroup, Label, Input, InputGroupAddon, InputGroup, CustomInput, FormText } from "reactstrap";

class AddBookPage extends Component {
  constructor(props) {
    super(props);
    this.myRef = React.createRef();

    this.onInputChange = this.onInputChange.bind(this);
    this.onFormSubmit = this.onFormSubmit.bind(this);
     this.onReset = this.onReset.bind(this);
    this.state = {
      isLoading: false,
      title: "",
      author: "",
      description: "",
      cover: "",
      book: "",
      category: "Psychologie"
    };
  }

  generateId() {
    return btoa(Math.random()).substring(0, 12);
  }

  refreshForm() {
    this.setState({
      title: "",
      author: "",
      description: "",
      cover: "",
      book: "",
      category: "Psychologie"
      // like:false
    });

  }

  onFormSubmit(event) {
    event.preventDefault();

    const id = this.generateId();

    let newBook = {
      id: id,
      title: this.state.title,
      author: this.state.author,
      description: this.state.description,
      cover: this.state.cover,
      book: this.state.book,
      category: this.state.category
      // like:false
    };
console.log(this.state.book)
    firebase
    .storage()
    .ref(`images/covers/${id}`)
    .put(this.state.cover)
    .on(
      "state_changed",
      progress => {
        console.log("progress");
        this.setState({ isLoading: true });
      },
      error => {
        console.log("error", error);
      },
      () => {
        console.log("done");
        //getting cover url, adding book pdf file
        firebase
          .storage()
          .ref("images/covers")
          .child(id)
          .getDownloadURL()
          .then(url => {
            newBook.cover = url;
            firebase
              .storage()
              .ref(`images/books/${id}`)
              .put(this.state.book)
              .on(
                "state_changed",
                progress => {
                  console.log("progress");
                },
                error => {
                  console.log("error", error);
                },
                () => {
                  //getting book url, adding book to database
                  firebase
                    .storage()
                    .ref("images/books")
                    .child(id)
                    .getDownloadURL()
                    .then(url => {
                      newBook.book = url;
                      firebase
                        .database()
                        .ref("books/" + id)
                        .set(newBook);
                      this.props.history.push("/books");
                    });
                }
              );
          });
      }
    );

    console.log(this.state);
    this.refreshForm();
    console.log(this.state);
  }

  onInputChange(e) {

    const name = e.target.name;
    // console.log(e.target.files[0]);
    if (name == "cover" || name == "book") {
      this.setState({ [name]: e.target.files[0]});
      console.log(e.target.files[0]);
    } else {
      this.setState({ [name]: e.target.value });
      console.log(e.target.value);
    }

  }

  onReset(e) {
    console.log(e.target.name);
    this.refreshForm();
    console.log(this.state);
  }

  render() {
    return (
      <center>
        <h2 style={{ marginTop: "50px", marginBottom: "50px", color:"gray" }}>Partagez avec nous votre livre</h2>
        {this.state.isLoading && (
          <div>
            <h3 style={{ marginTop: "50px", marginBottom: "20px" }}>Veuillez patienter...</h3>
            <div className="lds-dual-ring" />
          </div>
        )}
        {!this.state.isLoading && (
          <div style={{ maxWidth: "800px", margin: "20px", textAlign: "left" }}>
            <Form onSubmit={this.onFormSubmit}>
              <FormGroup>
                <Label for="title">Titre du livre</Label>
                <Input
                  type="text"
                  value={this.state.title}
                  onChange={this.onInputChange}
                  name="title"
                  id="title"
                  placeholder="Entrez le titre du livre.."
                  required
                />
              </FormGroup>
              <FormGroup>
                <Label for="author">Son auteur</Label>
                <Input
                  type="text"
                  value={this.state.author}
                  onChange={this.onInputChange}
                  name="author"
                  id="author"
                  placeholder="Entrez le nom et le prénom de l'auteur.."
                  required
                />
              </FormGroup>
              <FormGroup>
                <Label for="description">Description</Label>
                <Input
                  type="textarea"
                  value={this.state.description}
                  onChange={this.onInputChange}
                  name="description"
                  id="description"
                  placeholder="Entrez votre description du livre.."
                />
              </FormGroup>
              <FormGroup>
                <Label for="category">Sa catégorie</Label>
                <Input
                  type="select"
                  name="category"
                  onChange={this.onInputChange}
                  value={this.state.category}
                  id="category"
                >
                  <option value="Psychologie">Psychologie</option>
                  <option value="Philosophie">Philosophie</option>
                  <option value="Romans">Romans</option>
                  <option value="Science fiction">Science fiction</option>
                  <option value="Histoire">Histoire</option>
                  <option value="Poésie">Poésie</option>
                  <option value="Science">Science</option>
                </Input>
              </FormGroup>
              {/* <FormGroup>
                <Label for="cover">cover</Label>
                <Input
                  type="file"
                  onChange={this.onInputChange}
                  name="cover"
                  id="cover"
                />
              </FormGroup> */}
              <FormGroup>
                <Label for="cover">Sa couverture</Label>
                <CustomInput
                  type="file"
                  id="cover"
                  name="cover"
                  label="Entrez la couveture du livre.."
                  //  value={this.state.cover}
                  onChange={this.onInputChange}
                  required />
              </FormGroup>
              <FormGroup>
                <Label for="book">Lien du livre</Label>
                <CustomInput
                  type="file"
                  id="book"
                  name="book"
                  label="Entrez le livre.."
                  onChange={this.onInputChange}
                  //  value={this.state.book}
                  required
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
export default AddBookPage;
