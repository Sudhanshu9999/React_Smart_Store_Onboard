import disableBrowserBackButton from "disable-browser-back-navigation";
import React, { Component } from "react";
import { confirmAlert } from "react-confirm-alert"; // Import
import { Scrollbars } from "react-custom-scrollbars";
import IdleTimer from "react-idle-timer"; // For Idle
import Spinner from "react-spinner-material"; //Import Spinner
import ReactSvgPieChart from "react-svg-piechart";
import { basicAuth } from "./BasicAuth";
import "./css/react-confirm-alert.css"; // Import css
import "./css/style-responsive.css";
import "./css/style.css";
import { decryptData, Encrypt } from "./Encryption-Decrypytion";
 
const data = [
  {title: "Data 1", value: 100, color: "#22594e"},
  {title: "Data 2", value: 60, color: "#2f7d6d"},
  {title: "Data 3", value: 30, color: "#3da18d"},
  {title: "Data 4", value: 20, color: "#69c2b0"},
  {title: "Data 5", value: 10, color: "#a1d9ce"},
]

const margin = { top: 20, right: 20, bottom: 30, left: 40 };

class DashboardGeneral extends Component {
  state = {
    pieData:[],
    pieDataCheck: [],
    fromdata: [],
    totalclosed:[],
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
    pendCount: [],
    pendingStores: "",
    open:"",
    missed :"",
    review:"",
    closed:"",
    showothertable:false,
    searchID: "",
  };

  onChange1 = e => {
    this.setState({ searchID: e.target.value });
  };

  logoutnormal = () => {
    localStorage.clear();
    this.props.history.replace("/");
    disableBrowserBackButton();
  };

  componentWillMount() {
    this.TaskPieChart();
  }
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

  _onAction(e) {}

  _onActive(e) {}

  _onIdle(e) {
    localStorage.clear();
    window.location.href = "/";
    disableBrowserBackButton();
  }

