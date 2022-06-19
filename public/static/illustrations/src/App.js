import React, { Component } from "react";
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css
import logo from "./logo.svg";
import "jquery/dist/jquery";
import {
  BrowserRouter,
  Route,
  Redirect,
  Switch,
  withRouter
} from "react-router-dom";
import Login from "./Login";
import Taskactive from "./Taskactive";
import Addquestion from "./Addquestion";
import CreatetaskUI from "./CreatetaskUI";
import Questionpreview from "./Questionpreview";
import Reports from "./Reports";
import CompletedTaskList from "./CompletedTaskList";
import Updatetasks from "./Updatetasks";
import Updatequestions from "./Updatequestions";
import QuestionPreviewForCompletedTask from "./QuestionPreviewForCompletedTask";
import ChangepasswordUI from "./ChangepasswordUI";
import config from "react-global-configuration";
import configuration from "./config";
import CreateHo from "./CreateHo";
import ErrorBoundary from "./ErrorBoundary";
import Storecreation from "./Storecreation";
import Templates from "./Templates";
import Tiker from "./Tiker";
import Addtemplate from "./Addtemplate";
import UpdateTemplates from "./UpdateTemplates";
import QuestionPreviewFortemplate from "./QuestionPreviewFortemplate";
import Dashboard from "./Dashboard";
import UserCreation from "./UserCreation";
import UserList from "./UserList";
import ImageGallery from "./ImageGallery";
import "./css/style.css";
import "./css/style-responsive.css";
import "./lib/bootstrap/css/bootstrap.min.css";
import "./lib/font-awesome/css/font-awesome.css";
import AnsweringPage from "./AnsweringPage";
import StoreTasks from "./StoreTasks";
import ArchivedTasks from "./ArchivedTasks";
import QuestionPreviewForArchivedTask from "./QuestionPreviewForArchivedTask";
import QuestionPaper from "./QuestionPaper";
// import Header from "./Header";
import Menu from "./Menu";
import MySelect from "./MySelect";
import { MemoryRouter } from "react-router";
import MenuRights from "./MenuRights"
import IssueRaising from "./IssueRaising";
import IssueDashboard from './IssueDashboard';
import DashboardGeneral from './DashboardGeneral';
import StoreList from './StoreList';
import StoreDetails from './StoreDetails';
import AnsweringPageForTraining from './AnsweringPageForTraining';
import DefectRaising from './DefectRaising';
import SmartPoint from './SmartPoint';
import CumulativeReports from './CumulativeReports';

config.set(configuration);
class App extends Component {
  render() {
    return (
      <div>
        <ErrorBoundary>
          <BrowserRouter>
            <Switch>
              <Route exact path="/" component={Login} />
              <Route exact path="/ArchivedTasks" component={ArchivedTasks} />
              <Route
                exact
                path="/QuestionPreviewForArchivedTask"
                component={QuestionPreviewForArchivedTask}
              />
              <Route path="/AnsweringPageForTraining" component={AnsweringPageForTraining} />
              <Route path="/StoreDetails" component={StoreDetails} />
              <Route path="/StoreList" component={StoreList} />
              <Route path="/DashboardGeneral" component={DashboardGeneral} />
              <Route path="/IssueDashboard" component={IssueDashboard} />
              <Route path="/IssueRaising" component={IssueRaising} />
              <Route path="/MenuRights" component={MenuRights} />
              <Route path="/QuestionPaper" component={QuestionPaper} />
              <Route path="/StoreTasks" component={StoreTasks} />
              <Route path="/AnsweringPage" component={AnsweringPage} />
              <Route path="/Addquestion" component={Addquestion} />
              <Route path="/Questionpreview" component={Questionpreview} />
              <Route path="/Reports" component={Reports} />
              <Route path='/CumulativeReports' component={CumulativeReports} />
              <Route path="/Taskactive" component={Taskactive} />
              <Route path="/CreatetaskUI" component={CreatetaskUI} />
              <Route path="/Updatetasks" component={Updatetasks} />
              <Route path="/Updatequestions" component={Updatequestions} />
              <Route path="/ChangepasswordUI" component={ChangepasswordUI} />
              <Route path="/CompletedTaskList" component={CompletedTaskList} />
              <Route path="/DefectRaising" component={DefectRaising} />
              <Route path="/SmartPoint" component={SmartPoint} />
              <Route
                path="/QuestionPreviewForCompletedTask"
                component={QuestionPreviewForCompletedTask}
              />
              <Route path="/CreateHo" component={CreateHo} />
              <Route path="/Storecreation" component={Storecreation} />
              <Route path="/Templates" component={Templates} />
              <Route path="/Tiker" component={Tiker} />
              <Route path="/Addtemplate" component={Addtemplate} />
              <Route path="/UpdateTemplates" component={UpdateTemplates} />
              <Route
                path="/QuestionPreviewFortemplate"
                component={QuestionPreviewFortemplate}
              />
              <Route path="/Dashboard" component={Dashboard} />
              <Route path="/UserCreation" component={UserCreation} />
              <Route path="/UserList" component={UserList} />
              <Route path="/ImageGallery" component={ImageGallery} />
            </Switch>
          </BrowserRouter>
        </ErrorBoundary>
      </div>
    );
  }
}

export default withRouter(App);
