from django.urls import path
from .infrastructure.views import ProjectListView, MembershipListView, DeleteMembershipView

urlpatterns = [
    path('', ProjectListView.as_view(), name='worskpace-projects'),
    path('<int:project_id>/members/<int:user_id>', DeleteMembershipView.as_view(), name='project-membership-delete'),
    path('<int:project_id>/members', MembershipListView.as_view(), name='project-members'),
]