from rest_framework import serializers
from django.contrib.auth import password_validation
from django.core.exceptions import ValidationError
from .models import TaskfyUser


class SignUpSerializer(serializers.ModelSerializer):
    class Meta:
        model = TaskfyUser
        fields = ['email', 'password']
        extra_kwargs = {'password': {'write_only': True}}

    
    def validate(self, data):
        try:
            password_validation.validate_password(data.get('password'))
        except ValidationError as e:
            raise ValidationError({'password': list(e.messages)})
            
        return super(SignUpSerializer, self).validate(data)
    
    def create(self, validated_data):
        return TaskfyUser.objects.create_user(**validated_data)