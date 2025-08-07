from rest_framework import serializers
from .models import TaskfyUser

class SignUpSerializer(serializers.ModelSerializer):
    class Meta:
        model = TaskfyUser
        fields = ['email', 'username']
        extra_kwargs = {'password': {'write_only': True}}
