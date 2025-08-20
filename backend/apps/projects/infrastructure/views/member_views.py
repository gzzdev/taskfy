from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated

from django.shortcuts import get_object_or_404
from django.db import IntegrityError


from ..serializers import ProjectMembershipSerializer
from ..models import ProjectMembership, Project

class MembershipListView(generics.ListCreateAPIView):
    
    serializer_class = ProjectMembershipSerializer
    permission_classes = [IsAuthenticated]
    
    
    def get_queryset(self):
        project_id, workspace_id = self.kwargs['project_id'], self.kwargs['workspace_id']
        return ProjectMembership.objects.filter(project_id=project_id, 
                                                project__workspace_id=workspace_id,
                                                user=self.request.user)
    
    
    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        
        try:
            serializer.is_valid(raise_exception=True)
            self.perform_create(serializer)
        except IntegrityError as e:
            return Response({"detail": f"User is already a member of this project. {e}"}, status=status.HTTP_409_CONFLICT)
        
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)
    
    def perform_create(self, serializer):
        project_id, workspace_id = self.kwargs.get('project_id'), self.kwargs.get('workspace_id')
        project = get_object_or_404(Project, id=project_id, workspace_id=workspace_id)
        
        # Ensure user is part of the workspace
        # if not project.workspace.membership.filter(user=self.request.user).exists():
        #     raise PermissionDenied("You are not a member of this workspace.")
        
        serializer.save(project=project)