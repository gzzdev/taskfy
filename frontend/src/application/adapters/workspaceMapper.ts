import { Workspace } from "../../domain/entities/workspace";
import { MenuItem } from "../../shared/types/menu";

export function mapWorkspacesToMenuItems(workspaces: Workspace[]) : MenuItem[] {
    return workspaces.map(ws => ({
        id: ws.id,
        name: ws.name,
        icon: undefined,
        path: `/workspaces/${ws.id}`,
    }));
}