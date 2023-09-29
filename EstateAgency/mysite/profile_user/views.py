from django.shortcuts import render, get_object_or_404, redirect

from EstateAgency.models import Immovables, Booking
from review.models import Review


# Create your views here.
def get_book(request):
    if not request.user.is_authenticated:
        return redirect("EstateAgency:agency_list", 0)

    if request.method == 'POST' and 'delete_item' in request.POST:
        booking = get_object_or_404(Booking, id=request.POST['booking_id'])
        booking.delete()

    if request.method == 'POST' and 'confirm' in request.POST:
        for i in Booking.objects.filter(client_id=request.user, status='cart'):
            i.status = 'paid'
            i.save()

    if request.method == 'POST' and 'review' in request.POST:
        rating = request.POST.get('range')
        text = request.POST.get('text')
        Review.objects.create(
            author=request.user,
            rating=rating,
            text=text,
        )

    all_booking = Booking.objects.filter(client_id=request.user, status='cart')
    return render(request, 'profile_user/profile.html', {'all_booking': all_booking})
