from django.contrib import admin
from django.urls import path
from core import views

urlpatterns = [
    path('adming/', admin.site.urls),
    path('', views.home, name='home'),
]