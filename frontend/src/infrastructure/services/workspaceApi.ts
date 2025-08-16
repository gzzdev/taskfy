import { Workspace } from "../../domain/entities/workspace";
import WokspaceRepo from "../../domain/repositories/workspaceRepo";

export class WorkspaceApi implements WokspaceRepo {

    async getUserWorkspaces(): Promise<Workspace[]> {
        const options = {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Token a95bc910c0ebbe40a15fba2d3d1b4548ef233952",
            },
        };
        const res = await fetch("http://localhost:8000/api/workspaces/", options);
        
        if (!res.ok) {
            throw new Error("Requests error to get workspaces")
        }
        
        const data = await res.json();
        return data.map((ws: any) => ({
            id: ws.id,
            name: ws.name,
            description: ws.description,
            createdAt: ws.created_at
        }) )
    }

}