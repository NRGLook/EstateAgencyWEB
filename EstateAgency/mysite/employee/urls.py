from . import views
from django.urls import path

app_name = 'employee'

urlpatterns = [
    path('', views.contacts, name='home'),
]
