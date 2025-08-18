from rest_framework import serializers

from .models import Project, ProjectMembership


class ProjectMembershipSerializer(serializers.ModelSerializer):
    user = serializers.StringRelatedField()

    class Meta: 
        model = ProjectMembership
        fields = ['id', 'user', 'role', 'joined_at']
        
        
class ProjectSerializer(serializers.ModelSerializer):
    memberships = ProjectMembershipSerializer(many=True, read_only=True)

    class Meta:
        model = Project
        fields = ['id', 'name', 'description', 'workspace', 'created_at',
                  'memberships']