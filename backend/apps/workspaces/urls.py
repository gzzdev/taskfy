from django.urls import path
from rest_framework.routers import DefaultRouter

from .infrastructure.views import WorkspaceView, MembershipView, DeleteMembershipView

urlpatterns = [
    path('<int:workspace_id>', WorkspaceView.as_view(), name='workspace'),
    path('<int:workspace_id>/members/<int:user_id>', DeleteMembershipView.as_view(), name='workspace-membership-delete'),
    path('<int:workspace_id>/members', MembershipView.as_view(), name='workspace-membership'),
]