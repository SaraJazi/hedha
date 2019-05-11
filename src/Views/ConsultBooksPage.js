import React, { Component } from "react";
// import Book from "../Components/Book";
import firebase from "../firebaseConfig";
import { Row, Container, ContainerProps, Col } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart, faHeartbeat } from '@fortawesome/free-solid-svg-icons'
import "../Loading.css";
import {
  Card,
  Button,
  CardImg,
  CardTitle,
  CardText,
  CardColumns,
  CardSubtitle,
  CardBody
} from "reactstrap";
import { bool } from "prop-types";

class ConsultBooksPage extends Component {
  constructor(props) {
    super(props);
    this.myRef = React.createRef();
    this.state = {
      isLoading: true,
      listBooks: []
      // filtredBooks: []
    }
    // this.onClickDelete = this.onClickDelete.bind(this);
    this.GetBooks = this.GetBooks.bind(this);
    // this.onLikeBook=this.onLikeBook.bind(this);
  }
  objectsAreSame(x, y) {
    var objectsAreSame = true;
    for (var propertyName in x) {
      if (x[propertyName] !== y[propertyName]) {
        objectsAreSame = false;
        break;
      }
    }
    return objectsAreSame;
  }
  componentDidUpdate() {
    console.log("update");
    // const { searchText } = this.props.location.state;
    // const { bookList } = this.props.location.state;
    // console.log(bookList);
    // console.log(searchText);
    if (this.props.location.state != undefined) {
      console.log(this.props.location.state);
      const { searchText } = this.props.location.state;
      const { bookList } = this.props.location.state;
      // const {bookList}=this.props.location.state
      if (searchText != "") {
        const filteredData = bookList.filter(i => i.title.toLowerCase().includes(searchText.toLowerCase())
          || i.author.toLowerCase().includes(searchText.toLowerCase()));

        // // this.setState({ filtredBooks: filteredData });
        console.log([...this.state.listBooks]);
        // JSON.stringify(a1) === JSON.stringify(a2);

        var isSame = this.state.listBooks.length === filteredData.length && this.state.listBooks.every((o, i) => Object.keys(o).length === Object.keys(filteredData[i]).length && Object.keys(o).every(k => o[k] === filteredData[i][k]));
        console.log(isSame);
        if (!isSame) {
          console.log(...filteredData);
          this.setState({ listBooks: filteredData }, () => {
            console.log("different");
            console.log(this.state.listBooks);
          });
        }
      }
      else {
        console.log("search vide")
        var isSame = this.state.listBooks.length === bookList.length && this.state.listBooks.every((o, i) => Object.keys(o).length === Object.keys(bookList[i]).length && Object.keys(o).every(k => o[k] === bookList[i][k]));
        console.log(isSame);
        if (!isSame) {
          console.log("hereeeeeeeeeeeeee");
          this.setState({ listBooks: bookList });
        }
        // this.componentDidMount();   
        // this.GetBooks();

      }
    }

  }

  componentDidMount() {
    console.log("chargemnt");
    this.GetBooks();
  }
  // onSearchBooks(e) {
  //   console.log(this.state.searchText);
  //   const filteredData = this.state.listBooks.filter(i => i.title.toLowerCase().includes(this.state.searchText.toLowerCase())
  //     || i.author.toLowerCase().includes(this.state.searchText.toLowerCase()))
  //   console.log(filteredData);
  //   this.setState({ filtredBooks: filteredData });
  // }
  GetBooks() {
    firebase
      .database()
      .ref("/books")
      .once("value")
      .then(books => {
        let booksList = [];

        const booksObject = books.val();

        for (const book in booksObject) {
          // if (booksObject[book].cover.includes("fakepath")) {
          //   booksObject[book].cover = booksObject[book].cover.replace("fakepath", "Users\\Sara JAZI\\source\\repos\\ReactProjects");
          // }
          booksList = [...booksList, booksObject[book]];
        }

        this.setState({ listBooks: booksList, isLoading: false }, () => {
          // const { searchText } = this.props.location.state; 
          if (this.props.location.state != undefined) {
            console.log("hi " + this.props.location.state);
            const { searchText } = this.props.location.state;
            //   console.log(this.state.listBooks);
            const filteredData = this.state.listBooks.filter(i => i.title.toLowerCase().includes(searchText.toLowerCase())
              || i.author.toLowerCase().includes(searchText.toLowerCase()));
            console.log(filteredData);
            // this.setState({ filtredBooks: filteredData });
            this.setState({ listBooks: filteredData });
          }
        });
        console.log(booksList);
        // console.log(this.state.filtredBooks);
      });
  }
//   onLikeBook(e) {
// console.log("hello");
//     this.setState({like:'red'});
//   }

  render() {
    return (
      <center>
        <h2 style={{ marginTop: "50px", marginBottom: "50px", color: "gray" }}>Nos livres</h2>
        {this.state.isLoading && <div className="lds-dual-ring" />}

        <CardColumns>
          {
            // let {books};
            //  if (this.state.searchText != undefined) {
            //   const books= this.state.listBooks;
            // }
            !this.state.isLoading &&
            this.state.listBooks.map(book => {
              return (
                <Card
                  // onClick={() => {
                  //   this.props.history.push(`/book/${book.id}`);
                  // }}
                  className="custom-card"
                >
                  <CardImg
                    style={{ maxHeight: "300px" }}
                    top
                    width="100%"
                    src={book.cover}
                    alt="Card image cap"
                  />
                  <Button style={{ marginTop: "-80px", marginLeft: "85%", backgroundColor: "transparent", borderColor: "transparent" }}
                >
                    <FontAwesomeIcon size="2x" icon={faHeart} />
                  </Button>

                  <CardBody style={{ maxWidth: "180px" }}>
                    <CardTitle><b>{book.title}</b></CardTitle>
                    <CardSubtitle><b>{book.author}</b></CardSubtitle>
                    <CardText>{book.description}</CardText>
                    <Button color="info" size="md">Télécharger</Button>
                  </CardBody>

                </Card>
              );
            })

          }
        </CardColumns>
      </center>
    );
  }
}

export default ConsultBooksPage;