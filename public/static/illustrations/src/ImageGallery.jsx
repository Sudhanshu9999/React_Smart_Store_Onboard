/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/anchor-has-content */
import React, { Component } from "react";
import { Encrypt, decryptData } from "./Encryption-Decrypytion";
import config from "react-global-configuration";
import { confirmAlert } from "react-confirm-alert"; // Import
import "./css/react-confirm-alert.css"; // Import css
import ReactSvgPieChart from "react-svg-piechart";
import Spinner from "react-spinner-material"; //Import Spinner
import IdleTimer from "react-idle-timer"; // For Idle
import App from "./App"; // For Idel
import "./css/style.css";
import "./css/style-responsive.css";
import BarChart from "react-bar-chart";
import { Scrollbars } from "react-custom-scrollbars";
import Pagination from "react-js-pagination";
import disableBrowserBackButton from "disable-browser-back-navigation";
import { basicAuth } from "./BasicAuth";

// require("bootstrap/less/bootstrap.less");
const margin = { top: 20, right: 20, bottom: 30, left: 40 };
const display = {
  display: "block"
};
const hide = {
  display: "none"
};
class ImageGallery extends Component {
  state = {
    fromdata: [],
    sum1: [],
    headers: [],
    answerList: [],
    BarChartArray: [],
    percentage: "",
    draft: "",
    newTask: "",
    save: "",
    total: "",
    loading: false,
    imageArray: [],
    enimg: false,
    taskId: "",
    storeNo: [],
    showimagemsg: false,
    forwardpage: 0,
    backwardpage: 0,
    currentPage: 1,
    pagenumber: "",
    todosPerPage: 20,
    imagecount: "",
    store: "",
    userid: "",
    usrnm: "",
    role_id: "",
    format_id: "",
    imagepdfid: "test",
    SearchStore: "",
    SearchState: "",
    SearchZone: ""
  };



  logoutnormal = () => {
    localStorage.clear();
    this.props.history.replace("/");
    disableBrowserBackButton();
  };

  componentWillMount() {
    if (
      this.props.location.state === undefined ||
      this.props.location.state === ""
    ) {
      window.location.href = "/";
    } else {
      this.setState({ userid: this.props.location.state.userid });
      this.setState({ usrnm: this.props.location.state.usrnm });
      this.setState({ role_id: this.props.location.state.role_id });
      this.setState({ format_id: this.props.location.state.format_id });
      console.log("formatid", this.props.location.state.format_id);
    }
  }

  componentDidMount() {
    this.setState({ loading: true });
    this.fetchImages();
  }
  Reportsbind = () => {
    this.props.history.push({
      pathname: "/Reports",
      state: {
        userid: this.props.location.state.userid,
        usrnm: this.props.location.state.usrnm,
        role_id: this.props.location.state.role_id,
        format_id: this.props.location.state.format_id,
        storeNo: this.props.location.state.storeNo,
        guId: this.props.location.state.guId,
        menuList: this.props.location.state.menuList,
        roleName: this.props.location.state.roleName,
      }
    });
  };

  _onAction(e) { }

  _onActive(e) { }

  _onIdle(e) {
    localStorage.clear();
    window.location.href = "/";
    disableBrowserBackButton();
  }

  enlargeimgclose = () => {
    this.setState({
      enimg: false
    });
  };

  enlargeimage = (item, storeNo) => {
    this.setState(prevState => ({ enimg: !prevState.enimg }));
    this.setState({ key: item });
    this.setState({ store: storeNo });
  };

  handlePageChange = pagenumber => {
    console.log(`pagenumber`, pagenumber);
    this.state.currentPage = pagenumber;
    this.setState({ loading: true });
    this.fetchImages();
  };



  onChangeStore = e => {
    this.setState({ SearchStore: e.target.value });
  };

  onChangeState = e => {
    this.setState({ SearchState: e.target.value });
  };

  onChangeZone = e => {
    this.setState({ SearchZone: e.target.value });
  };


