from django.shortcuts import render, get_object_or_404
from .models import News


def news_list(request):
    news_list = News.objects.order_by('-publication_date')
    context = {
        'news_list': news_list,
    }
    return render(request, 'news.html', context)


def current_news(request, news_id):
    news = get_object_or_404(News, pk=news_id)
    context = {
        'news': news,
    }
    return render(request, 'current_news.html', context)
