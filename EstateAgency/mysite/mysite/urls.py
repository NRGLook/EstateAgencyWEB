"""
URL configuration for mysite project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static


urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('main.urls', namespace='main')),
    path('EstateAgency/', include('EstateAgency.urls', namespace='EstateAgency')),
    path('auth/', include('auth_user.urls', namespace='auth_user')),
    path('profile/', include('profile_user.urls', namespace='profile_user')),
    path('news/', include('news.urls', namespace='news')),
    path('about/', include('about.urls', namespace='about')),
    path('faq/', include('faq.urls', namespace='faq')),
    path('employee/', include('employee.urls', namespace='employee')),
    path('vacancy/', include('vacancy.urls', namespace='vacancy')),
    path('coupon/', include('coupon.urls', namespace='coupon')),
    path('review/', include('review.urls', namespace='review')),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
