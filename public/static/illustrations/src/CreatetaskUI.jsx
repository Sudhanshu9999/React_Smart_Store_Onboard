/* eslint-disable no-lone-blocks */
import React, { Component } from "react";
import DatePicker from "react-datepicker";
import addDays from "date-fns/addDays";
import "react-datepicker/dist/react-datepicker.css";
import { confirmAlert } from "react-confirm-alert"; // Import
import "./css/react-confirm-alert.css"; // Import css
import readXlsxFile from "read-excel-file";
import { withRouter } from "react-router-dom";
import Resizer from "react-image-file-resizer";
import IdleTimer from "react-idle-timer"; // For Idle
import App from "./App"; // For Idel
import "./css/style.css";
import "./css/style-responsive.css";
import { Encrypt, decryptData } from "./Encryption-Decrypytion";
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect
} from "react-router-dom";
import Taskactive from "./Taskactive";
import config from "react-global-configuration";
import disableBrowserBackButton from "disable-browser-back-navigation";
import "./lib/bootstrap/css/bootstrap.min.css";
// import { View } from 'react-native';
import $ from "jquery";
import Select from "react-select";
import ReactMultiSelectCheckboxes from "react-multiselect-checkboxes";
import MySelect from "./MySelect.jsx";
import { RadioGroup, RadioButton } from "react-radio-buttons";
import { basicAuth } from "./BasicAuth";
import Spinner from "react-spinner-material";

class CreatetaskUI extends Component {
  state = {
    TaskDropdwn: false,
    roleList: [],
    rlistopt: [],
    rlistid: [],
    value: "",
    usrnm: "",
    valueid: [],
    formatId: "",
    roleId: "",
    userid: "",
    previewData: "",
    hasError: false,   //Added by chandrani for custom error page
    hammenu: true,
    taskAssign: '',
    userId: '',
    city: [],
    state: [],
    cityReqFil: [],
    loading: false,
    subfmtList: [],
    showFlagsubFmt: false,
    requestType: ""
  }
  showTaskDropdwnHandler = () => {
    this.setState({
      TaskDropdwn: !this.state.TaskDropdwn
    });
  };

