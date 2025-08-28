from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.exceptions import PermissionDenied

from django.shortcuts import get_object_or_404
from django.db import IntegrityError

import logging
logger = logging.getLogger(__name__)

from ..serializers import ProjectMembershipSerializer
from ..models import ProjectMembership
from apps.workspaces.infrastructure.models import WorkspacesMembership

class MembershipListView(generics.ListCreateAPIView):
    
    serializer_class = ProjectMembershipSerializer
    permission_classes = [IsAuthenticated]
    
    
    def get_queryset(self):
        return ProjectMembership.objects.filter(project_id=self.kwargs['project_id'], 
                                                project__workspace_id=self.kwargs['workspace_id'])
    
    
    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        
        try:
            serializer.is_valid(raise_exception=True)
            self.perform_create(serializer)
        except IntegrityError as e:
            return Response({"detail": f"User is already a member of this project."}, status=status.HTTP_409_CONFLICT)
        
        except PermissionDenied:
            return Response({"detail": f"User is not in the project workspace."}, status=status.HTTP_403_FORBIDDEN)
        
        
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)
    
    def perform_create(self, serializer):
        project_id, workspace_id = self.kwargs.get('project_id'), self.kwargs.get('workspace_id')
        user = serializer.validated_data.get('user')
        
        # Ensure user is part of the workspace
        if not WorkspacesMembership.objects.filter(workspace_id=workspace_id, user=user).exists():
            logger.warning(f"User {user.email} is not a member of workspace {workspace_id}")
            raise PermissionDenied()
        
        serializer.save(project_id=project_id)
        
        
class DeleteMembershipView(generics.DestroyAPIView):
    serializer_class = ProjectMembershipSerializer
    permission_classes = [IsAuthenticated]
    
    def get_object(self):
        project_id, workspace_id = self.kwargs.get('project_id'), self.kwargs.get('workspace_id')
        user_id = self.kwargs.get('user_id')
        return get_object_or_404(ProjectMembership, project__workspace_id=workspace_id, 
                                 project_id=project_id, user_id=user_id)
    
    def delete(self, request, *args, **kwargs):
        membership = self.get_object()
        membership.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)