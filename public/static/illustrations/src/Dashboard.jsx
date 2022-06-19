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
import disableBrowserBackButton from "disable-browser-back-navigation";
import { basicAuth } from "./BasicAuth";

const margin = { top: 20, right: 20, bottom: 30, left: 40 };

class Dashboard extends Component {
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
    pendCount: [],
    pendingStores: ""
  };

  logoutnormal = () => {
    localStorage.clear();
    this.props.history.replace("/");
    disableBrowserBackButton();
  };

  componentWillMount() {
    this.TaskPieChart();
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

  _onAction(e) {}

  _onActive(e) {}

  _onIdle(e) {
    localStorage.clear();
    window.location.href = "/";
    disableBrowserBackButton();
  }

  render = () => {
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
          <a
            className="close"
            style={{ "font-weight": "bold", color: "#fff" }}
            onClick={this.Reportsbind}
          >
            X
          </a>
          <h4 className="modal-title" style={{ "text-align": "center" }}>
            KostaKruti Dashboard
          </h4>
        </div>
        <div className="modal-body">
          <h1 className="m-5">{this.state.taskName}</h1>
          {this.state.sum1.length > 0 ? (
            <div className="mt">
              <div className="dahboard">
                <span style={{ color: "blue" }}>
                  <b>Total Stores</b>
                </span>
                <br />
                <b>{this.state.total}</b>
              </div>

              <div className="dahboard">
                <span style={{ color: "PURPLE" }}>
                  <b>Completed</b>
                </span>
                <br />
                <b>{this.state.save}</b>
              </div>

              <div className="dahboard">
                <span style={{ color: "FUCHSIA" }}>
                  <b>Pending</b>
                </span>
                <br />
                <b> {this.state.draft}</b>
              </div>

              <div className="dahboard">
                <span style={{ color: "red" }}>
                  <b>New state</b>
                </span>
                <br />
                <b> {this.state.newTask}</b>
              </div>

              <div className="dahboard">
                <span style={{ color: "green" }}>
                  <b>Percentage</b>
                </span>
                <br />

                <b> {this.state.percentage}%</b>
              </div>
            </div>
          ) : null}
          <div className="pie-holder">
            {this.state.sum1.length > 0 ? (
              <div style={{ width: "300px", "margin-left": "15px" }}>
                <h4>Pie Chart :</h4>
                <p style={{ "font-weight": "bold" }}>
                  {this.state.stateName}
                  {this.state.statepercentage}
                  {this.state.isPendingVisible ? (
                    <p>
                      <b>
                        Pending Stores Count:
                        {this.state.pendingStores.split(",").length}/
                        {this.state.totalStores.length}
                      </b>
                    </p>
                  ) : null}
                </p>
                <ReactSvgPieChart
                  data={this.state.fromdata}
                  // If you need expand on hover (or touch) effect
                  expandOnHover
                  // If you need custom behavior when sector is hovered (or touched)
                  onSectorHover={(d, i, e) => {
                    if (d) {
                      if (d.value < 100 && d.value != 0) {
                        this.setState({ isPendingVisible: true });
                      }
                      this.setState({
                        stateName: d.title + " : ",
                        statepercentage: d.value + "%",
                        pendingStores: d.storeList,
                        totalStores: d.totalStore
                      });

                      // console.log("Mouse enter - Index:", i, "Data:", d, "Event:", e)
                    } else {
                      this.setState({ isPendingVisible: false });
                      this.setState({
                        //stateName: "", statepercentage: "", pendingStores: "", isPendingVisible: false
                      });
                      // console.log("Mouse leave - Index:", i, "Event:", e)
                    }
                  }}
                />
                <p>
                  <span
                    class="piesummary"
                    style={{ backgroundColor: "#ff0000" }}
                  ></span>
                  <label
                    style={{ position: "relative", "margin-right": "28px" }}
                  >
                    0 -10 %
                  </label>
                  <span
                    class="piesummary"
                    style={{ backgroundColor: "#ff9933" }}
                  ></span>
                  <label
                    style={{ position: "relative", "margin-right": "20px" }}
                  >
                    21 -30 %
                  </label>
                  <span
                    class="piesummary"
                    style={{ backgroundColor: "#ffcc00" }}
                  ></span>
                  <label
                    style={{ position: "relative", "margin-right": "20px" }}
                  >
                    31 -40 %
                  </label>
                  <span
                    class="piesummary"
                    style={{ backgroundColor: "#ffff00" }}
                  ></span>
                  <label
                    style={{ position: "relative", "margin-right": "20px" }}
                  >
                    41 -50 %
                  </label>
                  <span
                    class="piesummary"
                    style={{ backgroundColor: "#ccff33" }}
                  ></span>
                  <label
                    style={{ position: "relative", "margin-right": "20px" }}
                  >
                    51 -60 %
                  </label>
                  <span
                    class="piesummary"
                    style={{ backgroundColor: "#66ff33" }}
                  ></span>
                  <label
                    style={{ position: "relative", "margin-right": "20px" }}
                  >
                    61 -70 %
                  </label>
                  <span
                    class="piesummary"
                    style={{ backgroundColor: "#66ff33" }}
                  ></span>
                  <label
                    style={{ position: "relative", "margin-right": "20px" }}
                  >
                    71 -80 %
                  </label>
                  <span
                    class="piesummary"
                    style={{ backgroundColor: "#00cc00" }}
                  ></span>
                  <label
                    style={{ position: "relative", "margin-right": "20px" }}
                  >
                    81 -90 %
                  </label>
                  <span
                    class="piesummary"
                    style={{ backgroundColor: "#006600" }}
                  ></span>
                  <label
                    style={{ position: "relative", "margin-right": "20px" }}
                  >
                    91 -100 %
                  </label>
                </p>

                {this.state.isPendingVisible ? (
                  <p>
                    <b>Pending Stores:{this.state.pendingStores}</b>
                  </p>
                ) : null}
              </div>
            ) : (
              <h4 style={{ "margin-left": "10px" }}>
                Stores have not submitted the answers yet.
              </h4>
            )}

            <div
              style={{
                height: "500px",
                "overflow-y": "auto",
                backgroundColor: "rgba(0,0,255,0.5)"
              }}
            >
              {this.state.fromdata.map(function(item, key) {
                return (
                  <p className="goright mt-20">
                    <b>
                      {item.title} : {item.value}%
                    </b>
                  </p>
                );
              })}
            </div>
          </div>
          {this.state.sum1.length > 0 ? (
            <div>
              <h4>Bar Chart :</h4>
              <div
                style={{
                  "overflow-x": "scroll",
                  backgroundColor: "rgba(192,192,192)"
                }}
              >
                <BarChart
                  ylabel="% Completed"
                  width={100 * this.state.BarChartArray.length}
                  height={350}
                  margin={margin}
                  data={this.state.BarChartArray}
                  onBarClick={this.handleBarClick}
                />
              </div>
            </div>
          ) : null}
        </div>
        {/* <Scrollbars style={{ height: 296 }}>
        <table className="table table-striped table-advance table-hover table-bordered tbl-task tbl-hhide">

          <thead>

            <tr>
              {this.state.headers.map(function (item, key) {
                return (
                  <th>{item}</th>
                )
              })}
            </tr>
          </thead>
        </table>
        <table className="table table-striped table-advance table-hover table-bordered tbl-task tbl-hhide">

          <tbody>

            <tr>
              {this.state.answerList.map(function (item, key) {
                return (
                  <td>{item}</td>
                )
              })}
            </tr>
          </tbody>
        </table>
</Scrollbars> */}
      </div>
    );
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
        taskId: this.props.location.state.taskId,
        guId: this.props.location.state.guId
      };
      var EncryptedRequest1 = Encrypt(Request1);
      console.log(EncryptedRequest1);

      fetch("/TaskPieChart", {
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
            this.setState({ fromdata: DecryptedResponse.barChartList });
            this.setState({ total: DecryptedResponse.barChartDetails.total });
            this.setState({
              newTask: DecryptedResponse.barChartDetails.newTask
            });
            this.setState({ draft: DecryptedResponse.barChartDetails.draft });
            this.setState({ save: DecryptedResponse.barChartDetails.save });
            this.setState({
              percentage: DecryptedResponse.barChartDetails.percentage
            });

            for (let a = 0; a < DecryptedResponse.barChartList.length; a++) {
              var BarChartData = {
                text: "",
                value: ""
              };
              sum = sum + DecryptedResponse.barChartList[a].value;
              BarChartData.text = DecryptedResponse.barChartList[a].title;
              BarChartData.value = DecryptedResponse.barChartList[a].value;
              this.state.BarChartArray.push(BarChartData);
            }
            console.log("BarChartArray", this.state.BarChartArray);
            if (sum > 0) {
              this.state.sum1.push(sum);
            } else {
              this.setState({ sum1: [] });
            }
            console.log(`sum`, this.state.sum1);

            for (let a = 0; a < DecryptedResponse.barChartList.length; a++) {
              title.push(DecryptedResponse.barChartList[a].title);
            }
            this.setState({ titlename: title });

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
export default Dashboard;
