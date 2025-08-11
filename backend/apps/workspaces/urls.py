from django.urls import path
from .infrastructure.views import WorkspaceCreateView

urlpatterns = [
    path('create', WorkspaceCreateView.as_view(), name='workspace-create')
]