from . import views
from django.urls import path

app_name = 'about'

urlpatterns = [
    path('', views.get_html, name='home'),
]
