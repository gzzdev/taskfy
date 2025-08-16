import { Workspace } from "../entities/workspace";

export default interface WokspaceRepo {
    getUserWorkspaces(): Promise<Workspace[]> 
}