  render = () => {
    var that = this;

    const { searchID } = this.state;

    return (
      <div>
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
        {that.props.location.state.mainuser === "N" ? 
          <a
            className="close"
            style={{ "font-weight": "bold", color: "#fff" }}
            onClick={this.CompletedTaskListbind}
          >
            X
          </a>

          :

          <a
          className="close"
          style={{ "font-weight": "bold", color: "#fff" }}
          onClick={this.TaskactiveBind}
        >
          X
        </a>
        }

          <h4 className="modal-title" style={{ "text-align": "center" }}>
           Dashboard
          </h4>
        </div>
        <div className="modal-body">
          <h1 className="m-5">{this.state.taskName}</h1>
       
         
          
          {/* <div className="pie-holder">
              
           

            <div
              style={{
                height: "500px",
                "overflow-y": "auto",
                backgroundColor: "rgba(0,0,255,0.5)"
              }}
            >
              
            </div>
          </div> */}
          <div className="row mt">
          <div className="col-md-12">
            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12"> 
          <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
          <div className="col-xs-12 col-sm-3 col-md-3 col-lg-3">
          {" "}
          <b>Store No. / Store Name / Store Location</b>
          <br />
          <input
            type="text"
            placeholder="Search"
            className="form-control"
            id="taskname"
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
        </div>
        <div className="col-lg-10 col-md-10 col-sm-10 col-xs-12 tbwdth">
                      <div className="mt">

                        <div className="tbl-holder">

                          {/* <div className="spin">
                            <Spinner visible={this.state.loading}
                              spinnerColor={"rgba(0, 0, 0, 0.3)"} />
                          </div> */}
                           <table className="table table-striped table-advance table-hover table-bordered tbl-DashTitle tbl-hhide">

                          <thead>
                
                            <tr>
                                  <th style={{backgroundColor:"navy"}}></th>
                                  <th style={{backgroundColor:"navy"}}>CHECKLISTS</th>
                                  <th style={{backgroundColor:"navy"}}>ISSUES</th>
                                 
                
                            </tr>
                          </thead>
                        </table> 
        <table className="table table-striped table-advance table-hover table-bordered tbl-genDash tbl-hhide">

          <thead>

            <tr>
                  <th>Store No</th>
                  <th>Completed %</th>
                  <th>Checklist</th>
                  <th>New</th>
                  <th>Missed</th>
                  <th>Pending</th>
                  <th>Open</th>
                  <th>Completed</th>
                  <th>Pending</th>

            </tr>
          </thead>
        </table>
        <Scrollbars style={{ height: 296 }}>

        <table className="table table-striped table-advance table-hover table-bordered tbl-genDash mob-tbl">

          <tbody>
         
           
              { this.state.fromdata.map(function (item, key) { 
                if (
                  (
                    searchID !== "") &&
                  (
                    item.storeNo
                      .toLowerCase()
                      .indexOf(
                        searchID.toLowerCase()
                      )) === -1
                ) {
                  return null;
                }
                return ( 
                    <tr key={key}>
{/* {item.storeNo.key === "0" : } */}
                
                {item.storeNo ==="TOTAL" ?
                <td  data-th="Store No"  style={{"color": "#3da0de", "font-weight": "bold"}} /* onClick={that.callOtherTable.bind(that)} */> 
                 {item.storeNo}
                 </td>
                 :
                 <td  data-th="Store No">
                {item.storeNo}
                 </td>
                }
                {item.storeNo ==="TOTAL" ?
                <td style={{"color": "#3da0de", "font-weight": "bold"}} data-th="Completed %">{item.competedPer}%</td>
                :
                <td  data-th="Completed %">{item.competedPer}%</td>
              }
              {item.storeNo ==="TOTAL" ?
                <td  data-th="CheckLists" style={{"color": "#3da0de", "font-weight": "bold"}}>{item.checklistCount}</td> 
                :
                <td  data-th="CheckLists">{item.checklistCount}</td> 
            }
            {item.storeNo ==="TOTAL" ?
                <td  data-th="New" style={{"color": "#3da0de", "font-weight": "bold"}}>{item.newCount}</td>
                :
                <td  data-th="New">{item.newCount}</td>
          }
          {item.storeNo ==="TOTAL" ?
                <td  data-th="Missed" style={{"color": "red", "font-weight": "bold"}}>{item.missedCount}</td>
                :
                <td  data-th="Missed" style={{"color": "red"}}>{item.missedCount}</td>
        }
        {item.storeNo ==="TOTAL" ?
                <td  data-th="Pending" style={{"color": "#3da0de", "font-weight": "bold"}}>{item.reviewPendingCount}</td>
                :
                <td  data-th="Pending">{item.reviewPendingCount}</td>
      }
      {item.storeNo ==="TOTAL" ?
                <td  data-th="Issue Open" style={{"color": "#3da0de", "font-weight": "bold"}}>{item.issueOpenCount}</td>
                :
                <td  data-th="Issue Open">{item.issueOpenCount}</td>
    }
    {item.storeNo ==="TOTAL" ?
                <td  data-th="Issue Completed" style={{"color": "#3da0de", "font-weight": "bold"}}>{item.issueCompletedCount}</td>
                :
                <td  data-th="Issue Completed">{item.issueCompletedCount}</td>
  }
  {item.storeNo ==="TOTAL" ?
                <td  data-th="Issue Pending" style={{"color": "#3da0de", "font-weight": "bold"}}>{item.issuePendingCount}</td>
                :
                <td  data-th="Issue Pending">{item.issuePendingCount}</td>
}

                </tr>
                 ) 
               })}  
            
          </tbody>
        </table>
</Scrollbars>
      </div>
      </div>
      </div>
      </div>
      </div>
      </div>

      <div class="row">
      <div class="col-xs-1"></div>
                        <div class="col-xs-4">
                        <h4 style={{textAlign: "center"}}>Checklist PieChart :</h4>
      <ReactSvgPieChart
     
      data={this.state.pieDataCheck}
      // If you need expand on hover (or touch) effect
      expandOnHover
      // If you need custom behavior when sector is hovered (or touched)
      onSectorHover={(d, i, e) => {
        if (d) {
          console.log("Mouse enter - Index:", i, "Data:", d, "Event:", e)
        } else {
          console.log("Mouse leave - Index:", i, "Event:", e)
        }
      }}
    />
    </div>
    <div class="col-xs-2"></div>
    <div class="col-xs-4">
    <h4 style={{textAlign: "center"}}>Issue PieChart :</h4>
    <ReactSvgPieChart
  
    data={this.state.pieData}
    // If you need expand on hover (or touch) effect
    expandOnHover
    // If you need custom behavior when sector is hovered (or touched)
    onSectorHover={(d, i, e) => {
      if (d) {
        console.log("Mouse enter - Index:", i, "Data:", d, "Event:", e)
      } else {
        console.log("Mouse leave - Index:", i, "Event:", e)
      }
    }}
  />
  </div>
  <div class="col-xs-1"></div>
</div>
{this.state.showothertable ? 
      <div className="col-lg-10 col-md-10 col-sm-10 col-xs-12 tbwdth">
                      <div className="mt">

                        <div className="tbl-holder">

                          {/* <div className="spin">
                            <Spinner visible={this.state.loading}
                              spinnerColor={"rgba(0, 0, 0, 0.3)"} />
                          </div> */}
        <table className="table table-striped table-advance table-hover table-bordered tbl-task tbl-hhide">

          <thead>

            <tr>
                  <th>Issue Title</th>
                  <th>Date/Time</th>
                  <th>Created By</th>
                  <th>Location</th>
                  <th>Assigned To</th>
                  <th>Status</th>
            </tr>
          </thead>
        </table>
        <Scrollbars style={{ height: 296 }}>

        <table className="table table-striped table-advance table-hover table-bordered tbl-task mob-tbl">

          <tbody>

           
              { this.state.fromdata.map(function (item, key) { 
                return ( 
                  <tr key={key}>

                  <td  data-th="Issue Title"> <a  href="javascript:void(0)"   className="black-text" >{item.storeNo}</a></td>
                  <td  data-th="Date/Time">{item.competedPer}</td>
                  <td  data-th="Created By">{item.checklistCount}</td> 
                  <td  data-th="Location">{item.newCount}</td>
                  <td  data-th="Assigned To">{item.missedCount}</td>
                  <td  data-th="Status">{item.reviewPendingCount}</td>
  
                  <td  data-th="Status">{item.issueOpenCount}</td>
                  <td  data-th="Status">{item.issueCompletedCount}</td>
                  <td  data-th="Status">{item.issuePendingCount}</td>
  
  
                  </tr>
                 ) 
               })}  
            
          </tbody>
        </table>
</Scrollbars>
      </div>
      </div>
      </div>

:null}





    </div>


      
    );
  };

