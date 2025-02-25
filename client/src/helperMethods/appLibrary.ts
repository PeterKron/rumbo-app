import { Project } from "../app/slices/appSlice";

export const getProjectName = (projectid : string, projects : Project[]) => {
    const project = projects.find((project: Project) => projectid === project._id);
    if(project){
        return project.project_name
    }
    //else return null;
}

export const getProjectId = (projectName : any, projects : Project[]) => {
    const project = projects.find(
        (project: Project) => project.project_name === projectName
      );
      if(project) {
          return project._id;
      }
      else return '';
}
