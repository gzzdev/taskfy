from django.contrib.auth.models import AbstractUser
from django.db import models

class TaskfyUser(AbstractUser):
    
    email = models.EmailField(max_length=255, unique=True)
    
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []