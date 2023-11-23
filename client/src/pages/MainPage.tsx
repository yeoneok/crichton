import { useState, useEffect } from "react";
import Upload from "./components/UploadComp";
import Test from "./components/Test/TestComp";
import Log from "./components/LogComp";
import { Status } from "../util/TypeDef";
import "./Page.scss";

export default function MainPage() {
  const apiList = require("../api/APIList").default;
  const aesUtil = require("../util/AES").default;

  const [projectPath, setProjectPath] = useState<string>("");
  const [projectStatus, setProjectStatus] = useState<Status>(Status.NotStarted);

  useEffect(() => {
    getToken();
  }, []);
  useEffect(() => {
    window.localStorage.setItem("projectPath", projectPath);
    window.localStorage.setItem("projectStatus", projectStatus.valueOf().toString());
  }, [projectPath, projectStatus]);

  const getToken = async (): Promise<void> => {
    await aesUtil.generateCryptoKey();
    const response = await apiList.getToken();
    if (response.successful) {
      window.localStorage.setItem("accessToken", response.result.accessToken);
      window.localStorage.setItem("refreshToken", response.result.refreshToken);
    } else {
      alert("Server is not running");
    }
  };

  const handleProjectPathChange = (path: string) => {
    if (path) {
      setProjectPath(path);
      setProjectStatus(Status.Created);
    }
  };
  const handleStatusChange = (status: Status) => {
    if (status) setProjectStatus(status);
  };

  return (
    <div>
      <header className="main_header">
        <h1>Crichton</h1>
      </header>
      <div className="main_content">
        <Upload api={apiList} status={projectStatus} setProjectPath={handleProjectPathChange} />
        <Test api={apiList} status={projectStatus} setStatus={handleStatusChange} />
        <Log api={apiList} status={projectStatus} />
      </div>
    </div>
  );
}
