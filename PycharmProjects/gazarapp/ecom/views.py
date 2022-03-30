import json
from django.contrib.auth import authenticate, login, logout
from django.contrib import messages
from django.contrib.auth.models import User

from django.core.exceptions import ObjectDoesNotExist
from django.http import HttpResponse, HttpResponseRedirect
from django.urls import reverse

from .models import Product
from django.shortcuts import render, redirect
import ntpath

categories = ('BEAR', 'SODA', 'SWEETS', 'SALTY', 'FRUITS', 'OTHER')
def get_product_by_category(data, category):
    list_items=[]
    items = data.filter(category=category)
    for item in items:
        list_items.append(item)
    return list_items
def index(request):
    all_products = {}
    products = Product.objects.all()
    for category in categories:
        item=get_product_by_category(products, category)
        if len(item) != 0:
            all_products[category] = item
    return render(request, 'ecom/index.html', {'list_items': all_products})
def item_view(request, item_id):
    try:
        data=Product.objects.get(pk=item_id)
    except ObjectDoesNotExist:
        return redirect('/')
    JsonData = {
        "id": item_id,
        "name":data.name,
        "category":data.category,
        "image":data.image.url,
        "unit":data.unit,
        "price": float(data.price)
    }
    JsonData = json.dumps(JsonData)
    context = {
        "item": data,
        "JsonData":JsonData
    }
    return render(request, 'ecom/product.html', context)
def category_view(request,category):
    data = Product.objects.filter(category=category)
    items = get_product_by_category(data, category)
    return render(request, 'ecom/index.html', {'list_items':{category:items}})
def login_view(request):
    if request.POST:
        username = request.POST["username"]
        password = request.POST["password"]
        user = authenticate(request, username=username, password=password)
        if user is not None:
            login(request, user)
        else:
            messages.error(request, "Invalid Credentials")
    return redirect('/')
def register_view(request):
    if request.POST:
        username = request.POST["username"]
        password = request.POST["password"]
        confirmation = request.POST["confirmation"]
        first_name = request.POST["first_name"]
        last_name = request.POST["last_name"]
        email = request.POST["email"]
        if not username or not password or not confirmation or not first_name or not last_name or not email:
            messages.info(request, "Invalid Inputs")
        if password != confirmation:
            messages.info(request, "Passwords Not Match")
        user_exists = User.objects.filter(username=username).exists()
        if not user_exists:
            user = User.objects.create_user(username, email, password, first_name=first_name, last_name=last_name)
            user.save()
            login(request, user)
        elif user_exists:
            messages.info(request, "Username already Exists")
    return redirect('/')
def logout_view(request):
    logout(request)
    return redirect('/')