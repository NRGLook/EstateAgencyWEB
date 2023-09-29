from django.shortcuts import render
from .models import Vacancy


def vacancy_list(request):
    vacancies = Vacancy.objects.all()
    context = {'vacancies': vacancies}
    return render(request, 'vacancy.html', context)
