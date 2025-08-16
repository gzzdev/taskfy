import { ReactNode, useEffect, useState } from "react";
import { MenuItem } from "../../shared/types/menu";
import { WorkspaceApi } from "../../infrastructure/services/workspaceApi";
import { mapWorkspacesToMenuItems } from "../../application/adapters/workspaceMapper";


export function useWorkspaces(defaultIcon?: ReactNode) {
    const [workspaces, setWorkspaces] = useState<MenuItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const api = new WorkspaceApi();

        async function loadData() {
            try {
                const workspaces = await api.getUserWorkspaces();
                setWorkspaces(mapWorkspacesToMenuItems(workspaces));
            } catch (err) {
                console.error(err);
                setError('Impossible load workspaces');
            } finally {
                setLoading(false);
            }
        }

        loadData();
    }, []);
    
    return { workspaces, loading, error }
}