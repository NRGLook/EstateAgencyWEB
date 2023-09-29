from django.shortcuts import render


def get_html(request):
    return render(request, 'about.html')
