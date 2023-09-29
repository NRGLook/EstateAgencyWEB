from django.core.validators import MinValueValidator, MaxValueValidator
from django.db import models
from EstateAgency.models import Client


class Review(models.Model):
    author = models.ForeignKey(Client, on_delete=models.CASCADE)
    rating = models.PositiveIntegerField(default=5, validators=[MinValueValidator(1), MaxValueValidator(5)])
    text = models.TextField()
    date = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Отзыв от {self.author} оценка: {self.rating}"
