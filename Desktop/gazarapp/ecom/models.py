from django.db import models
from django.contrib.auth.models import User
import datetime
from django.urls import reverse

STATUS = (
    ('Pending', 'Pending'),
    ('Prepared', 'Prepared'),
    ('Shipping', 'Shipping'),
    ('Delivered', 'Delivered')
)

CATEGORIES = (
    ('BEAR', 'BEAR'),
    ('SODA', 'SODA'),
    ('SWEETS', 'SWEETS'),
    ('SALTY', 'SALTY'),
    ('FRUITS', 'FRUITS'),
    ('OTHER', 'OTHER')
)

AVAILABILITIES = (
    ('available', 'available'),
    ('unavailable', 'unavailable'),
    ('coming soon', 'coming soon')
)

class Product(models.Model):
    name = models.CharField(max_length=64)
    category = models.CharField(max_length=32, choices=CATEGORIES, default="KILIKIA CELEBRATORY")
    price = models.DecimalField(decimal_places=2, max_digits=5)
    unit = models.CharField(max_length=10, default='1 ly')
    availability = models.CharField(max_length=32, choices=AVAILABILITIES, default='available')
    quantity = models.IntegerField()
    description_short = models.CharField(max_length=64, default='available')
    description_long = models.TextField(default='available')
    image = models.ImageField(verbose_name='Product Image', upload_to="static/images", default=None, blank=True)
    image_filename = models.CharField(max_length=256, default="image.png")

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
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="usernames")
    ordered_items = models.ManyToManyField(Ordered_item, blank=True, related_name='items')
    name = models.CharField(max_length=32, blank=True)
    mobile = models.CharField(max_length=16, blank=True)
    shipping_address = models.TextField(blank=True)
    total_price = models.DecimalField(decimal_places=2, max_digits=6)
    ordered_time = models.DateTimeField(auto_now_add=True)
    expected_time_request = models.TextField(blank=True)
    delivery_time = models.CharField(max_length=32, blank=True, null=True)
    status = models.CharField(max_length=32, choices=STATUS, default='Pending')