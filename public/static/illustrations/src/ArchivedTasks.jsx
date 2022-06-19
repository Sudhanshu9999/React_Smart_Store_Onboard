/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-lone-blocks */
import React, { Component } from "react";
import "jquery/dist/jquery";
import { withRouter } from "react-router-dom";
import { confirmAlert } from "react-confirm-alert"; // Import
import "./css/react-confirm-alert.css"; // Import css
import Spinner from "react-spinner-material"; //Import Spinner
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Scrollbars } from "react-custom-scrollbars";
import config from "react-global-configuration";
import IdleTimer from "react-idle-timer"; // For Idle
import App from "./App"; // For Idel
import "./css/style.css";
import "./css/style-responsive.css";
import { Encrypt, decryptData } from "./Encryption-Decrypytion";
import disableBrowserBackButton from "disable-browser-back-navigation";
import { basicAuth } from "./BasicAuth";
class ArchivedTasks extends Component {
  state = {
    TaskDropdwn: false
  };
  showTaskDropdwnHandler = () => {
    this.setState({
      TaskDropdwn: !this.state.TaskDropdwn
    });
  };

  constructor(props) {
    super(props);
    this.state = {
      displayMenu: false,
      data: [],
      hasError: false //Added by chandrani for custom error page
    };
    this.state = {
      startDate: "",
      endDate: "",
      resptaskname: [],
      respstartdate: [],
      respenddate: [],
      resptaskdesc: [],
      data: [],
      taskList: [],
      value: "",
      usrnm: "",
      userid: "",
      Search: "",
      taskId: "",
      createdBy: "",
      searchSDate: "",
      searchEDate: "",
      searchName: "",
      previewData: "",
      role_id: "",
      format_id: "",
      loading: false,
      hasError: false, //Added by chandrani for custom error page
      hammenu: true
    };
    this.handleChangeStart = this.handleChangeStart.bind(this);
    this.handleChangeEnd = this.handleChangeEnd.bind(this);

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

  onUsernameChange = username => {
    this.setState({
      username: username
    });
  };

  handleChangeStart(date) {
    var monthNames = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec"
    ];
    this.setState({
      searchSDate:
        date.getDate() +
        "-" +
        monthNames[date.getMonth()] +
        "-" +
        date.getFullYear(),
      startDate: date
    });
  }
  handleChangeEnd(date) {
    var monthNames = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec"
    ];
    this.setState({
      searchEDate:
        date.getDate() +
        "-" +
        monthNames[date.getMonth()] +
        "-" +
        date.getFullYear(),
      endDate: date
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
        //console.log(`karan`, DecryptedResponse)
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

  handleTaskList([]) {
    this.setState({
      taskList: []
    });
  }

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

  _onAction(e) {
    // console.log('user did something', e)
  }

  _onActive(e) {
    //console.log('user is active', e)
    //  console.log('time remaining', this.idleTimer.getRemainingTime())
  }

  _onIdle(e) {
    localStorage.clear();
    window.location.href = "/";
    disableBrowserBackButton();
  }

  componentDidMount() {
    if (window.innerWidth <= 768) {
      this.setState({ hammenu: false });
    }
  }

  componentWillMount() {
    this.GetArchiveTaskList();
    console.log(this.props.location.state.role_id)
  }

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

  onChange = e => {
    this.setState({
      Search: e.target.value
    });
  };

  onChange1 = e => {
    this.setState({ searchName: e.target.value });
  };

  handleDateChangeRaw = e => {
    e.preventDefault();
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

  render = () => {
    var that = this;
    const { Search } = this.state;
    const { searchSDate } = this.state;
    const { searchEDate } = this.state;
    const { searchName } = this.state;
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
          <Spinner
            visible={this.state.loading}
            spinnerColor={"rgba(0, 0, 0, 0.3)"}
          />
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
            <header className="header black-bg">
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
              <ul className="nav pull-right">
                <li className="dropdown">
                  <a
                    className="dropdown-toggle"
                    data-toggle="dropdown"
                    onClick={this.showDropdownMenu}
                  >
                    <img src={require("./img/user.png")} className="user-img" />
                    <b>{this.state.usrnm}</b>
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
              <section className="wrapper">
                <div className="mt">
                  <h3>
                    <i className="fa fa-angle-right"></i> Archived Tasks
                  </h3>
                  <hr />
                  <div className="row mt">
                    <div className="col-md-12">
                      <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                        <div className="col-xs-12 col-sm-3 col-md-3 col-lg-3">
                          {" "}
                          <b>Task ID</b>
                          <br />
                          <input
                            type="text"
                            placeholder="Search Task ID"
                            className="form-control"
                            id="taskId"
                            onChange={this.onChange}
                            autoComplete="off"
                          />
                        </div>

                        <div className="col-xs-12 col-sm-3 col-md-3 col-lg-3">
                          {" "}
                          <b>Task Name</b>
                          <br />
                          <input
                            type="text"
                            placeholder="Search Task Name"
                            className="form-control"
                            id="taskName"
                            onChange={this.onChange1}
                            autoComplete="off"
                          />
                        </div>

                        <div className="col-xs-12 col-sm-3 col-md-2 col-lg-2 mt-xs-10 w-sm-110">
                          {" "}
                          <b>Start Date</b>
                          <br />
                          <DatePicker
                            autoComplete="off"
                            className="form-control form-control-inline input-medium default-date-picker"
                            size="16"
                            type="text"
                            placeholderText="Select Start Date "
                            dateFormat="dd-MMM-yyyy"
                            id="startDate"
                            selected={this.state.startDate}
                            onChange={this.handleChangeStart}
                            onChangeRaw={this.handleDateChangeRaws}
                          />
                        </div>
                        <div className="col-xs-12 col-sm-3 col-md-2 col-lg-2 mt-xs-10 w-sm-110">
                          <b> End Date</b>
                          <br />
                          <DatePicker
                            autoComplete="off"
                            className="form-control form-control-inline input-medium default-date-picker"
                            size="16"
                            type="text"
                            placeholderText="Select End Date"
                            dateFormat="dd-MMM-yyyy"
                            id="endDate"
                            selected={this.state.endDate}
                            //  minDate={this.state.startDate }
                            // maxDate={addDays(new Date(),365)}
                            onChange={this.handleChangeEnd}
                            onChangeRaw={this.handleDateChangeRawe}
                          />
                        </div>
                        <div className="col-xs-12 col-sm-1 col-md-1 col-lg-1 mt-xs-10">
                          <img
                            src={require("./img/searchicon.png")}
                            className="user-img mt-20"
                            style={{ width: "25px", height: "25px" }}
                          />
                        </div>
                      </div>
                      <div className="clearfix"></div>
                      <div className="mt">
                        <div className="tbl-holder">
                          <table className="table table-striped table-advance table-hover table-bordered tbl-task tbl-hhide">
                            <thead>
                              <tr>
                                <th>Task ID</th>
                                <th>Task Name</th>
                                <th>Start Date</th>
                                <th>End Date</th>
                              </tr>
                            </thead>
                          </table>
                          <Scrollbars style={{ height: 296 }}>
                          {this.props.location.state.role_id === "900" ? 
                            <table className="table table-striped table-advance table-hover table-bordered tbl-task">
                              <tbody>
                                {this.state.data.map(function (item, key) {
                                  if (
                                    (Search !== "" ||
                                      searchSDate !== "" ||
                                      searchEDate !== "" ||
                                      searchName !== "") &&
                                    (item.taskId
                                      .toLowerCase()
                                      .indexOf(Search.toLowerCase()) ||
                                      item.taskName
                                        .toLowerCase()
                                        .indexOf(searchName.toLowerCase()) ||
                                      item.startDate
                                        .toLowerCase()
                                        .indexOf(searchSDate.toLowerCase()) ||
                                      item.endDate
                                        .toLowerCase()
                                        .indexOf(searchEDate.toLowerCase())) ===
                                    -1
                                  ) {
                                    return null;
                                  }
                                  return (
                                    <tr key={key}>
                                      <td data-th="Task ID">
                                    
                                        <a
                                          onClick={that.callquestionpaperpage.bind(
                                            that,
                                            
                                            item.taskId,
                                            item.taskName,
                                            item.taskDescr,
                                            item.startDate,
                                            item.endDate
                                          )}
                                          className="black-text"
                                          style={{ cursor: "pointer" }}
                                        >
                                          {" "}
                                          {item.taskId}
                                        </a>
                                      
                                      </td>

                                      <td data-th="Task Name">
                                        {item.taskName}
                                      </td>
                                      <td data-th="Start Date">
                                        {item.startDate}
                                      </td>
                                      <td data-th="End Date">
                                        {item.endDate}

                                        <span className="d-none">
                                          {item.taskId}
                                        </span>
                                      </td>
                                    </tr>
                                  );
                                })}
                              </tbody>
                            </table>
                            :
                            <table className="table table-striped table-advance table-hover table-bordered tbl-task">
                            <tbody>
                              {this.state.data.map(function (item, key) {
                                if (
                                  (Search !== "" ||
                                    searchSDate !== "" ||
                                    searchEDate !== "" ||
                                    searchName !== "") &&
                                  (item.taskId
                                    .toLowerCase()
                                    .indexOf(Search.toLowerCase()) ||
                                    item.taskName
                                      .toLowerCase()
                                      .indexOf(searchName.toLowerCase()) ||
                                    item.startDate
                                      .toLowerCase()
                                      .indexOf(searchSDate.toLowerCase()) ||
                                    item.endDate
                                      .toLowerCase()
                                      .indexOf(searchEDate.toLowerCase())) ===
                                  -1
                                ) {
                                  return null;
                                }
                                return (
                                  <tr key={key}>
                                    <td data-th="Task ID">
                                   
                                      <a
                                      onClick={that.callpreviewquestionpage.bind(
                                        that,
                                        item.taskId,
                                        item.taskName,
                                        item.taskDescr,
                                        item.startDate,
                                        item.endDate
                                      )}
                                      className="black-text"
                                      style={{ cursor: "pointer" }}
                                    >
                                      {" "}
                                      {item.taskId}
                                    </a>
                                    
                                    </td>

                                    <td data-th="Task Name">
                                      {item.taskName}
                                    </td>
                                    <td data-th="Start Date">
                                      {item.startDate}
                                    </td>
                                    <td data-th="End Date">
                                      {item.endDate}

                                      <span className="d-none">
                                        {item.taskId}
                                      </span>
                                    </td>
                                  </tr>
                                );
                              })}
                            </tbody>
                          </table>
                              }
                          </Scrollbars>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            </section>
          </section>
        </div>
      );
    }
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

  TaskactiveBind = () => {
    this.props.history.push({
      pathname: "/Taskactive",
      state: {
        userid: this.props.location.state.userid,
        usrnm: this.state.usrnm,
        role_id: this.state.role_id,
        format_id: this.state.format_id,
        storeNo: this.props.location.state.storeNo,
        guId: this.props.location.state.guId,
        menuList: this.props.location.state.menuList,
        roleName: this.props.location.state.roleName,
      }
    });
  };
  GetArchiveTaskList(e) {
    if (
      this.props.location.state !== undefined &&
      this.props.location.state.usrnm !== ""
    ) {
      if (this.props.location.state.role_id === "900"){
        this.setState({ loading: true });
        this.setState({ userid: this.props.location.state.userid });
        this.setState({ usrnm: this.props.location.state.usrnm });
        this.setState({ role_id: this.props.location.state.role_id });
        this.setState({ format_id: this.props.location.state.format_id });
  
        var Request = {
          storeNo: this.props.location.state.storeNo,
          guId: this.props.location.state.guId
        };
        var EncryptedRequest = Encrypt(Request);
        console.log(EncryptedRequest);
  
        fetch("/GetArchiveStoreTaskList", {
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
            console.log(`karan`, DecryptedResponse);
            if (DecryptedResponse.errorCode === "00") {
              this.setState({ data: DecryptedResponse.archiveTaskList });
  
              // console.log(`response of GetArchiveTaskList : `, DecryptedResponse)
              this.setState({
                loading: false
              });
              this.setState({ usrnm: this.props.location.state.usrnm });
              this.setState({ role_id: this.props.location.state.role_id });
              this.setState({ format_id: this.props.location.state.format_id });
              // console.log(`response: Tasks: `+ responseJson.archiveTaskList)
            } else {
              this.setState({ loading: false });
  
              confirmAlert({
                message: DecryptedResponse.errorMsg,
                buttons: [
                  {
                    label: "Ok"
                    // onClick: () => { this.logout.bind(this) }
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
      else {
      this.setState({ loading: true });
      this.setState({ userid: this.props.location.state.userid });
      this.setState({ usrnm: this.props.location.state.usrnm });
      this.setState({ role_id: this.props.location.state.role_id });
      this.setState({ format_id: this.props.location.state.format_id });

      var Request = {
        userId: this.props.location.state.userid,
        guId: this.props.location.state.guId
      };
      var EncryptedRequest = Encrypt(Request);
      console.log(EncryptedRequest);

      fetch("/GetArchiveTaskList", {
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
          console.log(`karan`, DecryptedResponse);
          if (DecryptedResponse.errorCode === "00") {
            this.setState({ data: DecryptedResponse.archiveTaskList });

            // console.log(`response of GetArchiveTaskList : `, DecryptedResponse)
            this.setState({
              loading: false
            });
            this.setState({ usrnm: this.props.location.state.usrnm });
            this.setState({ role_id: this.props.location.state.role_id });
            this.setState({ format_id: this.props.location.state.format_id });
            // console.log(`response: Tasks: `+ responseJson.archiveTaskList)
          } else {
            this.setState({ loading: false });

            confirmAlert({
              message: DecryptedResponse.errorMsg,
              buttons: [
                {
                  label: "Ok"
                  // onClick: () => { this.logout.bind(this) }
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
    } else {
      window.location.href = "/";
    }
  }

  callquestionpaperpage(
    
    taskId,
    taskName,
    taskDescription,
    startDate,
    endDate
  ) {
  
    this.props.history.push({
      pathname: "/QuestionPaper",
      state: {
        taskId: taskId,
        taskName: taskName,
        taskDescription: taskDescription,
        startDate: startDate,
        endDate: endDate,
        role_id: this.props.location.state.role_id,
        format_id: this.props.location.state.format_id,
        userid: this.props.location.state.userid,
        usrnm: this.props.location.state.usrnm,
        data: this.props.location.state.data,
        storeNo: this.props.location.state.storeNo,
       /*  storeName: this.props.location.state.storeName, */
       /*  ansStatus: ansStatus, */
        guId: this.props.location.state.guId,
        menuList: this.props.location.state.menuList,
        roleName: this.props.location.state.roleName,
      }
    });
  }


  callpreviewquestionpage(taskId, taskName, taskDescr, startDate, endDate) {
    this.props.history.push({
      pathname: "/QuestionPreviewForArchivedTask",
      state: {
        taskId: taskId,
        taskName: taskName,
        taskDescription: taskDescr,
        startDate: startDate,
        endDate: endDate,
        role_id: this.props.location.state.role_id,
        format_id: this.props.location.state.format_id,
        userid: this.props.location.state.userid,
        usrnm: this.props.location.state.usrnm,
        data: this.props.location.state.data,
        storeNo: this.props.location.state.storeNo,
        guId: this.props.location.state.guId,
        menuList: this.props.location.state.menuList,
        roleName: this.props.location.state.roleName,
      }
    });
  }

  ChangepasswordBind = () => {
    this.props.history.push({
      pathname: "/ChangepasswordUI",
      state: {
        userid: this.props.location.state.userid,
        data: this.state.data,
        usrnm: this.state.usrnm,
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

  CompletedTaskListbind = () => {
    this.props.history.push({
      pathname: "/CompletedTaskList",
      state: {
        data: this.state.data,
        // previewData:this.state.previewData,
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
}
export default withRouter(ArchivedTasks);
