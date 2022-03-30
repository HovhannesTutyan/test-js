from . models import Product

def categories(request):
    return {
        'categories':Product.objects.all().values('category').distinct()
    }