from django.urls import path
from .infrastructure.views import ProjectListView

urlpatterns = [
    path('', ProjectListView.as_view(), name='worskpace-projects'),
]