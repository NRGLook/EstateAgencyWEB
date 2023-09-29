from . import views
from django.urls import path

app_name = 'profile_user'

urlpatterns = [
    path('', views.get_book, name='profile'),
]
