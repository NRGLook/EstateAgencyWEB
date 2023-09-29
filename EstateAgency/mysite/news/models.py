from django.db import models


class News(models.Model):
    title = models.CharField(max_length=200)
    content = models.TextField()
    publication_date = models.DateField(auto_now_add=True)
    image = models.ImageField(upload_to='static/news/')

    def __str__(self):
        return self.title
