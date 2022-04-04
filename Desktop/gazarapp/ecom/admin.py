from django.contrib import admin
from .models import Product, Order, Ordered_item

admin.site.register(Product)
admin.site.register(Order)
admin.site.register(Ordered_item)
