import React, { Component } from "react";
import { Link, NavLink as NavReactRouter } from "react-router-dom";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  Input,
  InputGroup,
  InputGroupAddon,
  Button,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from "reactstrap";
import firebase from "../firebaseConfig";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch, faHeart, faBookOpen } from '@fortawesome/free-solid-svg-icons'

class Header extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.onInputChange = this.onInputChange.bind(this);
    // this.onSearchBooks = this.onSearchBooks.bind(this);
    this.state = {
      isOpen: false,
       listBooks: [],
      searchText: ""
      // filtredBooks: []
    };
  }
  GetBooks() {
    firebase
      .database()
      .ref("/books")
      .once("value")
      .then(books => {
        let booksList = [];

        const booksObject = books.val();

        for (const book in booksObject) {
          booksList = [...booksList, booksObject[book]];
        }

        this.setState({ listBooks: booksList });
        console.log(booksList);
      });
  }
  componentDidMount() {
    console.log("chargemnt");
    this.GetBooks();
  }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  onInputChange(e) {
    const name = e.target.name;
    this.setState({ [name]: e.target.value });
    // console.log(e.target.value);
  }
  // onSearchBooks(e) {
  //   console.log(this.state.searchText);
  //   const filteredData = this.state.listBooks.filter(i => i.title.toLowerCase().includes(this.state.searchText.toLowerCase())
  //     || i.author.toLowerCase().includes(this.state.searchText.toLowerCase()))
  //   console.log(filteredData);
  //   this.setState({ filtredBooks: filteredData });
  // }
  render() {
    return (
      <div>
        {" "}
        <Navbar color="info" light expand="md">
          <NavbarBrand>
            <NavReactRouter
              style={{ color: "black" }}
              to="/"
              className="nav-link"
              exact
            >
              <label >
                <span style={{ color: "#44484e" }}><b>Jungle of </b></span>
                <FontAwesomeIcon style={{ color: "rgb(245, 203, 18)" }} size="1x" icon={faBookOpen} />
              </label>
            </NavReactRouter>
          </NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <InputGroup style={{ marginLeft: "150px", maxWidth: "600px" }}>
            <Input type="text" placeholder="Cherchez un livre..." onChange={this.onInputChange} value={this.state.searchText} name="searchText" />
            <Link to={{ pathname: '/ConsultBooksPage', state: { searchText: this.state.searchText, bookList: this.state.listBooks } }} >
              <Button style={{ backgroundColor: "transparent", borderColor: "gray" }}>
                {/* onClick={this.onSearchBooks} */}
                <FontAwesomeIcon style={{ color: "black" }} size="1x" icon={faSearch} />
              </Button>
            </Link>
          </InputGroup>
          <Collapse isOpen={this.state.isOpen} navbar style={{ minWidth: "450px" }}>
            <Nav className="ml-auto" navbar>
              <NavItem>
                <NavReactRouter to="/" className="nav-link" exact>
                  <b>Acceuil</b>
                </NavReactRouter>{" "}
              </NavItem>
              <NavItem>
                <NavReactRouter to="/ConsultBooksPage" className="nav-link" exact>
                  <b>Nos livres</b>
                </NavReactRouter>{" "}
              </NavItem>
              <NavItem>
                <NavReactRouter to="/AddBookPage" className="nav-link" exact>
                  <b>Partagez un livre</b>
                </NavReactRouter>{" "}
              </NavItem>
              <NavItem>
                <NavReactRouter to="/ContactPage" className="nav-link" exact>
                  <b> Nous écrire!</b>
                </NavReactRouter>{" "}
              </NavItem>
              <NavItem>
                <NavReactRouter to="/ContactPage" className="nav-link" exact>
                <FontAwesomeIcon size="2x" icon={faHeart} />
                </NavReactRouter>{" "}
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}

export default Header;