  constructor(props) {
    super(props);
    this.state = {
      displayMenu: false,
      hasError: false,   //Added by chandrani for custom error page

    };
    this.state = {
      startDate: new Date(),
      endDate: new Date(),
      StoreList: [],
      rlistopt: [],
      rlistid: [],
      FileName: "",
      value: "",
      valueid: [],
      instructionUpload: "",
      previewState: false,
      instructiondata: [],
      hasError: false, //Added by chandrani for custom error page
      hammenu: true,
      taskAssign: "",
      userId: "",
      format: "",
      arrSubProduct: ["Region"],
      optionSelectedZ: null,
      optionSelectedR: null,
      optionSelectedS: null,
      optionSelectedC: null,
      optionSelectedStore: null,
      optionSelectedFunctional: null,
      optionSubfmt: null,
      subListId: [],
      funcRole: [],
      funcRoleId: [],
      funcRoleDesc: [],
      finalFunctional: [],
      filterFunctional: [],
      manual: false,
      selective: false,
      zone: "",
      region: "",
      state: "",
      city: [],
      stores: [],
      cityname: [],

      zoneList: [],
      regionalList: [],
      stateList: [],
      cityList: [],
      storeList: [],

      showZoneList: [],
      showRegionalList: [],
      showStateList: [],
      showCityList: [],
      showStoreList: [],

      loading: false,
      TaskDropdwn: false,
      roleList: [],
      formatId: "",
      roleId: "",
      userid: "",
      previewData: "",
      cityReqFil: [],
      displayMenu: false,
      taskTypeList: [],
      taskTypeDesc: [],
      taskTypeid: [],
      valueTask: "",
      valueTaskid: "",
      subfmtList: [],
      showFlagsubFmt: false,
      requestType: ""
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


  handleChangeSubfmt = selected => {
    this.setState({
      optionSubfmt: selected
    })
    this.state.optionSelectedZ = [];
    this.state.optionSelectedR = null;
    this.state.optionSelectedS = null;
    this.state.optionSelectedC = null;
    this.state.optionSelectedStore = null;
    this.state.requestType = "Zone"
    this.state.zoneList = [];
    this.state.regionalList = [];
    this.state.stateList = [];
    this.state.cityList = [];
    this.state.storeList = [];
    this.state.showZoneList = [];
    this.state.showRegionalList = [];
    this.state.showStateList = [];
    this.state.showCityList = [];
    this.state.showStoreList = [];
    if(selected != null){
    for (let p = 0; p < selected.length; p++) {
      this.state.subListId.push(selected[p].id)
    }
    this.getZoneData();
 
  }
     }

  handleChangeZone = selected => {
    console.log("subListId", this.state.subListId);
    if (selected !== null || selected !== undefined) {
      console.log(`getValue`, selected)
      this.setState({
        optionSelectedZ: selected
      })
      this.state.optionSelectedR = null;
      this.state.optionSelectedS = null;
      this.state.optionSelectedC = null;
      this.state.optionSelectedStore = null;

      this.state.requestType = "Regional"
      this.state.regionalList = [];
      this.state.stateList = [];
      this.state.cityList = [];
      this.state.storeList = [];

      this.state.showRegionalList = [];
      this.state.showStateList = [];
      this.state.showCityList = [];
      this.state.showStoreList = [];
      console.log(`eror is her `, selected)
      if(selected != null){
    for (let p = 0; p < selected.length; p++) {
        this.state.zoneList.push(selected[p].value)
      }
      this.getZoneData();
    }
      this.setState({ zoneList: [...new Set(this.state.zoneList)] })
      console.log("zoneList", this.state.zoneList);
     
    }
  }

  handleChangeRegional = selected => {
    if (selected !== null || selected !== undefined) {
      console.log(`getValue`, selected)
      this.setState({
        optionSelectedR: selected
      })
      this.state.optionSelectedS = null;
      this.state.optionSelectedC = null;
      this.state.optionSelectedStore = null;

      this.state.requestType = "State"
      this.state.stateList = [];
      this.state.cityList = [];
      this.state.storeList = [];

      this.state.showStateList = [];
      this.state.showCityList = [];
      this.state.showStoreList = [];
      if(selected != null){
      for (let p = 0; p < selected.length; p++) {
        this.state.regionalList.push(selected[p].value)
      }
      this.getZoneData();
    }
   
    }
  }

  handleChangeState = selected => {
    if (selected !== null || selected !== undefined) {
      console.log(`getValue`, selected)
      this.setState({
        optionSelectedS: selected
      })
      this.state.optionSelectedC = null;
      this.state.optionSelectedStore = null;

      this.state.requestType = "City"
      this.state.cityList = [];
      this.state.storeList = [];

      this.state.showCityList = [];
      this.state.showStoreList = [];
      if(selected != null){
      for (let p = 0; p < selected.length; p++) {
        this.state.stateList.push(selected[p].value)
      }
      this.getZoneData();
    }
    
    }
  }

  handleChangeCity = selected => {
    if (selected !== null || selected !== undefined) {
      console.log(`getValue`, selected)
      this.setState({
        optionSelectedC: selected
      })
      this.state.optionSelectedStore = null;

      this.state.requestType = "Store"
      this.state.storeList = [];

      this.state.showStoreList = [];
      if(selected != null){
      for (let p = 0; p < selected.length; p++) {
        this.state.cityList.push(selected[p].value)
      }
      this.getZoneData();
    }
    
    }
  }

  handleChangeStore = selected => {
    if (selected !== null || selected !== undefined) {
      console.log(`getValue`, selected)
      this.setState({
        optionSelectedStore: selected
      })

      for (let p = 0; p < selected.length; p++) {
        this.state.storeList.push(selected[p].value)
      }
    }
  }

  handleChangeFunctional = selected => {
    this.setState({
      optionSelectedFunctional: selected
    })
    this.state.optionSelectedFunctional = selected;
    this.state.filterFunctional = [];
    this.state.finalFunctional = [];
    if (this.state.optionSelectedFunctional !== null) {
      if (selected.length > 0) {
        for (var i = 0; i < selected.length; i++) {
          var abc;
          abc = selected[i].value;

          this.state.filterFunctional.push(abc);
        }
        var item = [...new Set(this.state.filterFunctional)];
        this.state.finalFunctional = item;
      }
    } else {
      this.state.finalFunctional = [];
    }
    console.log("finalFunctional", this.state.finalFunctional);
  }


  storeSelectList() {
    this.state.mainStores = [];
    this.state.finalStores = [];
    this.state.filterStores = [];

    var Request1 = {
      cities: this.state.city,
      formatId: this.props.location.state.format_id,
      guId: this.props.location.state.guId
    };
    var EncryptedRequest1 = Encrypt(Request1);
    console.log(EncryptedRequest1);
    fetch("/GetStoreCityWise ", {
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
        console.log(`respone from city selection`, DecryptedResponse);
        if (DecryptedResponse.errorCode === "00") {
          for (var i = 0; i < DecryptedResponse.storeList.length; i++) {
            var abc = { value: "", label: "" };
            abc.value = DecryptedResponse.storeList[i];
            abc.label = DecryptedResponse.storeList[i];
            this.state.mainStores.push(abc);
          }
          console.log("mainStores", this.state.mainStores);
          this.setState({ mainStores: this.state.mainStores });
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

  change = e => {
    this.setState({ value: e.target.value });

    let flag = [];

    for (var i = 0; i < this.state.rlistopt.length; i++) {

      this.state.rlistopt[i] === e.target.value
        ? flag.push(this.state.rlistid[i])
        : this.setState({ valueid: "" });
    }
    this.setState({ valueid: flag.toString() });
    this.state.valueid = flag.toString();
    console.log("valueid selected", this.state.valueid);
  };

  changeTaskType = e => {
    this.setState({ valueTask: e.target.value });

    let flag = [];

    for (var i = 0; i < this.state.taskTypeDesc.length; i++) {

      this.state.taskTypeDesc[i] === e.target.value
        ? flag.push(this.state.taskTypeid[i])
        : this.setState({ valueTaskid: "" });
    }
    this.setState({ valueTaskid: flag });
    this.state.valueTaskid = flag;
    console.log("valueTaskid selected", this.state.valueTaskid);
  };

  selectAll = () => {
    var items = document.getElementsByName("acs");
    for (var i = 0; i < items.length; i++) {
      if (items[i].type === "checkbox") items[i].checked = true;
    }
  };

  handleChangeStart(date) {
    this.setState({
      startDate: date
    });
  }

  handleChangeEnd(date) {
    this.setState({
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

  componentDidMount() {
    console.log("inside");
    if (window.innerWidth <= 768) {
      this.setState({ hammenu: false });
    }
    console.log("rlist", this.state.rlistopt);
  }

  _onAction(e) {
    //   console.log('user did something', e)
  }

  _onActive(e) {
    // console.log('user is active', e)
    //console.log('time remaining', this.idleTimer.getRemainingTime())
  }

  _onIdle(e) {
    localStorage.clear();
    window.location.href = "/";
    disableBrowserBackButton();
  }



  handleSetRole([]) {
    this.setState({
      roleList: []
    });
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
  handleDateChangeRaw = e => {
    e.preventDefault();
  };

  enter = event => {
    if (event.which === 13) {
      event.preventDefault();
    }
  };

  fileHandler = event => {
    const input = document.getElementById("upload-storedata");
    var stores = [];
    //just pass the fileObj as parameter
    readXlsxFile(input.files[0]).then((rows, files) => {
      for (let index = 0; index < rows.length; index++) {
        const element = rows[index];
        stores.push(element[0]);
      }
      this.setState({
        StoreList: stores,
        FileName: "File Uploaded Successfully"
      });
    });
    // console.log(`FileName`, this.FileName);
    // console.log(`stores`,stores)
  };

  Taskactive() {
    this.props.history.push({
      pathname: "/Taskactive",
      state: {
        userid: this.props.location.state.userid,
        usrnm: this.state.usrnm,
        role_id: this.state.roleId,
        format_id: this.props.location.state.format_id,
        storeNo: this.props.location.state.storeNo,
        guId: this.props.location.state.guId,
        menuList: this.props.location.state.menuList,
        roleName: this.props.location.state.roleName,
      }
    });
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

  InstructionHandler = e => {
    let files = e.target.files;
    if (
      files[0].type == "image/gif" ||
      files[0].type == "image/jpg" ||
      files[0].type == "image/jpeg" ||
      files[0].type == "image/png" ||
      files[0].type == "application/msword" ||
      files[0].type ==
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ||
      files[0].type ==
      "application/vnd.openxmlformats-officedocument.presentationml.presentation" ||
      files[0].type ==
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" ||
      files[0].type == "application/vnd.ms-excel" ||
      files[0].type == "application/pdf" ||
      files[0].type == "application/vnd.ms-powerpoint" ||
      files[0].type == "text/plain"
    ) {
      console.log(`out`, files[0].type);
      if (files[0].type == "image/jpeg" || files[0].type == "image/png") {
        Resizer.imageFileResizer(
          files[0],
          500,
          500,
          "JPEG",
          100,
          0,
          uri => {
            //  console.log(`sdk`,uri)
            this.setState({ previewData: uri });
            this.setState({ instructionUpload: "File Uploaded Successfully" });
            this.setState({ instructiondata: files });
          },
          "base64"
        );
      } else {
        if (files[0].size < 1572864) {
          console.warn("Data File", files[0].size < 1572864);

          let reader = new FileReader();

          reader.readAsDataURL(files[0]);
          reader.onload = e => {
            console.warn("Data", e.target.result);
            this.setState({ previewData: e.target.result });
            this.setState({ instructionUpload: "File Uploaded Successfully" });
            this.setState({ instructiondata: files });
            console.warn("ByteArray", this.state.previewData);
          };
        } else {
          confirmAlert({
            title: "Alert !",
            message: "File size cannot be greater than 1.5 MB",
            buttons: [
              {
                label: "Ok",
                onClick: () => {
                  this.setState({ instructionUpload: "" });
                }
              }
            ]
          });
        }
      }
    } else {
      this.setState({ instructionUpload: "" });
      confirmAlert({
        title: "Alert !",
        message: "Unsupported File Format.",
        buttons: [
          {
            label: "Ok",
            onClick: () => {
              this.setState({ instructionUpload: "" });
            }
          }
        ]
      });
    }
  };
  componentWillMount() {
    if (
      this.props.location.state === undefined ||
      this.props.location.state === ""
    ) {
      window.location.href = "/";
    } else {
      console.log("formatid", this.props.location.state.format_id);

      this.getroles();
    }
  }

  showPrewievHandler = () => {
    this.setState({ previewState: !this.state.previewState });
  };

  //Added by chandrani for custom error page
  componentDidCatch() {
    this.setState({ hasError: true });
  }
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

  manualType = e => {
    this.setState({
      manual: true,
      selective: false,
      optionSubfmt: null,
      subListId: [],
      optionSelectedZ: null,
      optionSelectedR: null,
      optionSelectedS: null,
      optionSelectedC: null,
      mainregional: [],
      mainstatename: [],
      maincities: [],
      mainStores: [],
      stores: [],
      city: [],
      cityFinal: [],
      regionalFilter: [],
      stateFilter: [],
      cityFilter: []
    });
  };

  selectiveType = e => {
    this.setState({ selective: true, manual: false });
  };

  render = () => {
    var that = this;

    //Added by chandrani for custom error page
    if (this.state.hasError) {
      return (
        <div>
          <h2>Error occurred!! please contact administrator</h2>
        </div>
      );
    } else {
      return (
        <Router>
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
              <header class="header black-bg">
                {/* <div class="sidebar-toggle-box">
      <div class="fa fa-bars tooltips" data-placement="right" data-original-title="Toggle Navigation"></div>
    </div> */}
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
                <a onClick={this.Taskactive.bind(this)} className="logo">
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
                      ) : null}
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
                                  ) : null}
                                  {this.props.location.state.menuList["413"] ? (
                                    <li>
                                      {" "}
                                      <a onClick={this.ToStoreList.bind(this)}>
                                        <span>{this.props.location.state.menuList["413"]}</span>{" "}
                                      </a>{" "}
                                    </li>
                                  ) : null}
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
                  {this.props.location.state.role_id === "300" ?
                    <div class="mt">
                      <div className="spin">
                        <Spinner
                          visible={this.state.loading}
                          spinnerColor={"rgba(0, 0, 0, 0.3)"}
                        />
                      </div>
                      <h3>
                        <i class="fa fa-angle-right"></i> Create Task
                    </h3>
                      <hr />
                      {/*  <div>
                    <RadioGroup   horizontal>
  <RadioButton value="manual" onChange={ this.manualType.bind(this) }>
    Manual Upload
  </RadioButton>
  <RadioButton value="selective" onChange={ this.selectiveType.bind(this) }>
    Selective Upload
  </RadioButton>
  
</RadioGroup>
                    </div> */}

                      <form>
                        <div class="row">
                          <div class="col-xs-6">
                            <label>
                              <input
                                type="radio"
                                name="upload"
                                onChange={this.manualType.bind(this)}
                              />
                              {""} Manual Upload
                          </label>
                          </div>
                          <div class="col-xs-6">
                            <label>
                              <input
                                type="radio"
                                name="upload"
                                onChange={this.selectiveType.bind(this)}
                              />
                              {""} Selective Upload
                          </label>
                          </div>
                        </div>
                      </form>
                      <hr />
                      {this.state.manual === true ? (
                        <div class="row mt">
                          <form method="post">
                            <div class="col-lg-4 col-md-4 col-sm-4 col-xs-12">
                              <label>Task Name</label>
                              <br />
                              <input
                                type="text"
                                class="form-control"
                                placeholder="Enter Task Name"
                                id="taskNameManual"
                                maxlength="150"
                                autoComplete="off"
                              />
                            </div>
                            <div class="col-lg-4 col-md-4 col-sm-4 col-xs-12">
                              <label>Task Description</label>
                              <br />
                              <textarea
                                type="text"
                                class="form-control"
                                placeholder="Enter Task Description"
                                id="taskDescManual"
                                maxlength="250"
                              ></textarea>
                            </div>
                            <div class="col-lg-4 col-md-4 col-sm-4 col-xs-12">
                              <label>Task Type</label>
                              <br />
                              <select
                                class="form-control"
                                onChange={this.changeTaskType.bind(this)}
                                id="taskTypeManual"
                              >
                                <option>--Select--</option>
                                {this.state.taskTypeDesc.map(element => (
                                  <option>{element}</option>
                                ))}
                                {/* this.props.location.state.menuList.map((element) => (<option>{element}</option>)) */}
                              </select>
                            </div>
                            <div class="clearfix"></div>
                            <div class="col-lg-4 col-md-4 col-sm-4 col-xs-12">
                              <label>Assign to</label>
                              <br />
                              <select
                                class="form-control"
                                onChange={this.change.bind(this)}
                                id="assignToManual"
                              >
                                <option>--Select--</option>
                                {this.state.rlistopt.map(element => (
                                  <option>{element}</option>
                                ))}
                                {/* this.props.location.state.menuList.map((element) => (<option>{element}</option>)) */}
                              </select>
                            </div>

                            <div class="col-lg-4 col-md-4 col-sm-4 col-xs-12">
                              <label>Start Date</label>
                              <br />
                              <DatePicker
                                className="form-control form-control-inline input-medium default-date-picker"
                                size="16"
                                type="text"
                                placeholder="Select Start Date "
                                dateFormat="dd-MMM-yyyy HH:mm"
                                id="startDateManual"
                                selected={this.state.startDate}
                                showTimeSelect
                                timeIntervals={30}
                                minDate={new Date()}
                                onChange={this.handleChangeStart}
                                onChangeRaw={this.handleDateChangeRaw}
                              />
                            </div>
                            <div class="col-lg-4 col-md-4 col-sm-4 col-xs-12">
                              <label>End Date</label>
                              <br />
                              {
                                <DatePicker
                                  className="form-control form-control-inline input-medium default-date-picker"
                                  size="16"
                                  type="text"
                                  placeholderText="Select End Date"
                                  dateFormat="dd-MMM-yyyy HH:mm"
                                  id="endDateManual"
                                  selected={this.state.endDate}
                                  showTimeSelect
                                  timeIntervals={30}
                                  onChange={this.handleChangeEnd}
                                  minDate={this.state.startDate}
                                  maxDate={addDays(new Date(), 365)}
                                  onChangeRaw={this.handleDateChangeRaw}
                                />
                              }
                            </div>
                            {this.props.location.state.format_id === "104" || this.props.location.state.format_id === "102" ?
                              <div class="col-lg-4 col-md-4 col-sm-4 col-xs-12">
                                <label for="select" class="control-label">
                                  Functional View Authority
                        </label>
                                <MySelect
                                  options={this.state.funcRole}
                                  isMulti
                                  closeMenuOnSelect={true}
                                  hideSelectedOptions={false}
                                  /*  components={animatedComponents} */
                                  onChange={this.handleChangeFunctional.bind(this)}
                                  allowSelectAll={true}
                                  value={this.state.optionSelectedFunctional}
                                  id="uom"
                                />
                                {/* this.state.arrPurity.map((element) => (<option>{element}</option>)) */}

                                {/* <!--                                          <label for="select" class="control-label">Enter Product Category</label>--> */}
                                <i class="bar"></i>
                              </div>
                              : null}
                            <div class="col-lg-4 col-md-4 col-sm-4 col-xs-12">
                              <div class="form-group">
                                <label>Upload Data</label>
                                <br />
                                <div class="upload-holder">
                                  <input
                                    id="store-list"
                                    type="text"
                                    class="form-control input-upload"
                                    value={this.state.FileName}
                                  />
                                  <span class="btn-upload">Upload</span>
                                  <input
                                    id="upload-storedata"
                                    type="file"
                                    name="Store-list-data"
                                    class="input-hidden"
                                    onChange={this.fileHandler.bind(this)}
                                    accept=".xlsx,.xls"
                                  />
                                </div>
                                <span class="help-block">
                                  Sample File{" "}
                                  <a href={require("./doc/sample.xlsx")}>
                                    Sample.xls
                                </a>
                                </span>{" "}
                              </div>
                              <div>
                                <label hidden>Selected Stores</label>
                                <br />
                                <input
                                  type="hidden"
                                  className="form-control"
                                  value={this.state.StoreList}
                                />
                              </div>
                            </div>



                            <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12 text-center">
                              <div class="text-center mt ">
                                <button
                                  class="btn btn-primary min-wid-90 "
                                  onClick={this.CreateTask}
                                  onKeyPress={this.enter}
                                >
                                  Save
                              </button>
                                <button
                                  class="btn btn-primary min-wid-90 ml-10"
                                  onClick={this.TaskactiveBind.bind(this)}
                                >
                                  Cancel
                              </button>
                              </div>
                            </div>
                          </form>
                        </div>
                      ) : null}

                      {this.state.selective === true ? (
                        <div class="row mt">
                          <div class="col-lg-4 col-md-4 col-sm-4 col-xs-12">
                            <label>Task Name</label>
                            <br />
                            <input
                              type="text"
                              class="form-control"
                              placeholder="Enter Task Name"
                              id="taskName"
                              maxlength="150"
                              autoComplete="off"
                            />
                          </div>
                          <div class="col-lg-4 col-md-4 col-sm-4 col-xs-12">
                            <label>Task Description</label>
                            <br />
                            <textarea
                              type="text"
                              class="form-control"
                              placeholder="Enter Task Description"
                              id="taskDesc"
                              maxlength="250"
                            ></textarea>
                          </div>
                          <div class="col-lg-4 col-md-4 col-sm-4 col-xs-12">
                            <label>Task Type</label>
                            <br />
                            <select
                              class="form-control"
                              onChange={this.changeTaskType.bind(this)}
                              id="taskTypeSelective"
                            >
                              <option>--Select--</option>
                              {this.state.taskTypeDesc.map(element => (
                                <option>{element}</option>
                              ))}
                              {/* this.props.location.state.menuList.map((element) => (<option>{element}</option>)) */}
                            </select>
                          </div>
                          <div class="clearfix"></div>
                          <div class="col-lg-4 col-md-4 col-sm-4 col-xs-12">
                            <label>Assign to</label>
                            <br />
                            <select
                              class="form-control"
                              onChange={this.change.bind(this)}
                              id="assignTo"
                            >
                              <option>--Select--</option>
                              <option>Store</option>
                              {/*  {this.state.rlistopt.map((element) => (<option>{element}</option>))} */}
                            </select>
                          </div>

                          <div class="col-lg-4 col-md-4 col-sm-4 col-xs-12">
                            <label>Start Date</label>
                            <br />
                            <DatePicker
                              className="form-control form-control-inline input-medium default-date-picker"
                              size="16"
                              type="text"
                              placeholder="Select Start Date "
                              dateFormat="dd-MMM-yyyy HH:mm"
                              id="startDate"
                              selected={this.state.startDate}
                              showTimeSelect
                              timeIntervals={30}
                              minDate={new Date()}
                              onChange={this.handleChangeStart}
                              onChangeRaw={this.handleDateChangeRaw}
                            />
                          </div>
                          <div class="col-lg-4 col-md-4 col-sm-4 col-xs-12">
                            <label>End Date</label>
                            <br />
                            {
                              <DatePicker
                                className="form-control form-control-inline input-medium default-date-picker"
                                size="16"
                                type="text"
                                placeholderText="Select End Date"
                                dateFormat="dd-MMM-yyyy HH:mm"
                                id="endDate"
                                selected={this.state.endDate}
                                showTimeSelect
                                timeIntervals={30}
                                onChange={this.handleChangeEnd}
                                minDate={this.state.startDate}
                                maxDate={addDays(new Date(), 365)}
                                onChangeRaw={this.handleDateChangeRaw}
                              />
                            }
                          </div>

                          <div class="col-lg-4 col-md-4 col-sm-4 col-xs-12">
                            {this.state.showFlagsubFmt ? <div>
                              <label for="select" class="control-label">
                                Sub Format
                          </label>
                              <MySelect
                                options={this.state.subfmtList}
                                isMulti
                                closeMenuOnSelect={true}
                                hideSelectedOptions={false}
                                onChange={this.handleChangeSubfmt.bind(this)}
                                allowSelectAll={true}
                                value={this.state.optionSubfmt}
                                id="subfmt"
                              />

                              <i class="bar"></i>
                            </div> : ''}
                            <label class="control-label" for="rolename">
                              State
                          </label>

                            <MySelect
                              options={this.state.showStateList}
                              isMulti
                              closeMenuOnSelect={true}
                              hideSelectedOptions={false}
                              /*  components={animatedComponents} */
                              onChange={this.handleChangeState.bind(this)}
                              allowSelectAll={true}
                              value={this.state.optionSelectedS}
                            />
                            <i class="bar"></i>


                          </div>


                          <div class="col-lg-4 col-md-4 col-sm-4 col-xs-12">
                            <label for="select" class="control-label">
                              Zone
                          </label>
                            <MySelect
                              options={this.state.showZoneList}
                              isMulti
                              closeMenuOnSelect={true}
                              hideSelectedOptions={false}
                              onChange={this.handleChangeZone.bind(this)}
                              allowSelectAll={true}
                              value={this.state.optionSelectedZ}
                              id="uom"
                            />

                            <i class="bar"></i>
                          </div>

                          <div class="col-lg-4 col-md-4 col-sm-4 col-xs-12">


                            <label for="select" class="control-label">
                              Regional
                          </label>
                            <MySelect
                              options={this.state.showRegionalList}
                              isMulti
                              closeMenuOnSelect={true}
                              hideSelectedOptions={false}
                              /*  components={animatedComponents} */
                              onChange={this.handleChangeRegional.bind(this)}
                              allowSelectAll={true}
                              value={this.state.optionSelectedR}
                            />
                            <i class="bar"></i>

                          </div>

                          <div class="col-lg-4 col-md-4 col-sm-4 col-xs-12">
                            <label class="control-label" for="rolename">
                              City
                          </label>

                            <MySelect
                              options={this.state.showCityList}
                              isMulti
                              closeMenuOnSelect={true}
                              hideSelectedOptions={false}
                              /*  components={animatedComponents} */
                              onChange={this.handleChangeCity.bind(this)}
                              allowSelectAll={true}
                              value={this.state.optionSelectedC}
                            />

                            <i class="bar"></i>
                          </div>

                          <div class="col-lg-4 col-md-4 col-sm-4 col-xs-12">
                            <label class="control-label" for="rolename">
                              Store
                          </label>

                            <MySelect
                              options={this.state.showStoreList}
                              isMulti
                              closeMenuOnSelect={true}
                              hideSelectedOptions={false}
                              /*  components={animatedComponents} */
                              onChange={this.handleChangeStore.bind(this)}
                              allowSelectAll={true}
                              value={this.state.optionSelectedStore}
                            />

                            <i class="bar"></i>
                          </div>
                          {this.props.location.state.format_id === "104" || this.props.location.state.format_id === "102" ?
                            <div class="col-lg-4 col-md-4 col-sm-4 col-xs-12">
                              <label for="select" class="control-label">
                                Functional View Authority
                  </label>
                              <MySelect
                                options={this.state.funcRole}
                                isMulti
                                closeMenuOnSelect={true}
                                hideSelectedOptions={false}
                                /*  components={animatedComponents} */
                                onChange={this.handleChangeFunctional.bind(this)}
                                allowSelectAll={true}
                                value={this.state.optionSelectedFunctional}
                                id="uom"
                              />
                              {/* this.state.arrPurity.map((element) => (<option>{element}</option>)) */}

                              {/* <!--                                          <label for="select" class="control-label">Enter Product Category</label>--> */}
                              <i class="bar"></i>
                            </div>
                            : null}
                          <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12 text-center">
                            <div class="text-center mt ">
                              <button
                                class="btn btn-primary min-wid-90 "
                                onClick={this.preCreateTask}
                                onKeyPress={this.enter}
                              >
                                Save
                            </button>
                              <button
                                class="btn btn-primary min-wid-90 ml-10"
                                onClick={this.TaskactiveBind.bind(this)}
                              >
                                Cancel
                            </button>
                            </div>
                          </div>
                        </div>
                      ) : null}

                    </div>
                    : <div class="mt">
                      <div className="spin">
                        <Spinner
                          visible={this.state.loading}
                          spinnerColor={"rgba(0, 0, 0, 0.3)"}
                        />
                      </div>
                      <h3>
                        <i class="fa fa-angle-right"></i>Create Task
                  </h3>
                      <hr />
                      <div class="row mt">
                        <form method="post">
                          <div class="col-lg-4 col-md-4 col-sm-4 col-xs-12">
                            <label>Task Name</label>
                            <br />
                            <input
                              type="text"
                              class="form-control"
                              placeholder="Enter Task Name"
                              id="taskNameManual"
                              maxlength="150"
                              autoComplete="off"
                            />
                          </div>
                          <div class="col-lg-4 col-md-4 col-sm-4 col-xs-12">
                            <label>Task Description</label>
                            <br />
                            <textarea
                              type="text"
                              class="form-control"
                              placeholder="Enter Task Description"
                              id="taskDescManual"
                              maxlength="250"
                            ></textarea>
                          </div>
                          <div class="col-lg-4 col-md-4 col-sm-4 col-xs-12">
                            <label>Task Type</label>
                            <br />
                            <select
                              class="form-control"
                              onChange={this.changeTaskType.bind(this)}
                              id="taskTypeManual"
                            >
                              <option>--Select--</option>
                              {this.state.taskTypeDesc.map(element => (
                                <option>{element}</option>
                              ))}
                              {/* this.props.location.state.menuList.map((element) => (<option>{element}</option>)) */}
                            </select>
                          </div>
                          <div class="clearfix"></div>
                          <div class="col-lg-4 col-md-4 col-sm-4 col-xs-12">
                            <label>Assign to</label>
                            <br />
                            <select
                              class="form-control"
                              onChange={this.change.bind(this)}
                              id="assignToManual"
                            >
                              <option>--Select--</option>
                              {this.state.rlistopt.map(element => (
                                <option>{element}</option>
                              ))}
                              {/* this.props.location.state.menuList.map((element) => (<option>{element}</option>)) */}
                            </select>
                          </div>

                          <div class="col-lg-4 col-md-4 col-sm-4 col-xs-12">
                            <label>Start Date</label>
                            <br />
                            <DatePicker
                              className="form-control form-control-inline input-medium default-date-picker"
                              size="16"
                              type="text"
                              placeholder="Select Start Date "
                              dateFormat="dd-MMM-yyyy HH:mm"
                              id="startDateManual"
                              selected={this.state.startDate}
                              showTimeSelect
                              timeIntervals={30}
                              minDate={new Date()}
                              onChange={this.handleChangeStart}
                              onChangeRaw={this.handleDateChangeRaw}
                            />
                          </div>
                          <div class="col-lg-4 col-md-4 col-sm-4 col-xs-12">
                            <label>End Date</label>
                            <br />
                            {
                              <DatePicker
                                className="form-control form-control-inline input-medium default-date-picker"
                                size="16"
                                type="text"
                                placeholderText="Select End Date"
                                dateFormat="dd-MMM-yyyy HH:mm"
                                id="endDateManual"
                                selected={this.state.endDate}
                                showTimeSelect
                                timeIntervals={30}
                                onChange={this.handleChangeEnd}
                                minDate={this.state.startDate}
                                maxDate={addDays(new Date(), 365)}
                                onChangeRaw={this.handleDateChangeRaw}
                              />
                            }
                          </div>
                          {this.props.location.state.format_id === "104" ?
                            <div class="col-lg-4 col-md-4 col-sm-4 col-xs-12">
                              <label for="select" class="control-label">
                                Functional View Authority
                  </label>
                              <MySelect
                                options={this.state.funcRole}
                                isMulti
                                closeMenuOnSelect={true}
                                hideSelectedOptions={false}
                                /*  components={animatedComponents} */
                                onChange={this.handleChangeFunctional.bind(this)}
                                allowSelectAll={true}
                                value={this.state.optionSelectedFunctional}
                                id="uom"
                              />
                              {/* this.state.arrPurity.map((element) => (<option>{element}</option>)) */}

                              {/* <!--                                          <label for="select" class="control-label">Enter Product Category</label>--> */}
                              <i class="bar"></i>
                            </div>
                            : null}
                          <div class="col-lg-4 col-md-4 col-sm-4 col-xs-12">
                            <div class="form-group">
                              <label>Upload Data</label>
                              <br />
                              <div class="upload-holder">
                                <input
                                  id="store-list"
                                  type="text"
                                  class="form-control input-upload"
                                  value={this.state.FileName}
                                />
                                <span class="btn-upload">Upload</span>
                                <input
                                  id="upload-storedata"
                                  type="file"
                                  name="Store-list-data"
                                  class="input-hidden"
                                  onChange={this.fileHandler.bind(this)}
                                  accept=".xlsx,.xls"
                                />
                              </div>
                              <span class="help-block">
                                Sample File{" "}
                                <a href={require("./doc/sample.xlsx")}>
                                  Sample.xls
                          </a>
                              </span>{" "}
                            </div>
                            <div>
                              <label hidden>Selected Stores</label>
                              <br />
                              <input
                                type="hidden"
                                className="form-control"
                                value={this.state.StoreList}
                              />
                            </div>
                          </div>



                          <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12 text-center">
                            <div class="text-center mt ">
                              <button
                                class="btn btn-primary min-wid-90 "
                                onClick={this.CreateTask}
                                onKeyPress={this.enter}
                              >
                                Save
                        </button>
                              <button
                                class="btn btn-primary min-wid-90 ml-10"
                                onClick={this.TaskactiveBind.bind(this)}
                              >
                                Cancel
                        </button>
                            </div>
                          </div>
                        </form>
                      </div>

                    </div>}
                </section>
              </section>
            </section>
          </div>
        </Router>
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

  getZoneData = async () => {

    console.log("subListId", this.state.subListId);

    var requestZone = {
      formatId: this.props.location.state.format_id,
      guId: this.props.location.state.guId,
      subFormatId: [...new Set(this.state.subListId)],
      requestType: this.state.requestType,
      zoneList: [...new Set(this.state.zoneList)],
      regionalList: this.state.regionalList,
      stateList: [...new Set(this.state.stateList)],
      cityList: [...new Set(this.state.cityList)]
    };
    console.log("zone formatId", this.props.location.state.format_id);
    var EncryptedRequestZone = Encrypt(requestZone);
    console.log("zone req", EncryptedRequestZone);
    await fetch("/GetZoneData", {
      method: "POST",
      headers: {
        guId: this.props.location.state.guId,
        Authorization:
          "Basic " + basicAuth(this.props.location.state.userid)
      },
      body: EncryptedRequestZone
    })
      .then(response => response.text())
      .then(response => {
        var DecryptedResponse = decryptData(response);
        console.log(`equipment`, response);
        if (DecryptedResponse.errorCode === "00") {

          if (DecryptedResponse.zoneList !== null) {
            for (var a = 0; a < DecryptedResponse.zoneList.length; a++) {
              var abc = {
                value: "",
                label: ""
              }
              abc.value = DecryptedResponse.zoneList[a];
              abc.label = DecryptedResponse.zoneList[a];
              this.state.showZoneList.push(abc)
              this.setState({ showZoneList: this.state.showZoneList });
            }
          }

          if (DecryptedResponse.regionalList !== null) {
            for (var a = 0; a < DecryptedResponse.regionalList.length; a++) {
              var abc = {
                value: "",
                label: ""
              }
              abc.value = DecryptedResponse.regionalList[a].regionlEcNo;
              abc.label = DecryptedResponse.regionalList[a].regionlName;
              this.state.showRegionalList.push(abc)
              this.setState({ showRegionalList: this.state.showRegionalList });
            }
          }

          if (DecryptedResponse.stateList !== null) {
            for (var a = 0; a < DecryptedResponse.stateList.length; a++) {
              var abc = {
                value: "",
                label: ""
              }
              abc.value = DecryptedResponse.stateList[a];
              abc.label = DecryptedResponse.stateList[a];
              this.state.showStateList.push(abc)
              this.setState({ showStateList: this.state.showStateList });
            }
          }

          if (DecryptedResponse.cityList !== null) {
            for (var a = 0; a < DecryptedResponse.cityList.length; a++) {
              var abc = {
                value: "",
                label: ""
              }
              abc.value = DecryptedResponse.cityList[a];
              abc.label = DecryptedResponse.cityList[a];
              this.state.showCityList.push(abc)
              this.setState({ showCityList: this.state.showCityList });
            }
          }

          if (DecryptedResponse.storeList !== null) {
            for (var a = 0; a < DecryptedResponse.storeList.length; a++) {
              var abc = {
                value: "",
                label: ""
              }
              abc.value = DecryptedResponse.storeList[a];
              abc.label = DecryptedResponse.storeList[a];
              this.state.showStoreList.push(abc)
              this.setState({ showStoreList: this.state.showStoreList });
            }
          }

        } else {
          confirmAlert({
            // title: 'SAVE!!!',
            message: DecryptedResponse.errorMessage,
            buttons: [
              {
                label: "Ok",
                onClick: () => {
                  return false;
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

  getroles(e) {

    fetch("/GetTaskType", {
      method: "GET",
      headers: {
        guId: this.props.location.state.guId,
        Authorization:
          "Basic " + basicAuth(this.props.location.state.userid)
      },

    })
      .then(response => response.text())
      .then(response => {
        var DecryptedResponse = decryptData(response);
        console.log(`GetTaskType resp`, DecryptedResponse);
        if (DecryptedResponse.errorCode === "00") {

          this.setState({ taskTypeList: DecryptedResponse.getTaskTypeModel });

          let temp = [];
          let temp1 = [];


          for (var i = 0; i < DecryptedResponse.getTaskTypeModel.length; i++) {

            temp.push(DecryptedResponse.getTaskTypeModel[i].taskType);
            temp1.push(DecryptedResponse.getTaskTypeModel[i].taskTypeId);
          }
          this.setState({ taskTypeDesc: temp });
          this.setState({ taskTypeid: temp1 });
          console.log("taskTypeList", this.state.taskTypeList);

        } else {
          confirmAlert({
            // title: 'SAVE!!!',
            message: DecryptedResponse.errorMsg,
            buttons: [
              {
                label: "Ok",
                onClick: () => {
                  return false;
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


    if (
      this.props.location.state !== undefined &&
      this.props.location.state.usrnm !== ""
    ) {
      if (this.props.location.state) {

        this.setState({ formatId: this.props.location.state.format_id });
        this.setState({ roleId: this.props.location.state.role_id });
        this.setState({ userid: this.props.location.state.userid });
        this.setState({ usrnm: this.props.location.state.usrnm });
        // console.log("roleId", this.props.location.state.role_id);

        var Request = {
          formatId: this.props.location.state.format_id,
          userId: this.props.location.state.userid,
          guId: this.props.location.state.guId
        };
        var EncryptedRequest = Encrypt(Request);
        // console.log(`req`, EncryptedRequest);



        fetch("/GetRolesByFormat", {
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
            // console.log(``, DecryptedResponse);
            if (DecryptedResponse.errorCode === "00") {
              this.setState({ roleList: DecryptedResponse.roleList });
              let temp = [];
              let temp1 = [];
              let temp2 = [];
              for (var i = 0; i < DecryptedResponse.roleList.length; i++) {
                temp.push(DecryptedResponse.roleList[i].roleDescription);
                temp1.push(DecryptedResponse.roleList[i].role_id);
                temp2.push(DecryptedResponse.roleList[i].format_id);
              }
              this.setState({ rlistopt: temp });
              this.setState({ rlistid: temp1 });

            } else {
              confirmAlert({
                // title: 'SAVE!!!',
                message: DecryptedResponse.errorMsg,
                buttons: [
                  {
                    label: "Ok",
                    onClick: () => {
                      return false;
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

        //  added by karan

        var requestZone = {
          formatId: this.props.location.state.format_id,
          guId: this.props.location.state.guId
        };
        var EncryptedRequestZone = Encrypt(requestZone);
        console.log("zone req", EncryptedRequestZone);
        fetch("/GetSubFormats", {
          method: "POST",
          headers: {
            guId: this.props.location.state.guId,
            Authorization:
              "Basic " + basicAuth(this.props.location.state.userid)
          },
          body: EncryptedRequestZone
        })
          .then(response => response.text())
          .then(response => {
            var DecryptedResponse = decryptData(response);
            if (DecryptedResponse.errorCode === "00") {
              for (let d = 0; d < DecryptedResponse.subFormatsList.length; d++) {
                var sbfmt = {
                  label: "",
                  value: ""
                };
                sbfmt.id = DecryptedResponse.subFormatsList[d].formatId
                sbfmt.label = DecryptedResponse.subFormatsList[d].formatDesc;
                sbfmt.value = DecryptedResponse.subFormatsList[d].formatDesc;
                this.state.subfmtList.push(sbfmt);
                this.setState({ showFlagsubFmt: true })
              }


            } else if (DecryptedResponse.errorCode !== "01"){
              confirmAlert({
                // title: 'SAVE!!!',
                message: DecryptedResponse.errorMsg,
                buttons: [
                  {
                    label: "Ok",
                    onClick: () => {
                      return false;
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

        // ended bny karan



        var Request3 = {
          formatId: this.props.location.state.format_id,
          guId: this.props.location.state.guId
        };
        var EncryptedRequest3 = Encrypt(Request3);
        console.log(`req for functional`, EncryptedRequest);

        fetch("/GetFunctionalRoles", {
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
            console.log(`response of functional`, DecryptedResponse);
            if (DecryptedResponse.errorCode === "00") {

              for (var i = 0; i < DecryptedResponse.funcrole.length; i++) {
                var abc = { value: "", label: "" };
                abc.value = DecryptedResponse.funcrole[i].roleId;
                abc.label = DecryptedResponse.funcrole[i].roleDesc;
                this.state.funcRole.push(abc);
              }
              console.log("funcRole", this.state.funcRole);
              this.setState({ funcRole: this.state.funcRole });
            } else {
              confirmAlert({
                // title: 'SAVE!!!',
                message: DecryptedResponse.errormsg,
                buttons: [
                  {
                    label: "Ok",
                    onClick: () => {
                      return false;
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
        this.props.history.push({
          pathname: "/"
        });
      }
    } else {
      window.location.href = "/";
    }
  }

  gotohome = e => {
    e.preventDefault();
    this.props.history.push({
      pathname: "/Taskactive",
      state: {
        role_id: this.props.location.state.role_id,
        format_id: this.props.location.state.format_id,
        usrnm: this.props.location.state.usrnm,
        userName: this.props.location.state.userName,
        userid: this.props.location.state.userid,
        storeNo: this.props.location.state.storeNo,
        guId: this.props.location.state.guId,
        menuList: this.props.location.state.menuList,
        roleName: this.props.location.state.roleName,
      }
    });
  };

  selectAll = () => {
    var items = document.getElementsByName("acs");
    for (var i = 0; i < items.length; i++) {
      if (items[i].type === "checkbox") items[i].checked = true;
    }
  };

  preCreateTask = e => {
    if (
      this.state.optionSelectedC !== null ||
      this.state.optionSelectedS !== null
    ) {
      this.setState(
        { city: this.state.optionSelectedC.map(city => city.value) },
        () => {
          console.log("city", this.state.city);
        }
      );
      this.setState(
        { state: this.state.optionSelectedS.map(state => state.value) },
        () => {
          console.log("state", this.state.state);
          this.CreateTask(e);
        }
      );
    }
  };

  CreateTask = e => {
    e.preventDefault();

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

    var date =
      new Date().getDate() +
      "-" +
      monthNames[new Date().getMonth()] +
      "-" +
      new Date().getFullYear();

    var systemtime =
      date + " " + new Date().getHours() + ":" + new Date().getMinutes();
    if (this.state.selective === false) {
      var windowstarttime = document.getElementById("startDateManual").value;
      var windowendtime = document.getElementById("endDateManual").value;

      if (
        !document.getElementById("taskNameManual").value ||
        !document.getElementById("taskDescManual").value
      ) {
        confirmAlert({
          title: "Alert !",
          message: "Please enter required fields",
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
        var vstartdate = new Date(
          document.getElementById("startDateManual").value
        );
        var venddate = new Date(document.getElementById("endDateManual").value);
        if (venddate < vstartdate) {
          confirmAlert({
            message: "End date/time cannot be earlier than start date/time.",
            buttons: [
              {
                label: "Ok",
                onClick: () => {
                  return false;
                }
              }
            ]
          });
        } else if (new Date(windowendtime) <= new Date(systemtime)) {
          confirmAlert({
            message:
              "End or Start date/time cannot be same or earlier than system date/time.",
            buttons: [
              {
                label: "Ok",
                onClick: () => {
                  return false;
                }
              }
            ]
          });
        } else if (new Date(windowstarttime) < new Date(systemtime)) {
          confirmAlert({
            message: "Start date/time cannot be earlier than system date/time.",
            buttons: [
              {
                label: "Ok",
                onClick: () => {
                  return false;
                }
              }
            ]
          });
        } else if (
          document.getElementById("assignToManual").value == "--Select--"
        ) {
          confirmAlert({
            title: "Alert !",
            message: "Please select Assign to",
            buttons: [
              {
                label: "Ok",
                onClick: () => {
                  return false;
                }
              }
            ]
          });
        } else if (
          document.getElementById("taskTypeManual").value == "--Select--"
        ) {
          confirmAlert({
            title: "Alert !",
            message: "Please select Task Type",
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
          this.setState({ loading: true });
          var Request1 = {
            taskType: this.state.valueTaskid.toString(),
            startDate: document.getElementById("startDateManual").value,
            endDate: document.getElementById("endDateManual").value,
            createdBy: this.state.userid,
            taskDesc: document.getElementById("taskDescManual").value,
            taskName: document.getElementById("taskNameManual").value,
            storeId: this.state.StoreList,
            action: "Create",
            roleId: [this.state.valueid],
            formatId: this.props.location.state.format_id,
            uploadType: "1",
            guId: this.props.location.state.guId,
            functionalList: this.state.finalFunctional,
            //  subFormatId:""
          };

          var EncryptedRequest1 = Encrypt(Request1);
          console.log(EncryptedRequest1);

          fetch("/CreateTask", {
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
              this.setState({ loading: false });
              var DecryptedResponse = decryptData(response);
              // console.log(``, DecryptedResponse)
              console.log(`response of CreateTask: `, DecryptedResponse);
              // console.log(`UserID: `, this.state.userid)
              if (DecryptedResponse.errorCode === "00") {
                if (DecryptedResponse.unmatchedStore.length > 0) {
                  {
                    this.props.location.state.role_id === "300"
                      ? confirmAlert({
                        title: "Success",
                        message:
                          "Task created successfully. " +
                          DecryptedResponse.unmatchedStore +
                          " " +
                          "does not belongs to your format.",
                        buttons: [
                          {
                            label: "Ok",
                            onClick: () => {
                              this.props.history.push({
                                pathname: "/Taskactive",
                                state: {
                                  userid: this.props.location.state.userid,
                                  usrnm: this.state.usrnm,
                                  role_id: this.state.roleId,
                                  format_id: this.props.location.state
                                    .format_id,
                                  storeNo: this.props.location.state.storeNo,
                                  guId: this.props.location.state.guId,
                                  menuList: this.props.location.state.menuList,
                                  roleName: this.props.location.state.roleName,
                                }
                              });
                            }
                          }
                        ]
                      })
                      : confirmAlert({
                        title: "Success",
                        message:
                          "Task created successfully. " +
                          DecryptedResponse.unmatchedStore +
                          " " +
                          "does not belongs to your format.",
                        buttons: [
                          {
                            label: "Ok",
                            onClick: () => {
                              this.props.history.push({
                                pathname: "/StoreTasks",
                                state: {
                                  userid: this.props.location.state.userid,
                                  usrnm: this.state.usrnm,
                                  role_id: this.state.roleId,
                                  format_id: this.props.location.state
                                    .format_id,
                                  storeNo: this.props.location.state.storeNo,
                                  guId: this.props.location.state.guId,
                                  menuList: this.props.location.state.menuList,
                                  roleName: this.props.location.state.roleName,
                                }
                              });
                            }
                          }
                        ]
                      });
                  }
                } else {
                  {
                    this.props.location.state.role_id === "300"
                      ? confirmAlert({
                        title: "Success",
                        message: "Task created successfully.  ",
                        buttons: [
                          {
                            label: "Ok",
                            onClick: () => {
                              this.props.history.push({
                                pathname: "/Taskactive",
                                state: {
                                  userid: this.props.location.state.userid,
                                  usrnm: this.state.usrnm,
                                  role_id: this.state.roleId,
                                  format_id: this.props.location.state
                                    .format_id,
                                  storeNo: this.props.location.state.storeNo,
                                  guId: this.props.location.state.guId,
                                  menuList: this.props.location.state.menuList,
                                  roleName: this.props.location.state.roleName,
                                }
                              });
                            }
                          }
                        ]
                      })
                      : confirmAlert({
                        title: "Success",
                        message: "Task created successfully.  ",
                        buttons: [
                          {
                            label: "Ok",
                            onClick: () => {
                              this.props.history.push({
                                pathname: "/Taskactive",
                                state: {
                                  userid: this.props.location.state.userid,
                                  usrnm: this.state.usrnm,
                                  role_id: this.state.roleId,
                                  format_id: this.props.location.state
                                    .format_id,
                                  storeNo: this.props.location.state.storeNo,
                                  guId: this.props.location.state.guId,
                                  menuList: this.props.location.state.menuList,
                                  roleName: this.props.location.state.roleName,
                                }
                              });
                            }
                          }
                        ]
                      });
                  }
                }
              } else {
                confirmAlert({
                  title: "Alert !",
                  message: DecryptedResponse.errorMsg,
                  buttons: [
                    {
                      label: "Ok"
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
      }
    } else {
      var windowstarttime = document.getElementById("startDate").value;
      var windowendtime = document.getElementById("endDate").value;

      if (
        !document.getElementById("taskName").value ||
        !document.getElementById("taskDesc").value
      ) {
        confirmAlert({
          title: "Alert !",
          message: "Please enter required fields",
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
        var vstartdate = new Date(document.getElementById("startDate").value);
        var venddate = new Date(document.getElementById("endDate").value);
        if (venddate < vstartdate) {
          confirmAlert({
            message: "End date/time cannot be earlier than start date/time.",
            buttons: [
              {
                label: "Ok",
                onClick: () => {
                  return false;
                }
              }
            ]
          });
        } else if (new Date(windowendtime) <= new Date(systemtime)) {
          confirmAlert({
            message:
              "End or Start date/time cannot be same or earlier than system date/time.",
            buttons: [
              {
                label: "Ok",
                onClick: () => {
                  return false;
                }
              }
            ]
          });
        } else if (new Date(windowstarttime) < new Date(systemtime)) {
          confirmAlert({
            message: "Start date/time cannot be earlier than system date/time.",
            buttons: [
              {
                label: "Ok",
                onClick: () => {
                  return false;
                }
              }
            ]
          });
        } else if (document.getElementById("assignTo").value == "--Select--") {
          confirmAlert({
            title: "Alert !",
            message: "Please select Assign to",
            buttons: [
              {
                label: "Ok",
                onClick: () => {
                  return false;
                }
              }
            ]
          });
        } else if (
          this.state.zoneList === null &&
          this.state.mainregional === null &&
          this.state.mainstatename === null &&
          this.state.maincities === null && (this.state.optionSubfmt === null && !this.state.showFlagsubFmt)
        ) {
          confirmAlert({
            title: "Alert !",
            message: "Please select all the dropdowns",
            buttons: [
              {
                label: "Ok",
                onClick: () => {
                  return false;
                }
              }
            ]
          });
        } else if (
          document.getElementById("taskTypeSelective").value == "--Select--"
        ) {
          confirmAlert({
            title: "Alert !",
            message: "Please select Task Type",
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
          if (this.state.zoneList === []) {
            confirmAlert({
              title: "Alert !",
              message: "Please select the Zone",
              buttons: [
                {
                  label: "Ok",
                }
              ]
            });
          } else if (this.state.regionalList === []) {
            confirmAlert({
              title: "Alert !",
              message: "Please select the Regional Manager",
              buttons: [
                {
                  label: "Ok",
                }
              ]
            });
          } else if (this.state.stateList === []) {
            confirmAlert({
              title: "Alert !",
              message: "Please select the State",
              buttons: [
                {
                  label: "Ok",
                }
              ]
            });
          } else if (this.state.cityList === []) {
            confirmAlert({
              title: "Alert !",
              message: "Please select the City",
              buttons: [
                {
                  label: "Ok",
                }
              ]
            });
          } else if (this.state.storeList === []) {
            confirmAlert({
              title: "Alert !",
              message: "Please select the Store",
              buttons: [
                {
                  label: "Ok",
                }
              ]
            });
          } else {
            this.setState({ loading: true });
            var Request1 = {
              taskType: this.state.valueTaskid.toString(),
              startDate: document.getElementById("startDate").value,
              endDate: document.getElementById("endDate").value,
              createdBy: this.state.userid,
              taskDesc: document.getElementById("taskDesc").value,
              taskName: document.getElementById("taskName").value,
              storeId: this.state.StoreList,
              action: "Create",
              roleId: [this.state.valueid],
              formatId: this.props.location.state.format_id,
              subformatList: this.state.subfmtList,
              zoneList: this.state.zoneList,
              regional: this.state.regionalList,
              city: this.state.cityList,
              state: this.state.stateList,
              store: this.state.storeList,
              uploadType: "2",
              guId: this.props.location.state.guId,
              functionalList: this.state.finalFunctional,
              subFormatId: this.state.subListId
            };

            var EncryptedRequest1 = Encrypt(Request1);
            console.log("selec req", EncryptedRequest1);

            fetch("/CreateTask", {
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
                this.setState({ loading: false });
                var DecryptedResponse = decryptData(response);
                // console.log(``, DecryptedResponse)
                console.log(`response of CreateTask: `, DecryptedResponse);
                // console.log(`UserID: `, this.state.userid)
                if (DecryptedResponse.errorCode === "00") {
                  if (DecryptedResponse.unmatchedStore.length > 0) {
                    {
                      this.props.location.state.role_id === "300"
                        ? confirmAlert({
                          title: "Success",
                          message:
                            "Task created successfully. " +
                            DecryptedResponse.unmatchedStore +
                            " " +
                            "does not belongs to your format.",
                          buttons: [
                            {
                              label: "Ok",
                              onClick: () => {
                                this.props.history.push({
                                  pathname: "/Taskactive",
                                  state: {
                                    userid: this.props.location.state.userid,
                                    usrnm: this.state.usrnm,
                                    role_id: this.state.roleId,
                                    format_id: this.props.location.state.format_id,
                                    storeNo: this.props.location.state.storeNo,
                                    guId: this.props.location.state.guId,
                                    menuList: this.props.location.state.menuList,
                                    roleName: this.props.location.state.roleName,
                                  }
                                });
                              }
                            }
                          ]
                        })
                        : confirmAlert({
                          title: "Success",
                          message:
                            "Task created successfully. " +
                            DecryptedResponse.unmatchedStore +
                            " " +
                            "does not belongs to your format.",
                          buttons: [
                            {
                              label: "Ok",
                              onClick: () => {
                                this.props.history.push({
                                  pathname: "/StoreTasks",
                                  state: {
                                    userid: this.props.location.state.userid,
                                    usrnm: this.state.usrnm,
                                    role_id: this.state.roleId,
                                    format_id: this.props.location.state.format_id,
                                    storeNo: this.props.location.state.storeNo,
                                    guId: this.props.location.state.guId,
                                    menuList: this.props.location.state.menuList,
                                    roleName: this.props.location.state.roleName,
                                  }
                                });
                              }
                            }
                          ]
                        });
                    }
                  } else {
                    {
                      this.props.location.state.role_id === "300"
                        ? confirmAlert({
                          title: "Success",
                          message: "Task created successfully.  ",
                          buttons: [
                            {
                              label: "Ok",
                              onClick: () => {
                                this.props.history.push({
                                  pathname: "/Taskactive",
                                  state: {
                                    userid: this.props.location.state.userid,
                                    usrnm: this.state.usrnm,
                                    role_id: this.state.roleId,
                                    format_id: this.props.location.state.format_id,
                                    storeNo: this.props.location.state.storeNo,
                                    guId: this.props.location.state.guId,
                                    menuList: this.props.location.state.menuList,
                                    roleName: this.props.location.state.roleName,
                                  }
                                });
                              }
                            }
                          ]
                        })
                        : confirmAlert({
                          title: "Success",
                          message: "Task created successfully.  ",
                          buttons: [
                            {
                              label: "Ok",
                              onClick: () => {
                                this.props.history.push({
                                  pathname: "/Taskactive",
                                  state: {
                                    userid: this.props.location.state.userid,
                                    usrnm: this.state.usrnm,
                                    role_id: this.state.roleId,
                                    format_id: this.props.location.state
                                      .format_id,
                                    storeNo: this.props.location.state.storeNo,
                                    guId: this.props.location.state.guId,
                                    menuList: this.props.location.state.menuList,
                                    roleName: this.props.location.state.roleName,
                                  }
                                });
                              }
                            }
                          ]
                        });
                    }
                  }
                } else {
                  confirmAlert({
                    title: "Alert !",
                    message: DecryptedResponse.errorMsg,
                    buttons: [
                      {
                        label: "Ok"
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
        }
      }
    }
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
        role_id: this.state.roleId,
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

  TaskactiveBind = e => {
    e.preventDefault();
    confirmAlert({
      //title: 'Confirm to submit',
      message: "Are you sure, you want to cancel? ",
      buttons: [
        {
          label: "Yes",
          onClick: () => {
            this.props.history.push({
              pathname: "/Taskactive",
              state: {
                userid: this.props.location.state.userid,
                usrnm: this.state.usrnm,
                role_id: this.state.roleId,
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
}

export default withRouter(CreatetaskUI);
