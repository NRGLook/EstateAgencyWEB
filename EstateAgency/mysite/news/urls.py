from . import views
from django.urls import path

app_name = 'news'

urlpatterns = [
    path('', views.news_list, name='home'),
    path('<int:news_id>/', views.current_news, name='current_news'),
]
