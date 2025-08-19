from rest_framework import generics, mixins
from rest_framework.permissions import IsAuthenticated
from django.shortcuts import get_object_or_404

from ..serializers import ProjectMembershipSerializer
from ..models import ProjectMembership, Project

class MembershipListView(mixins.DestroyModelMixin, generics.ListCreateAPIView):
    
    serializer_class = ProjectMembershipSerializer
    permission_classes = [IsAuthenticated]
    
    
    def get_queryset(self):
        project_id = self.kwargs['project_id']
        return ProjectMembership.objects.filter(project_id=project_id)
    