  callOtherTable=()=>{
      this.setState({showothertable:true})
}

CompletedTaskListbind = () => {
  this.props.history.push({
    pathname: "/CompletedTaskList",
    state: {
      data: this.props.location.state.data,
      userid: this.props.location.state.userid,
      usrnm: this.props.location.state.usrnm,
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


  TaskPieChart = () => {
    if (
      this.props.location.state !== undefined &&
      this.props.location.state.usrnm !== ""
    ) {
      this.setState({
        loading: true
      });
      var title = [];
      var sum = 0;
      var Request1 = {
        userId:this.props.location.state.userid,
        guId: this.props.location.state.guId
      };
      var EncryptedRequest1 = Encrypt(Request1);
      console.log(EncryptedRequest1);

      fetch("/GetDashboard", {
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
          console.log("piechart response", DecryptedResponse);
          if (DecryptedResponse.errorCode === "00") {
            this.setState({ fromdata: DecryptedResponse.dashboardList });
          var abc ={
            title:"",
            value: "",
            color: ""
          }

          abc.title = "Issue Open"
          abc.value = parseInt(DecryptedResponse.dashboardList[0].issueOpenCount);
          abc.color = "navy"
          this.state.pieData.push(abc);
          
          var abc ={
            title:"",
            value: "",
            color: ""
          }
          abc.title = "Issue Completed"
          abc.value = parseInt(DecryptedResponse.dashboardList[0].issueCompletedCount);
          abc.color = "green"
          this.state.pieData.push(abc);

          var abc ={
            title:"",
            value: "",
            color: ""
          }
          abc.title = "Issue Pending"
          abc.value = parseInt(DecryptedResponse.dashboardList[0].issuePendingCount);
          abc.color = "yellow"
          this.state.pieData.push(abc);
console.log("pieData", this.state.pieData);

var abc ={
  title:"",
  value: "",
  color: ""
}
abc.title = "Checklist New"
abc.value = parseInt(DecryptedResponse.dashboardList[0].newCount);
abc.color = "navy"
this.state.pieDataCheck.push(abc);

var abc ={
  title:"",
  value: "",
  color: ""
}
abc.title = "Checklist Pending"
abc.value = parseInt(DecryptedResponse.dashboardList[0].reviewPendingCount);
abc.color = "yellow"
this.state.pieDataCheck.push(abc);

var abc ={
  title:"",
  value: "",
  color: ""
}
abc.title = "Checklist Completed"
abc.value = parseInt(DecryptedResponse.dashboardList[0].checklistCount)-parseInt(DecryptedResponse.dashboardList[0].missedCount)-parseInt(DecryptedResponse.dashboardList[0].newCount)-parseInt(DecryptedResponse.dashboardList[0].reviewPendingCount);
abc.color = "green"
this.state.pieDataCheck.push(abc);

var abc ={
  title:"",
  value: "",
  color: ""
}
abc.title = "Checklist Missed"
abc.value = parseInt(DecryptedResponse.dashboardList[0].missedCount);
abc.color = "red"
this.state.pieDataCheck.push(abc);


            this.setState(prevState => ({
              toggle: !prevState.toggle,
              loading: false
            }));
            this.setState({
              taskName: this.props.location.state.taskName,
              taskDescr: this.props.location.state.taskDescr
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
            this.setState({ loading: false });
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
  };
}
export default DashboardGeneral;


