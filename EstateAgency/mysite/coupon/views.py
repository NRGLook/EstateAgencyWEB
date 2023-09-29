from django.shortcuts import render
from .models import Coupon


def coupon_list(request):
    active_coupons = Coupon.objects.all()
    context = {'coupons_true': active_coupons.filter(is_active=True),
               'coupons_false': active_coupons.filter(is_active=False)}
    return render(request, 'coupon.html', context)