  render = () => {
    var that = this;
    var enlargeimg = [];



    enlargeimg.push(
      <div
        className="modal"
        role="dialog"
        style={this.state.enimg ? display : hide}
      >
        <div className="modal-dialog animate">
          <div className="modal-content ig-modal">
            <div className="modal-header">
              <a
                className="close"
                style={{ color: "#fff" }}
                onClick={this.enlargeimgclose}
              >
                X
              </a>
              <h4 className="modal-title">Store No: {this.state.store}</h4>
            </div>
            <div className="modal-body">
              <div
                className="form-horizontal"
                style={{ "margin-right": "10px" }}
              >
                <div className="form-group">
                  {/* <h4 className="control-label"> Enlarge Image</h4> */}
                </div>
                <div></div>

                <iframe
                  src={this.state.key}
                  style={{ height: "500px", width: "100%" }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );


    const { SearchStore } = this.state;
    const { SearchState } = this.state;
    const { SearchZone } = this.state;

    return (
      <div>
        {enlargeimg}
        <Spinner
          visible={this.state.loading}
          spinnerColor={"rgba(0, 0, 0, 0.3)"}
        />
        <IdleTimer
          ref={ref => {
            this.idleTimer = ref;
          }}
          element={document}
          onActive={this.onActive}
          onIdle={this.onIdle}
          onAction={this.onAction}
          debounce={250}
          timeout={1000 * 60 * 10}
        />
        <div className="modal-header" style={{ "border-radius": "0px" }}>
          <a
            className="close"
            style={{ "font-weight": "bold", color: "#fff" }}
            onClick={this.Reportsbind}
          >
            X
          </a>
          <a>
            {" "}
            <button
              class="btn btn-primary min-wid-90 mr-10 "
              style={{ float: "right" }}
              onClick={this.downloadimagepdf.bind(
                this,
                this.props.location.state.taskId
              )}
            >
              Download
            </button>
          </a>
          <h4 className="modal-title" style={{ "text-align": "center" }}>
            Image Gallery
          </h4>
        </div>
        <div className="modal-body">
          <h1 className="m-5">{that.props.location.state.questionText}</h1>
          {/* {console.log(`arr`,this.state.imageArray)} */}

          {this.state.showimagemsg == false ? (
          
          <div className="row">
          <div className="col-md-12">
            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
              <div className="col-xs-12 col-sm-3 col-md-3 col-lg-3">
                {" "}
                <b>Store No.</b>
                <br />
                <input
                  type="text"
                  placeholder="Search with Store No."
                  className="form-control"
                  id="storeNo"
                  onChange={this.onChangeStore}
                  autoComplete="off"
                />
              </div>

              <div className="col-xs-12 col-sm-4 col-md-4 col-lg-4">
                {" "}
                <b>State</b>
                <br />
                <input
                  type="text"
                  placeholder="Search with State"
                  className="form-control"
                  id="state"
                  onChange={this.onChangeState}
                  autoComplete="off"
                />
              </div>

              <div className="col-xs-12 col-sm-4 col-md-4 col-lg-4">
                {" "}
                <b>Zone</b>
                <br />
                <input
                  type="text"
                  placeholder="Search with Zone"
                  className="form-control"
                  id="zone"
                  onChange={this.onChangeZone}
                  autoComplete="off"
                />
              </div>
              <div className="col-xs-12 col-sm-1 col-md-1 col-lg-1 mt-xs-10">
                <img
                  src={require("./img/searchicon.png")}
                  className="user-img mt-20"
                  style={{ width: "25px", height: "25px" }}
                />
              </div>
              <div className="clearfix"></div>
            </div>
          </div>
        </div>

        ) : null }

          {this.state.showimagemsg == true ? (
            <h4 style={{ "margin-left": "10px" }}>
              Store has not uploaded images yet.
            </h4>
          ) : (
              <div className="imgholder">

                {that.state.imageArray.map(function (item, key) {

                  if (
                    (SearchStore !== "" || SearchState !== "" || SearchZone !== "") &&
                    (item.storeNo
                      .toLowerCase()
                      .indexOf(SearchStore.toLowerCase()) ||
                      item.state
                        .toLowerCase()
                        .indexOf(
                          SearchState.toLowerCase()) ||
                      item.zone
                        .toLowerCase()
                        .indexOf(
                          SearchZone.toLowerCase())
                    ) === -1
                  ) {
                    return null;
                  }

                  return (
                    <div
                      style={{
                        width: "220px",
                        margin: "10px",
                        border: "1px solid #ddd",
                        padding: "5px",
                        "border-radius": "4px"
                      }}
                    >
                      <a
                        onClick={that.enlargeimage.bind(
                          that,
                          item.image,
                          item.storeNo
                        )}
                      >
                        <img
                          src={item.image}
                          style={{
                            width: "210px",
                            height: "100px",
                            "padding-right": "10px"
                          }}
                        />
                      </a>

                      <span>
                        <b>Store no :{item.storeNo}</b>
                      </span>
                    </div>
                  );
                })}
              </div>
            )}
        </div>

        {this.state.showimagemsg == false ? (
          <ul className="pagein">
            <div>
              <Pagination
                activePage={this.state.currentPage}
                itemsCountPerPage={20}
                totalItemsCount={this.state.imagecount}
                pageRangeDisplayed={5}
                onChange={this.handlePageChange}
              />
            </div>
          </ul>
        ) : null}
      </div>
    );
  };

  fetchImages = () => {
    if (
      this.props.location.state !== undefined &&
      this.props.location.state.usrnm !== ""
    ) {
      console.log(`curent page`, this.state.currentPage);

      this.setState({ imageArray: [] });

      var request = {
        // "taskId":"50403",
        // "questionId": "52736",
        // "buttonNo":(this.state.currentPage*20)-20
        questionId: this.props.location.state.questionId,
        taskId: this.props.location.state.taskId,
        guId: this.props.location.state.guId,
        buttonNo: this.state.currentPage * 20 - 20
      };

      var EncryptedRequest = Encrypt(request);
      console.log(`renderimg`, EncryptedRequest);
      fetch("/GetImages", {
        method: "POST",
        headers: {
          guId: this.props.location.state.guId,
          Authorization: "Basic " + basicAuth(this.props.location.state.userid)
        },
        body: EncryptedRequest
      })
        .then(response => response.text())
        .then(response => {
          var DecryptedResponse = decryptData(response);
          console.log(``, DecryptedResponse);
          if (DecryptedResponse.errorCode == "00") {
            this.setState({ imagecount: DecryptedResponse.imageCount });

            for (let k = 0; k < DecryptedResponse.imageList.length; k++) {
              this.state.imageArray.push(DecryptedResponse.imageList[k]);
            }
            this.setState({ loading: false });
            if (
              DecryptedResponse.imageList.length == "0" ||
              DecryptedResponse.imageList == undefined
            ) {
              this.setState({ showimagemsg: true });
            } else {
              this.setState({ showimagemsg: false });
            }
          } else {
            this.setState({ loading: false, showimagemsg: true });
            confirmAlert({
              message: DecryptedResponse.errorMsg,
              buttons: [
                {
                  label: "Ok"
                  // onClick: () =>
                }
              ]
            });
          }
        })
        .catch(error => {
          confirmAlert({
            title: "Alert !",
            message: "Session expired",
            buttons: [
              {
                label: "Ok",
                onClick: () => {
                  this.logoutnormal();
                }
              }
            ]

            // console.error(error);
          });
          // console.error(error);
        });

      console.log("Image data", this.state.imageArray);
    } else {
      window.location.href = "/";
    }
  };

  downloadimagepdf(e, taskId) {
    console.log("e", e);
    this.setState({
      loading: true
    });
    var request = {
      questionId: this.props.location.state.questionId,
      taskId: this.props.location.state.taskId,
      buttonNo: "0",
      guId: this.props.location.state.guId
    };

    var url = `/GetAllImages?key=${Encrypt(request)}`;
    console.log("req img", Encrypt(request));
    fetch(url, {
      method: "GET",
      headers: {
        guId: this.props.location.state.guId,
        Authorization: "Basic " + basicAuth(this.props.location.state.userid)
      }
    })
      .then(data => {
        return data.blob();
      })
      .then(data => {
        const a = document.createElement("a");

        const b = new File([data], "", { type: "application/pdf" });

        a.href = URL.createObjectURL(b);
        a.hidden = true;
        a.download = e;
        document.body.appendChild(a);
        a.click();
        a.parentNode.removeChild(a);
        this.setState({
          loading: false
        });
      })
      .catch(error => {
        confirmAlert({
          title: "Alert !",
          message: "Session expired",
          buttons: [
            {
              label: "Ok",
              onClick: () => {
                this.logoutnormal();
              }
            }
          ]

          // console.error(error);
        });
        // console.error(error);
      });
  }
}

export default ImageGallery;
