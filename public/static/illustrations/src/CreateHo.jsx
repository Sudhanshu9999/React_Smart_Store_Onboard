import React, { Component } from "react";
import "./css/style.css";
import "./css/style-responsive.css";
import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css
import readXlsxFile from "read-excel-file";
import { Encrypt, decryptData } from "./Encryption-Decrypytion";
import disableBrowserBackButton from "disable-browser-back-navigation";
import { withRouter } from "react-router-dom";
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect
} from "react-router-dom";
import config from "react-global-configuration";
import IdleTimer from "react-idle-timer"; // For Idle
import { basicAuth } from "./BasicAuth";

class CreateHo extends Component {
  state = {
    value: "",
    userId: "",
    firstName: "",
    middleName: "",
    lastName: "",
    email: "",
    formatId: "",
    formerMasterList: [],
    roleMasterList: [],
    rformatlist: [],
    rformatlisted: [],
    rformatId: [],
    rrole: [],
    lstformat: [],
    formatDesc: [],
    formarMasterList: [],
    roleMasterList1: [],
    storeList: [],
    values: "",
    hasError: false, //Added by chandrani for custom error page
    userid: ""
  };

  constructor(props) {
    super(props);

    this.state = {
      value: "",
      username: "",
      valueid: [],
      role_id: "",
      firstName: "",
      FileName: "",
      middleName: "",
      lastName: "",
      StoreList: "StoreList",
      email: "",
      formatId: null,
      userId: "",
      formerMasterList: [],
      roleMasterList: [],
      rformatlist: [],
      rformatlisted: [],
      rformatId: [],
      rrole: [],
      rlistid: [],
      lstformat: [],
      storeList: [],
      displayMenu: false,
      values: "",
      hasError: false, //Added by chandrani for custom error page
      userid: "",
      hammenu: true,
      formatDesc: [],
      formarMasterList: [],
      roleMasterList1: [],
    };

    this.showDropdownMenu = this.showDropdownMenu.bind(this);
    this.hideDropdownMenu = this.hideDropdownMenu.bind(this);
    this.idleTimer = null;
    this.onAction = this._onAction.bind(this);
    this.onActive = this._onActive.bind(this);
    this.onIdle = this._onIdle.bind(this);
    // this.onChange = this.onChange.bind(this)
  }

