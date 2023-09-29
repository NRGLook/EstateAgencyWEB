from . import views
from django.urls import path

app_name = 'vacancy'

urlpatterns = [
    path('', views.vacancy_list, name='home'),
]
