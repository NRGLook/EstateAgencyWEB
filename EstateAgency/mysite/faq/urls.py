from . import views
from django.urls import path

app_name = 'faq'

urlpatterns = [
    path('', views.faq_list, name='home'),
]
