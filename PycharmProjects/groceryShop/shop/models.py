from django.db import models
import datetime
from django.urls import reverse

class Product(models.Model):
    name = models.CharField(max_length=64)
    category = models.CharField(max_length=32, null=False, blank=False)
    price = models.DecimalField(decimal_places=2, max_digits=5)
    unit = models.CharField(max_length=10, default='1 kg')
    availability = models.CharField(max_length=12, default='available')
    quantity = models.IntegerField()
    description_short = models.CharField(max_length=64, default='available')
    description_long = models.TextField(default='available')
    image = models.ImageField(null=True, blank=True)

    def __str__(self):
        return f"{self.name} - {self.price}"

class Ordered_item(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name='product')
    quantity = models.IntegerField()
    price_quantity = models.DecimalField(decimal_places=2, max_digits=5)
    notice = models.TextField(blank=True)

    def __str__(self):
        return f"{self.product.name} - {self.quantity}"

class Order(models.Model):
    ordered_items = models.ManyToManyField(Ordered_item, blank=True, related_name='items')
    name = models.CharField(max_length=32, blank=True)
    mobile = models.CharField(max_length=16, blank=True)
    shipping_address = models.TextField(blank=True)
    total_price = models.DecimalField(decimal_places=2, max_digits=6)
    ordered_time = models.DateTimeField(auto_now_add=True)
    expected_time_request = models.TextField(blank=True)
    delivery_time = models.CharField(max_length=32, blank=True, null=True)
    status = models.CharField(max_length=32, default='Pending')


