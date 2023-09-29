from datetime import datetime

from .models import Immovables, Category, Booking
from django.shortcuts import get_object_or_404
from django.db.models import Count
from django.utils import timezone
import calendar
import requests
import matplotlib.pyplot as plt
import io
import base64
from django.shortcuts import render, redirect
from django.conf import settings
import os


def timezone_context(request):
    quote = ''
    joke = ''
    if request.user.is_authenticated:
        url = 'http://api.forismatic.com/api/1.0/'
        params = {
            'method': 'getQuote',
            'format': 'json',
            'lang': 'en'
        }
        response = requests.get(url, params=params)

        url = "https://icanhazdadjoke.com/"
        headers = {"Accept": "application/json"}
        response_joke = requests.get(url, headers=headers)

        try:
            if response.status_code == 200 or response_joke.status_code == 200:
                data = response.json()
                quote = (data['quoteText'])
                joke = response_joke.json()['joke']
            else:
                quote = ('Ошибка при выполнении запроса:', response.status_code)
                joke = ('Ошибка при выполнении запроса:', response.status_code)
        except:
            quote = 'No internet connection'
            joke = 'No internet connection'

    user_timezone = timezone.get_current_timezone()
    current_date = timezone.now()
    c = calendar.HTMLCalendar(calendar.MONDAY).formatmonth(datetime.now().year, datetime.now().month)
    context = {
        'user_timezone': user_timezone,
        'current_date': current_date,
        'calendar': c,
        'quote': quote,
        'joke': joke,
    }
    return context


def immovables_list(request, category_id):
    def get_html():
        if category_id == 0:
            immovables = Immovables.objects.all()
        else:
            immovables = Immovables.objects.filter(category_id=category_id)

        categories = Category.objects.all()
        return render(request, 'EstateAgency/agency_list.html', {'immovables': immovables,
                                                         'categories': categories,
                                                         'choose_category': category_id,
                                                         'timezone_context': timezone_context(request)})

    if request.method == 'POST' and 'delete_immovables' in request.POST:
        immovables = get_object_or_404(Immovables, id=request.POST['immovables_id'])
        immovables.delete()
        return get_html()

    return get_html()


def sort_immovables_by_price(request, category_id):
    if category_id == 0:
        immovables = Immovables.objects.order_by('price')
    else:
        immovables = Immovables.objects.filter(category_id=category_id).order_by('price')

    categories = Category.objects.all()
    return render(request, 'EstateAgency/agency_list.html', {'immovables': immovables,
                                                     'is_sort_by_price': True,
                                                     'categories': categories,
                                                     'choose_category': category_id,
                                                     'timezone_context': timezone_context(request)})


def immovables_detail(request, immovables_id):
    def check_date_periods(start1, end1, start2, end2):
        if start1 < end2 and start2 < end1:
            return True
        else:
            return False

    form = get_object_or_404(Immovables, id=immovables_id)
    categories = Category.objects.all()

    if request.method == 'POST' and 'book_immovables' in request.POST:
        check_in_date = datetime.strptime(request.POST['check_in_date'], '%Y-%m-%d').date()
        check_out_date = datetime.strptime(request.POST['check_out_date'], '%Y-%m-%d').date()
        has_child = request.POST.get('my_checkbox', False)
        if check_in_date >= check_out_date:
            error_message = "Check in date <= Check out date!"
            return render(request, 'EstateAgency/immovables_detail.html', {'error_message': error_message})

        periods = []

        all_booking = Booking.objects.filter(immovables_id=immovables_id)
        for i in all_booking:
            if check_date_periods(check_in_date, check_out_date, i.check_in_date, i.check_out_date):
                periods.append(str(i.check_in_date) + ' --> ' + str(i.check_out_date))

        if len(periods):
            error_message = "Already booked these days: " + str(periods) + '!'
            return render(request, 'EstateAgency/immovables_detail.html', {'error_message': error_message})

        booking = Booking(
            immovables=form,
            client=request.user,
            check_in_date=check_in_date,
            check_out_date=check_out_date,
            has_child=True if has_child == "on" else False
        )
        booking.save()
        return redirect("profile_user:profile")

    if request.method == 'POST' and 'edit_immovables' in request.POST:
        price = request.POST['price']
        capacity = request.POST['capacity']
        select = request.POST['select']
        photo = request.FILES['photo']

        file_path = os.path.join(settings.MEDIA_ROOT, 'immovables')
        with open(file_path, 'wb') as destination:
            for chunk in photo.chunks():
                destination.write(chunk)

        category = get_object_or_404(Category, id=select)
        form.category = category
        form.capacity = capacity
        form.price = price
        form.photo = photo

        form.save()
        form = get_object_or_404(Immovables, id=immovables_id)

    return render(request, 'EstateAgency/immovables_detail.html', {'form': form, 'categories': categories})


def create_immovables(request):
    if not request.user.is_authenticated:
        return redirect("EstateAgency:agency_list", 0)

    categories = Category.objects.all()
    if request.method == 'POST' and 'create_immovables' in request.POST:
        price = request.POST['price']
        capacity = request.POST['capacity']
        select = request.POST['select']
        photo = request.FILES['photo']

        file_path = os.path.join(settings.MEDIA_ROOT, 'immovables')
        with open(file_path, 'wb') as destination:
            for chunk in photo.chunks():
                destination.write(chunk)

        category = get_object_or_404(Category, id=select)

        new_immovables = Immovables()
        new_immovables.category = category
        new_immovables.photo = photo
        new_immovables.capacity = capacity
        new_immovables.price = price
        new_immovables.save()
        return redirect("EstateAgency:agency_list", 0)

    return render(request, 'EstateAgency/immovables_create.html', {'categories': categories})


def analyse(request):
    if not request.user.is_authenticated:
        return redirect("EstateAgency:agency_list", 0)

    try:
        bookings = Booking.objects.all()
        list_total_cost = [booking.calculate_total_cost() for booking in bookings]
        sum_cost = sum(list_total_cost)

        average_bill = sum_cost / len(list_total_cost)

        popular_immovables = Booking.objects.values('immovables').annotate(total_bookings=Count('immovables')). \
            order_by('-total_bookings').first()
        total_bookings = popular_immovables['total_bookings']
        immovables = Immovables.objects.get(id=popular_immovables['immovables'])

        plt.plot(list_total_cost)
        buf = io.BytesIO()
        plt.savefig(buf, format='png')
        buf.seek(0)
        plot_data = base64.b64encode(buf.read()).decode('ascii')

        return render(request, 'EstateAgency/agency_analyse.html', {'bookings': bookings,
                                                            'total_earnings': sum_cost,
                                                            'average_bill': average_bill,
                                                            'total_bookings': total_bookings,
                                                            'most_popular_immovables': immovables,
                                                            'plot_data': plot_data})
    except:
        return render(request, 'EstateAgency/agency_analyse.html', {'bookings': None,
                                                            'total_earnings': None,
                                                            'average_bill': None,
                                                            'total_bookings': None,
                                                            'most_popular_immovables': None,
                                                            'plot_data': None})
