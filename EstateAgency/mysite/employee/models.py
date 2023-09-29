from django.db import models


class Employee(models.Model):
    name = models.CharField(max_length=100)
    position = models.CharField(max_length=200)
    email = models.EmailField()
    phone = models.CharField(max_length=30)
    photo = models.ImageField(upload_to='static/employees/')

    def __str__(self):
        return self.name
