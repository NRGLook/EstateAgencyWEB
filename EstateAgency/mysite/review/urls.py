from . import views
from django.urls import path

app_name = 'review'

urlpatterns = [
    path('', views.review_list, name='home'),
]
