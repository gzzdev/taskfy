from django.urls import path
from .infrastructure.views import ProjectListView, MembershipListView

urlpatterns = [
    path('', ProjectListView.as_view(), name='worskpace-projects'),
    path('<int:project_id>/members', MembershipListView.as_view(), name='project-members'),
]