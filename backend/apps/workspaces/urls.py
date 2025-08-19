from django.urls import path
from .infrastructure.views import WorkspaceView, MembershipView

urlpatterns = [
    path('', WorkspaceView.as_view(), name='workspace'),
    path('<int:workspace_id>/members', MembershipView.as_view(), name='workspace-membership'),
]