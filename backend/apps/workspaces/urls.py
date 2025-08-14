from django.urls import path
from .infrastructure.views import WorkspaceView

urlpatterns = [
    path('', WorkspaceView.as_view(), name='workspace'),
]