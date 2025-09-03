from django.urls import path, include

urlpatterns = [
    path('api/users/', include('apps.users.urls')),
    path('api/workspaces/<int:workspace_id>/projects/', include('apps.projects.urls')),
    path('api/workspaces/', include('apps.workspaces.urls')),
]
