from django.shortcuts import render
from .models import *
from django.http import JsonResponse
import datetime

def store(request):
    return render(request, "shop/home.html")