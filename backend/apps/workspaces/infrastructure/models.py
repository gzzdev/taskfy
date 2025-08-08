from django.db import models
from django.conf import settings


class Workspace(models.Model):
    
    name = models.CharField(max_length=100)
    description = models.TextField(max_length=500, blank=True)
    created_by = models.ForeignKey(settings.AUTH_USER_MODEL,
                                   related_name='owned_workspaces',
                                   on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name


class WorkspacesMembership(models.Model):
    
    ROLE_CHOICES = (('owner', 'Owner'),
                    ('admin', 'Admin'), 
                    ('member', 'Member'))
    
    
    user = models.ForeignKey(settings.AUTH_USER_MODEL,
                             on_delete=models.CASCADE)
    workspace = models.ForeignKey(Workspace, 
                                  related_name='membership',
                                  on_delete=models.CASCADE)
    
    role = models.TextField(max_length=16, choices=ROLE_CHOICES, default='member')
    joined_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        unique_together = ('user', 'workspace')
        
        
    def __str__(self):
        return f'{self.user.email} in {self.workspace.name} as {self.role}'

