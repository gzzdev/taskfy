from django.db import models
from apps.workspaces.infrastructure.models import Workspace
from django.conf import settings


class ProjectRole(models.TextChoices):
    OWNER = "owner", "Owner"
    CONTRIBUTOR = "contributor", "Contributor"
    VIEWER = "viewer", "Viewer"
    

class Project(models.Model):
    name = models.CharField(max_length=120)
    description = models.TextField(blank=True)
    workspace = models.ForeignKey(Workspace,
                                  related_name="projects",
                                  on_delete=models.CASCADE)
    
    created_by = models.ForeignKey(settings.AUTH_USER_MODEL,
                                   related_name="created_projects",
                                   on_delete=models.CASCADE)
    
    created_at = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return f"{self.name} ({self.workspace.name})"


class ProjectMembership(models.Model):
    project = models.ForeignKey(Project, related_name="memberships", on_delete=models.CASCADE)
    user = models.ForeignKey(settings.AUTH_USER_MODEL, related_name="project_memberships", on_delete=models.CASCADE)
    role = models.CharField(max_length=20, choices=ProjectRole.choices, default=ProjectRole.CONTRIBUTOR)
    joined_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        unique_together = ("project", "user")
        