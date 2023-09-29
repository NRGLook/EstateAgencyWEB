import auth_user.views
from django.urls import path

from .models import RegisterUser, LoginUser

app_name = 'auth_user'

urlpatterns = [
    path('register/', RegisterUser.as_view(), name='register'),
    path('login/', LoginUser.as_view(), name='login'),
    path('logout/', auth_user.views.logout_user, name='logout')
]