  logoutnormal = () => {
    localStorage.clear();
    this.props.history.replace("/");
    disableBrowserBackButton();
  };

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
  handleSetList([]) {
    this.setState({
      formarMasterList: []
    });
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

  componentDidMount() {
    if (window.innerWidth <= 768) {
      this.setState({ hammenu: false });
    }
  }

  UserchangeId = e => {
    const re = /^[0-9\b]+$/;
    if (e.target.value === "" || re.test(e.target.value)) {
      this.setState({ values: e.target.value });
    }
  };

  formatSelection = e => {
    this.setState({ value: e.target.value });

    let flag = [];

    for (var i = 0; i < this.state.rformatlist.length; i++) {
      this.state.rformatlist[i] === e.target.value
        ? flag.push(this.state.rformatId[i])
        : this.setState({ valueid: "" });
    }
    this.setState({ valueid: flag });
    console.log("formats : ", this.state.rformatId);
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

  Storecreation = () => {
    this.props.history.push({
      pathname: "/Storecreation",
      state: {
        userid: this.props.location.state.userid,
        usrnm: this.props.location.state.usrnm,
        role_id: this.state.role_id,
        format_id: this.props.location.state.format_id,
        formerMasterList: this.state.formerMasterList,
        storeNo: this.props.location.state.storeNo,
        guId: this.props.location.state.guId,
        roleName: this.props.location.state.roleName,
      }
    });
  };

  MenuRights = () => {
    this.props.history.push({
      pathname: "/MenuRights",
      state: {
        userid: this.props.location.state.userid,
        usrnm: this.props.location.state.usrnm,
        role_id: this.state.role_id,
        format_id: this.props.location.state.format_id,
        formerMasterList: this.state.formerMasterList,
        storeNo: this.props.location.state.storeNo,
        guId: this.props.location.state.guId,
        roleName: this.props.location.state.roleName,
      }
    });
  };

  Storemodification = () => {
    this.props.history.push({
      pathname: "/Storemodification",
      state: {
        userid: this.props.location.state.userid,
        usrnm: this.props.location.state.usrnm,
        role_id: this.state.role_id,
        format_id: this.props.location.state.format_id,
        storeNo: this.props.location.state.storeNo,
        guId: this.props.location.state.guId,
        roleName: this.props.location.state.roleName,
      }
    });
  };
  componentWillMount() {
    if (
      this.props.location.state === undefined ||
      this.props.location.state === ""
    ) {
      window.location.href = "/";
    } else {
      this.GetFormatMaster();
    }
  }
  // onChange(e) {

  //   const re = /^[0-9\b]+$/;
  //   if (e.target.value === '' || re.test(e.target.value)) {
  //     this.setState({ value: e.target.value })
  //   }

  // }

  // }
  //Added by chandrani for custom error page
  componentDidCatch() {
    this.setState({ hasError: true });
  }
  render = () => {
    var that = this;
    //  console.log("array",this.state.StoreList)

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
                    onClick={() =>
                      this.setState({ hammenu: !this.state.hammenu })
                    }
                  >
                    <i
                      className="fa fa-tasks hammenu"
                      style={{ "margin-top": "30px" }}
                    ></i>
                  </a>

                  <a className="logo">
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
                          <a onClick={() => this.logout()}>Log Out</a>
                        </li>
                      </ul>
                    ) : null}
                  </ul>
                </header>
                <aside>
                  <div id="sidebar" class="nav-collapse ">
                    {this.state.hammenu ? (
                      <ul class="sidebar-menu" id="nav-accordion">
                        <li
                          className="sub-menu mt"
                          onClick={this.showTaskDropdwnHandler.bind(this)}
                        >
                          {" "}
                          <a href="javascript:;">
                            {" "}
                            <i className="fa fa-tasks"></i>{" "}
                            <span>Ho Creation</span>{" "}
                          </a>

                        </li>
                        <li>
                          {" "}
                          <a onClick={this.Storecreation}>
                            {" "}
                            <i class="fa fa-tasks"></i>{" "}
                            <span>Store Creation</span>{" "}
                          </a>{" "}
                        </li>
                     {/*    <li>
                          {" "}
                          <a onClick={this.MenuRights}>
                            {" "}
                            <i class="fa fa-tasks"></i>{" "}
                            <span>Menu Rights</span>{" "}
                          </a>{" "}
                        </li> */}
                        {/* <li> <a onClick={this.Storemodification}> <i class="fa fa-tasks"></i> <span>Store Modification</span> </a> </li> */}
                      </ul>
                    ) : null}
                  </div>
                </aside>
                <section id="main-content">
                  <section class="wrapper">
                    <div class="mt">
                      {/* <h3><i class="fa fa-angle-right"></i>Home page</h3>
                  <hr /> */}
                      <h3>
                        <i class="fa fa-angle-right"></i> HO Creation
                      </h3>
                      <hr />
                      <div class="row mt">
                        <div class="col-lg-4 col-md-4 col-sm-5 col-xs-12">
                          <label>Select Format Type</label>
                          <span class="required-mark">*</span>
                          <br />
                          {/* {this.state.formerMasterList.map(function (item,key) {
                                  return ( */}

                          <select
                            class="form-control"
                            id="SelQType1"
                            onChange={this.formatSelection.bind(this)}
                          >
                            <option>Select</option>
                            {this.state.formerMasterList.map(function (
                              item,
                              key
                            ) {
                              return (
                                <option>{item.formatDesc}</option>

                                // </select>

                                // </div>
                              );
                            })}
                          </select>
                        </div>
                        {" "}
                        <div class="col-lg-4 col-md-4 col-sm-4 col-xs-6">
                          <label>User Id</label>
                          <span class="required-mark">*</span>
                          <input
                            type="text"
                            class="form-control"
                            placeholder="Enter UserId"
                            input
                            value={this.state.values}
                            id="UserId"
                            onChange={this.UserchangeId}
                            maxlength="8"
                            autoComplete="off"
                          ></input>
                          <br />
                        </div>
                        <div class="col-lg-4 col-md-4 col-sm-4 col-xs-6">
                          <label>Email ID</label>
                          <span class="required-mark">*</span>
                          <input
                            type="email"
                            class="form-control"
                            placeholder="Enter EmailId"
                            id="Admin_EmailId"
                            maxlength="40"
                            autoComplete="off"
                          ></input>
                          <br />
                        </div>
                        <div class="clearfix"></div>
                        <div class="col-lg-4 col-md-4 col-sm-4 col-xs-12">
                          <label>First Name</label>
                          <span class="required-mark">*</span>
                          <input
                            type="FirstName"
                            class="form-control"
                            placeholder="Enter First Name"
                            id="FirstName"
                            maxlength="30"
                            autoComplete="off"
                          ></input>
                          <br />
                        </div>
                        <div class="col-lg-4 col-md-4 col-sm-4 col-xs-12">
                          <label>Middle Name</label>
                          <input
                            type="MiddleName"
                            class="form-control"
                            placeholder="Enter Middle Name"
                            id="MiddleName"
                            maxlength="30"
                            autoComplete="off"
                          ></input>
                          <br />
                        </div>
                        <div class="col-lg-4 col-md-4 col-sm-4 col-xs-12">
                          <div class="form-group">
                            <label>Last Name</label>
                            <span class="required-mark">*</span>
                            <br />
                            <input
                              type="LastName"
                              class="form-control"
                              placeholder="Enter Last Name"
                              id="LastName"
                              maxlength="30"
                              autoComplete="off"
                            ></input>
                          </div>
                          <div>
                            <br />
                          </div>
                        </div>
                        <div class="form-group col-lg-4 col-md-4 col-sm-4 col-xs-12"></div>
                        <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12 text-center">
                          <div class="text-center mt ">
                            <button
                              class="btn btn-primary min-wid-90 "
                              onClick={this.CreateHOUser.bind(this)}
                            >
                              Submit
                            </button>
                            {/* <button class="btn btn-primary min-wid-90 ml-10" >Clear</button> */}

                            {/* <hr/>
                          <label>Store Creation</label><br /> */}
                            {/* <div class="upload-holder">
                              <input id="store-list" type="text" class="form-control input-upload" value={this.state.FileName} />
                              <span class="btn-upload" style={{ padding: "7px 50px" }}>Upload</span>
                              <input id="upload-storedata" type="file" name="Store-list-data" class="input-hidden"  onChange={this.fileHandler.bind(this)} accept=".xlsx,.xls" />
                            </div> */}
                            {/* <span class="help-block">Sample File <a href={require("./doc/StoreCreation.xlsx")}>StoreCreation.xls</a></span>
                            <button class="btn btn-primary min-wid-90 mt-20" onClick={this.addstore.bind(this)}>Submit</button>
                         */}
                          </div>
                        </div>
                        {/* </form> */}
                      </div>
                    </div>
                  </section>
                </section>
              </section>
            </div>
          </div>
        </Router>
      );
    }
  };

  fileHandler = event => {
    const input = document.getElementById("upload-storedata");

    //just pass the fileObj as parameter
    readXlsxFile(input.files[0]).then((rows, files) => {
      var storedata = [];

      // console.log(`row1`,rows[1])
      for (let i = 1; i < rows.length; i++) {
        storedata.push(rows[i]);
        // console.log('storedata',storedata)
        for (let j = 0; j < storedata.length; j++) {
          var store = {
            storeNo: "",
            city: "",
            clusterManager: "",
            rrState: "",
            storeName: "",
            zbm: "",
            zbmState: "",
            zbmEmail: ""
          };
          store.storeNo = storedata[j][0];
          store.city = storedata[j][1];
          store.clusterManager = storedata[j][2];
          store.rrState = storedata[j][3];
          store.storeName = storedata[j][4];
          store.zbm = storedata[j][5];
          store.zbmState = storedata[j][6];
          store.zbmEmail = storedata[j][7];
          // console.log('store',store)
        }
        this.state.storeList.push(store);
        // console.log('storeListfinal',this.state.storeList)
      }

      this.setState({
        FileName: "File Uploaded Successfully"
      });
    });
  };
  CreateHOUser = e => {
    e.preventDefault();

    var pattern = /^(?:[\w\!\#\$\%\&\'\*\+\-\/\=\?\^\`\{\|\}\~]+\.)*[\w\!\#\$\%\&\'\*\+\-\/\=\?\^\`\{\|\}\~]+@(?:(?:(?:[a-zA-Z0-9](?:[a-zA-Z0-9\-](?!\.)){0,61}[a-zA-Z0-9]?\.)+[a-zA-Z0-9](?:[a-zA-Z0-9\-](?!$)){0,61}[a-zA-Z0-9]?)|(?:\[(?:(?:[01]?\d{1,2}|2[0-4]\d|25[0-5])\.){3}(?:[01]?\d{1,2}|2[0-4]\d|25[0-5])\]))$/;
    // var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
    var re = /^[a-zA-Z]+$/;
    // var letters = /^[A-Za-z]+$/;

    var selectType = document.getElementById("SelQType1").value;
    var Admin_EmailId = document.getElementById("Admin_EmailId").value;
    var FirstName = document.getElementById("FirstName").value;
    var MiddleName = document.getElementById("MiddleName").value;
    var LastName = document.getElementById("LastName").value;
    var UserId = document.getElementById("UserId").value;

    var Admin_EmailId = document.getElementById("Admin_EmailId").value;
    //   var atposition=Admin_EmailId.indexOf("@");
    //   var dotposition=Admin_EmailId.lastIndexOf(".");
    // if (atposition<1 || dotposition<atposition+2 || dotposition+2>=Admin_EmailId.length){
    //   // alert("please enter valid email")
    //   confirmAlert({
    //     message: 'Please enter valid email.',
    //     buttons: [
    //       {
    //         label: 'Yes',

    //       },

    //     ]
    //   })

    //   return false;

    // }
    if (!pattern.test(Admin_EmailId)) {
      confirmAlert({
        message: "Please enter valid email.",
        buttons: [
          {
            label: "Yes"
          }
        ]
      });

      return false;
    } else if (
      !document.getElementById("FirstName").value ||
      !document.getElementById("LastName").value ||
      !document.getElementById("Admin_EmailId").value ||
      !document.getElementById("UserId").value
    ) {
      confirmAlert({
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
    } else if (!re.test(FirstName) || !re.test(LastName)) {
      confirmAlert({
        message: "Special characters & numbers are not allowed.",
        buttons: [
          {
            label: "Ok",
            onClick: () => {
              return false;
            }
          }
        ]
      });
    } else if (this.state.valueid.length === 0) {
      confirmAlert({
        title: "Alert !",
        message: "Please select format type.",
        buttons: [
          {
            label: "OK",
            onClick: () => {
              return false;
            }
          }
        ]
      });
    } else {
      //   if (this.state.role_id.length === 0) {
      //     confirmAlert({
      //         title: 'Alert !',
      //         message: "Please select role .",
      //         buttons: [
      //             {
      //                 label: 'OK',
      //                 onClick: () => { return (false); }
      //             },
      //         ]
      //     })
      // }
      //  else{

      confirmAlert({
        //  title: 'Alert !',
        message: "Are you sure, you want to submit?.",
        buttons: [
          {
            label: "Yes",
            onClick: () => {
              // console.log(document.getElementById("FirstName").value)
              // console.log(document.getElementById("MiddleName").value)
              // console.log( document.getElementById("LastName").value)
              // console.log(document.getElementById("Admin_EmailId").value)
              // console.log( this.state.valueid)

              var Request1 = {
                firstName: document.getElementById("FirstName").value,
                middleName: document.getElementById("MiddleName").value,
                lastName: document.getElementById("LastName").value,
                email: document.getElementById("Admin_EmailId").value,
                formatId: this.state.valueid[0],
                userId: document.getElementById("UserId").value,
                guId: this.props.location.state.guId
              };
              var EncryptedRequest1 = Encrypt(Request1);
              console.log("ho creation", EncryptedRequest1);

              fetch("/CreateHOUser", {
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
                  if (DecryptedResponse.errorCode === "00") {
                    confirmAlert({
                      message:
                        "Ho created successfully & userId is :" +
                        DecryptedResponse.userId,
                      buttons: [
                        {
                          label: "Ok",
                          onClick: () => window.location.reload(true)
                        }
                      ]
                    });

                    // console.log(`response of CreateHouser: `, DecryptedResponse)
                    this.setState({ userId: DecryptedResponse.userId });
                    // console.log(`response: `, DecryptedResponse.userId)
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
    }
    //  }
  };
  GetFormatMaster = e => {
    console.log(`inside  GetFormatMaster: `);
    this.setState({ userid: this.props.location.state.userid ,
      role_id:this.props.location.state.roleId});
    fetch("/GetFormatMaster", {
      method: "GET",
      headers: {
        guId: this.props.location.state.guId,
        Authorization: "Basic " + basicAuth(this.props.location.state.userid)
      }
    })
      .then(response => response.text())
      .then(response => {
        var DecryptedResponse = decryptData(response);
        console.log(`response of  GetFormatMaster: `, DecryptedResponse);
        if (DecryptedResponse.errorCode === "00") {
          this.setState({
            formerMasterList: DecryptedResponse.formarMasterList
          });
          console.log(` formerMasterList`, DecryptedResponse.formarMasterList);
          this.setState({ roleMasterList: DecryptedResponse.roleMasterList });
          // this.state.lstformat.push(responseJson.formarMasterList);
          // this.setState({formarMasterList:responseJson.formarMasterList.formatDesc})

          // console.log("lstformat : ", this.state.lstformat)

          let list = [];
          let list1 = [];
          let list2 = [];
          let list3 = [];

          for (var i = 0; i < DecryptedResponse.formarMasterList.length; i++) {
            list.push(DecryptedResponse.formarMasterList[i].formatDesc);
            list1.push(DecryptedResponse.formarMasterList[i].formatId);
          }
          this.setState({ rformatlist: list });
          this.setState({ rformatId: list1 });

        } else {
          confirmAlert({
            title: "Alert !",
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
        console.log(`error`, error);
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
  email = e => {
    e.preventDefault();
    //   var Admin_EmailId = document.getElementById("Admin_EmailId").value;
    //   var atposition=Admin_EmailId.indexOf("@");
    //   var dotposition=Admin_EmailId.lastIndexOf(".");
    // if (atposition<1 || dotposition<atposition+2 || dotposition+2>=Admin_EmailId.length){
    //   alert("please enter valid email")
    //   return false;

    // }
  };

  addstore = () => {
    var request = {
      storeList: this.state.storeList,
      guId: this.props.location.state.guId
    };
    var EncryptedRequest = Encrypt(request);
    // console.log(EncryptedRequest)

    fetch("/CreateStore", {
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
        // console.log(``, DecryptedResponse)
        // console.log(`response of getroles: `, DecryptedResponse)

        if (DecryptedResponse.errorCode === "00") {
          confirmAlert({
            title: "Success",
            message: "Stores added successfully",
            buttons: [
              {
                label: "Ok"
                // onClick: () => { return (false) }
              }
            ]
          });
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
  };
}

export default withRouter(CreateHo);
