from rest_framework import serializers
from django.conf import settings

from .models import Project, ProjectMembership


class ProjectMembershipSerializer(serializers.ModelSerializer):
    user = settings.AUTH_USER_MODEL

    class Meta: 
        model = ProjectMembership
        fields = ['id', 'user', 'role', 'joined_at', 'project']
        
        
class ProjectSerializer(serializers.ModelSerializer):
    memberships = ProjectMembershipSerializer(many=True, read_only=True)
    
    class Meta:
        model = Project
        fields = ['id', 'name', 'description', 'created_at', 'memberships']