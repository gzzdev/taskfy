from django.urls import path
from .infrastructure.views import RegisterUserView

urlpatterns = [
    path('sign-in/', RegisterUserView.as_view(), name='sign-in'),
]
