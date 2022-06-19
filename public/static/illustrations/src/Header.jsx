import React, { Component } from "react";
import "jquery/dist/jquery";
import disableBrowserBackButton from "disable-browser-back-navigation";
import IdleTimer from "react-idle-timer"; // For Idle
import "./css/style.css";
import "./css/style-responsive.css";
import { Encrypt, decryptData } from "./Encryption-Decrypytion";
import { confirmAlert } from "react-confirm-alert";
import { basicAuth } from "./BasicAuth";
class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      displayMenu: false,
      hasError: false //Added by chandrani for custom error page
    };
    this.state = {
      startDate: "",
      endDate: "",
      role_id: "",
      format_id: "",
      searchEDate: "",
      resptaskname: [],
      respstartdate: [],
      respenddate: [],
      resptaskdesc: [],
      data: [],
      usrnm: "",
      userid: "",
      tickerList: [],
      Search: "",
      searchSDate: "",
      // searchedDate: "",
      searchName: "",
      tskId: "",
      tskName: "",
      loading: false,
      hasError: false, //Added by chandrani for custom error page
      hammenu: true,
      displayMenu: false,

    };
    this.setState({
      role_id: this.state.location.props.state.role_id
    });
    this.idleTimer = null;

    this.onIdle = this._onIdle.bind(this);

    this.showDropdownMenu = this.showDropdownMenu.bind(this);
    this.hideDropdownMenu = this.hideDropdownMenu.bind(this);
  }

  _onIdle(e) {
    localStorage.clear();
    window.location.href = "/";
    disableBrowserBackButton();
  }

  componentWillMount() {
    if (this.props.location.state.role_id === "300") {
      this.GetTasksOnload();
    } else {
      this.GetTasksClusterStore();
    }
  }

  tiker = () => {
    this.props.history.push({
      pathname: "/Tiker",
      state: {
        userid: this.props.location.state.userid,
        usrnm: this.props.location.state.usrnm,
        role_id: this.props.location.state.role_id,
        format_id: this.props.location.state.format_id,
        storeNo: this.props.location.state.storeNo
      }
    });
  };

  GetTasksOnload(e) {
    this.setState({ loading: true });

    console.log("id **", this.props.location.state.usrnm);
    if (
      this.props.location.state !== undefined &&
      this.props.location.state.usrnm !== ""
    ) {
      this.setState({ usrnm: this.props.location.state.usrnm });
      this.setState({ userid: this.props.location.state.userid });
      this.setState({ tskId: this.props.location.state.tskId });
      this.setState({ tskName: this.props.location.state.tskName });

      var Request1 = { createdBy: this.props.location.state.userid };
      var EncryptedRequest1 = Encrypt(Request1);
      console.log("id", this.state.userid);
      console.log("req", EncryptedRequest1);

      fetch("/SearchTask", {
        method: "POST",
        body: EncryptedRequest1
      })
        .then(response => response.text())
        .then(response => {
          var DecryptedResponse1 = decryptData(response);
          console.log(``, DecryptedResponse1);

          if (DecryptedResponse1.errorCode === "00") {
            // console.log(`response of SearchTask: `, DecryptedResponse1)
            // console.log(`checked`,this.state.check);
            // console.log(`response: Tasks: ` + DecryptedResponse1.taskList)
            // console.log(`UserName: ` + this.props.location.state.usrnm)
            this.setState({ data: DecryptedResponse1.taskList });

            //console.log(`Data: `, this.state.data)
            this.setState({
              loading: false
            });
          } else {
            this.setState({ loading: false });
            confirmAlert({
              message: DecryptedResponse1.errorMsg,
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
            message: "Unable to connect server: " + error,
            buttons: [
              {
                label: "Ok",
                onClick: () => {
                  this.logout.bind(this);
                }
              }
            ]

            // console.error(error);
          });
          // console.error(error);
        });
    } else {
      // this.props.history.push({
      //   pathname: '/',
      // });
      window.location.href = "/";
    }
  }

  GetTasksClusterStore(e) {
    var tickerdata = [];
    if (this.props.location.state.tickerList !== undefined) {
      for (let t = 0; t < this.props.location.state.tickerList.length; t++) {
        tickerdata.push(
          this.props.location.state.tickerList[t].tickerText + " || "
        );
      }
    }

    if (this.props.location.state.usrnm !== "") {
      if (this.props.location.state.role_id === "900") {
        var Request = {
          storeNo: this.props.location.state.storeNo,
          userFormat: this.props.location.state.role_id
          //  format_id: this.props.location.state.format_id
        };
      } else {
        var Request = {
          userId: this.props.location.state.userid,
          userFormat: this.props.location.state.role_id
          // format_id: this.props.location.state.format_id
        };
      }
      // console.log("storeNo",this.props.location.state.storeNo);
      // console.log("userFormat",this.props.location.state.role_id);
      // console.log("format_id",this.props.location.state.format_id);
      // console.log("userId",this.props.location.state.userid);

      var EncryptedRequest = Encrypt(Request);
      console.log("sudo", EncryptedRequest);
      fetch("/StoreUserTaskList", {
        method: "POST",

        body: EncryptedRequest
      })
        .then(response => response.text())
        .then(response => {
          // console.log(`response: ` , response)
          var DecryptedResponse = decryptData(response);
          console.log(``, DecryptedResponse);
          if (DecryptedResponse.errorCode === "00") {
            this.setState({ loading: true });
            this.setState({ data: DecryptedResponse.taskList });
            this.setState({ usrnm: this.props.location.state.usrnm });
            this.setState({ loading: false });
            this.setState({ storeNo: this.props.location.state.storeNo });
            this.setState({ userid: this.props.location.state.userid });
            this.setState({ tickerList: tickerdata });
            // console.log('tickerList',this.props.location.state.tickerdata)
          }
        });
    } else {
      // this.props.history.push({
      //   pathname: "/"
      // });
      window.location.href = "/";
    }
  }

  render() {
    return (
      <header className="header black-bg">
        {/* <div className="sidebar-toggle-box">
  <div className="fa fa-bars tooltips" data-placement="right" data-original-title="Toggle Navigation"></div>
</div> */}

        <div>
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
          {/* your app here */}
        </div>
        {/* <marquee scrollamount="3">
   <li>Reliance Trends </li>
     </marquee> */}
        <a
          className="mob-show"
          onClick={() => this.setState({ hammenu: !this.state.hammenu })}
        >
          <i
            className="fa fa-tasks hammenu"
            style={{ "margin-top": "30px" }}
          ></i>
        </a>

        <a onClick={this.TaskactiveBind.bind(this)} className="logo">
          <img src={require("./img/retail-logo.png")} alt="logo" />
        </a>
        <ul className="nav pull-right pos-rel">
          <li className="dropdown">
            <a
              className="dropdown-toggle"
              data-toggle="dropdown"
              onClick={this.showDropdownMenu}
            >
              {" "}
              <img src={require("./img/user.png")} className="user-img" />{" "}
              <b>{this.props.location.state.usrnm}</b> (
              {this.props.location.state.storeNo})<b className="caret" />
            </a>
          </li>

          {this.state.displayMenu ? (
            <ul className="dropdown-menuuser-dd">
              {/* <li><a href="/Changepassword">Change Password</a></li>
         <li className="divider"></li> */}
              <li>
                <a onClick={this.logout}>Log Out</a>
              </li>
            </ul>
          ) : null}
        </ul>
      </header>
    );
  }

  Changepasswordbind = () => {
    this.props.history.push({
      pathname: "/ChangepasswordUI",
      state: {
        userid: this.props.location.state.userid,
        usrnm: this.props.location.state.usrnm,
        role_id: this.props.location.state.role_id,
        format_id: this.props.location.state.format_id,
        storeNo: this.props.location.state.storeNo
      }
    });
  };

  TaskactiveBind = () => {
    this.props.history.push({
      pathname: "/Taskactive",
      state: {
        userid: this.props.location.state.userid,
        usrnm: this.props.location.state.usrnm,
        role_id: this.props.location.state.role_id,
        format_id: this.props.location.state.format_id,
        storeNo: this.props.location.state.storeNo
      }
    });
  };

  logout = () => {
    if (this.props.location.state.Isroffice == true) {
      this.props.history.replace("/");
      //  window.location.reload();
      disableBrowserBackButton();

      document.getElementById("rofficelogin").click();
    } else {
      var Request1 = {
        userId: this.props.location.state.userid,
        guId: this.props.location.state.guId
      };
      var EncryptedRequest1 = Encrypt(Request1);
      console.log(EncryptedRequest1);
      fetch("/LogOut ", {
        method: "POST",
        headers: {
          guId: this.props.location.state.guId,
          Authorization: "Basic " + basicAuth(this.props.location.state.userid)
        },
        body: EncryptedRequest1
      })
        .then(response => response.text())
        .then(response => {
          var DecryptedResponse = decryptData(response);
          //console.log(``, DecryptedResponse)
          if (DecryptedResponse.errorCode === "00") {
            this.props.history.replace("/");
            //  window.location.reload();
            disableBrowserBackButton();
          } else {
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
    }
  };
  showDropdownMenu(event) {
    event.preventDefault();
    this.setState({ displayMenu: true }, () => {
      document.addEventListener("click", this.hideDropdownMenu);
    });
  }

  hideDropdownMenu() {
    this.setState({ displayMenu: false }, () => {
      document.removeEventListener("click", this.hideDropdownMenu);
    });
  }
}

export default Header;
