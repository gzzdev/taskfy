from rest_framework import serializers
from django.conf import settings

from .models import Workspace, WorkspacesMembership


class WorkspaceMembershipSerializer(serializers.ModelSerializer):
    user = settings.AUTH_USER_MODEL
    
    class Meta:
        model = WorkspacesMembership
        fields = ['id', 'user', 'role', 'joined_at']
    

class WorkspaceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Workspace
        fields = ['id', 'name', 'description']
        
        