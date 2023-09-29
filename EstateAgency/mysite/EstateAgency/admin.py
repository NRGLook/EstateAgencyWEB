from django.contrib import admin
from .models import Immovables, Client, Booking, Category

admin.site.register(Immovables)
admin.site.register(Client)
admin.site.register(Booking)
admin.site.register(Category)
