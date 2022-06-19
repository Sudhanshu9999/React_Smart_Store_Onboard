import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { BrowserRouter as Router } from "react-router-dom";
import { confirmAlert } from "react-confirm-alert"; // Import
import "./css/react-confirm-alert.css"; // Import css
import Spinner from "react-spinner-material"; //Import Spinner
import { Scrollbars } from "react-custom-scrollbars";
import config from "react-global-configuration";
import disableBrowserBackButton from "disable-browser-back-navigation";
import IdleTimer from "react-idle-timer"; // For Idle
import App from "./App"; // For Idel
import "./css/style.css";
import "./css/style-responsive.css";
import { Encrypt, decryptData } from "./Encryption-Decrypytion";
import { basicAuth } from "./BasicAuth";

const ParentComponent = props => (
  <div id="children-pane">
    {props.children}
    <div class="col-lg-2 col-md-2 col-sm-2 col-xs-12 mt-17">
      <button
        id="add-opt-btn"
        type="button"
        class="btn btn-primary"
        onClick={props.addChild}
      >
        +
      </button>
    </div>
  </div>
);

const ChildComponent = props => (
  <div class="col-lg-3 col-md-4 col-sm-4 col-xs-12 mt-17">
    <input
      type="text"
      class="form-control"
      placeholder={"Option " + props.number}
      onChange={props.OptChange}
      id={"Opts" + props.number}
      onKeyPress={props.OptStop}
      autoComplete="off"
      maxLength="250"
    />

  </div>
);

