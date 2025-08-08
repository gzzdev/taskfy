from rest_framework import serializers
from .models import Workspace

class WorkspaceCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Workspace
        fields = ['name', 'description']
        
        