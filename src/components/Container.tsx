import {Sidebar} from "./Sidebar.tsx";
import {JobItemContent} from "./JobItemContent.tsx";

export function Container() {
  return <div className="container">
    <Sidebar/>
    <JobItemContent/>
  </div>;
}
