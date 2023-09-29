from . import views
from django.urls import path

app_name = 'coupon'

urlpatterns = [
    path('', views.coupon_list, name='home'),
]
