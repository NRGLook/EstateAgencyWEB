from django.shortcuts import render
from news.models import News


def home(request):
    context = {
        'latest_article': News.objects.latest('publication_date'),
    }
    return render(request, 'main.html', context)
