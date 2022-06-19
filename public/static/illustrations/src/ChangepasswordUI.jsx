import React, { Component } from "react";
import "jquery/dist/jquery";
import { withRouter } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Scrollbars } from "react-custom-scrollbars";
import { confirmAlert } from "react-confirm-alert"; // Import
import "./css/react-confirm-alert.css"; // Import css
import config from "react-global-configuration";
import IdleTimer from "react-idle-timer"; // For Idle
import App from "./App"; // For Idel
import "./css/style.css";
import "./css/style-responsive.css";
import { Encrypt, decryptData } from "./Encryption-Decrypytion";
import disableBrowserBackButton from "disable-browser-back-navigation";
import { basicAuth } from "./BasicAuth";

class ChangepasswordUI extends Component {
  state = {
    TaskDropdwn: false,
    userid: "",
    role_id: "",
    passwordFlag: "",
    hasError: false //Added by chandrani for custom error page
  };
  constructor(props) {
    super(props);
    this.state = {
      displayMenu: false,
      AddtaskOpt: false,
      usrnm: "",
      passwordFlag: "",
      hasError: false, //Added by chandrani for custom error page
      hammenu: true,
      TaskDropdwn: false,
      userid: "",
      role_id: "",
    };
    this.showDropdownMenu = this.showDropdownMenu.bind(this);
    this.hideDropdownMenu = this.hideDropdownMenu.bind(this);
    this.idleTimer = null;
    this.onAction = this._onAction.bind(this);
    this.onActive = this._onActive.bind(this);
    this.onIdle = this._onIdle.bind(this);
  }

  logoutnormal = () => {
    localStorage.clear();
    this.props.history.replace("/");
    disableBrowserBackButton();
  };

  //Added by chandrani for custom error page
  componentDidCatch() {
    this.setState({ hasError: true });
  }

  showTaskDropdwnHandler = () => {
    this.setState({
      TaskDropdwn: !this.state.TaskDropdwn
    });
  };
  showDropdownMenu(event) {
    event.preventDefault();
    this.setState({ displayMenu: true }, () => {
      document.addEventListener("click", this.hideDropdownMenu);
    });
  }
  componentDidMount() {
    if (window.innerWidth <= 768) {
      this.setState({ hammenu: false });
    }
  }
  checkPassword(inputtext) {
    // at least one number, one lowercase and one uppercase letter
    // at least six characters
    var re = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;

    // return re.test(str);
  }

  _onAction(e) {
    //console.log('user did something', e)
  }

  _onActive(e) {
    // console.log('user is active', e)
    // console.log('time remaining', this.idleTimer.getRemainingTime())
  }

  _onIdle(e) {
    localStorage.clear();
    window.location.href = "/";
    disableBrowserBackButton();
  }

  templates = () => {
    this.props.history.push({
      pathname: "/Templates",
      state: {
        userid: this.props.location.state.userid,
        usrnm: this.state.usrnm,
        role_id: this.props.location.state.role_id,
        format_id: this.props.location.state.format_id,
        storeNo: this.props.location.state.storeNo,
        guId: this.props.location.state.guId,
        menuList: this.props.location.state.menuList,
        roleName: this.props.location.state.roleName,
      }
    });
  };

