
from rest_framework import generics, mixins, status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated

from django.shortcuts import get_object_or_404
from django.db import IntegrityError


from ..serializers import WorkspaceMembershipSerializer
from ..models import Workspace, WorkspacesMembership


class MembershipView(mixins.DestroyModelMixin, generics.ListCreateAPIView):
    serializer_class = WorkspaceMembershipSerializer
    permission_classes = [IsAuthenticated]
    
    def get_serializer_context(self):
        context = super().get_serializer_context()
        context['workspace_id'] = self.kwargs.get('workspace_id')
        return context

    
    def get_queryset(self):
        """ Return workspace's membership """
        workspace_id = self.kwargs.get('workspace_id')
        return WorkspacesMembership.objects.filter(workspace_id=workspace_id)
    
    
    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        
        try:
            serializer.is_valid(raise_exception=True)
            self.perform_create(serializer) 
        except IntegrityError:
            return Response({"detail": "User is already a member of this workspace."}, status=status.HTTP_409_CONFLICT)
        
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)
    
    
    def perform_create(self, serializer):
        # Get the workspace from the URL parameters and ensure it exists
        workspace_id = self.kwargs.get('workspace_id')
        workspace = get_object_or_404(Workspace, id=workspace_id)
        
        serializer.save(workspace=workspace)
            