class Addquestion extends Component {
  constructor(props) {
    super(props);
    this.state = {
      displayMenu: false,
      loaded: this.props.location.state,
      check: '1',
      checked: true,
      value1: "",
      value2: "",
      hasError: false   //Added by chandrani for custom error page

    };

    this.state = {
      tskId: "",
      tskName: "",
      tskDescr: "",
      strtDate: "",
      edDate: "",
      numChildren: 0,
      TaskDropdwn: false,
      description: [],
      qtypeId: [],
      value: "",
      valueid: [],
      question: "",
      option: "",
      QType: "",
      QuestionText: "",
      OptsValues: [],
      data: [],
      role_id: "",
      userid: "",
      usrnm: "",
      optns: [],
      Addoptbutton: false,
      loading: false,
      show: true,
      showed: false,
      isMandatory: "",
      check: "1",
      checked: true,
      value1: "",
      value2: "",
      status: true,
      hasError: false, //Added by chandrani for custom error page
      hammenu: true
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
  inputChangedHandler = (param, evt) => {
    if (param === "min") {
      if (evt.target.value.length === 1) {
        const value1c = evt.target.validity.valid
          ? evt.target.value
          : this.state.value1;
        this.setState({ numchange: true, value1: value1c });
        document.getElementById(param).value = value1c;
      } else {
        const value1c = evt.target.validity.valid
          ? evt.target.value
          : this.state.value1;
        this.setState({ numchange: true, value1: value1c });
        document.getElementById(param).value = value1c;
      }
    } else if (param === "max") {
      if (evt.target.value.length === 1) {
        const value2c = evt.target.validity.valid
          ? evt.target.value
          : this.state.value2;
        this.setState({ numchange: true, value2: value2c });
        document.getElementById(param).value = this.state.value2;
      } else {
        const value2c = evt.target.validity.valid
          ? evt.target.value
          : evt.target.value.substring(0, evt.target.value.length - 1);
        this.setState({ numchange: true, value2: value2c });
        document.getElementById(param).value = value2c;
      }
    }
  };

  componentDidMount() {
    if (window.innerWidth <= 768) {
      this.setState({ hammenu: false });
    }
  }

  fullStop = e => {
    var theEvent = e || window.event;
    var key = theEvent.keyCode || theEvent.which;
    key = String.fromCharCode(key);
    var regex = /[^,;]+$/;
    if (!regex.test(key)) {
      theEvent.returnValue = false;
      if (theEvent.preventDefault) {
        theEvent.preventDefault();
      }
    }
  };

  inputChangedHandlertxt = event => {
    this.setState({
      question: event.target.value
    });
  };
  optionChangedHandler = event => {
    this.setState({
      option: event.target.value
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

  handleChangeChk = e => {
    if (document.getElementById("chkbox").checked === false) {
      this.setState({ check: 0 });
      this.setState({ checked: false });
    } else {
      this.setState({ check: 1 });
      this.setState({ checked: true });
    }
  };

  onChanged(e) {
    const re = /^[0-9\b]+$/;
    if (e.target.value === "" || re.test(e.target.value)) {
      this.setState({ value: e.target.value });
    }
  }

  _onAction(e) {
    //console.log('user did something', e)
  }

  _onActive(e) {
    //console.log('user is active', e)
    // console.log('time remaining', this.idleTimer.getRemainingTime())
  }

  componentWillMount() {
    this.FetchQuestionsByTask();
    console.log("publishStatus", this.props.location.state.publishStatus)
  }

  _onIdle(e) {
    localStorage.clear();
    window.location.href = "/";
    disableBrowserBackButton();
  }

  enter = event => {
    if (event.which === 13) {
      event.preventDefault();
    }
  };

  changeqtype = e => {
    this.setState({ value: e.target.value });
    // alert("select QType on select : "+ e.target.value)
    // alert("rlistid of on change: "+ this.state.qtypeId)
    let flag = [];

    for (var i = 0; i < this.state.description.length; i++) {
      this.state.description[i] === e.target.value
        ? flag.push(this.state.qtypeId[i])
        : this.setState({ valueid: "" });
    }
    this.setState({ valueid: flag });
    this.setState({ Addoptbutton: false });
    //alert("flag : "+ flag)
    if (flag == "1") {
      this.setState({ Addoptbutton: true });
      this.setState({ showed: false });
    } else {
      if (flag == "2") {
        this.setState({ Addoptbutton: true });
        this.setState({ showed: false });
      } else {
        if (flag == "4") {
          this.setState({ showed: true });
        } else {
          if (flag == "9") {
            this.setState({ Addoptbutton: true });
            this.setState({ showed: false });
          } else {
            if (flag == "10") {
              this.setState({ Addoptbutton: false });
              this.setState({ showed: false });
            } else {
              this.setState({ Addoptbutton: false });
              this.setState({ showed: false });
            }
          }
        }
      }
    }
  };

  render = () => {
    var that = this;
    const children = [];

    for (var i = 0; i < this.state.numChildren; i += 1) {
      if(i<15){
      children.push(<ChildComponent key={i} number={i} />);
      } else {
        confirmAlert({
          title: "Alert !",
          message: "You have reached the maximum limit for options",
          buttons: [
            {
              label: "Ok"
            }
          ]
        });
      }
    }
    //Added by chandrani for custom error page
    if (this.state.hasError) {
      return (
        <div>
          <h2>Error occurred!! please contact administrator</h2>
        </div>
      );
    }

    else {
      return (
        <Router>
          <div>
            <section id="container">
              <header class="header black-bg">

                <a
                  className="mob-show"
                  onClick={() =>
                    this.setState({ hammenu: !this.state.hammenu })
                  }
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

                      <img
                        src={require("./img/user.png")}
                        className="user-img"
                      />
                      <b>{this.props.location.state.usrnm}</b> (
                      {this.props.location.state.storeNo})
                      <b className="caret" />
                    </a>
                  </li>
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

                  </div>
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
              <section id="main-content">
                <section class="wrapper">
                  <div class="row">
                    <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                      {this.state.publishStatus === "Published" ? (
                        <div class="text-right mt-20">
                          <button
                            class="btn btn-primary min-wid-90"
                            onClick={this.reminder.bind(this)}
                          >
                            Send Reminder
                          </button>
                        </div>
                      ) : null}
                      <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                        <h3 class="mt-5">
                          <i className="fa fa-angle-right"></i>
                          {" "}{this.state.tskName}
                        </h3>
                        </div>
                       
                        <div class="col-md-6 col-lg-6 col-sm-6 col-xs-6">
                        Description : {this.state.tskDescr}
                      </div>
                      <div class="col-md-6 col-lg-6 col-sm-6 col-xs-6">
                      Start Date : {this.state.strtDate}
                    </div>
                    <div class="clearfix"></div>
                       <div class="col-md-6 col-lg-6 col-sm-6 col-xs-6">
                       Functions Involved : {this.props.location.state.functionalList}
                      </div>
                      <div class="col-md-6 col-lg-6 col-sm-6 col-xs-6">
                        End Date : {this.state.edDate}
                      </div> 
                    
                            <div class="clearfix"></div>
                      <hr />

                      <div class="clearfix"></div>
                      {this.state.publishStatus == "New" ? (
                        <div class="ques-box">
                          <div>
                            <input
                              type="checkbox"
                              onChange={this.handleChangeChk.bind(this)}
                              id="chkbox"
                              checked={that.state.checked}
                            />{" "}
                            Mandatory
                          </div>

                          <br />
                          <div class="col-lg-3 col-md-4 col-sm-4 col-xs-12">
                            {this.state.publishStatus == "New" ? (
                              <select
                                class="form-control"
                                onChange={this.changeqtype.bind(this)}
                                id="SelQType"
                              >
                                <option id="select">Select</option>
                                {this.state.description.map(element => (
                                  <option>{element}</option>
                                ))}
                              </select>
                            ) : null}
                          </div>
                          <div class="col-lg-9 col-md-8 col-sm-8 col-xs-12 mt-cs-10">
                            {this.state.publishStatus === "New" ? (
                              <input
                                type="text"
                                class="form-control"
                                placeholder="Enter Question"
                                onChange={this.inputChangedHandlertxt.bind(
                                  this
                                )}
                                id="QText"
                                autoComplete="off"
                                maxLength="800"
                              />
                            ) : null}{" "}
                          </div>
                          {this.state.Addoptbutton ? (
                            <div>
                              <ParentComponent
                                addChild={this.onAddChild}
                                OptStop={this.fullStop}
                                OptChange={this.optionChangedHandler}
                              >
                                {children}
                              </ParentComponent>
                            </div>
                          ) : null}

                          {this.state.showed ? (
                            <div class="col-lg-3 col-md-4 col-sm-4 col-xs-12 mt-17">
                              <input
                                type="text"
                                class="form-control"
                                placeholder="Min Length"
                                onInput={this.inputChangedHandler.bind(
                                  this,
                                  "min"
                                )}

                                id="min"
                                pattern="[0-9]*"
                                autoComplete="off"
                              />
                              <input
                                type="text"
                                class="form-control"
                                placeholder="Max Length"
                                onInput={this.inputChangedHandler.bind(
                                  this,
                                  "max"
                                )}

                                id="max"
                                pattern="[0-9]*"
                                autoComplete="off"
                              />
                            </div>
                          ) : null}
                        </div>
                      ) : null}
                      {this.state.publishStatus == "New" ? (
                        <div class="text-center">
                          <button
                            class="btn btn-primary min-wid-90"
                            onClick={this.CreateQuestions.bind(this)}
                            onKeyPress={this.enter}
                          >
                            Add Question
                          </button>{" "}
                        </div>
                      ) : null}
                      <div class="clearfix"></div>
                      <div class="mt">
                        <div className="tbl-holder">
                          <div>
                            <div className="spin">
                              <Spinner
                                visible={this.state.loading}
                                spinnerColor={"rgba(0, 0, 0, 0.3)"}
                              />
                            </div>

                            <table className="table table-striped table-advance table-hover table-bordered tbl-task tbl-hhide">
                              <thead>
                                <tr>
                                  <th>Question Type</th>
                                  <th>Question</th>
                                  <th>Options</th>
                                  <th>Action</th>
                                </tr>
                              </thead>
                            </table>
                            <Scrollbars style={{ height: 296 }}>
                              <table className="table table-striped table-advance table-hover table-bordered tbl-task">
                                <tbody>
                                  {this.state.data.map(function (item, key) {
                                    return (
                                      <tr key={key}>
                                        <td data-th="Question Type">
                                          <span className="d-none">
                                            {item.questionId}
                                          </span>
                                          <a className="black-text">
                                            {" "}
                                            {item.questionTypeValue}
                                          </a>
                                        </td>
                                        <td data-th="Question" id="item">
                                          {item.questionText}
                                        </td>
                                        <td data-th="Options">
                                          <ul class="opt-ans">
                                            {item.options.map(optele => (
                                              <li>{optele}</li>
                                            ))}
                                          </ul>
                                        </td>
                                        <td data-th="Action">
                                          {that.state.publishStatus == "New" ? (
                                            <a
                                              className="edit-icon"
                                              onClick={that.callupdatequestionpage.bind(
                                                that,
                                                item.questionId,
                                                item.questionText,
                                                item.questionTypeValue,
                                                item.questiontype,
                                                item.minValue,
                                                item.maxValue,
                                                item.options,
                                                item.updatedBy,
                                                item.isMandatory
                                              )}
                                            >
                                              {" "}
                                              <i className="fa fa-pencil "></i>{" "}
                                            </a>
                                          ) : null}

                                          {that.state.publishStatus == "New" ? (
                                            <a
                                              className="delete-icon"
                                              value="Delete"
                                              onClick={that.DeleteQuestion.bind(
                                                that,
                                                item.questionId
                                              )}
                                            >
                                              {" "}
                                              <i className="fa fa-trash-o "></i>{" "}
                                            </a>
                                          ) : null}
                                        </td>
                                      </tr>
                                    );
                                  })}

                                </tbody>
                              </table>
                            </Scrollbars>
                          </div>
                        </div>
                      </div>

                      <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12 text-center">
                        <div class="text-center mt ">
                          {this.props.location.state.role_id === "300" ? (
                            <button
                              class="btn btn-primary min-wid-90 "
                              onClick={this.TaskactiveBind.bind(this)}
                            >
                              Back
                            </button>
                          ) : (
                              <button
                                class="btn btn-primary min-wid-90 "
                                onClick={this.StoreTasks.bind(this)}
                              >
                                Back
                            </button>
                            )}
                          {this.state.show ? (
                            <button
                              class="btn btn-primary min-wid-90 ml-10 "
                              onClick={this.PreviewQuestion.bind(this)}
                            >
                              Preview
                            </button>
                          ) : null}
                        </div>
                      </div>
                    </div>
                  </div>
                </section>
              </section>
            </section>
          </div>
        </Router>
      );
    }
  };
  onAddChild = () => {
    this.setState({
      numChildren: this.state.numChildren + 1
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

  TaskactiveBind = () => {
    this.props.history.push({
      pathname: "/Taskactive",
      state: {
        userid: this.props.location.state.userid,
        usrnm: this.state.usrnm,
        role_id: this.state.role_id,
        format_id: this.props.location.state.format_id,
        storeNo: this.props.location.state.storeNo,
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

  Reportsbind = () => {
    this.props.history.push({
      pathname: "/Reports",
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

  CreateQuestions(e) {


    if (document.getElementById("SelQType").value === "Select") {
      confirmAlert({
        title: "Alert !",
        message: "Please select option",
        buttons: [
          {
            label: "Ok"
            //onClick: () => { this.logout.bind(this) }
          }
        ]
      });
    } else {
      if (document.getElementById("QText").value === "") {
        confirmAlert({
          title: "Alert !",
          message: "Please enter Question",
          buttons: [
            {
              label: "Ok"
              //onClick: () => { this.logout.bind(this) }
            }
          ]
        });
      } else {
        // console.log(this.state.valueid[0])
        if (
          this.state.valueid[0] != "1" &&
          this.state.valueid[0] != "2" &&
          this.state.valueid[0] != "9" &&
          this.state.valueid[0] != "4"
        ) {
          var Request = {
            taskId: this.props.location.state.tskId,
            userId: this.props.location.state.userid,
            guId: this.props.location.state.guId,
            listQuestions: [
              {
                questionText: document.getElementById("QText").value,
                questiontype: this.state.valueid.toString(),
                minValue: "",
                maxValue: "",
                options: [""],
                isMandatory: this.state.check
              }
            ]
          };
          var EncryptedRequest = Encrypt(Request);
          // console.log(EncryptedRequest)

          fetch("/CreateQuestions", {
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
                // console.log(`response: `, DecryptedResponse)

                confirmAlert({

                  message: "Question added successfully.",
                  buttons: [
                    {
                      label: "Ok",
                      onClick: () => window.location.reload(true)
                    }
                  ]
                });

                this.props.history.push({
                  pathname: "/Addquestion",
                  state: {
                    tskName: this.state.tskName,
                    role_id: this.state.role_id,
                    format_id: this.props.location.state.format_id,
                    tskId: this.state.tskId,
                    userid: this.props.location.state.userid,
                    usrnm: this.state.usrnm,
                    tskDescr: this.state.tskDescr,
                    strtDate: this.state.strtDate,
                    edDate: this.state.edDate,
                    publishStatus: this.state.publishStatus,
                    storeNo: this.props.location.state.storeNo,
                    guId: this.props.location.state.guId,
                    menuList: this.props.location.state.menuList,
                    roleName: this.props.location.state.roleName,
                  }
                });
              } else {
                confirmAlert({
                  title: "Alert !",
                  message: DecryptedResponse.errorMsg,
                  buttons: [
                    {
                      label: "Ok"
                      // onClick: () =>
                    }
                  ]
                });

                // console.log(`response: Question Formats: ` + this.props.location.state.role_id)
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
        } else {
          if (this.state.valueid[0] == "4") {
            if (
              parseInt(document.getElementById("min").value) >=
              parseInt(document.getElementById("max").value)
            ) {
              confirmAlert({
                message: "Minimum value cannot be greater than Maximum value .",
                buttons: [
                  {
                    label: "Ok"
                    //onClick: () => {this.CreateQuestions.bind(this)}
                  }
                ]
              });
            } else {
              var Request1 = {
                taskId: this.props.location.state.tskId,
                userId: this.props.location.state.userid,
                guId: this.props.location.state.guId,
                listQuestions: [
                  {
                    questionText: document.getElementById("QText").value,
                    questiontype: this.state.valueid.toString(),
                    minValue: document.getElementById("min").value,
                    maxValue: document.getElementById("max").value,
                    options: [""],
                    isMandatory: this.state.check
                  }
                ]
              };
              var EncryptedRequest1 = Encrypt(Request1);
              // console.log(EncryptedRequest1)

              fetch("/CreateQuestions", {
                method: "POST",
                headers: {
                  guId: this.props.location.state.guId,
                  Authorization:
                    "Basic " + basicAuth(this.props.location.state.userid)
                },
                body: EncryptedRequest1
              })
                .then(response => response.text())
                .then(response => {
                  var DecryptedResponse = decryptData(response);
                  // console.log(``,DecryptedResponse)
                  if (DecryptedResponse.errorCode === "00") {
                    // console.log(`response: `, DecryptedResponse)

                    confirmAlert({
                      //title: 'Confirm to submit',
                      message: "Question added successfully.",
                      buttons: [
                        {
                          label: "Ok",
                          onClick: () => window.location.reload(true)
                        }
                      ]
                    });

                    this.props.history.push({
                      pathname: "/Addquestion",
                      state: {
                        tskName: this.state.tskName,
                        role_id: this.state.role_id,
                        format_id: this.props.location.state.format_id,
                        tskId: this.state.tskId,
                        userid: this.props.location.state.userid,
                        usrnm: this.state.usrnm,
                        tskDescr: this.state.tskDescr,
                        strtDate: this.state.strtDate,
                        edDate: this.state.edDate,
                        publishStatus: this.state.publishStatus,
                        storeNo: this.props.location.state.storeNo,
                        guId: this.props.location.state.guId,
                        menuList: this.props.location.state.menuList,
                        roleName: this.props.location.state.roleName,
                      }
                    });
                  } else {
                    confirmAlert({
                      title: "Alert !",
                      message: DecryptedResponse.errorMsg,
                      buttons: [
                        {
                          label: "Ok"
                          // onClick: () =>
                        }
                      ]
                    });

                    // console.log(`response: Question Formats: ` + this.props.location.state.role_id)
                    // console.log(`taskId` + this.props.location.state.tskId)
                    // console.log(`userId` + this.props.location.state.userid)
                    // console.log(`questionText` + document.getElementById("QText").value)
                    // console.log(`questiontype` + this.state.valueid)
                    // console.log(`minValue` + document.getElementById("min").value)
                    // console.log(`maxValue` + document.getElementById("max").value)
                    // console.log(`isMandatory` + this.state.check)
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
          } else {
            if (this.state.numChildren === 0) {
              //  console.log(`kd`,this.state.numChildren.value)
              confirmAlert({
                title: "Alert !",
                message: "Please create option ",
                buttons: [
                  {
                    label: "Ok"
                    // onClick: () => { this.logout.bind(this) }
                  }
                ]
              });
            } else {
              this.setState({
                QType: document.getElementById("SelQType").value,
                QuestionText: document.getElementById("QText").value,
                OptsValues: document.getElementById("Opts" + 0).value
              });

              let otval = [];
              for (var i = 0; i < this.state.numChildren; i++) {
                //  console.log(`OptsValues: ffff`, this.state.numChildren.value);

                if (
                  document.getElementById("Opts" + i).value.indexOf(",") >= 0
                ) {
                  if (document.getElementById("Opts" + i).value.includes(",")) {
                    otval.push(
                      document
                        .getElementById("Opts" + i)
                        .value.replace(/,/g, "")
                    );
                  }
                } else {
                  otval.push(document.getElementById("Opts" + i).value);
                  this.setState({ OptsValues: otval });
                }
              }

              if (document.getElementById("Opts" + 0).value == "") {
                confirmAlert({
                  title: "Alert !",
                  message: "Options can not be blank",
                  buttons: [
                    {
                      label: "Ok"
                      // onClick: () => { this.logout.bind(this) }
                    }
                  ]
                });
              } else {
                //console.log(`array`,cleanArray)

                var Request2 = {
                  taskId: this.props.location.state.tskId,
                  userId: this.props.location.state.userid,
                  guId: this.props.location.state.guId,
                  listQuestions: [
                    {
                      questionText: document.getElementById("QText").value,
                      questiontype: this.state.valueid.toString(),
                      minValue: "",
                      maxValue: "",
                      options: otval.filter(function (el) {
                        return el != "";
                      }),
                      isMandatory: this.state.check
                    }
                  ]
                };
                var EncryptedRequest2 = Encrypt(Request2);
                console.log(EncryptedRequest2);

                fetch("/CreateQuestions", {
                  method: "POST",
                  headers: {
                    guId: this.props.location.state.guId,
                    Authorization:
                      "Basic " + basicAuth(this.props.location.state.userid)
                  },
                  body: EncryptedRequest2
                })
                  .then(response => response.text())
                  .then(response => {
                    var DecryptedResponse = decryptData(response);
                    // console.log(``,DecryptedResponse)
                    //   console.log(`response: `, DecryptedResponse)
                    //   console.log(`taskId: `, this.props.location.state.tskId)
                    //   console.log(`questionText: `, this.state.QuestionText)
                    //   console.log(`questiontype: `, this.state.valueid)
                    //   console.log(`options: `, this.state.OptsValues)
                    //   console.log(`isMandatory`,this.state.check)

                    if (DecryptedResponse.errorCode === "00") {
                      // console.log(`response: `, DecryptedResponse)

                      confirmAlert({
                        // title: 'Confirm to submit',
                        message: "Question added successfully",
                        buttons: [
                          {
                            label: "Ok",
                            onClick: () => window.location.reload(true)
                          }
                        ]
                      });

                      this.props.history.push({
                        pathname: "/Addquestion",
                        state: {
                          tskName: this.state.tskName,
                          role_id: this.state.role_id,
                          format_id: this.props.location.state.format_id,
                          tskId: this.state.tskId,
                          userid: this.props.location.state.userid,
                          usrnm: this.state.usrnm,
                          tskDescr: this.state.tskDescr,
                          strtDate: this.state.strtDate,
                          edDate: this.state.edDate,
                          publishStatus: this.state.publishStatus,
                          storeNo: this.props.location.state.storeNo,
                          guId: this.props.location.state.guId,
                          menuList: this.props.location.state.menuList,
                          roleName: this.props.location.state.roleName,
                        }
                      });
                    } else {
                      confirmAlert({
                        title: "Alert !",
                        message: DecryptedResponse.errorMsg,
                        buttons: [
                          {
                            label: "Ok"
                            // onClick: () =>
                          }
                        ]
                      });

                      // console.log(`response: Question Formats: ` + this.props.location.state.role_id)
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
            }
          }
        }
      }
    }
  }

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

  reminder() {
    var Request = {
      taskId: this.state.tskId,
      userId: this.props.location.state.userid,
      guId: this.props.location.state.guId
    };
    var EncryptedRequest = Encrypt(Request);
    // console.log(EncryptedRequest)

    fetch("/ReminderMail", {
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
        // console.log(``,DecryptedResponse)
        if (DecryptedResponse.errorCode === "00") {
          confirmAlert({
            // title: 'Confirm to submit',
            message:
              "Reminder send successfully. Store will receive notification mail within upcoming 3 hours .",
            buttons: [
              {
                label: "Ok",
                onClick: () => window.location.reload(true)
              }
            ]
          });

          // this.setState({ state: this.state });
        } else {
          confirmAlert({
            title: "Alert !",
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

  DeleteQuestion(questionId) {
    confirmAlert({
      //  title: 'Confirm to submit',
      message: "Are you sure, you want to delete this question?",
      buttons: [
        {
          label: "Yes",
          onClick: () => {
            var Request3 = {
              questionId: questionId,
              userId: this.props.location.state.userid,
              guId: this.props.location.state.guId
            };
            var EncryptedRequest3 = Encrypt(Request3);
            console.log(EncryptedRequest3);

            fetch("/DeleteQuestion", {
              method: "POST",
              headers: {
                guId: this.props.location.state.guId,
                Authorization:
                  "Basic " + basicAuth(this.props.location.state.userid)
              },
              body: EncryptedRequest3
            })
              .then(response => response.text())
              .then(response => {
                var DecryptedResponse = decryptData(response);
                // console.log(``,DecryptedResponse)
                if (DecryptedResponse.errorCode === "00") {
                  confirmAlert({
                    // title: 'Confirm to submit',
                    message: "Question deleted successfully.",
                    buttons: [
                      {
                        label: "Ok",
                        onClick: () => window.location.reload(true)
                      }
                    ]
                  });

                  // this.setState({ state: this.state });
                } else {
                  confirmAlert({
                    title: "Alert !",
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
        },
        {
          label: "No",
          onClick: () => {
            return false;
          }
        }
      ]
    });

    //window.location.reload(true);
  }

  FetchQuestionsByTask(e) {
    this.setState({ loading: true });

    if (
      this.props.location.state !== undefined &&
      this.props.location.state.usrnm !== ""
    ) {
      var Requested = {
        formatId: this.props.location.state.format_id,
        guId: this.props.location.state.guId
      };
      var EncryptedRequested = Encrypt(Requested);
      console.log("req format", EncryptedRequested);

      fetch("/GetQtypesByFormat", {
        method: "POST",
        headers: {
          guId: this.props.location.state.guId,
          Authorization: "Basic " + basicAuth(this.props.location.state.userid)
        },
        body: EncryptedRequested
      })
        .then(response => response.text())
        .then(response => {
          var DecryptedResponse = decryptData(response);
          console.log(`sudhanshu`, DecryptedResponse);
          if (DecryptedResponse.errorCode === "00") {
            // console.log(`response of GetQtypesByFormat`, DecryptedResponse)
            this.setState({ queDesc: DecryptedResponse.lstQTypes });
            let temp = [];
            let temp1 = [];
            for (var i = 0; i < DecryptedResponse.lstQTypes.length; i++) {
              temp.push(DecryptedResponse.lstQTypes[i].qtypeId);
              temp1.push(DecryptedResponse.lstQTypes[i].description);
            }
            this.setState({ qtypeId: temp });
            this.setState({ description: temp1 });
            // alert(" temp: "+  temp)
            // alert(" temp1: "+  temp1)
            // alert("rlistopt: "+ this.props.rlistopt)
            // alert("rlistid: "+ this.props.rlistid)
          } else {
            confirmAlert({
              title: "Alert !",
              message: DecryptedResponse.errorMsg,
              buttons: [
                {
                  label: "Ok"
                  // onClick: () =>
                }
              ]
            });

            // console.log("response: Question Formats:" + this.props.location.state.role_id)
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

      this.setState({ tskName: this.props.location.state.tskName });
      this.setState({ tskDescr: this.props.location.state.tskDescr });
      this.setState({ strtDate: this.props.location.state.strtDate });
      this.setState({ edDate: this.props.location.state.edDate });
      this.setState({ tskId: this.props.location.state.tskId });
      this.setState({ role_id: this.props.location.state.role_id });
      this.setState({ userid: this.props.location.state.userid });
      this.setState({ usrnm: this.props.location.state.usrnm });
      this.setState({ publishStatus: this.props.location.state.publishStatus });

      var Request4 = {
        taskId: this.props.location.state.tskId,
        guId: this.props.location.state.guId
      };
      var EncryptedRequest4 = Encrypt(Request4);
      console.log(EncryptedRequest4);

      fetch("/FetchQuestionsByTask", {
        method: "POST",
        headers: {
          guId: this.props.location.state.guId,
          Authorization: "Basic " + basicAuth(this.props.location.state.userid)
        },
        body: EncryptedRequest4
      })
        .then(response => response.text())
        .then(response => {
          var DecryptedResponse = decryptData(response);
          console.log(``, DecryptedResponse);
          if (DecryptedResponse.errorCode === "00") {
            // console.log(`response of FetchQuestionsByTask `, DecryptedResponse)
            // console.log(`username `, this.props.location.state.usrnm)

            this.setState({ data: DecryptedResponse.listQuestions });
            this.setState({ loading: false });
          } else {
            this.setState({ loading: false });

            confirmAlert({
              title: "Alert !",
              message: DecryptedResponse.errorMsg,
              buttons: [
                {
                  label: "Ok",
                  onClick: () => {
                    this.setState({ show: false });
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
    } else {
      window.location.href = "/";
    }
  }

  callupdatequestionpage(
    questionId,
    questionText,
    questionTypeValue,
    questiontype,
    minValue,
    maxValue,
    options,
    updatedBy,
    isMandatory
  ) {
    this.props.history.push({
      pathname: "/Updatequestions",
      state: {
        questionId: questionId,
        questionText: questionText,
        questiontype: questiontype,
        questionTypeValue: questionTypeValue,
        minValue: minValue,
        maxValue: maxValue,
        options: options,
        updatedBy: updatedBy,
        isMandatory: isMandatory,
        userid: this.props.location.state.userid,
        role_id: this.state.role_id,
        format_id: this.props.location.state.format_id,
        tskName: this.state.tskName,
        tskId: this.state.tskId,
        tskDescr: this.state.tskDescr,
        strtDate: this.state.strtDate,
        edDate: this.state.edDate,
        usrnm: this.state.usrnm,
        publishStatus: this.state.publishStatus,
        storeNo: this.props.location.state.storeNo,
        guId: this.props.location.state.guId,
        menuList: this.props.location.state.menuList,
        roleName: this.props.location.state.roleName,
        description: this.state.description,
        qtypeId: this.state.qtypeId
      }
    });
  }

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

  PreviewQuestion = () => {
    // console.log('tskId' + this.state.tskId)
    this.props.history.push({
      pathname: "/Questionpreview",
      state: {
        tskId: this.state.tskId,
        tskName: this.state.tskName,
        tskDescr: this.state.tskDescr,
        strtDate: this.state.strtDate,
        edDate: this.state.edDate,
        usrnm: this.props.location.state.usrnm,
        role_id: this.state.role_id,
        format_id: this.props.location.state.format_id,
        userid: this.props.location.state.userid,
        publishStatus: this.state.publishStatus,
        isMandatory: this.state.check,
        storeNo: this.props.location.state.storeNo,
        guId: this.props.location.state.guId,
        menuList: this.props.location.state.menuList,
        roleName: this.props.location.state.roleName,
      }
    });
  };
}
export default withRouter(Addquestion);
