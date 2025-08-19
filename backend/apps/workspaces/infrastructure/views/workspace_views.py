from rest_framework.permissions import IsAuthenticated
from rest_framework.generics import ListCreateAPIView

from ..serializers import WorkspaceSerializer
from ..models import Workspace, WorkspacesMembership, WorkspaceRole

class WorkspaceView(ListCreateAPIView):
    serializer_class = WorkspaceSerializer
    permission_classes = [IsAuthenticated]
    
    
    def get_queryset(self):
        """ Return list of workspaces that user authenticated is member """
        return Workspace.objects.filter(membership__user=self.request.user)
    
    
    def perform_create(self, serializer):
        workspace = serializer.save(created_by=self.request.user)
        
        # Add member relation to creator
        WorkspacesMembership.objects.create(workspace=workspace,
                                            user=self.request.user,
                                            role=WorkspaceRole.OWNER)

        