from django.db import models
from django.conf import settings

class WorkspaceRole(models.TextChoices):
    OWNER = 'owner', 'Owner'
    ADMIN = 'admin', 'Admin'
    MEMBER = 'member', 'Member'


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
    user = models.ForeignKey(settings.AUTH_USER_MODEL,
                             on_delete=models.CASCADE)
    
    workspace = models.ForeignKey(Workspace, 
                                  related_name='membership',
                                  on_delete=models.CASCADE)
    
    role = models.TextField(max_length=16, choices=WorkspaceRole.choices, 
                            default=WorkspaceRole.MEMBER)
    
    joined_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        unique_together = ('user', 'workspace')
        
        
    def __str__(self):
        return f'{self.user.email} in {self.workspace.name} as {self.role}'

