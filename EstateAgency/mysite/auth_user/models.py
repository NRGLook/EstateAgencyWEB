from django.contrib.auth import login
from django.contrib.auth.views import LoginView
from django.shortcuts import redirect
from django.urls import reverse_lazy
from django.views.generic import CreateView

from auth_user.forms import RegisterUserForm, LoginUserForm


class RegisterUser(CreateView):
    form_class = RegisterUserForm
    template_name = 'logreg/reg.html'
    success_url = reverse_lazy('/logreg/log.html')

    def form_valid(self, form):
        user = form.save()
        login(self.request, user)
        return redirect("EstateAgency:agency_list", 0)


class LoginUser(LoginView):
    form_class = LoginUserForm
    template_name = 'logreg/log.html'

    def get_success_url(self):
        return reverse_lazy("EstateAgency:agency_list", args=(0,))
