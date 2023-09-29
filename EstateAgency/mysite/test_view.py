from django.urls import reverse
import pytest
import requests
import django.test.client
import pytest
import django.test.utils
from django.conf import settings
from django.contrib.auth.models import User
from django.db import connection


def test_1_():  # Get the home page
    url = 'http://127.0.0.1:8000/'
    response = requests.get(url)
    assert response.status_code == 200


def test_2():  # Get the home page
    url = 'http://127.0.0.1:8000/add/'
    response = requests.get(url)
    assert response.status_code == 200


def test_3():  # Get the home page
    url = 'http://127.0.0.1:8000/sort_by/0/'
    response = requests.get(url)
    assert response.status_code == 200


def test_4():  # Get the home page
    url = 'http://127.0.0.1:8000/analyse/'
    response = requests.get(url)
    assert response.status_code == 200


def test_5():  # Get the home page
    url = 'http://127.0.0.1:8000/immovables/0'
    response = requests.get(url)
    assert response.status_code == 404


def test_6():  # Get the home page
    url = 'http://127.0.0.1:8000/sort_by/0/sort_by_price/'
    response = requests.get(url)
    assert response.status_code == 200


def test_7():  # Get the home page
    url = 'http://127.0.0.1:8000/sort_by/0/'
    response = requests.get(url)
    assert response.status_code == 200


def test_8():  # Get the home page
    url = 'http://127.0.0.1:8000/profile/'
    response = requests.get(url)
    assert response.status_code == 200


def test_9():  # Get the home page
    url = 'http://127.0.0.1:8000/auth/register/'
    response = requests.get(url)
    assert response.status_code == 200


def test_10():  # Get the home page
    url = 'http://127.0.0.1:8000/auth/login/'
    response = requests.get(url)
    assert response.status_code == 200


def test_110():  # Get the home page
    url = 'http://127.0.0.1:8000/auth/logout/'
    response = requests.get(url)
    assert response.status_code == 200


# @pytest.fixture
# def create_user():
#     user = User.objects.create_user(username='testuser', password='testpassword')
#     yield user
#     user.delete()
#
#
# @pytest.fixture
# def db_connection():
#     connection.connect()
#     yield
#     connection.close()