  Changepassword(event) {
    event.preventDefault();
    //  if (!document.getElementById("old").value) {
    //        confirmAlert({
    //     //title: 'Confirm to submit',
    //     message: 'Please enter required fields.',
    //     buttons: [
    //       {
    //         label: 'Ok',
    //         onClick: () => { window.location.reload(this.Changepassword.bind(this)); }
    //       },

    //     ]
    //   })
    // }
    // at least one number, one lowercase and one uppercase letter
    // at least six characters
    //(?=.*[@$!%*?&])
    // var re = /(?=.*[@$!%*?&])/;
    var re = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*?&]).{6,10}/;
    var cnew = document.getElementById("cnew").value;
    var newpwd = document.getElementById("newpwd").value;

    if (
      !re.test(cnew) ||
      !re.test(newpwd) ||
      !document.getElementById("old").value
    ) {
      confirmAlert({
        //title: 'Confirm to submit',
        message:
          "Password should contain atleast least one uppercase letter, one lowercase letter, one number and one special character & password should not be blank.",
        buttons: [
          {
            label: "Ok",
            onClick: () => {
              return false;
            }
          }
        ]
      });
    } else {
      if (
        document.getElementById("newpwd").value ==
        document.getElementById("cnew").value
      ) {
        confirmAlert({
          //title: 'Confirm to submit',
          message: "Are you sure, you want to update your password ?",
          buttons: [
            {
              label: "Yes",
              onClick: () => {
                var Request = {
                  userId: this.props.location.state.userid,
                  password: document.getElementById("old").value,
                  newPassword: document.getElementById("cnew").value,
                  guId: this.props.location.state.guId
                };
                var EncryptedRequest = Encrypt(Request);
                // console.log(EncryptedRequest)

                fetch("/ChangePassword", {
                  method: "POST",
                  headers: {
                    guId: this.props.location.state.guId,
                    Authorization:
                      "Basic " + basicAuth(this.props.location.state.userid)
                  },
                  body: EncryptedRequest
                })
                  .then(response => response.text())
                  .then(response => {
                    var DecryptedResponse = decryptData(response);
                    // console.log(``,DecryptedResponse)
                    if (DecryptedResponse.errorCode === "00") {
                      confirmAlert({
                        // title: 'SAVE!!!',
                        message: "Password changed successfully.",
                        buttons: [
                          {
                            label: "Ok",
                            onClick: () => {
                              window.location.href = "/";
                            }
                          }
                        ]
                      });
                    } else {
                      confirmAlert({
                        title: "Alert !",
                        message: DecryptedResponse.errorMsg,
                        buttons: [
                          {
                            label: "Ok",
                            onClick: () => {
                              window.location.reload(
                                this.Changepassword.bind(this)
                              );
                            }
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
            },
            {
              label: "No",
              onClick: () => {
                window.location.reload(this.Changepassword.bind(this));
              }
            }
          ]
        });
        //window.location.reload(this.Changepassword.bind(this));
      } else {
        confirmAlert({
          //title: 'Information',
          message: "Password does not match.",
          buttons: [
            {
              label: "Ok",
              onClick: () => {
                window.location.reload(this.Changepassword.bind(this));
              }
            }
          ]
        });
      }
    }
  }

  pagebind = () => {
    if (
      this.props.location.state !== undefined &&
      this.props.location.state.usrnm !== ""
    ) {
      if (this.props.location.state.passwordFlag === "1") {
        this.setState({ AddtaskOpt: false });
      } else {
        this.setState({ AddtaskOpt: true });
      }

      this.setState({
        usrnm: this.props.location.state.usrnm,
        role_id: this.state.roleId,
        userid: this.props.location.state.userid
      });
    } else {
      window.location.href = "/";
    }
  };

  showTaskdwnHandler = () => {
    this.setState({
      Taskdwn: !this.state.Taskdwn
    });
  };

  usercreation = () => {
    this.props.history.push({
      pathname: "/UserCreation",
      state: {
        userid: this.props.location.state.userid,
        usrnm: this.state.usrnm,
        role_id: this.props.location.state.role_id,
        format_id: this.props.location.state.format_id,
        storeNo: this.props.location.state.storeNo,
        guId: this.props.location.state.guId,
        menuList: this.props.location.state.menuList,
        roleName: this.props.location.state.roleName,
      }
    });
  };

  componentWillMount() {
    this.pagebind();
  }
  showTaskDropdwnHandler = () => {
    this.setState({
      TaskDropdwn: !this.state.TaskDropdwn
    });
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
  logout = () => {
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
  };
  tiker = () => {
    this.props.history.push({
      pathname: "/Tiker",
      state: {
        userid: this.props.location.state.userid,
        usrnm: this.state.usrnm,
        role_id: this.props.location.state.role_id,
        format_id: this.props.location.state.format_id,
        storeNo: this.props.location.state.storeNo,
        guId: this.props.location.state.guId,
        menuList: this.props.location.state.menuList,
        roleName: this.props.location.state.roleName,
      }
    });
  };
  hideDropdownMenu() {
    this.setState({ displayMenu: false }, () => {
      document.removeEventListener("click", this.hideDropdownMenu);
    });
  }
  render = () => {
    //Added by chandrani for custom error page
    if (this.state.hasError) {
      return (
        <div>
          <h2>Error occurred!! please contact administrator</h2>
        </div>
      );
    } else {
      return (
        <div>
          <section id="container">
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
            <header class="header black-bg">
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
                    <img
                      src={require("./img/user.png")}
                      className="user-img"
                    />{" "}
                    <b>{this.props.location.state.usrnm}</b> (
                    {this.props.location.state.storeNo})
                    <b className="caret" />
                  </a>
                </li>

                {this.state.displayMenu ? (
                  <ul className="dropdown-menuuser-dd">
                    <li>
                      Role : {this.props.location.state.roleName}
                    </li>
                    <li className="divider"></li>
                    <li>
                    <a onClick={this.Changepasswordbind}>Change Password</a>
                  </li>
                  <li className="divider"></li>
                    <li>
                      <a onClick={this.logout}>Log Out</a>
                    </li>
                  </ul>
                ) : null}
              </ul>
            </header>
            {this.props.location.state.passwordFlag !== "1" ? (
            <aside>
            <div id="sidebar" className="nav-collapse">
              {this.state.hammenu ? (
                <ul className="sidebar-menu" id="nav-accordion">
                {this.props.location.state.menuList["401"] || this.props.location.state.menuList["402"] || this.props.location.state.menuList["403"] || this.props.location.state.menuList["404"] || this.props.location.state.menuList["405"] || this.props.location.state.menuList["408"] || this.props.location.state.menuList["411"] ? (
                  <li
                    className="sub-menu mt"
                    onClick={this.showTaskDropdwnHandler.bind(this)}
                  >
                    {" "}
                    <a href="javascript:;">
                      {" "}
                      <i className="fa fa-tasks"></i> <span>Task</span>{" "}
                    </a>
                    {this.state.TaskDropdwn ? (
                      <div>
                        <ul class="sub">
                          {this.props.location.state.menuList["401"] ? (
                            <li>
                              <a onClick={this.TaskactiveBind.bind(this)}>
                                {this.props.location.state.menuList["401"]}
                              </a>
                            </li>
                          ) : null}
                          {this.props.location.state.menuList["402"] ? (
                            <li>
                              <a onClick={this.getroles.bind(this)}>
                                {this.props.location.state.menuList["402"]}
                              </a>
                            </li>
                          ) : null}
                          {this.props.location.state.menuList["403"] ? (
                            <li>
                              <a
                                onClick={this.CompletedTaskListbind.bind(
                                  this
                                )}
                              >
                                {this.props.location.state.menuList["403"]}
                              </a>
                            </li>
                          ) : null}
                          {this.props.location.state.menuList["404"] ? (
                            <li>
                              <a onClick={this.templates.bind(this)}>
                                {this.props.location.state.menuList["404"]}
                              </a>
                            </li>
                          ) : null}
                          {this.props.location.state.menuList["405"] ? (
                            <li>
                              <a onClick={this.ArchivedTasks.bind(this)}>
                                {this.props.location.state.menuList["405"]}
                              </a>
                            </li>
                          ) : null}
                          {this.props.location.state.menuList["408"] ? (
                            <li>
                              <a onClick={this.StoreTasks.bind(this)}>
                                {this.props.location.state.menuList["408"]}
                              </a>
                            </li>
                          ) : null}
                          {this.props.location.state.menuList["411"] ? (
                            <li>
                              <a onClick={this.toGenDashboard.bind(this)}>
                                {this.props.location.state.menuList["411"]}
                              </a>
                            </li>
                          ) : null}
                        </ul>
                      </div>
                    ) : null}
                  </li>
                ) : null }
                  {this.props.location.state.menuList["406"] ? (
                    <div>
                      <li>
                        {" "}
                        <a onClick={this.Reportsbind.bind(this)}>
                          {" "}
                          <i className="fa fa-tasks"></i>{" "}
                          <span>
                            {this.props.location.state.menuList["406"]}
                          </span>{" "}
                        </a>{" "}
                      </li>
                    </div>
                  ) : null}

                  {this.props.location.state.menuList["414"] && this.props.location.state.format_id === "102" ? (
                    <div>
                      <li>
                        {" "}
                        <a onClick={this.Defectbind.bind(this)}>
                          {" "}
                          <i className="fa fa-tasks"></i>{" "}
                          <span>
                            {this.props.location.state.menuList["414"]}
                          </span>{" "}
                        </a>{" "}
                      </li>
                    </div>
                  ) : null}

                  {this.props.location.state.menuList["415"] ? (
                    <div>
                        <li>
                          {" "}
                          <a onClick={this.SmartPointBind.bind(this)}>
                            {" "}
                            <i className="fa fa-tasks"></i>{" "}
                            <span>
                            {this.props.location.state.menuList["415"]}
                            </span>{" "}
                          </a>{" "}
                        </li>
                      </div>
                    ) : null }
                    
                  {this.props.location.state.menuList["409"] || this.props.location.state.menuList["410"] ? (
                   <div>
                    <li
                    className="sub-menu"
                    onClick={this.showIssueDropdwnHandler.bind(this)}
                  >
                    {" "}
                    <a href="javascript:;">
                      {" "}
                      <i className="fa fa-tasks"></i>{" "} 
                      <span>Issue</span>{" "}
                    </a>
                    {this.state.IssueDropdwn ? (
                      <div>
                        <ul class="sub">
                        {this.props.location.state.menuList["410"] ? (
                          <li>
                            <a onClick={this.IssueRaising.bind(this)}>
                              {this.props.location.state.menuList["410"]}
                            </a>
                          </li>
                        ) : null}
                        {this.props.location.state.menuList["409"] ? (
                          <li>
                            <a onClick={this.IssueDashboard.bind(this)}>
                              {this.props.location.state.menuList["409"]}
                            </a>
                          </li>
                        ) : null}
                         </ul>
                        </div>
                      ) : null}
                    </li>
                    </div>
                  ) : null}

                  {this.props.location.state.menuList["407"] ? (
                    <div>
                      <li
                        className="sub-menu"
                        onClick={this.showTaskdwnHandler.bind(this)}
                      >
                        {" "}
                        <a href="javascript:;">
                          {" "}
                          <i className="fa fa-tasks"></i>{" "}
                          <span>
                            {this.props.location.state.menuList["407"]}
                          </span>{" "}
                        </a>
                        {this.state.Taskdwn ? (
                          <div>
                            <ul class="sub">
                              <li>
                                {" "}
                                <a onClick={this.tiker.bind(this)}>
                                  <span>Tiker Creation</span>{" "}
                                </a>{" "}
                              </li>
                              <li>
                                {" "}
                                <a onClick={this.userlist.bind(this)}>
                                  <span>User List</span>{" "}
                                </a>{" "}
                              </li>
                              {this.props.location.state.menuList["412"] ? (
                                <li>
                                {" "}
                                <a onClick={this.Storecreation.bind(this)}>
                                  <span>{this.props.location.state.menuList["412"]}</span>{" "}
                                </a>{" "}
                              </li>
                           ) : null }
                           {this.props.location.state.menuList["413"] ? (
                            <li>
                           {" "}
                           <a onClick={this.ToStoreList.bind(this)}>
                             <span>{this.props.location.state.menuList["413"]}</span>{" "}
                           </a>{" "}
                         </li> 
                         ) : null }
                            </ul>
                          </div>
                        ) : null}
                      </li>
                    </div>
                  ) : null}
                </ul>
              ) : null}
            </div>
          </aside>
      ) : null}
            <section id="main-content">
              <section class="wrapper">
                <div class="row">
                  <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                    <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                      <h3>Change Password</h3>
                    </div>
                    <div class="clearfix"></div>
                    <hr />
                    <form className="form-horizontal" autoComplete="off">
                      <div className="col-lg-8 col-md-8 col-sm-10 col-xs-12">
                        <div className="form-group">
                          <label className="control-label col-lg-3 col-md-4 col-sm-4 col-xs-12">
                            User ID
                          </label>
                          <div class="col-lg-9 col-md-8 col-sm-8 col-xs-12">
                            <input
                              type="text"
                              class="form-control"
                              value={this.props.location.state.userid}
                              id="taskName"
                              maxlength="100"
                              autoComplete="off"
                              disabled={true}
                            />
                          </div>
                        </div>
                        <div className="form-group">
                          <label className="control-label col-lg-3 col-md-4 col-sm-4 col-xs-12">
                            Old Password
                          </label>
                          <div class="col-lg-9 col-md-8 col-sm-8 col-xs-12">
                            <input
                              type="password"
                              class="form-control"
                              placeholder="Enter Old Password"
                              id="old"
                              maxlength="100"
                              autoComplete="off"
                            />
                          </div>
                        </div>
                        <div className="form-group">
                          <label className="control-label col-lg-3 col-md-4 col-sm-4 col-xs-12">
                            New Password
                          </label>
                          <div class="col-lg-9 col-md-8 col-sm-8 col-xs-12">
                            <input
                              type="password"
                              class="form-control"
                              placeholder="Enter New Password"
                              id="newpwd"
                              maxlength="20"
                              autoComplete="off"
                            />
                          </div>
                        </div>
                        <div className="form-group">
                          <label className="control-label col-lg-3 col-md-4 col-sm-4 col-xs-12">
                            Confirm Password
                          </label>
                          <div class="col-lg-9 col-md-8 col-sm-8 col-xs-12">
                            <input
                              type="password"
                              class="form-control "
                              placeholder="Retype New Password"
                              id="cnew"
                              maxlength="20"
                              autoComplete="off"
                            />
                          </div>
                        </div>
                        <div className="form-group">
                          <label className="control-label col-lg-3 col-md-4 col-sm-4 col-xs-12">
                            {" "}
                          </label>
                          <div class="col-lg-9 col-md-8 col-sm-8 col-xs-12">
                            <button
                              class="btn btn-primary min-wid-90"
                              onClick={this.Changepassword.bind(this)}
                            >
                              Save
                            </button>
                            {this.state.AddtaskOpt ? (
                              <button
                                class="btn btn-primary min-wid-90 ml-10"
                                onClick={this.BackPage.bind(this)}
                              >
                                Cancel
                              </button>
                            ) : (
                                <button
                                  class="btn btn-primary min-wid-90 ml-10"
                                  onClick={this.BackPages.bind(this)}
                                >
                                  Cancel
                              </button>
                              )}
                          </div>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </section>
            </section>
          </section>
        </div>
      );
    }
  };

  ToStoreList = () => {
    this.props.history.push({
      pathname: "/StoreList",
      state: {
        userid: this.props.location.state.userid,
        usrnm: this.props.location.state.usrnm,
        role_id: this.props.location.state.role_id,
        format_id: this.props.location.state.format_id,
        formerMasterList: this.state.formerMasterList,
        storeNo: this.props.location.state.storeNo,
        guId: this.props.location.state.guId,
        menuList: this.props.location.state.menuList,
        roleName: this.props.location.state.roleName,
      }
    });
  };

  Storecreation = () => {
    this.props.history.push({
      pathname: "/Storecreation",
      state: {
        userid: this.props.location.state.userid,
        usrnm: this.props.location.state.usrnm,
        role_id: this.props.location.state.role_id,
        format_id: this.props.location.state.format_id,
        formerMasterList: this.state.formerMasterList,
        storeNo: this.props.location.state.storeNo,
        guId: this.props.location.state.guId,
        menuList: this.props.location.state.menuList,
        roleName: this.props.location.state.roleName,
      }
    });
  };

  showIssueDropdwnHandler = () => {
    this.setState({
      IssueDropdwn: !this.state.IssueDropdwn
    });
  };

IssueRaising = () => {
    this.props.history.push({
      pathname: "/IssueRaising",
      state: {
        userid: this.props.location.state.userid,
        usrnm: this.props.location.state.usrnm,
        role_id: this.props.location.state.role_id,
        format_id: this.props.location.state.format_id,
        data: this.props.location.state.data,
        tskId: this.props.location.state.tskId,
        tskName: this.props.location.state.tskName,
        storeNo: this.props.location.state.storeNo,
        Isroffice: this.props.location.state.Isroffice,
        guId: this.props.location.state.guId,
        menuList: this.props.location.state.menuList,
        roleName: this.props.location.state.roleName,
      }
    });
  };

  toGenDashboard = () => {
    this.props.history.push({
      pathname: "/DashboardGeneral",
      state: {
        userid: this.props.location.state.userid,
        usrnm: this.props.location.state.usrnm,
        role_id: this.props.location.state.role_id,
        format_id: this.props.location.state.format_id,
        data: this.props.location.state.data,
        tskId: this.props.location.state.tskId,
        tskName: this.props.location.state.tskName,
        storeNo: this.props.location.state.storeNo,
        Isroffice: this.props.location.state.Isroffice,
        guId: this.props.location.state.guId,
        menuList: this.props.location.state.menuList,
        roleName: this.props.location.state.roleName,
      }
    });
  };

  IssueDashboard = () => {
    this.props.history.push({
      pathname: "/IssueDashboard",
      state: {
        userid: this.props.location.state.userid,
        usrnm: this.props.location.state.usrnm,
        role_id: this.props.location.state.role_id,
        format_id: this.props.location.state.format_id,
        data: this.props.location.state.data,
        tskId: this.props.location.state.tskId,
        tskName: this.props.location.state.tskName,
        storeNo: this.props.location.state.storeNo,
        Isroffice: this.props.location.state.Isroffice,
        guId: this.props.location.state.guId,
        menuList: this.props.location.state.menuList,
        roleName: this.props.location.state.roleName,
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
        storeNo: this.props.location.state.storeNo,
        guId: this.props.location.state.guId,
        menuList: this.props.location.state.menuList,
        roleName: this.props.location.state.roleName,
      }
    });
  };
  getroles(e) {
    this.props.history.push({
      pathname: "/CreatetaskUI",
      state: {
        format_id: this.props.location.state.format_id,
        role_id: this.props.location.state.role_id,
        userid: this.props.location.state.userid,
        usrnm: this.props.location.state.usrnm,
        storeNo: this.props.location.state.storeNo,
        guId: this.props.location.state.guId,
        menuList: this.props.location.state.menuList,
        roleName: this.props.location.state.roleName,
      }
    });
  }

  SmartPointBind = () => {
    this.props.history.push({
      pathname: "/SmartPoint",
      state: {
        userid: this.props.location.state.userid,
        usrnm: this.props.location.state.usrnm,
        role_id: this.props.location.state.role_id,
        format_id: this.props.location.state.format_id,
        data: this.props.location.state.data,
        tskId: this.props.location.state.tskId,
        tskName: this.props.location.state.tskName,
        storeNo: this.props.location.state.storeNo,
        Isroffice: this.props.location.state.Isroffice,
        guId: this.props.location.state.guId,
        menuList: this.props.location.state.menuList,
        roleName: this.props.location.state.roleName,
      }
    });
  };

  Defectbind = () => {
    this.props.history.push({
      pathname: "/DefectRaising",
      state: {
        userid: this.props.location.state.userid,
        usrnm: this.props.location.state.usrnm,
        role_id: this.props.location.state.role_id,
        format_id: this.props.location.state.format_id,
        data: this.props.location.state.data,
        tskId: this.props.location.state.tskId,
        tskName: this.props.location.state.tskName,
        storeNo: this.props.location.state.storeNo,
        Isroffice: this.props.location.state.Isroffice,
        guId: this.props.location.state.guId,
        menuList: this.props.location.state.menuList,
        roleName: this.props.location.state.roleName,
      }
    });
  };

  Reportsbind = () => {
    this.props.history.push({
      pathname: "/Reports",
      state: {
        userid: this.props.location.state.userid,
        usrnm: this.state.usrnm,
        role_id: this.props.location.state.role_id,
        format_id: this.props.location.state.format_id,
        data: this.state.data,
        tskId: this.state.tskId,
        tskName: this.state.tskName,
        storeNo: this.props.location.state.storeNo,
        guId: this.props.location.state.guId,
        menuList: this.props.location.state.menuList,
        roleName: this.props.location.state.roleName,
      }
    });
  };

  StoreTasks = () => {
    this.props.history.push({
      pathname: "/StoreTasks",
      state: {
        data: this.state.data,
        userid: this.props.location.state.userid,
        usrnm: this.state.usrnm,
        role_id: this.props.location.state.role_id,
        format_id: this.props.location.state.format_id,
        storeNo: this.props.location.state.storeNo,
        guId: this.props.location.state.guId,
        menuList: this.props.location.state.menuList,
        roleName: this.props.location.state.roleName,
      }
    });
  };

  userlist = () => {
    this.props.history.push({
      pathname: "/UserList",
      state: {
        userid: this.props.location.state.userid,
        usrnm: this.state.usrnm,
        role_id: this.props.location.state.role_id,
        format_id: this.props.location.state.format_id,
        storeNo: this.props.location.state.storeNo,
        guId: this.props.location.state.guId,
        menuList: this.props.location.state.menuList,
        roleName: this.props.location.state.roleName,
      }
    });
  };

  CompletedTaskListbind = () => {
    this.props.history.push({
      pathname: "/CompletedTaskList",
      state: {
        data: this.state.data,
        userid: this.props.location.state.userid,
        usrnm: this.state.usrnm,
        role_id: this.props.location.state.role_id,
        format_id: this.props.location.state.format_id,
        storeNo: this.props.location.state.storeNo,
        guId: this.props.location.state.guId,
        menuList: this.props.location.state.menuList,
        roleName: this.props.location.state.roleName,
      }
    });
  };

  BackPage = e => {
    e.preventDefault();

    confirmAlert({
      /// title: 'Confirm to submit',
      message: "Are you sure, you want to cancel?  ",
      buttons: [
        {
          label: "Yes",
          onClick: () => {
            this.props.history.push({
              pathname: "/Taskactive",
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
          }
        },
        {
          label: "No",
          onClick: () => {
            return false;
          }
        }
      ]
    });
  };

  BackPages = e => {
    e.preventDefault();

    confirmAlert({
      /// title: 'Confirm to submit',
      message: "Are you sure, you want to cancel?  ",
      buttons: [
        {
          label: "Yes",
          onClick: () => {
            localStorage.clear();
            window.location.href = "/";
          }
        },
        {
          label: "No",
          onClick: () => {
            return false;
          }
        }
      ]
    });
  };

  ArchivedTasks = () => {
    this.props.history.push({
      pathname: "/ArchivedTasks",
      state: {
        data: this.state.data,
        userid: this.props.location.state.userid,
        usrnm: this.state.usrnm,
        role_id: this.props.location.state.role_id,
        format_id: this.props.location.state.format_id,
        storeNo: this.props.location.state.storeNo,
        guId: this.props.location.state.guId,
        menuList: this.props.location.state.menuList,
        roleName: this.props.location.state.roleName,
      }
    });
  };

  Changepasswordbind = () => {
    this.props.history.push({
      pathname: "/ChangepasswordUI",
      state: {
        userid: this.props.location.state.userid,
        usrnm: this.state.usrnm,
        role_id: this.props.location.state.role_id,
        format_id: this.props.location.state.format_id,
        storeNo: this.props.location.state.storeNo,
        guId: this.props.location.state.guId,
        menuList: this.props.location.state.menuList,
        roleName: this.props.location.state.roleName,
      }
    });
  };
}
export default ChangepasswordUI;
