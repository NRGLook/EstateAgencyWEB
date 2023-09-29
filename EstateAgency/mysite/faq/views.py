from django.shortcuts import render, get_object_or_404
from .models import FAQ


def faq_list(request):
    faq_items = FAQ.objects.all().order_by('-date_added')
    context = {
        'faq_items': faq_items,
    }
    return render(request, 'faq.html', context)
