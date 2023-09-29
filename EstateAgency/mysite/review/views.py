from django.shortcuts import render
from .models import Review


def review_list(request):
    reviews = Review.objects.all()
    context = {'reviews': reviews}
    return render(request, 'review.html', context)
