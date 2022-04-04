from django.urls import path
from . import views

app_name = "mainapp"

urlpatterns = [
    path("", views.index, name="index"),
    path("item/<int:item_id>", views.item_view, name="itemView"),
    path("category/<str:category>", views.category_view, name="category"),
    path("checkout/", views.checkout_view, name="checkout"),
    path('login', views.login_view, name='login'),
    path('register', views.register_view, name="register"),
    path('logout', views.logout_view, name="logout")
]

