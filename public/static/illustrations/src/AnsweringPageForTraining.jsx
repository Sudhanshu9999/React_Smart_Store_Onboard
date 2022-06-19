/* eslint-disable no-loop-func */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/anchor-has-content */
import React, { Component } from "react";
import DatePicker from "react-datepicker";
import { confirmAlert } from "react-confirm-alert"; // Import
import Spinner from "react-spinner-material"; //Import Spinner
import config from "react-global-configuration";
import IdleTimer from "react-idle-timer"; // For Idle
import App from "./App"; // For Idel
import "./css/style.css";
import "./css/style-responsive.css";
import Resizer from "react-image-file-resizer";
import { Encrypt, decryptData } from "./Encryption-Decrypytion";
import disableBrowserBackButton from "disable-browser-back-navigation";
import { basicAuth } from "./BasicAuth";
class AnsweringPageForTraining extends Component {
  state = {
    TaskDropdwn: false,
    data: [],
    taskId: "",
    usrnm: "",
    tempquesid: "",
    quesid: [],
    quesidmail: [],
    quesidcs9: [],
    ans: [],
    imgquesflag: "",
    fileval: "",
    fileuploaded: [],
    nooffileques: 0,
    taskdetails: "",

    userId: "",
    // taskdetails: this.props.location.state.data,
    // taskId: this.props.location.state.tskId,
    // userId: this.props.location.state.userid,
    fstring: "",

    answers: [],
    ansobj: "",
    // ansobj: {
    //   taskId: this.props.location.state.tskId,
    //   userId: this.props.location.state.userid,
    //   questionId: "",
    //   answer: ""
    // },
    radioObj: [],
    jsonObj: [],
    arrrefs: [],
    arrrefscs9: [],
    arrchk: [],
    checked: "",
    status: "",
    file: "",
    file2: "",
    file3: "",
    instReadFlag: "",
    instReadFlag2: "",
    instReadFlag3: "",
    disabled: "",
    value1: "",
    defval: "",
    numchange: false,
    arrid1: [],
    arrid2: [],
    arrid3: [],
    arrid4: [],
    arrid5: [],
    arrid6: [],
    arrid7: [],
    arrid8: [],
    arrid9: [],
    arrid10: [],
    objwithans: [],
    nummaxflag: 1,
    numeleid: [],
    numminval: [],
    mand: [],
    mandid: [],
    karan: [],
    abc: "",
    hasError: false, //Added by chandrani for custom error page
    comment: "",
    browser: false,
    latitude: "",
    longitude: ""

  };

