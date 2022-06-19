/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/anchor-has-content */
/* eslint-disable no-lone-blocks */
import React, { Component } from "react";
import "jquery/dist/jquery";
import { withRouter } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import config from "react-global-configuration";
import { confirmAlert } from "react-confirm-alert"; // Import
import "./css/react-confirm-alert.css"; // Import css
import Spinner from "react-spinner-material"; //Import Spinner
import { Scrollbars } from "react-custom-scrollbars";
import readXlsxFile from "read-excel-file";
import ReactExport from "react-data-export";
import "./css/style.css";
import "./css/style-responsive.css";
import { Encrypt, decryptData } from "./Encryption-Decrypytion";
import IdleTimer from "react-idle-timer"; // For Idle
import App from "./App"; // For Idel
import Redirect from "react-router-dom/Redirect";
import disableBrowserBackButton from "disable-browser-back-navigation";
import { basicAuth } from "./BasicAuth";
import addDays from "date-fns/addDays";

const display = {
    display: "block"
};
const hide = {
    display: "none"
};

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;
class CumulativeReports extends Component {
    state = {
        TaskDropdwn: false,
        userid: "",
        role_id: "",
        format_id: "",
        userid: "",
        storeDetail: [],
        listQueAnsDetails: [],
        headers: [],
        sumheaders: [],
        answerList: [],
        taskSummaryList: [],
        taskName: '',
        taskDescr: '',
        hasError: false,   //Added by chandrani for custom error page
        stateName: '',
        sum1: [],
        statepercentage: '',
        pendingStores: '',
        isPendingVisible: false,
        storeList: [],
        templetId: "",
        imageArray: [],
        question: [],
        imgtaskid: "",
        searchQuestn: "",
        searchName: "",
        // repState:false,
    };
    constructor(props) {
        super(props);
        this.state = {
            displayMenu: false,
            usrnm: "",
            data: [],
            fromdata: [],
            titlename: [],
            taskId: "",
            Search: "",
            searchSDate: "",
            searchedDate: "",
            searchQuestn: "",
            loading: false,
            toggle: false,
            taskName: "",
            taskDescr: "",
            hasError: false, //Added by chandrani for custom error page
            stateName: "",
            sum1: [],
            statepercentage: "",
            isPendingVisible: false,
            pendingStores: "",
            hammenu: true,
            appear: false,
            immodal: false,
            enimg: false,
            eddate: "",
            UpdatesDate: "",
            startdateupdateticker: "",
            startDateForReport: "",
            endDateForReport: "",
            storeList: [],
            templetId: "",
            imageArray: [],
            key: "",
            question: [],
            questionId: "",
            questionText: "",
            searchName: "",
            TaskDropdwn: false,
            userid: "",
            role_id: "",
            format_id: "",
            storeDetail: [],
            listQueAnsDetails: [],
            headers: [],
            sumheaders: [],
            answerList: [],
            taskSummaryList: [],
            imgtaskid: "",

        };
        this.handleChangeStart = this.handleChangeStart.bind(this);
        this.handleChangeEnd = this.handleChangeEnd.bind(this);
        this.showDropdownMenu = this.showDropdownMenu.bind(this);
        this.hideDropdownMenu = this.hideDropdownMenu.bind(this);
        this.handletickersupdate = this.handletickersupdate.bind(this);
        this.handleReportStartDate = this.handleReportStartDate.bind(this);
        this.handleReportEndDate = this.handleReportEndDate.bind(this)
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

    componentDidMount() {
        if (window.innerWidth <= 768) {
            this.setState({ hammenu: false });
        }
        console.log("role on report page", this.props.location.state.role_id)
    }

    componentWillMount() {
        if (
            this.props.location.state === undefined ||
            this.props.location.state === ""
        ) {
            window.location.href = "/";
        } else {
            console.log("role_id", this.props.location.state.role_id);
        }
    }
    _onAction(e) { }

    _onActive(e) {
        // console.log('time remaining', this.idleTimer.getRemainingTime())
    }

    _onIdle(e) {
        localStorage.clear();
        window.location.href = "/";
        disableBrowserBackButton();
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
            searchedDate:
                date.getDate() +
                "-" +
                monthNames[date.getMonth()] +
                "-" +
                date.getFullYear(),
            endDate: date
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

    onChangequestion = e => {
        this.setState({
            searchQuestn: e.target.value
        });
    };

    logout = () => {
        if (this.props.location.state.Isroffice == true) {
            this.props.history.replace("/");
            this.props.history.block();
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

    duplicate(taskName, taskDescr, taskId, edDate) {
        this.setState(prevState => ({
            appear: !prevState.appear
        }));
        this.setState({
            taskName: taskName,
            taskDescr: taskDescr,
            templetId: taskId,
            edDate: edDate,
            UpdatesDate: edDate
        });
    }
    callImageGallery = (questionId, questionText) => {
        this.props.history.push({
            pathname: "/ImageGallery",
            state: {
                userid: this.props.location.state.userid,
                usrnm: this.props.location.state.usrnm,
                role_id: this.props.location.state.role_id,
                format_id: this.props.location.state.format_id,
                questionId: questionId,
                taskId: this.state.imgtaskid,
                questionText: questionText,
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
                role_id: this.state.role_id,
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

    boxclose = () => {
        this.setState({
            appear: false,
            FileName: "",
            storeList: []
        });
    };

    fileHandler = event => {
        this.setState({ storeList: [] });
        const input = document.getElementById("upload-storedata");
        var stores = [];
        //just pass the fileObj as parameter
        readXlsxFile(input.files[0]).then((rows, files) => {
            var storedata = [];
            for (let i = 1; i < rows.length; i++) {
                storedata.push(rows[i]);
                for (let j = 0; j < storedata.length; j++) {
                    var store = {
                        storeNo: "",
                        /*  comment: "" */
                    };
                    store.storeNo = storedata[j][0];
                    /*  store.comment = storedata[j][1]; */

                    console.log("store", store);
                }

                {
                    this.state.storeList.push(store);
                }
            }

            this.setState({
                FileName: "File Uploaded Successfully"
            });
        });

        // const element = rows[index];
        // stores.push(element[0])

        // console.log(`stores`,stores)
    };

    handletickersupdate(dates) {
        this.setState({ startdateupdateticker: dates });
        this.setState({ UpdatesDate: dates });
    }

    handleReportStartDate(dates) {
        this.setState({ startDateForReport: dates });
        this.setState({ UpdatesDateForReport: dates });
        this.setState({ endDateForReport: '' })
    }

    handleReportEndDate(dates) {
        this.setState({ endDateForReport: dates });
        this.setState({ UpdatesDateForReportEd: dates });

    }

    handleDateChangeRaw = e => {
        e.preventDefault();
    };

    modalclose = () => {
        this.setState({
            toggle: false
        });
    };

    showTaskdwnHandler = () => {
        this.setState({
            Taskdwn: !this.state.Taskdwn
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

    handleDateChangeRaws = e => {
        e.preventDefault();
    };

    handleDateChangeRawe = e => {
        e.preventDefault();
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
    //Added by chandrani for custom error page
    componentDidCatch() {
        this.setState({ hasError: true });
    }
    render = () => {
        const { searchQuestn } = this.state;

        // console.log(`rep`,this.state.fromdata)
        var that = this;
        var box = [];
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

        box.push(
            <div
                className="modal"
                role="dialog"
                style={this.state.appear ? display : hide}
            >
                <div className="modal-dialog animate">
                    <div className="modal-content">
                        <div className="modal-header">
                            <a
                                className="close"
                                style={{ color: "#fff" }}
                                onClick={this.boxclose}
                            >
                                X
                            </a>
                            <h4 className="modal-title">Bulk Reassign</h4>
                        </div>
                        <div className="modal-body">
                            <div
                                className="form-horizontal"
                                style={{ "margin-right": "10px" }}
                            >
                                <div className="form-group">
                                    {/* <h1 className="control-label col-sm-4">Task Name</h1> */}
                                    <div className="col-sm-8">
                                        <h3 style={{ "margin-top": "0px" }}>
                                            {" "}
                                            {this.state.taskName}
                                        </h3>
                                    </div>
                                    <hr />
                                    <div className="clearfix"></div>
                                    {new Date(this.state.edDate) >= new Date(date) ? (
                                        <h4 className="control-label col-sm-4">Task End Date </h4>
                                    ) : (
                                        <h4 className="control-label col-sm-4">
                                            Task Extended Date{" "}
                                        </h4>
                                    )}

                                    {new Date(this.state.edDate) > new Date(date) ? (
                                        <div className="col-sm-8">
                                            <input
                                                type="text"
                                                class="form-control"
                                                value={this.state.edDate}
                                                id="extdate"
                                                autoComplete="off"
                                                disabled
                                            />
                                            <br />
                                            <br />
                                        </div>
                                    ) : (
                                        <div className="col-sm-8">
                                            <DatePicker
                                                className="form-control"
                                                showTimeSelect
                                                timeIntervals={15}
                                                value={this.state.UpdatesDate}
                                                onChange={this.handletickersupdate}
                                                id="extdate"
                                                onChangeRaw={this.handleDateChangeRaw}
                                                minDate={new Date()}
                                                dateFormat="dd-MMM-yyyy HH:mm"
                                                selected={this.state.startdateupdateticker}
                                                autoComplete="off"
                                            // maxDate={addDays(new Date(), 365)}
                                            // minTime={setHours(setMinutes(new Date(), new Date().getMinutes()),  new Date().getHours())}
                                            // maxTime={setHours(setMinutes(new Date(), 59), 23)}
                                            />
                                            <br />
                                        </div>
                                    )}
                                    <div className="clearfix"></div>
                                    <h4 className="control-label col-sm-4">Comment</h4>
                                    <div className="col-sm-8">
                                        <textarea
                                            type="text"
                                            class="form-control"
                                            id="comment"
                                            autoComplete="off"
                                            maxLength="200"
                                        ></textarea>
                                    </div>
                                    <div className="clearfix"></div>
                                    <div className="mt-20">
                                        <h4 className="control-label col-sm-4">Upload Data</h4>
                                        <div className="col-sm-8">
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
                                                value=""
                                                accept=".xlsx,.xls"
                                            />
                                        </div>
                                        <div className="col-sm-8">
                                            <p class="text-right samp-mg">
                                                Sample File{" "}
                                                <a href={require("./doc/Bulk_Reassign.xlsx")}>
                                                    Bulk_Reassign.xlsx
                                                </a>
                                            </p>
                                        </div>
                                    </div>

                                    <h4 className="control-label col-sm-4">&nbsp;</h4>
                                    <div className="col-sm-8">
                                        <button
                                            class="btn btn-primary min-wid-90 mt-17"
                                            onClick={this.ReportTask.bind(this)}
                                        >
                                            Reassign
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
        
        const { Search } = this.state;
        const { searchSDate } = this.state;
        const { searchedDate } = this.state;
        const { searchName } = this.state;
        const ReportDataSet = [
            {
                columns: this.state.headers,
                data: this.state.answerList
            }
        ];

        const SummaryDataset = [
            {
                columns: this.state.sumheaders,
                data: this.state.taskSummaryList
            }
        ];

        if (this.state.hasError) {
            return (
                <div>
                    <h2>Error occurred!! please contact administrator</h2>
                </div>
            );
        } else {
            return (
                <div>
                    {box}
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
                                        ) : null}

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
                                <div class="mt">
                                    <h3>
                                        <i className="fa fa-angle-right"></i> Cumulative Reports
                                    </h3>
                                    <div class="row mt" style={{ "padding-left": "30px" }}>
                                        <div className="col-sm-2">
                                            <b>Start Date</b>
                                            <DatePicker
                                                className="form-control"
                                                value={this.state.UpdatesDateForReport}
                                                onChange={this.handleReportStartDate}
                                                id="streprtdate"
                                                onChangeRaw={this.handleDateChangeRaw}
                                                dateFormat="dd-MMM-yyyy"
                                                selected={this.state.startDateForReport}
                                                autoComplete="off"
                                                maxDate={new Date()}

                                            />
                                            <br />
                                        </div>

                                        <div className="col-sm-2">
                                            <b>End Date</b>
                                            <DatePicker
                                                className="form-control"
                                                value={this.state.UpdatesDateForReportEd}
                                                onChange={this.handleReportEndDate}
                                                id="edreprtdate"
                                                onChangeRaw={this.handleDateChangeRaw}
                                                minDate={this.state.UpdatesDateForReport}
                                                dateFormat="dd-MMM-yyyy"
                                                selected={this.state.endDateForReport}
                                                autoComplete="off"
                                                maxDate={new Date()}
                                            />
                                            <br />
                                        </div>
                                        <button class="btn btn-primary min-wid-90 mt-20 ml-10" type="button" onClick={this.ReportsList.bind(this)}>Get Reports</button>

                                    </div>

                                </div>
                                <hr />
                                <div class="row mt">
                                    <div class="col-md-12">
                                        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                            <div className="col-xs-12 col-sm-3 col-md-3 col-lg-3">
                                                {" "}
                                                <b>Temp ID</b>
                                                <br />
                                                <input
                                                    type="text"
                                                    placeholder="Search Temp ID"
                                                    className="form-control"
                                                    id="taskId"
                                                    onChange={this.onChange}
                                                    autoComplete="off"
                                                />
                                            </div>

                                            <div className="col-xs-12 col-sm-3 col-md-3 col-lg-3">
                                                {" "}
                                                <b>Temp Name</b>
                                                <br />
                                                <input
                                                    type="text"
                                                    placeholder="Search Temp Name"
                                                    className="form-control"
                                                    id="taskName"
                                                    onChange={this.onChange1}
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
                                        <div className="col-lg-10 col-md-10 col-sm-10 col-xs-12 tbwdth">
                                            <div className="mt">
                                                <div className="tbl-holder">
                                                    <table className="table table-striped table-advance table-hover table-bordered tbl-task tbl-hhide">
                                                        <thead>
                                                            <tr>
                                                                <th>Temp ID</th>
                                                                <th>Temp Name</th>
                                                                <th class="gnt-report">Report</th>
                                                            </tr>
                                                        </thead>
                                                    </table>
                                                    <Scrollbars style={{ height: 296 }}>
                                                        <table className="table table-striped table-advance table-hover table-bordered tbl-task ">
                                                            <tbody>
                                                                {this.state.data.map(function (item, key) {
                                                                    if (
                                                                        (Search !== "" ||
                                                                            searchName !== "") &&
                                                                        (item.taskTempId
                                                                            .toLowerCase()
                                                                            .indexOf(Search.toLowerCase()) ||
                                                                            item.taskTempName
                                                                                .toLowerCase()
                                                                                .indexOf(searchName.toLowerCase())
                                                                        ) === -1
                                                                    ) {
                                                                        return null;
                                                                    }

                                                                    return (
                                                                        <tr key={key}>
                                                                            <td data-th="Temp ID"> {item.taskTempId}</td>

                                                                            <td data-th="Temp Name">
                                                                                {item.taskTempName}
                                                                            </td>
                                                                            <td data-th="Report" class="gnt-report">
                                                                                <button
                                                                                    class="btn btn-primary min-wid-90 mt-57 ml-10"
                                                                                    type="button"
                                                                                    onClick={that.genrate.bind(
                                                                                        that,
                                                                                        item.taskTempId
                                                                                    )}
                                                                                >
                                                                                    Generate
                                                                                </button>
                                                                                <iframe
                                                                                    style={{ display: "none" }}
                                                                                    name="hiddenIframe"
                                                                                    id="hiddenIframe"
                                                                                ></iframe>

                                                                                <span className="d-none">
                                                                                    {item.taskId}
                                                                                </span>
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
                                        <div class="col-lg-3 col-md-4 col-sm-4 col-xs-12" hidden>
                                            <ExcelFile
                                                element={
                                                    <button
                                                        class="btn btn-primary min-wid-90 mt-17"
                                                        ref="download"
                                                    >
                                                        {" "}
                                                        Download
                                                    </button>
                                                }
                                            >
                                                <ExcelSheet dataSet={SummaryDataset} name="Summary" />
                                                <ExcelSheet dataSet={ReportDataSet} name="Reports" />
                                            </ExcelFile>
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

    TaskactiveBind = () => {
        this.props.history.push({
            pathname: "/Taskactive",
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
                mainuser: this.props.location.state.mainuser,
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
                mainuser: this.props.location.state.mainuser,
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

    genrate(taskId) {
        this.setState({
            loading: true
        });

        let request = {
            taskId: taskId,
            userFormatId: this.props.location.state.role_id,
            userId: this.props.location.state.userid,
            formatId: this.props.location.state.format_id
        };

        console.log(`Request for reports 1`, request);

        /*  if (this.props.location.state.role_id == "501" || this.props.location.state.role_id == "502" || this.props.location.state.role_id == "503") {
           request.userId = this.props.location.state.userid;
         } */

        console.log(`Request for reports`, Encrypt(request));

        var url = `/CumulativeReport?key=${Encrypt(request)}`;

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

                const b = new File([data], "", {
                    type:
                        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                });

                a.href = URL.createObjectURL(b);
                a.hidden = true;
                a.download = taskId;
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

    cumulativeReport = () => {
        this.props.history.push({
            pathname: "/CumulativeReport",
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
                role_id: this.props.location.state.role_id,
                format_id: this.props.location.state.format_id,
                storeNo: this.props.location.state.storeNo,
                guId: this.props.location.state.guId,
                menuList: this.props.location.state.menuList,
                roleName: this.props.location.state.roleName,
            }
        });
    };
    selectOption = e => {
        // console.log(e.target.value)
    };

    ReportsList(e) {

        if (this.props.location.state.usrnm !== "") {
            if (document.getElementById("streprtdate").value && document.getElementById("edreprtdate").value) {
                var Request = {
                    userId: this.props.location.state.userid,
                    guId: this.props.location.state.guId,
                    startDate: document.getElementById("streprtdate").value,
                    endDate: document.getElementById("edreprtdate").value
                };

                var EncryptedRequest = Encrypt(Request);
                console.log("req", EncryptedRequest);
                fetch("/CumulativeTaskList", {
                    method: "POST",
                    headers: {
                        guId: this.props.location.state.guId,
                        Authorization: "Basic " + basicAuth(this.props.location.state.userid)
                    },
                    body: EncryptedRequest
                })
                    .then(response => response.text())
                    .then(response => {
                        console.log(`response: `, response);
                        var DecryptedResponse = decryptData(response);
                        console.log(``, DecryptedResponse);
                        if (DecryptedResponse.errorCode === "00") {
                            this.setState({ loading: true });
                            this.setState({ data: DecryptedResponse.cumulativeTaskList });
                            this.setState({ usrnm: this.props.location.state.usrnm });
                            this.setState({ loading: false });
                            this.setState({ storeNo: this.props.location.state.storeNo });
                            this.setState({ userid: this.props.location.state.userid });
                        }
                        else {
                            confirmAlert({
                                title: "Alert !",
                                message: DecryptedResponse.errorMsg,
                                buttons: [
                                    {
                                        label: "Ok",
                                        // onClick: () => {
                                        //   this.logoutnormal();
                                        // }
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

                        });
                    });
            }
            else {
                confirmAlert({
                    title: "Alert !",
                    message: "Please select Start Date or End Date ",
                    buttons: [
                        {
                            label: "Ok",
                            // onClick: () => {
                            //   this.logoutnormal();
                            // }
                        }
                    ]

                });
            }
        } else {
            window.location.href = "/";
        }
    }

    ReportTask = () => {
        var that = this;
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
        var windowtime = document.getElementById("extdate").value;

        if (this.state.storeList.length == 0) {
            confirmAlert({
                title: "Alert !",
                message: "Please upload excel file",
                buttons: [
                    {
                        label: "Ok",
                        onClick: () => {
                            that.setState({ FileName: "" });
                            return false;
                        }
                    }
                ]
            });
        } else {
            this.state.storeList.map(function (item, key) {
                if (item.storeNo == undefined/*  || item.comment == undefined */) {
                    confirmAlert({
                        title: "Alert !",
                        message: "Please upload the correct excel",
                        buttons: [
                            {
                                label: "Ok",
                                onClick: () => {
                                    that.setState({ FileName: "" });
                                    return false;
                                }
                            }
                        ]
                    });
                } else if (!document.getElementById("comment").value) {
                    confirmAlert({
                        message: "Please enter comment.",
                        buttons: [
                            {
                                label: "Ok"
                            }
                        ]
                    })
                } else if (
                    new Date(document.getElementById("extdate").value) >=
                    new Date(date) &&
                    new Date(windowtime) > new Date(systemtime)
                ) {
                    confirmAlert({
                        // title: 'Confirm to submit',
                        message: "Are you sure, you want to reassign task?",
                        buttons: [
                            {
                                label: "Yes",
                                onClick: () => {
                                    var Request1 = {
                                        taskId: that.state.templetId,
                                        extendedDate: document.getElementById("extdate").value,
                                        storeList: that.state.storeList,
                                        comment: document.getElementById("comment").value,
                                        guId: that.props.location.state.guId
                                    };
                                    var EncryptedRequest1 = Encrypt(Request1);
                                    console.log("3", EncryptedRequest1);
                                    fetch("/ReopenTaskMultiStore", {
                                        method: "POST",
                                        headers: {
                                            guId: that.props.location.state.guId,
                                            Authorization:
                                                "Basic " + basicAuth(that.props.location.state.userid)
                                        },
                                        body: EncryptedRequest1
                                    })
                                        .then(response => response.text())
                                        .then(response => {
                                            var DecryptedResponse = decryptData(response);
                                            console.log(``, DecryptedResponse);
                                            if (DecryptedResponse.errorCode === "00") {
                                                confirmAlert({
                                                    message: "Task reassigned successfully.",
                                                    buttons: [
                                                        {
                                                            label: "Ok",
                                                            onClick: () => {
                                                                that.boxclose();
                                                            }
                                                        }
                                                    ]
                                                });
                                            } else {
                                                confirmAlert({
                                                    message: DecryptedResponse.errorMsg,
                                                    buttons: [
                                                        {
                                                            label: "Ok",
                                                            onClick: () => {
                                                                that.boxclose();
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
                                                            that.logoutnormal();
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
                } else {
                    confirmAlert({
                        //title: 'Alert !',
                        message:
                            "Extended date/time  should be greater than or equal to current date/time.",
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
            });
        }
    };
}

export default CumulativeReports;
