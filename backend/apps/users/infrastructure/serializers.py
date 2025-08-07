from rest_framework import serializers
from .models import TaskfyUser

class SignUpSerializer(serializers.ModelSerializer):
    class Meta:
        model = TaskfyUser
        fields = ['username', 'email', 'password']
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        return TaskfyUser.objects.create_user(**validated_data)

