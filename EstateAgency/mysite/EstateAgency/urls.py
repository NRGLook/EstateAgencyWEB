from . import views
from django.urls import path

app_name = 'EstateAgency'

urlpatterns = [
    path('sort_by/<int:category_id>/', views.immovables_list, name='agency_list'),
    path('sort_by/<int:category_id>/sort_by_price/', views.sort_immovables_by_price, name='agency_list_sort_by_price'),
    path('immovables/<int:immovables_id>', views.immovables_detail, name='immovables_id'),
    path('add/', views.create_immovables, name='immovables_create'),
    path('analyse/', views.analyse, name='agency_analyse')
]