  constructor(props) {
    super(props);
    // this.handleChange = this.handleChange.bind(this);

    var _ = require("lodash");

    this.state = {

      selectedOption: "",
      data: [],
      displayMenu: false,
      tempquesid: "",
      quesid: [],
      quesidmail: [],
      quesidcs9: [],
      ans: [],
      answers: [],
      fileval: "",
      fileuploaded: [],
      taskId: "",
      userId: "",
      storeNo: "",
      loading: false,
      fstring: "",
      abc: "",
      visiblity: true,
      startDate: new Date(),
      ansobj: "",
      radioObj: [],
      jsonObj: [],
      arrrefs: [],
      arrrefscs9: [],
      arrchk: [],
      taskdetails: "",
      imgquesflag: "",
      value1: "",
      numchange: false,
      defval: "",
      status: "",
      file: "",
      file2: "",
      file3: "",
      instReadFlag: "",
      instReadFlag2: "",
      instReadFlag3: "",
      nooffileques: 0,
      arrid1: [],
      arrid2: [],
      arrid3: [],
      arrid4: [],
      arrid5: [],
      arrid6: [],
      arrid7: [],
      arrid8: [],
      arrid9: [],
      arrid10: [],
      objwithans: [],
      nummaxflag: 1,
      numeleid: [],
      numminval: [],
      mand: [],
      mandid: [],
      hasError: false, //Added by chandrani for custom error page
      hammenu: true,
      comment: "",
      browser: false,
      guId: "",
      TaskDropdwn: false,
      usrnm: "",
      checked: "",
      disabled: "",
      latitude: "",
      longitude: ""

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

  componentDidMount() {
    if (window.innerWidth <= 768) {
      this.setState({ hammenu: false });
    }

    navigator.geolocation.getCurrentPosition(
      position => {
        const lat = JSON.stringify(position.coords.latitude);
        const long = JSON.stringify(position.coords.longitude);
        this.setState({ latitude: lat, longitude: long });
      },
      error => alert(error.message),
      { enableHighAccuracy: true }
    );
  }

  handleChangeRadioNew = (param, event) => {
    var flag = false;
    if (this.state.quesid.length > 0) {
      for (let i = 0; i < this.state.quesid.length; i++) {
        const element = this.state.quesid[i];
        if (element === param) {
          for (let j = 0; j < this.state.radioObj.length; j++) {
            const element1 = this.state.radioObj[j];
            if (element1.questionId === param) {
              this.state.radioObj[j].answer = event.currentTarget.value;
              flag = true;
            }
          }
        }
      }
      if (!flag) {
        var newans = {
          taskId: this.props.location.state.tskId,
          userId: this.props.location.state.userid,
          questionId: param,
          answer: event.currentTarget.value
        };
        this.state.radioObj.push(newans);
        this.state.quesid.push(param);
      }
    } else {
      this.state.quesid.push(param);
      this.state.ansobj.questionId = param;
      this.state.ansobj.answer = event.currentTarget.value;
      this.state.radioObj.push(this.state.ansobj);
    }
    //console.log(`ansobj: `, this.state.ansobj);
    // console.log(`radioobj: `, this.state.radioObj);
  };

  handleChangeCheck = (param, event) => {
    let _ = require("underscore");
    var cleanedqid = [];
    this.state.quesid.forEach(function (itm) {
      var unique = true;
      cleanedqid.forEach(function (itm2) {
        if (_.isEqual(itm, itm2)) unique = false;
      });
      if (unique) cleanedqid.push(itm);
    });

    var flag = false;
    if (cleanedqid.length > 0) {
      for (let i = 0; i < cleanedqid.length; i++) {
        const element = cleanedqid[i];
        if (element === param) {
          for (let j = 0; j < this.state.radioObj.length; j++) {
            const element1 = this.state.radioObj[j];
            if (element1.questionId === param) {
              if (this.state.radioObj[j].answer === undefined) {
              } else {
                if (
                  this.state.radioObj[j].answer.includes(
                    event.currentTarget.value
                  )
                ) {
                  if (
                    this.state.radioObj[j].answer.includes(
                      event.currentTarget.value + ","
                    )
                  ) {
                    this.state.radioObj[j].answer = this.state.radioObj[
                      j
                    ].answer.replace(event.currentTarget.value + ",", "");
                  } else if (
                    this.state.radioObj[j].answer.includes(
                      "," + event.currentTarget.value
                    )
                  ) {
                    this.state.radioObj[j].answer = this.state.radioObj[
                      j
                    ].answer.replace("," + event.currentTarget.value, "");
                  } else if (
                    this.state.radioObj[j].answer.includes(
                      event.currentTarget.value
                    )
                  ) {
                    this.state.radioObj[j].answer = this.state.radioObj[
                      j
                    ].answer.replace(event.currentTarget.value, "");
                  }
                } else {
                  if (this.state.radioObj[j].answer === "") {
                    this.state.radioObj[j].answer = event.currentTarget.value;
                  } else {
                    this.state.radioObj[j].answer =
                      this.state.radioObj[j].answer +
                      "," +
                      event.currentTarget.value;
                  }
                }
                flag = true;
              }
            }
          }
        }
      }
      if (!flag) {
        var newans = {
          taskId: this.props.location.state.tskId,
          userId: this.props.location.state.userid,
          questionId: param,
          answer: event.currentTarget.value
        };
        this.state.radioObj.push(newans);
        this.state.quesid.push(param);
      }
    } else {
      this.state.quesid.push(param);
      this.state.ansobj.questionId = param;
      this.state.ansobj.answer = event.currentTarget.value;
      this.state.radioObj.push(this.state.ansobj);
    }
    //  console.log(`ansobj: `, this.state.ansobj);
    //   console.log(`radioobj: `, this.state.radioObj);
  };

  handleChangeNum = (param, param2, evt) => {
    //this.setState({nummaxflag : this.state.nummaxflag+1});
    if (param2 === undefined) {
      if (evt.target.value.length === 1) {
        const value1 = evt.target.validity.valid
          ? evt.target.value
          : this.state.value1;
        //this.setState({ value1 });
        //this.state.value1 = value12;
        //this.setState({ value1 });
        this.setState({ numchange: true });
        document.getElementById(param).value = value1;
      } else {
        const value1 = evt.target.validity.valid
          ? evt.target.value
          : evt.target.value.substring(0, evt.target.value.length - 1);
        this.setState({ numchange: true });
        document.getElementById(param).value = value1;
      }
    } else {
      if (document.getElementById(param).value.length <= param2) {
        if (evt.target.value.length === 1) {
          const value1 = evt.target.validity.valid
            ? evt.target.value
            : this.state.value1;
          //this.setState({ value1 });
          //this.state.value1 = value12;
          //this.setState({ value1 });
          this.setState({ numchange: true });
          document.getElementById(param).value = value1;
        } else {
          const value1 = evt.target.validity.valid
            ? evt.target.value
            : evt.target.value.substring(0, evt.target.value.length - 1);
          this.setState({ numchange: true });
          document.getElementById(param).value = value1;
        }
      } else {
        const value1 = evt.target.value.substring(
          0,
          evt.target.value.length - 1
        );
        this.setState({ numchange: true });
        document.getElementById(param).value = value1;
      }
    }
  };

  downloadPDF() {
    var dlnk = document.getElementById("dwnldLnk");
    dlnk.href = this.state.file;
    dlnk.click();
  }

  openIns(params) {
    if (this.state.instReadFlag == "0" || this.state.instReadFlag2 == "0" || this.state.instReadFlag3 == "0") {
      var Request1 = {
        taskId: this.props.location.state.tskId,
        storeId: this.props.location.state.storeNo,
        guId: this.props.location.state.guId
      };
      var EncryptedRequest1 = Encrypt(Request1);
      //console.log(EncryptedRequest1)
      fetch("/InstReadFlag ", {
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
            if (params === 1) {
              var string = this.state.file;
              var iframe =
                "<iframe width='100%' height='100%' src='" +
                string +
                "'></iframe>";
              var iframe =
                "<iframe width='100%' height='100%' src='" +
                "/IMAGES/" +
                this.state.file +
                "'></iframe>";
              var x = window.open();
              x.document.open();
              x.document.write(iframe);
              x.document.close();
              // console.log(`sam`);
              this.state.instReadFlag = "1"
            } else if (params === 2) {
              var string = this.state.file2;
              var iframe =
                "<iframe width='100%' height='100%' src='" +
                string +
                "'></iframe>";
              var iframe =
                "<iframe width='100%' height='100%' src='" +
                "/IMAGES/" +
                this.state.file2 +
                "'></iframe>";
              var x = window.open();
              x.document.open();
              x.document.write(iframe);
              x.document.close();
              // console.log(`sam`);
              this.state.instReadFlag2 = "1"
            } else if (params === 3) {
              var string = this.state.file3;
              var iframe =
                "<iframe width='100%' height='100%' src='" +
                string +
                "'></iframe>";
              var iframe =
                "<iframe width='100%' height='100%' src='" +
                "/IMAGES/" +
                this.state.file3 +
                "'></iframe>";
              var x = window.open();
              x.document.open();
              x.document.write(iframe);
              x.document.close();
              // console.log(`sam`);
              this.state.instReadFlag3 = "1"
            }
          } else {
            this.setState({ loading: false });
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
    } else {
      if (params === 1) {
        var string = this.state.file;
        var iframe =
          "<iframe width='100%' height='100%' src='" +
          string +
          "'></iframe>";
        var iframe =
          "<iframe width='100%' height='100%' src='" +
          "/IMAGES/" +
          this.state.file +
          "'></iframe>";
        var x = window.open();
        x.document.open();
        x.document.write(iframe);
        x.document.close();
        // console.log(`sam`);
      } else if (params === 2) {
        var string = this.state.file2;
        var iframe =
          "<iframe width='100%' height='100%' src='" +
          string +
          "'></iframe>";
        var iframe =
          "<iframe width='100%' height='100%' src='" +
          "/IMAGES/" +
          this.state.file2 +
          "'></iframe>";
        var x = window.open();
        x.document.open();
        x.document.write(iframe);
        x.document.close();
        // console.log(`sam`);
      } else if (params === 3) {
        var string = this.state.file3;
        var iframe =
          "<iframe width='100%' height='100%' src='" +
          string +
          "'></iframe>";
        var iframe =
          "<iframe width='100%' height='100%' src='" +
          "/IMAGES/" +
          this.state.file3 +
          "'></iframe>";
        var x = window.open();
        x.document.open();
        x.document.write(iframe);
        x.document.close();
        // console.log(`sam`);
      }
    }
  }
  DownloadIns = (params) => {
    if (this.state.instReadFlag == "0" || this.state.instReadFlag2 == "0" || this.state.instReadFlag3 == "0") {
      var Request1 = {
        taskId: this.props.location.state.tskId,
        storeId: this.props.location.state.storeNo,
        guId: this.props.location.state.guId
      };
      var EncryptedRequest1 = Encrypt(Request1);
      //console.log(EncryptedRequest1)
      fetch("/InstReadFlag ", {
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
            if (params === 1) {
              document.getElementById("FileDnld").click();
            } else if (params === 2) {
              document.getElementById("FileDnld2").click();
            } else if (params === 3) {
              document.getElementById("FileDnld3").click();
            }
          } else {
            this.setState({ loading: false });
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
    } else {
      if (params === 1) {
        document.getElementById("FileDnld").click();
      } else if (params === 2) {
        document.getElementById("FileDnld2").click();
      } else if (params === 3) {
        document.getElementById("FileDnld3").click();
      }
    }
  };

  openPrf = (param, evt) => {
    let _ = require("underscore");
    var cleanedans = [];

    console.log(`radioobj`, this.state.radioObj);
    cleanedans = this.state.radioObj;

    evt.preventDefault();
    var bool = false;
    if (cleanedans.length > 0) {
      for (let index = 0; index < cleanedans.length; index++) {
        const element = cleanedans[index];
        console.log(`element`, element);
        if (element.questionId === param) {
          bool = true;
          if (element.imageArray.length > 0) {
            for (let k = 0; k < element.imageArray.length; k++) {
              if (
                element.imageArray[k] == null ||
                element.imageArray[k] == ""
              ) {
              } else {
                var iframe =
                  "<iframe width='100%' height='100%' src='" +
                  element.imageArray[k] +
                  "'></iframe>";
                var x = window.open();
                x.document.open();
                x.document.write(iframe);
                x.document.close();
              }
            }
          } else {
            confirmAlert({
              message: "No File uploaded yet",
              buttons: [
                {
                  label: "OK"
                }
              ]
            });
          }
        }
      }
      if (!bool) {
        confirmAlert({
          message: "No File uploaded yet",
          buttons: [
            {
              label: "OK"
            }
          ]
        });
      }
    } else {
      confirmAlert({
        message: "No File uploaded yet",
        buttons: [
          {
            label: "OK"
          }
        ]
      });
    }
  };

  // handleChangeStart(date,questionId) {
  //   this.setState({startDate: date });

  // //document.getElementById("qtype3"+param).value=date
  // }

  // handleDateChangeRaw = (e) => {
  //   e.preventDefault();
  // }

  // openproof = (param, evt) => {
  //   evt.preventDefault();
  //   //alert("inside open proof");
  //   var string;
  //   var qlen = param.length;
  //   if (this.state.fileuploaded.length > 0) {
  //     for (let index = 0; index < this.state.fileuploaded.length; index++) {
  //       const element = this.state.fileuploaded[index];
  //       if (element.includes(param, 0)) {
  //         // console.log(`state file uploaded`)
  //         var elelen = element.length;
  //         string = element.substring(qlen, elelen);
  //         if(string=="null"){

  //         }
  //         else{
  //         var iframe = "<iframe width='100%' height='100%' src='" + string + "'></iframe>"
  //         var x = window.open();
  //         x.document.open();
  //         x.document.write(iframe);
  //         x.document.close();}
  //       }
  //       else {

  //       }
  //     }
  //   }
  //   else {
  //     confirmAlert({
  //       title: 'Alert !',
  //       message: "No files uploaded yet",
  //       buttons: [
  //         {
  //           label: 'OK',
  //           //onClick: () => alert('Click Yes')
  //         },
  //       ]
  //     })
  //     //alert("No files uploaded yet");
  //   }
  // }

  // componentDidMount=()=>{

  // }

  browserCheck() {
    if (
      navigator.userAgent.match(/Android/i) ||
      navigator.userAgent.match(/webOS/i) ||
      navigator.userAgent.match(/iPhone/i) ||
      navigator.userAgent.match(/iPad/i) ||
      navigator.userAgent.match(/iPod/i) ||
      navigator.userAgent.match(/BlackBerry/i)
    ) {
      this.setState({ browser: true });
    }
    console.log("browser", this.state.browser);
  }

  handleFileSelect = (param, evt) => {
    console.log(`evt`, param);
    console.log(`evt`, evt);
    // this.setState({radioObj:[]})
    console.log(`radioobj`, this.state.radioObj);
    var that1 = this;
    var files = document.getElementById(param).files;
    console.log(`file`, evt.target.files[0]);
    var newans = {
      taskId: that1.props.location.state.tskId,
      userId: that1.props.location.state.userid,
      questionId: param,
      imageArray: []
    };

    if (files.length > 3) {
      confirmAlert({
        title: "Alert !",
        message: "Maximum three file can be uploaded.",
        buttons: [
          {
            label: "Ok"
          }
        ]
      });
    } else {
      for (let k = 0; k < files.length; k++) {
        if (
          files[k].type == "image/gif" ||
          files[k].type == "image/jpg" ||
          files[k].type == "image/jpeg" ||
          files[k].type == "image/png" ||
          files[k].type == "application/msword" ||
          files[k].type ==
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ||
          files[k].type ==
          "application/vnd.openxmlformats-officedocument.presentationml.presentation" ||
          files[k].type ==
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" ||
          files[k].type == "application/vnd.ms-excel" ||
          files[k].type == "application/pdf" ||
          files[k].type == "application/vnd.ms-powerpoint" ||
          files[k].type == "text/plain"
        ) {
          if (files[k].type == "image/jpeg" || files[k].type == "image/png") {
            let _ = require("underscore");
            var cleanedqid = [];
            this.state.quesid.forEach(function (itm) {
              var unique = true;
              cleanedqid.forEach(function (itm2) {
                if (_.isEqual(itm, itm2)) unique = false;
              });
              if (unique) cleanedqid.push(itm);
            });
            var flag = false;
            if (cleanedqid.length > 0) {
              for (let i = 0; i < cleanedqid.length; i++) {
                const element = cleanedqid[i];
                if (element === param) {
                  for (let j = 0; j < that1.state.radioObj.length; j++) {
                    const element1 = that1.state.radioObj[j];
                    if (element1.questionId === param) {
                      if (files.length > 0) {
                        if (that1.state.radioObj[j].imageArray === undefined) {
                        } else {
                          flag = true;
                          var reader = new FileReader();
                          reader.readAsDataURL(files[k]);
                          reader.onload = function () {
                            Resizer.imageFileResizer(
                              files[k],
                              500,
                              500,
                              "JPEG",
                              100,
                              0,
                              uri => {
                                that1.state.fileuploaded.push(param + "" + uri);
                                newans.imageArray.push(uri);
                              },
                              "base64"
                            );
                          };
                          reader.onerror = function (error) { };
                          //  if (reader != null) {
                          //    Resizer.imageFileResizer(
                          //      files[k],
                          //      500,
                          //      500,
                          //      'JPEG',
                          //      100,
                          //      0,
                          //      uri => {
                          //        //that1.state.radioObj[j].imageArray.push(uri);
                          //        // console.log(uri)
                          //      },
                          //      'base64'
                          //    );
                          //  }
                        }
                        that1.state.imgquesflag = param;
                        that1.state.fileval = param + "File Upload successful";
                        document.getElementById("proof" + param).value =
                          "File Upload successful";
                      }
                    }
                  }
                }
              }
              if (!flag) {
                if (files.length > 0) {
                  that1.state.quesid.push(param);
                  if (files.length > 0) {
                    var reader = new FileReader();
                    reader.readAsDataURL(files[k]);
                    reader.onload = function () {
                      Resizer.imageFileResizer(
                        files[k],
                        500,
                        500,
                        "JPEG",
                        100,
                        0,
                        uri => {
                          that1.state.fileuploaded.push(param + "" + uri);
                          newans.imageArray.push(uri);
                        },
                        "base64"
                      );
                    };
                  }
                  //  if (reader != null) {
                  //    Resizer.imageFileResizer(
                  //      files[k],
                  //      500,
                  //      500,
                  //      'JPEG',
                  //      100,
                  //      0,
                  //      uri => {
                  //        //newans.imageArray.push(uri)
                  //        // console.log(uri)
                  //        //that1.state.radioObj.push(newans);
                  //      },
                  //      'base64'
                  //    );

                  //  }

                  that1.state.imgquesflag = param;
                  that1.state.fileval = param + "File Upload successful";
                  document.getElementById("proof" + param).value =
                    "File Upload successful";
                }
              }
            } else {
              //
              var files = document.getElementById(param).files;
              var temp;
              var that1 = this;

              if (files.length > 0) {
                var reader = new FileReader();
                reader.readAsDataURL(files[k]);
                reader.onload = function () {
                  newans.imageArray.push(reader.result);
                  that1.state.fileuploaded.push(param + "" + reader.result);
                };
              }

              that1.state.radioObj.push(newans);
              that1.state.imgquesflag = param;
              that1.state.fileval = param + "File Upload successful";
              that1.state.quesid.push(param);
              document.getElementById("proof" + param).value =
                "File Upload successful";
            }
          } else {
            var that1 = this;
            var files = document.getElementById(param).files;
            //  if (files[k].size < 1572864) {
            let _ = require("underscore");
            var cleanedqid = [];
            this.state.quesid.forEach(function (itm) {
              var unique = true;
              cleanedqid.forEach(function (itm2) {
                if (_.isEqual(itm, itm2)) unique = false;
              });
              if (unique) cleanedqid.push(itm);
            });
            var flag = false;
            if (cleanedqid.length > 0) {
              for (let i = 0; i < cleanedqid.length; i++) {
                const element = cleanedqid[i];
                if (element === param) {
                  for (let j = 0; j < that1.state.radioObj.length; j++) {
                    const element1 = that1.state.radioObj[j];
                    if (element1.questionId === param) {
                      if (files.length > 0) {
                        if (that1.state.radioObj[j].imageArray === undefined) {
                        } else {
                          flag = true;
                          var reader = new FileReader();
                          console.log(`file`, files);
                          reader.readAsDataURL(files[k]);
                          reader.onload = function (evt) {
                            newans.imageArray.push(evt.target.result);
                            that1.state.fileuploaded.push(
                              param + "" + reader.result
                            );
                          };
                          reader.onerror = function (error) { };
                        }
                        that1.state.imgquesflag = param;
                        that1.state.fileval = param + "File Upload successful";
                        document.getElementById("proof" + param).value =
                          "File Upload successful";
                      }
                    }
                  }
                }
              }
              if (!flag) {
                if (files.length > 0) {
                  that1.state.quesid.push(param);
                  if (files.length > 0) {
                    var reader = new FileReader();
                    reader.readAsDataURL(files[k]);
                    reader.onload = function () {
                      newans.imageArray.push(reader.result);
                      that1.state.fileuploaded.push(param + "" + reader.result);
                    };
                    reader.onerror = function (error) { };
                  }

                  that1.state.radioObj.push(newans);
                  that1.state.imgquesflag = param;
                  that1.state.fileval = param + "File Upload successful";
                  document.getElementById("proof" + param).value =
                    "File Upload successful";
                }
              }
            } else {
              //
              var files = document.getElementById(param).files;
              var temp;
              var that1 = this;

              if (files.length > 0) {
                var reader = new FileReader();
                reader.readAsDataURL(files[k]);
                reader.onload = function () {
                  newans.imageArray.push(reader.result);
                  that1.state.fileuploaded.push(param + "" + reader.result);
                };
                reader.onerror = function (error) { };
              }

              that1.state.radioObj.push(newans);
              that1.state.imgquesflag = param;
              that1.state.fileval = param + "File Upload successful";
              that1.state.quesid.push(param);
              document.getElementById("proof" + param).value =
                "File Upload successful";
            }
            //  }

            //  else {
            //    confirmAlert({
            //      title: 'Alert !',
            //      message: "File size cannot be greater than 1.5 MB",
            //      buttons: [
            //        {
            //          label: 'Ok',
            //        },

            //      ]
            //    })
            //  }
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
      }
      console.log(`newans`, newans);
      console.log(`handle`, this.state.radioObj);
      if (this.state.radioObj.length == 0) {
        //  this.setState({radioObj:[newans]})
        this.state.radioObj = [newans];
      } else {
        for (let z = 0; z < this.state.radioObj.length; z++) {
          if (param == this.state.radioObj[z].questionId) {
            this.state.radioObj[z] = newans;
          }
        }
      }
    }
  };

  componentWillMount() {
    if (
      this.props.location.state === undefined ||
      this.props.location.state === ""
    ) {
      window.location.href = "/";
    } else {
      this.setState({ taskdetails: this.props.location.state.data });
      this.setState({ taskId: this.props.location.state.tskId });
      this.setState({ userId: this.props.location.state.userid });
      this.setState({ storeNo: this.props.location.state.storeNo });
      this.setState({
        ansobj: {
          taskId: this.props.location.state.tskId,
          userId: this.props.location.state.userid,
          questionId: "",
          answer: ""
        }
      });
      this.fetchQuestionPaper();
      this.browserCheck();
    }
  }

  writestate = (param, res) => {
    this.state.fileuploaded.push(param + "" + res);
  };

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
  //   handleChange(evt) {
  //     if(this.state.checked !== evt.target.checked) {
  //        this.setState({
  //          checked:evt.target.checked
  //        });
  //     }
  //  }
  handleClick() {
    // console.log('submitted option', this.state.selectedOption);
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

  handleOnChange(e) {
    // console.log('selected option', e.target.value);
    this.setState({ selectedOption: e.target.value });
  }

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
        <div>
          <a href={config.get("RofficeLoginURL")} id="rofficelogin" hidden></a>
          <div className="spin">
            <Spinner
              visible={this.state.loading}
              spinnerColor={"rgba(0, 0, 0, 0.3)"}
            />
          </div>
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
                <div class="row">
                  <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                    <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 mt-20">
                      <h3>
                        <i className="fa fa-angle-right"></i>
                        {" "}{this.props.location.state.tskName}
                      </h3>
                      <p>Description : {this.props.location.state.tskDescr}</p>
                    </div>
                    <div class="col-md-6 col-lg-6 col-sm-6 col-xs-12">
                      Start Date : {this.props.location.state.strtDate}{" "}
                    </div>
                    <div class="col-md-6 col-lg-6 col-sm-6 col-xs-12">
                      End Date : {this.props.location.state.edDate}
                    </div>
                    {this.state.file ? (
                      <div
                        class="col-md-6 col-lg-6 col-sm-6 col-xs-12"
                        style={{ marginTop: "10px" }}
                      >
                        <a onClick={this.openIns.bind(this, 1)}>
                          View Instruction
                        </a>
                        /
                        <a
                          download="instructions"
                          onClick={this.DownloadIns.bind(this, 1)}
                        >
                          Download Instruction
                        </a>
                        <a
                          download={this.state.file}
                          href={"/IMAGES/" + this.state.file}
                          id="FileDnld"
                          hidden
                        />
                      </div>
                    ) : null}
                    {this.state.file2 ? (
                      <div
                        class="col-md-6 col-lg-6 col-sm-6 col-xs-12"
                        style={{ marginTop: "10px" }}
                      >
                        <a onClick={this.openIns.bind(this, 2)}>
                          View Instruction 2
                        </a>
                        /
                        <a
                          download="instructions"
                          onClick={this.DownloadIns.bind(this, 2)}
                        >
                          Download Instruction 2
                        </a>
                        <a
                          download={this.state.file2}
                          href={"/IMAGES/" + this.state.file2}
                          id="FileDnld2"
                          hidden
                        />
                      </div>
                    ) : null}
                    {this.state.file3 ? (
                      <div
                        class="col-md-6 col-lg-6 col-sm-6 col-xs-12"
                        style={{ marginTop: "10px" }}
                      >
                        <a onClick={this.openIns.bind(this, 3)}>
                          View Instruction 3
                        </a>
                        /
                        <a
                          download="instructions"
                          onClick={this.DownloadIns.bind(this, 3)}
                        >
                          Download Instruction 3
                        </a>
                        <a
                          download={this.state.file3}
                          href={"/IMAGES/" + this.state.file3}
                          id="FileDnld3"
                          hidden
                        />
                      </div>
                    ) : null}
                    {this.state.comment !== "" ? (
                      <div
                        class="col-md-12 col-lg-12 col-sm-12 col-xs-12 mt-20"
                        style={{ "font-weight": "bold" }}
                      >
                        Comment :
                        <span style={{ color: "red" }}>
                          {" "}
                          {this.state.comment}
                        </span>
                      </div>
                    ) : null}

                    <div class="clearfix"></div>

                    <hr />

                    {(this.state.loading = false)}
                    <ul class="ques">
                      {this.state.data
                        ? this.state.data.map(function (item, key) {
                          //  var abc=""

                          //console.log(item.questiontype)
                          switch (item.questiontype) {
                            case "1":
                              // that.state.quesid.push(item.questionId);
                              return (
                                <li key={key}>
                                  <div class="custom-selection ml-0 pl-0">
                                    <p style={{ fontWeight: "bold" }}>
                                      {item.questionText}
                                      <that.Astrik
                                        isMandatory={item.isMandatory}
                                      />
                                    </p>
                                    {item.options.map((optele, index) => (
                                      <span class="nameloc">
                                        <input
                                          type="radio"
                                          class="custom-control-input"
                                          id={item.questionId + index}
                                          name={item.questionId}
                                          value={optele}
                                          {...that.state.arrid1.push(
                                            item.questionId + index
                                          )}
                                          {...(item.answer === optele
                                            ? (that.state.checked = true)
                                            : (that.state.checked = false))}
                                          defaultChecked={that.state.checked}
                                          {...(that.state.status === "Save"
                                            ? (that.state.disabled =
                                              "disabled")
                                            : (that.state.disabled = ""))}
                                          disabled={that.state.disabled}
                                          onChange={that.handleChangeRadioNew.bind(
                                            that,
                                            item.questionId
                                          )}
                                        />
                                        <label
                                          style={{ fontWeight: "normal" }}
                                          for={item.questionId + index}
                                        >
                                          {optele}
                                        </label>
                                      </span>
                                    ))}
                                  </div>
                                </li>
                              );
                              break;
                            case "2":
                              // that.state.quesid.push(item.questionId);
                              //that.state.arrchk.push("qtype3" + item.questionId)
                              return (
                                <li key={key}>
                                  <div class="custom-selection ml-0 pl-0">
                                    <p style={{ fontWeight: "bold" }}>
                                      {item.questionText}
                                      <that.Astrik
                                        isMandatory={item.isMandatory}
                                      />
                                    </p>
                                    {item.options.map((optele, index) => (
                                      <span class="nameloc">
                                        <input
                                          type="checkbox"
                                          class="custom-control-input"
                                          id={item.questionId + index}
                                          name={item.questionId + index}
                                          value={optele}
                                          {...that.state.arrid2.push(
                                            item.questionId + index
                                          )}
                                          {...(item.answer === undefined
                                            ? (that.state.checked = false)
                                            : {
                                              ...(item.answer.includes(
                                                optele
                                              )
                                                ? (that.state.checked = true)
                                                : (that.state.checked = false))
                                            })}
                                          defaultChecked={that.state.checked}
                                          {...(that.state.status === "Save"
                                            ? (that.state.disabled =
                                              "disabled")
                                            : (that.state.disabled = ""))}
                                          disabled={that.state.disabled}
                                          onChange={that.handleChangeCheck.bind(
                                            that,
                                            item.questionId
                                          )}
                                        />
                                        <label
                                          style={{ fontWeight: "normal" }}
                                          for={item.questionId + index}
                                        >
                                          {optele}
                                        </label>
                                      </span>
                                    ))}
                                  </div>
                                </li>
                              );
                              break;
                            case "3":
                              //  that.state.quesid.push(item.questionId);
                              that.state.arrrefs.push(
                                "qtype3" + item.questionId
                              );
                              return (
                                <li key={key}>
                                  <div class="custom-selection ml-0 pl-0">
                                    <p style={{ fontWeight: "bold" }}>
                                      {item.questionText}
                                      <that.Astrik
                                        isMandatory={item.isMandatory}
                                      />
                                    </p>
                                    <div class="col-lg-4 col-md-4 col-sm-4 col-xs-12 pl-0">
                                      <textarea
                                        type="text"
                                        class="form-control"
                                        placeholder="Some Text"
                                        value={that.state.value}
                                        defaultValue={item.answer}
                                        {...that.state.arrid3.push(
                                          "qtype3" + item.questionId
                                        )}
                                        {...(that.state.status === "Save"
                                          ? (that.state.disabled = "disabled")
                                          : (that.state.disabled = ""))}
                                        disabled={that.state.disabled}
                                        ref={"qtype3" + item.questionId}
                                        id={"qtype3" + item.questionId}
                                      />
                                    </div>
                                    <div class="clearfix"></div>
                                  </div>
                                </li>
                              );
                              break;
                            case "4":
                              //  that.state.quesid.push(item.questionId);
                              that.state.arrrefs.push(
                                "qtype3" + item.questionId
                              );
                              that.state.numeleid.push(
                                "qtype3" + item.questionId
                              );
                              that.state.numminval.push(item.minValue);
                              if (that.state.value1 === "") {
                                if (!that.state.numchange) {
                                  //that.state.value1 = item.answer
                                }
                              }
                              return (
                                //onload = {that.setfortext.bind(that,item.questionId)}
                                <li key={key}>
                                  <div class="custom-selection ml-0 pl-0">
                                    <p style={{ fontWeight: "bold" }}>
                                      {item.questionText}

                                      <that.Astrik
                                        isMandatory={item.isMandatory}
                                      />
                                    </p>
                                    <div class="col-lg-4 col-md-4 col-sm-4 col-xs-12 pl-0">
                                      <input
                                        type="tel"
                                        class="form-control"
                                        placeholder="Number Only"
                                        //value={that.state.value1}
                                        defaultValue={item.answer}
                                        {...that.state.arrid4.push(
                                          "qtype3" + item.questionId
                                        )}
                                        {...(that.state.status === "Save"
                                          ? (that.state.disabled = "disabled")
                                          : (that.state.disabled = ""))}
                                        disabled={that.state.disabled}
                                        pattern="^-?[0-9]\d*\.?\d*$"
                                        onInput={that.handleChangeNum.bind(
                                          that,
                                          "qtype3" + item.questionId,
                                          item.maxValue
                                        )}
                                        ref={"qtype3" + item.questionId}
                                        id={"qtype3" + item.questionId}
                                      />
                                    </div>
                                    <div class="clearfix"></div>
                                  </div>
                                </li>
                              );
                              break;
                            case "5":
                              // that.state.quesid.push(item.questionId);
                              that.state.arrrefs.push(
                                "qtype3" + item.questionId
                              );
                              that.state.quesidmail.push(
                                "qtype3" + item.questionId
                              );
                              return (
                                //onload = {that.setfortext.bind(that,item.questionId)}
                                <li key={key}>
                                  <div class="custom-selection ml-0 pl-0">
                                    <p style={{ fontWeight: "bold" }}>
                                      {item.questionText}
                                      <that.Astrik
                                        isMandatory={item.isMandatory}
                                      />
                                    </p>
                                    <div class="col-lg-4 col-md-4 col-sm-4 col-xs-12 pl-0">
                                      <input
                                        type="email"
                                        class="form-control"
                                        placeholder="Email-ID"
                                        value={that.state.value}
                                        defaultValue={item.answer}
                                        ref={"qtype3" + item.questionId}
                                        id={"qtype3" + item.questionId}
                                        {...that.state.arrid5.push(
                                          "qtype3" + item.questionId
                                        )}
                                        {...(that.state.status === "Save"
                                          ? (that.state.disabled = "disabled")
                                          : (that.state.disabled = ""))}
                                        disabled={that.state.disabled}
                                      />
                                    </div>
                                    <div class="clearfix"></div>
                                  </div>
                                </li>
                              );
                              break;
                            case "6":
                              //  that.state.quesid.push(item.questionId);

                              return (
                                <li key={key}>
                                  <div class="custom-selection ml-0 pl-0">
                                    <p style={{ fontWeight: "bold" }}>
                                      {item.questionText}

                                      <that.Astrik
                                        isMandatory={item.isMandatory}
                                      />
                                    </p>
                                    <span class="mlr-10">
                                      <input
                                        type="radio"
                                        class="custom-control-input"
                                        id={item.questionId + 1}
                                        name={item.questionId}
                                        value="Yes"
                                        {...that.state.arrid6.push(
                                          item.questionId + 1
                                        )}
                                        {...(item.answer === "Yes"
                                          ? (that.state.checked = true)
                                          : (that.state.checked = false))}
                                        defaultChecked={that.state.checked}
                                        {...(that.state.status === "Save"
                                          ? (that.state.disabled = "disabled")
                                          : (that.state.disabled = ""))}
                                        disabled={that.state.disabled}
                                        onChange={that.handleChangeRadioNew.bind(
                                          that,
                                          item.questionId
                                        )}
                                      />
                                      <label
                                        style={{ fontWeight: "normal" }}
                                        for={item.questionId + 1}
                                      >
                                        Yes
                                        </label>
                                    </span>
                                    <span>
                                      <input
                                        type="radio"
                                        class="custom-control-input"
                                        id={item.questionId + 2}
                                        name={item.questionId}
                                        value="No"
                                        {...that.state.arrid6.push(
                                          item.questionId + 2
                                        )}
                                        {...(item.answer === "No"
                                          ? (that.state.checked = true)
                                          : (that.state.checked = false))}
                                        defaultChecked={that.state.checked}
                                        {...(that.state.status === "Save"
                                          ? (that.state.disabled = "disabled")
                                          : (that.state.disabled = ""))}
                                        disabled={that.state.disabled}
                                        onChange={that.handleChangeRadioNew.bind(
                                          that,
                                          item.questionId
                                        )}
                                      />
                                      <label
                                        style={{ fontWeight: "normal" }}
                                        for={item.questionId + 2}
                                      >
                                        No
                                        </label>
                                    </span>{" "}
                                  </div>
                                </li>
                              );
                              break;
                            case "7":
                              //  that.state.quesid.push(item.questionId);
                              return (
                                <li key={key}>
                                  <div class="custom-selection ml-0 pl-0">
                                    <p style={{ fontWeight: "bold" }}>
                                      {item.questionText}

                                      <that.Astrik
                                        isMandatory={item.isMandatory}
                                      />
                                    </p>
                                    <span>
                                      <input
                                        type="radio"
                                        class="custom-control-input"
                                        id={item.questionId + 1}
                                        name={item.questionId}
                                        value="Yes"
                                        {...that.state.arrid7.push(
                                          item.questionId + 1
                                        )}
                                        {...(item.answer === "Yes"
                                          ? (that.state.checked = true)
                                          : (that.state.checked = false))}
                                        defaultChecked={that.state.checked}
                                        {...(that.state.status === "Save"
                                          ? (that.state.disabled = "disabled")
                                          : (that.state.disabled = ""))}
                                        disabled={that.state.disabled}
                                        onChange={that.handleChangeRadioNew.bind(
                                          that,
                                          item.questionId
                                        )}
                                      />
                                      <label
                                        style={{ fontWeight: "normal" }}
                                        for={item.questionId + 1}
                                      >
                                        Yes
                                        </label>
                                    </span>{" "}
                                    <span>
                                      <input
                                        type="radio"
                                        class="custom-control-input"
                                        id={item.questionId + 2}
                                        name={item.questionId}
                                        value="No"
                                        {...that.state.arrid7.push(
                                          item.questionId + 2
                                        )}
                                        {...(item.answer === "No"
                                          ? (that.state.checked = true)
                                          : (that.state.checked = false))}
                                        defaultChecked={that.state.checked}
                                        {...(that.state.status === "Save"
                                          ? (that.state.disabled = "disabled")
                                          : (that.state.disabled = ""))}
                                        disabled={that.state.disabled}
                                        onChange={that.handleChangeRadioNew.bind(
                                          that,
                                          item.questionId
                                        )}
                                      />
                                      <label
                                        style={{ fontWeight: "normal" }}
                                        for={item.questionId + 2}
                                      >
                                        No
                                        </label>
                                    </span>{" "}
                                    <span>
                                      <input
                                        type="radio"
                                        class="custom-control-input"
                                        id={item.questionId + 3}
                                        name={item.questionId}
                                        value="NA"
                                        {...that.state.arrid7.push(
                                          item.questionId + 3
                                        )}
                                        {...(item.answer === "NA"
                                          ? (that.state.checked = true)
                                          : (that.state.checked = false))}
                                        defaultChecked={that.state.checked}
                                        {...(that.state.status === "Save"
                                          ? (that.state.disabled = "disabled")
                                          : (that.state.disabled = ""))}
                                        disabled={that.state.disabled}
                                        onChange={that.handleChangeRadioNew.bind(
                                          that,
                                          item.questionId
                                        )}
                                      />
                                      <label
                                        style={{ fontWeight: "normal" }}
                                        for={item.questionId + 3}
                                      >
                                        NA
                                        </label>
                                    </span>{" "}
                                  </div>
                                </li>
                              );
                              break;
                            case "8":
                              //  that.state.quesid.push(item.questionId);
                              var valup = "Upload File";
                              var bool = false;
                              if (
                                that.state.fileval.includes(
                                  item.questionId,
                                  0
                                )
                              ) {
                                var elelen = that.state.fileval.length;
                                valup = that.state.fileval.substring(
                                  item.questionId.length,
                                  elelen
                                );
                                bool = true;
                              }

                              return (
                                <li key={key}>
                                  <div class="custom-selection ml-0 pl-0">
                                    <p style={{ fontWeight: "bold" }}>
                                      {item.questionText}
                                      <that.Astrik
                                        isMandatory={item.isMandatory}
                                      />
                                    </p>
                                    <div class="clearfix">
                                      <div class="col-lg-4 col-md-4 col-sm-4 col-xs-12 pl-0">
                                        <input
                                          id={"proof" + item.questionId}
                                          type="text"
                                          class="form-control input-upload"
                                          // value="Upload file"
                                          {...(bool === true
                                            ? (valup = valup)
                                            : {
                                              ...(item.imageArray.length > 0
                                                ? (valup =
                                                  "one file uploaded")
                                                : (valup = "upload file"))
                                            })}
                                          value={valup}
                                          {...that.state.arrid8.push(
                                            "proof" + item.questionId
                                          )}
                                          {...(that.state.status === "Save"
                                            ? (that.state.disabled =
                                              "disabled")
                                            : (that.state.disabled = ""))}
                                          disabled={that.state.disabled}
                                          accept=".gif,.jpg,.jpeg,.png,.doc,.docx,.pptx,.ppt,.xlsx,.xls,.txt,.pdf"
                                        />
                                        <span
                                          class="btn-upload"
                                          style={{ padding: "7px 15px" }}
                                          {...(that.state.status === "Save"
                                            ? (that.state.disabled =
                                              "disabled")
                                            : (that.state.disabled = ""))}
                                          disabled={that.state.disabled}
                                        >
                                          Upload
                                          </span>
                                        <input
                                          id={item.questionId}
                                          type="file"
                                          name="proof-data"
                                          class="input-hidden"
                                          {...(that.state.status === "Save"
                                            ? (that.state.disabled =
                                              "disabled")
                                            : (that.state.disabled = ""))}
                                          disabled={that.state.disabled}
                                          {...that.state.arrid8.push(
                                            item.questionId
                                          )}
                                          onChange={that.handleFileSelect.bind(
                                            that,
                                            item.questionId
                                          )}
                                          accept=".gif,.jpg,.jpeg,.png,.doc,.docx,.pptx,.ppt,.xlsx,.xls,.txt,.pdf"
                                          multiple="multiple"
                                        />

                                        <div class="clearfix"></div>

                                        <div class="col-lg-4 col-md-4 col-sm-4 col-xs-4 pl-0">
                                          <a
                                            onClick={that.openPrf.bind(
                                              that,
                                              item.questionId
                                            )}
                                          >
                                            View file
                                            </a>
                                        </div>
                                        <div class="clearfix"></div>
                                      </div>
                                    </div>
                                    <div class="clearfix"></div>
                                  </div>
                                </li>
                              );
                              break;
                            case "9":
                              // that.state.quesid.push(item.questionId);
                              that.state.quesidcs9.push(item.questionId);
                              var ansarr = "";
                              if (
                                item.answer === undefined ||
                                item.answer === null ||
                                item.answer === ""
                              ) {
                              } else if (
                                item.answer != null ||
                                item.answer != "" ||
                                item.answer != undefined
                              ) {
                                ansarr = item.answer.split(",");
                              }
                              //that.state.arrrefscs9.push("qtype3" + item.questionId)

                              return (
                                <li key={key}>
                                  <div class="custom-selection ml-0 pl-0">
                                    <p style={{ fontWeight: "bold" }}>
                                      {item.questionText}
                                      <that.Astrik
                                        isMandatory={item.isMandatory}
                                      />
                                    </p>
                                    {item.options.map((optele, index) => (
                                      <span class="ml-0 pl-0">
                                        <p for={item.questionId + index}>
                                          <b>{optele}</b>
                                        </p>

                                        <input
                                          type="text"
                                          class="form-control"
                                          value={that.state.value}
                                          onKeyPress={that.fullstop}
                                          {...(ansarr.length > 0
                                            ? (that.state.defval =
                                              ansarr[index])
                                            : (that.state.defval = ""))}
                                          defaultValue={that.state.defval}
                                          {...(that.state.status === "Save"
                                            ? (that.state.disabled =
                                              "disabled")
                                            : (that.state.disabled = ""))}
                                          disabled={that.state.disabled}
                                          ref={index + item.questionId}
                                          id={index + item.questionId}
                                          {...that.state.arrid9.push(
                                            index + item.questionId
                                          )}
                                          {...that.state.arrrefscs9.push(
                                            index + item.questionId
                                          )}
                                        />

                                        <div class="clearfix"></div>
                                      </span>
                                    ))}
                                  </div>
                                </li>
                              );
                              break;

                            case "10":
                              //that.state.quesid.push(item.questionId);
                              that.state.arrrefs.push(
                                "qtype3" + item.questionId
                              );
                              return (
                                <li key={key}>
                                  <div class="custom-selection ml-0 pl-0">
                                    <p style={{ fontWeight: "bold" }}>
                                      {item.questionText}
                                      <that.Astrik
                                        isMandatory={item.isMandatory}
                                      />
                                    </p>
                                    <div class="col-lg-4 col-md-4 col-sm-4 col-xs-12 pl-0">
                                      <input
                                        type="date"
                                        className="form-control form-control-inline input-medium default-date-picker"
                                        size="16"
                                        dateFormat="dd-MMM-yyyy"
                                        data-date-inline-picker="true" //selected={that.state.startDate}
                                        // onChange={that.handleChangeStart.bind(that,item.questionId)} onChangeRaw={that.handleDateChangeRaw.bind(that)}

                                        value={that.state.value}
                                        defaultValue={item.answer}
                                        {...that.state.arrid10.push(
                                          "qtype3" + item.questionId
                                        )}
                                        {...(that.state.status === "Save"
                                          ? (that.state.disabled = "disabled")
                                          : (that.state.disabled = ""))}
                                        disabled={that.state.disabled}
                                        ref={"qtype3" + item.questionId}
                                        id={"qtype3" + item.questionId}
                                      />
                                    </div>
                                    <div class="clearfix"></div>
                                  </div>
                                </li>
                              );

                              break;
                            case "11":
                              that.state.quesid.push(item.questionId);
                              var valup = "Upload File";
                              var bool = false;
                              if (
                                that.state.fileval.includes(
                                  item.questionId,
                                  0
                                )
                              ) {
                                var elelen = that.state.fileval.length;
                                valup = that.state.fileval.substring(
                                  item.questionId.length,
                                  elelen
                                );
                                bool = true;
                              }

                              return (
                                <li key={key}>
                                  <div class="custom-selection ml-0 pl-0">
                                    <p style={{ fontWeight: "bold" }}>
                                      {item.questionText}
                                      <that.Astrik
                                        isMandatory={item.isMandatory}
                                      />
                                    </p>
                                    <div class="clearfix">
                                      {that.state.browser === true ? (
                                        <div class="col-lg-4 col-md-4 col-sm-4 col-xs-12 pl-0">
                                          <input
                                            id={"proof" + item.questionId}
                                            type="text"
                                            class="form-control input-upload"
                                            // value="Upload file"
                                            {...(bool === true
                                              ? (valup = valup)
                                              : {
                                                ...(item.imageArray.length >
                                                  0
                                                  ? (valup =
                                                    "one image uploaded")
                                                  : (valup =
                                                    "upload live image"))
                                              })}
                                            value={valup}
                                            {...that.state.arrid8.push(
                                              "proof" + item.questionId
                                            )}
                                            {...(that.state.status === "Save"
                                              ? (that.state.disabled =
                                                "disabled")
                                              : (that.state.disabled = ""))}
                                            disabled={that.state.disabled}
                                            accept="image/*"
                                          />

                                          <span
                                            class="btn-upload"
                                            style={{ padding: "7px 15px" }}
                                            {...(that.state.status === "Save"
                                              ? (that.state.disabled =
                                                "disabled")
                                              : (that.state.disabled = ""))}
                                            disabled={that.state.disabled}
                                          >
                                            Upload
                                            </span>
                                          <input
                                            id={item.questionId}
                                            type="file"
                                            name="proof-data"
                                            class="input-hidden"
                                            {...(that.state.status === "Save"
                                              ? (that.state.disabled =
                                                "disabled")
                                              : (that.state.disabled = ""))}
                                            disabled={that.state.disabled}
                                            {...that.state.arrid8.push(
                                              item.questionId
                                            )}
                                            onChange={that.handleFileSelect.bind(
                                              that,
                                              item.questionId
                                            )}
                                            capture="camera"
                                            accept="image/*"
                                            multiple="multiple"
                                          />

                                          <div class="clearfix"></div>

                                          <div class="col-lg-4 col-md-4 col-sm-4 col-xs-4 pl-0">
                                            <a
                                              onClick={that.openPrf.bind(
                                                that,
                                                item.questionId
                                              )}
                                            >
                                              View file
                                              </a>
                                          </div>

                                          <div class="clearfix"></div>
                                        </div>
                                      ) : (
                                          <h5>Use Mobile Browser to Upload</h5>
                                        )}
                                    </div>
                                    <div class="clearfix"></div>
                                  </div>
                                </li>
                              );
                              break;

                            default:
                              confirmAlert({
                                //title: 'Alert!!',
                                message: "Error Displaying Preview.",
                                buttons: [
                                  {
                                    label: "OK"
                                    //onClick: () => alert('Click Yes')
                                  }
                                ]
                              });

                              // alert("Error Displaying Preview.");
                              break;
                          }
                        })
                        : null}
                    </ul>
                    {this.props.location.state.answerStatus !== "Scheduled" && this.props.location.state.taskType === "Training" && this.props.location.state.role_id === "511" ?
                      <div class="text-center mt">
                        <button
                          className="btn btn-primary min-wid-90"
                          {...(that.state.status === "Save"
                            ? (that.state.disabled = "disabled")
                            : (that.state.disabled = ""))}
                          disabled={that.state.disabled}
                          onClick={that.draftquestion.bind(that)}
                        >
                          Draft
                      </button>
                        <button
                          className="btn btn-primary min-wid-90 ml-10"
                          {...(that.state.status === "Save"
                            ? (that.state.disabled = "disabled")
                            : (that.state.disabled = ""))}
                          disabled={that.state.disabled}
                          onClick={that.savequestion.bind(that)}
                          id="savebtn"
                        >
                          Submit
                      </button>
                      </div>
                      : null}
                    <div class="clearfix"></div>
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

  PrevioustasksBind = () => {
    this.props.history.push({
      pathname: "/Previoustasks",
      state: {
        userid: this.props.location.state.userid,
        data: this.state.taskdetails,
        usrnm: this.props.location.state.usrnm,
        storeNo: this.props.location.state.storeNo,
        format_id: this.props.location.state.format_id,
        guId: this.props.location.state.guId,
        menuList: this.props.location.state.menuList,
        roleName: this.props.location.state.roleName,
      }
    });
  };

  fullstop = e => {
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

  TaskactiveBind = () => {
    this.props.history.push({
      pathname: "/Taskactive",
      state: {
        userid: this.props.location.state.userid,
        usrnm: this.props.location.state.usrnm,
        role_id: this.props.location.state.role_id,
        format_id: this.props.location.state.format_id,
        data: this.props.location.state.data,
        storeNo: this.props.location.state.storeNo,
        guId: this.props.location.state.guId,
        menuList: this.props.location.state.menuList,
        roleName: this.props.location.state.roleName,
      }
    });
  };

  fetchQuestionPaper = () => {
    if (
      this.props.location.state !== undefined &&
      this.props.location.state.usrnm !== ""
    ) {
      this.setState({ loading: true });
      this.setState({ guId: this.props.location.state.guId });
      // this.state.radioObj=[]
      // console.log('tskId', this.props.location.state.tskId);
      // console.log('userId', this.props.location.state.userid);
      // console.log('radioObj ', this.state.radioObj);

      var Request = {
        taskId: this.props.location.state.tskId,
        storeNo: this.props.location.state.storeNo,
        userFormatId: this.props.location.state.role_id,
        guId: this.props.location.state.guId
      };
      var EncryptedRequest = Encrypt(Request);
      console.log(EncryptedRequest);

      fetch("/GetUserTaskDetail", {
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
          for (let i = 0; i < DecryptedResponse.listQuestions.length; i++) {
            if (DecryptedResponse.listQuestions[i].isMandatory === "1") {
              this.state.mandid.push(
                DecryptedResponse.listQuestions[i].questionId
              );
              // console.log(`response of QIDk `, this.state.mandid);
            }
          }
          if (DecryptedResponse.errorCode === "00") {
            console.log(`response of fetchQuestionPaper `, DecryptedResponse);
            this.setState({ data: DecryptedResponse.listQuestions });
            this.setState({ status: DecryptedResponse.status });
            this.setState({ file: DecryptedResponse.task.taskFile });
            this.setState({ file2: DecryptedResponse.task.taskFile2 });
            this.setState({ file3: DecryptedResponse.task.taskFile3 });
            this.setState({ instReadFlag: DecryptedResponse.task.instReadFlag });
            this.setState({ instReadFlag2: DecryptedResponse.task.instReadFlag2 });
            this.setState({ instReadFlag3: DecryptedResponse.task.instReadFlag3 });
            this.setState({ comment: DecryptedResponse.task.comment });
            this.state.radioObj = [];

            var newans = "";
            var isimgq = "false";
            if (DecryptedResponse.listQuestions.length > 0) {
              for (
                let index = 0;
                index < DecryptedResponse.listQuestions.length;
                index++
              ) {
                // console.log(`DecryptedResponse.listQuestions`,DecryptedResponse.listQuestions)
                var one = DecryptedResponse.listQuestions[index];
                this.state.quesid.push(one.questionId);
                if (one.questiontype === "8" || one.questiontype === "11") {
                  if (one.imageArray === "") {
                    this.state.fileuploaded = [];
                    this.setState({ fileval: "Upload file" });
                  } else {
                    this.state.fileuploaded.push(
                      one.questionId + one.imageArray
                    );
                    this.setState({ fileval: "One file attached" });
                    isimgq = "true";
                  }

                  if (isimgq === "false") {
                    this.state.fileuploaded = [];
                    this.setState({ fileval: "Upload file" });
                  }
                  if (one.imageArray === "") {
                    this.setState({ fileval: "Upload file" });
                  } else {
                    if (
                      one.imageArray === "" ||
                      one.imageArray === null ||
                      one.imageArray === undefined
                    ) {
                      newans = {
                        taskId: this.props.location.state.tskId,
                        userId: this.props.location.state.userid,
                        questionId: one.questionId,
                        imageArray: ""
                      };
                    } else {
                      newans = {
                        taskId: this.props.location.state.tskId,
                        userId: this.props.location.state.userid,
                        questionId: one.questionId,
                        imageArray: one.imageArray
                      };
                    }
                    this.state.radioObj.push(newans);
                    console.log(`ans1`, this.state.radioObj);
                  }
                } else {
                  if (
                    one.answer === "" ||
                    one.answer === null ||
                    one.answer === undefined
                  ) {
                    newans = {
                      taskId: this.props.location.state.tskId,
                      userId: this.props.location.state.userid,
                      questionId: one.questionId,
                      answer: ""
                    };
                  } else {
                    newans = {
                      taskId: this.props.location.state.tskId,
                      userId: this.props.location.state.userid,
                      questionId: one.questionId,
                      answer: one.answer
                    };
                  }
                  this.state.radioObj.push(newans);
                  console.log(`ans1`, this.state.radioObj);
                }
              }
            } else {
            }
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
            this.setState({ loading: false });
          }
        })
        .catch(error => {
          this.setState({ visiblity: false });
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
  };

  savequestion = e => {
    console.log(`print`, this.state.radioObj);
    var validmail = "";
    var validmin = true;
    const uquesidmail = Array.from(new Set(this.state.quesidmail));

    const uniqueNames = Array.from(new Set(this.state.arrrefs));
    const uniqueChk = Array.from(new Set(this.state.arrchk));
    // console.log(`uniqueName : `, uniqueNames);
    // console.log(`uniqueChk : `, uniqueChk);
    var newans = "";
    var ans = "";
    var ansc = "";

    if (uniqueNames.length > 0) {
      for (let index = 0; index < uniqueNames.length; index++) {
        var element = uniqueNames[index];
        ans = document.getElementById(element).value;
        newans = {
          taskId: this.props.location.state.tskId,
          userId: this.props.location.state.userid,
          questionId: element.replace("qtype3", ""),
          answer: ans
        };
        this.state.radioObj.push(newans);
        // console.log("quesid : " + element.replace("qtype3", ""));
        // console.log("ans : " + ans);
      }
    }

    const uquesidcs9 = Array.from(new Set(this.state.quesidcs9));
    const uarrrefscs9 = Array.from(new Set(this.state.arrrefscs9));

    if (uquesidcs9.length > 0) {
      for (let j = 0; j < uquesidcs9.length; j++) {
        var elementq = uquesidcs9[j];
        if (uarrrefscs9.length > 0) {
          for (let index1 = 0; index1 < uarrrefscs9.length; index1++) {
            var element1 = uarrrefscs9[index1];

            if (element1.includes(elementq)) {
              ansc = ansc + document.getElementById(element1).value + ",";

              /* if (index1 == 0 || ansc === "") {
                console.log("Inside if ");
                ansc = document.getElementById(element1).value;
              } else {
                console.log("Inside else ", index1);
                ansc = ansc + "," + document.getElementById(element1).value;
              } */
            }
          }
          console.log("ans", ansc);
          if (ansc.replace(/,/g, "").length > 0) {
            newans = {
              taskId: this.props.location.state.tskId,
              userId: this.props.location.state.userid,
              questionId: elementq,
              answer: ansc.substr(0, ansc.length - 1)
            };
            this.state.radioObj.push(newans);
          } else {
            newans = {
              taskId: this.props.location.state.tskId,
              userId: this.props.location.state.userid,
              questionId: elementq,
              answer: ""
            };
            this.state.radioObj.push(newans);
          }
          ansc = "";
        }

        // this.state.radioObj.push(newans);
        // console.log("quesid : " + elementq);
        // console.log("ans9 : " + ans);
        // console.log("ansobj9 : " + newans);
      }
    }
    var objwithans = [];
    var myflag = true;
    if (this.state.radioObj.length > 0) {
      var mythis = this;
      {
        this.state.radioObj.map(function (item, key) {
          if (
            item.answer === "" ||
            (item.imageArray != undefined && item.imageArray.length === 0)
          ) {
            for (let index = 0; index < mythis.state.mandid.length; index++) {
              const element = mythis.state.mandid[index];
              if (item.questionId === element) {
                myflag = false;
              }
            }
          } else {
            myflag = true;
            if (objwithans.length > 0) {
              {
                // objwithans.map(function (item1, key) {
                let k = 0;
                for (let r = 0; r < objwithans.length; r++) {
                  if (objwithans[r].questionId != item.questionId) {
                    k = k + 1;
                  }
                  else {
                    k = 0
                  }
                }
                // if (item1.questionId=== item.questionId) {
                // return;
                // } else {
                if (k > 0) {
                  objwithans.push(item);
                }
                else {
                  console.log(`karan`)
                }

                // })
              }
            } else {
              objwithans.push(item);
            }
          }
        });
      }
    }

    // console.log(`objwithans : `, Array.from(new Set(objwithans)));

    let _ = require("underscore");
    var cleaned = [];
    objwithans.forEach(function (itm) {
      var unique = true;
      cleaned.forEach(function (itm2) {
        if (_.isEqual(itm, itm2)) unique = false;
      });
      if (unique) cleaned.push(itm);
    });

    if (
      this.state.fileval === "One file attached" ||
      this.state.fileval === "File Upload successful"
    ) {
      this.state.nooffileques = this.state.nooffileques + 1;
    }

    var unmandid = [];
    this.state.mandid.forEach(function (itm) {
      var unique = true;
      unmandid.forEach(function (itm2) {
        if (_.isEqual(itm, itm2)) unique = false;
      });
      if (unique) unmandid.push(itm);
    });

    var abc = 0;
    var flag1 = true;

    for (let i = 0; i < unmandid.length; i++) {
      for (let k = 0; k < cleaned.length; k++) {
        if (unmandid[i] === cleaned[k].questionId) {
          abc = abc + 1;
        }
      }
    }

    var clradioobj = [];
    this.state.radioObj.forEach(function (itm) {
      var unique = true;
      clradioobj.forEach(function (itm2) {
        if (_.isEqual(itm, itm2)) unique = false;
      });
      if (unique) clradioobj.push(itm);
    });

    for (let index = 0; index < clradioobj.length; index++) {
      const element1 = clradioobj[index];
      var qid = element1.questionId;
      var an;
      for (let index1 = 0; index1 < clradioobj.length; index1++) {
        const element2 = clradioobj[index1];
        if (element2.questionId === qid) {
          an = element2.answer;
        }
      }
      clradioobj[index].answer = an;
    }

    this.state.radioObj = clradioobj;
    //
    var fclrradioobj = [];
    for (let l = 0; l < clradioobj.length; l++) {
      let boxarray = clradioobj[l];
      if (
        boxarray.answer === "" ||
        (boxarray.imageArray != undefined && boxarray.imageArray.length === 0)
      ) {
      } else {
        fclrradioobj.push(boxarray);
      }
    }

    var ftemp = false;
    var arrftemp = [];
    if (unmandid.length == 0) {
      ftemp = true;
    } else {
      for (let i = 0; i < unmandid.length; i++) {
        ftemp = false;
        var indivmand = unmandid[i];
        for (let x = 0; x < fclrradioobj.length; x++) {
          if (fclrradioobj[x].questionId === indivmand) {
            ftemp = true;
            break;
          }
        }
        if (ftemp === false) break;
      }
    }

    var str;

    if (this.state.file !== "" & this.state.instReadFlag === "0") {
      confirmAlert({
        message: "Please View/Download instruction 1 before submitting.",
        buttons: [
          {
            label: "OK"
            //onClick: () => alert('Click Yes')
          }
        ]
      });
    } else if (this.state.file2 !== "" & this.state.instReadFlag2 === "0") {
      confirmAlert({
        message: "Please View/Download instruction 2 before submitting.",
        buttons: [
          {
            label: "OK"
            //onClick: () => alert('Click Yes')
          }
        ]
      });
    } else if (this.state.file3 !== "" & this.state.instReadFlag3 === "0") {
      confirmAlert({
        message: "Please View/Download instruction 3 before submitting.",
        buttons: [
          {
            label: "OK"
            //onClick: () => alert('Click Yes')
          }
        ]
      });
    } else {


      if (unmandid.length <= abc && ftemp === true) {
        if (uquesidmail.length > 0) {
          for (let z = 0; z < uquesidmail.length; z++) {
            var elementk = uquesidmail[z];
            if (document.getElementById(elementk).value != "") {
              var ansk = document.getElementById(elementk).value;

              var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
              validmail = re.test(ansk);
            } else {
              validmail = true;
            }
          }
        } else {
          validmail = true;
        }



        for (let i = 0; i < this.state.numeleid.length; i++) {
          var numelementv = this.state.numeleid[i];
          var numminvalv = this.state.numminval[i];

          if (numminvalv === undefined) {
            numminvalv = 0;
          }

          if (document.getElementById(numelementv).value.length < numminvalv) {
            if (unmandid.includes(numelementv.replace("qtype3", ""))) {
              validmin = false;
              break;
            }
          }
          else {
            validmin = true;
          }

        }

        if (validmail) {
          if (validmin) {
            if (this.state.latitude !== "" && this.state.longitude !== "") {
              // console.log(" final save : ", this.state.radioObj)
              confirmAlert({
                // title: 'Are you sure you want to submit?',
                message: "Are you sure you want to submit?",
                buttons: [
                  {
                    label: "Yes",
                    onClick: () => {
                      // console.log(``, this.state.radioObj)

                      // console.log(`radioobj on save : ` + this.state.radioObj)

                      var Request2 = {
                        status: "Save",
                        storeId: this.props.location.state.storeNo,
                        userId: this.props.location.state.userid,
                        userAnswerList: this.state.radioObj,
                        userFormatId: this.props.location.state.role_id,
                        guId: this.props.location.state.guId,
                        latLong: (this.state.latitude + "," + this.state.longitude)
                      };

                      var EncryptedRequest2 = Encrypt(Request2);
                      console.log(`save`, EncryptedRequest2);
                      fetch("/InsertUserAnswer", {
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
                          if (DecryptedResponse.errorCode === "00") {
                            // console.log(`response of saveanswer `, DecryptedResponse)
                            //this.setState({ data: responseJson.listQuestions });
                            confirmAlert({
                              // title: 'Alert!!',
                              message: "Answers has been submitted successfully.",
                              buttons: [
                                {
                                  label: "OK"
                                  //onClick: () => alert('Click Yes')
                                }
                              ]
                            });
                            //alert("Answers has been submitted successfully.")
                            this.props.history.push({
                              pathname: "/Taskactive",
                              state: {
                                userid: this.props.location.state.userid,
                                usrnm: this.props.location.state.usrnm,
                                role_id: this.props.location.state.role_id,
                                format_id: this.props.location.state.format_id,
                                data: this.props.location.state.data,
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
                                  label: "OK"
                                  //onClick: () => alert('Click Yes')
                                }
                              ]
                            });
                            //alert("Error saving answer " + responseJson.errorMsg);
                            //  console.log(`response: Question Formats: `+ this.props.location.state.role_id)
                          }
                        })
                        .catch(error => {
                          this.setState({ visiblity: false });
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
                      cleaned = null;

                      this.state.nooffileques = 0;
                      // this.setState({ objwithans: [] });

                      return false;
                    }
                  }
                ]
              });
            } else {
              confirmAlert({
                title: "Alert !",
                message:
                  "Please Allow the page to capture your Location to Submit the answers !",
                buttons: [
                  {
                    label: "OK"
                    //onClick: () => alert('Click Yes')
                  }
                ]
              });
            }
          } else {
            confirmAlert({
              title: "Alert !",
              message:
                "Error saving answer.Please check the minimum value of the numeric answer",
              buttons: [
                {
                  label: "OK"
                  //onClick: () => alert('Click Yes')
                }
              ]
            });
          }
        } else {
          this.setState({ objwithans: [] });
          cleaned = null;
          confirmAlert({
            title: "Alert !",
            message: "Please enter a valid email id",
            buttons: [
              {
                label: "OK"
                //onClick: () => alert('Click Yes')
              }
            ]
          });
        }
      } else {
        this.state.nooffileques = 0;
        this.setState({ objwithans: [] });
        cleaned = [];
        confirmAlert({
          title: "Alert !",
          message: "Please answer all the questions",
          buttons: [
            {
              label: "OK"
            }
          ]
        });
      }
    }
  };

  draftquestion = e => {
    var validmin = true;
    console.log(`sameer.s.pa`, this.state.radioObj);
    const uniqueNames = Array.from(new Set(this.state.arrrefs));
    const uniqueChk = Array.from(new Set(this.state.arrchk));
    const uquesidmail = Array.from(new Set(this.state.quesidmail));
    var validmail = "";

    // console.log(`uniqueName : `, uniqueNames);
    // console.log(`uniqueChk : `, uniqueChk);
    var newans = "";
    var ans = "";
    var ansc = "";
    if (uniqueNames.length > 0) {
      for (let index = 0; index < uniqueNames.length; index++) {
        var element = uniqueNames[index];
        ans = document.getElementById(element).value;
        newans = {
          taskId: this.props.location.state.tskId,
          userId: this.props.location.state.userid,
          questionId: element.replace("qtype3", ""),
          answer: ans
        };
        this.state.radioObj.push(newans);
        // console.log("quesid : " + element.replace("qtype3", ""));
        // console.log("ans : " + ans);
      }
    }
    // console.log(`radioobj on save : ` + this.state.radioObj)
    const uquesidcs9 = Array.from(new Set(this.state.quesidcs9));
    const uarrrefscs9 = Array.from(new Set(this.state.arrrefscs9));
    if (uquesidcs9.length > 0) {
      for (let j = 0; j < uquesidcs9.length; j++) {
        var elementq = uquesidcs9[j];
        if (uarrrefscs9.length > 0) {
          for (let index1 = 0; index1 < uarrrefscs9.length; index1++) {
            var element1 = uarrrefscs9[index1];
            if (element1.includes(elementq)) {
              ansc = ansc + document.getElementById(element1).value + ",";
              /*  if (index1 == 0) {
                ansc = document.getElementById(element1).value;
              } else {
                ansc = ansc + "," + document.getElementById(element1).value;
              } */
            }
          }
          if (ansc.replace(/,/g, "").length > 0) {
            newans = {
              taskId: this.props.location.state.tskId,
              userId: this.props.location.state.userid,
              questionId: elementq,
              answer: ansc.substr(0, ansc.length - 1)
            };
            this.state.radioObj.push(newans);
          } else {
            newans = {
              taskId: this.props.location.state.tskId,
              userId: this.props.location.state.userid,
              questionId: elementq,
              answer: ""
            };
            this.state.radioObj.push(newans);
          }
          ansc = "";
        }

        // this.state.radioObj.push(newans);
        // console.log("quesid : " + elementq);
        // console.log("ans9 : " + ans);
        // console.log("ansobj9 : " + newans);
      }
    }
    if (uquesidmail.length > 0) {
      for (let k = 0; k < uquesidmail.length; k++) {
        var elementk = uquesidmail[k];
        var ansk = document.getElementById(elementk).value;
        if (ansk.length === 0) {
          validmail = true;
        } else {
          var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          validmail = re.test(ansk);
        }
      }
    } else {
      validmail = true;
    }

    for (let i = 0; i < this.state.numeleid.length; i++) {
      var numelementv = this.state.numeleid[i];
      var numminvalv = this.state.numminval[i];

      if (numminvalv === undefined) {
        numminvalv = 0;
      }
      if (document.getElementById(numelementv).value === "") {
        validmin = true;
      } else {
        if (document.getElementById(numelementv).value.length < numminvalv) {
          validmin = false;
        } else {
          validmin = true;
        }
      }
    }

    if (validmail) {
      if (validmin) {
        // console.log("final obj : ", this.state.radioObj)

        var Request3 = {
          status: "Draft",
          storeId: this.props.location.state.storeNo,
          userId: this.props.location.state.userid,
          userAnswerList: this.state.radioObj,
          userFormatId: this.props.location.state.role_id,
          guId: this.props.location.state.guId,
          latLong: (this.state.latitude + "," + this.state.longitude)
        };

        var EncryptedRequest3 = Encrypt(Request3);
        console.log(`draft request`, EncryptedRequest3);

        fetch("/InsertUserAnswer", {
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
              // console.log(`response of draftanswer `, DecryptedResponse)
              //this.setState({ data: responseJson.listQuestions });

              confirmAlert({
                //title: 'Alert!!',
                message: "Answers has been saved successfully in Draft.",
                buttons: [
                  {
                    label: "OK"
                    //onClick: () => alert('Click Yes')
                  }
                ]
              });

              //alert("Answers has been saved successfully in Draft.")
              this.props.history.push({
                pathname: "/Taskactive",
                state: {
                  userid: this.props.location.state.userid,
                  usrnm: this.props.location.state.usrnm,
                  role_id: this.props.location.state.role_id,
                  format_id: this.props.location.state.format_id,
                  data: this.props.location.state.data,
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
                    label: "OK"
                    //onClick: () => alert('Click Yes')
                  }
                ]
              });
              //alert("Error drafting answer " + responseJson.errorMsg);
              //  console.log(`response: Question Formats: `+ this.props.location.state.role_id)
            }
          })
          .catch(error => {
            this.setState({ visiblity: false });
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
        confirmAlert({
          title: "Alert !",
          message: "Please check the minimum value of the numeric answer",
          buttons: [
            {
              label: "OK"
              //onClick: () => alert('Click Yes')
            }
          ]
        });
      }
    } else {
      confirmAlert({
        title: "Alert !",
        message: "Please enter a valid email id",
        buttons: [
          {
            label: "OK"
            //onClick: () => alert('Click Yes')
          }
        ]
      });
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

  CompletedTaskListbind = () => {
    this.props.history.push({
      pathname: "/CompletedTaskList",
      state: {
        data: this.state.data,
        // previewData:this.state.previewData,
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

  ArchivedTasks = () => {
    this.props.history.push({
      pathname: "/ArchivedTasks",
      state: {
        data: this.state.data,
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

  templates = () => {
    this.props.history.push({
      pathname: "/Templates",
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

  StoreTasks = () => {
    this.props.history.push({
      pathname: "/StoreTasks",
      state: {
        data: this.state.data,
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
  Astrik = props => {
    const isMandatory = props.isMandatory;
    if (isMandatory == 1) {
      return <font color="red"> *</font>;
    }
    return null;
  };
}
export default AnsweringPageForTraining;
