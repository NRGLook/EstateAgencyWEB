from django.db import models
from django.contrib.auth.models import AbstractUser


# https://django.fun/ru/docs/django/4.1/topics/db/models/
# https://django.fun/ru/docs/django/4.1/ref/models/fields/#model-field-types
class Category(models.Model):
    name = models.CharField(max_length=50)

    def __str__(self):
        return self.name


class Immovables(models.Model):
    category = models.ForeignKey(Category, on_delete=models.CASCADE)
    capacity = models.IntegerField()
    price = models.DecimalField(max_digits=8, decimal_places=2)
    photo = models.ImageField(upload_to='static/immovables/', blank=True)

    def __str__(self):
        return f"Immovables {self.id} ({self.category})"


class Client(AbstractUser):
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    patronymic = models.CharField(max_length=100)
    birth_date = models.DateField()
    phone_number = models.CharField(max_length=20)

    def __str__(self):
        return f"{self.last_name} {self.first_name} {self.patronymic}"


class Booking(models.Model):
    immovables = models.ForeignKey(Immovables, on_delete=models.CASCADE)
    client = models.ForeignKey(Client, on_delete=models.CASCADE)
    check_in_date = models.DateField()
    check_out_date = models.DateField()
    has_child = models.BooleanField(default=False)

    STATUS_CHOICES = [
        ('paid', 'Paid'),
        ('cart', 'Cart'),
    ]
    status = models.CharField(max_length=10, choices=STATUS_CHOICES, default='cart')

    def __str__(self):
        return f"Booking {self.id} - {self.client} ({self.immovables})"

    def calculate_total_cost(self):
        duration = self.check_out_date - self.check_in_date
        return duration.days * self.immovables.price
