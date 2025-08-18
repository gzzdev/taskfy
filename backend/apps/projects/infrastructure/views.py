from rest_framework import generics, status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from django.shortcuts import get_object_or_404

from .models import Project, ProjectMembership, ProjectRole
from .serializers import ProjectSerializer
from apps.projects.infrastructure.models import Workspace

class ProjectCreateView(generics.CreateAPIView):
    serializer_class = ProjectSerializer
    permission_classes = [IsAuthenticated]
    
    def perform_create(self, serializer):
        workspace_id = self.request.data.get('workspace')
        workspace = get_object_or_404(Workspace, id=workspace_id)
        project = serializer.save(created_by=self.request.user,
                                  workspace=workspace)
        
        # Add member relation
        ProjectMembership.objects.create(project=project, 
                                         user=self.request.user, 
                                         role=ProjectRole.OWNER)
        

class ProjectListByWorkspaceView(generics.ListAPIView):
    serializer_class = ProjectSerializer
    permission_classes = [IsAuthenticated]
    
    
    def get_queryset(self):
        workspace_id = self.kwargs['workspace_id']
        return Project.objects.filter(workspace_id=workspace_id,
                                      memberships__user=self.request.user).distinct()
        
        
# class 