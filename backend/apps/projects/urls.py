from django.urls import path
from .infrastructure.views import ProjectCreateView, ProjectListByWorkspaceView

urlpatterns = [
    path('', ProjectCreateView.as_view(), name='project-create'),
    path('<int:workspace_id>', ProjectListByWorkspaceView.as_view(), name='projects-by-workspace')
]